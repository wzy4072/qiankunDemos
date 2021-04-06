<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误"/>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="集团号"
          v-decorator="[
            'tenant',
            {
              rules: [{ required: true, message: '请输入集团号' }], validateTrigger: 'change',initialValue:'001'}

          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户: admin"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '请输入帐户名或邮箱地址' },{ validator: handleUsernameOrEmail }], validateTrigger: 'blur',initialValue:'admin'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="密码: password"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur',initialValue:'123456'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>

      <!--            <a-form-item>-->
      <!--                <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>-->
      <!--                <router-link-->
      <!--                    :to="{ name: 'recover', params: { user: 'aaa'} }"-->
      <!--                    class="forge-password"-->
      <!--                    style="float: right;"-->
      <!--                >忘记密码-->
      <!--                </router-link>-->
      <!--            </a-form-item>-->

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定
        </a-button>
      </a-form-item>

      <!--            <div class="user-login-other">-->
      <!--                <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>-->
      <!--            </div>-->
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { sm2 } from 'sm-crypto'
import { getSmsCaptcha, getLoginToken } from '@/api/login'
import notification from 'ant-design-vue/lib/notification'

export default {
    components: {
        TwoStepCaptcha
    },
    data () {
        return {
            customActiveKey: 'tab1',
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 0,
            isLoginError: false,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                smsSendBtn: false
            }
        }
    },
    created () {
        this.requiredTwoStepCaptcha = false
    },
    mounted () {
        // 清空水印画布
        const canvas = document.getElementById('watermask')
        const cxt = canvas.getContext('2d')
        cxt.clearRect(0, 0, canvas.width, canvas.height)
    },
    methods: {
        ...mapActions(['Login', 'Logout']),
        // handler
        handleUsernameOrEmail (rule, value, callback) {
            const { state } = this
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
                state.loginType = 0
            } else {
                state.loginType = 1
            }
            callback()
        },
        handleTabClick (key) {
            this.customActiveKey = key
            // this.form.resetFields()
        },
        handleSubmit (e) {
            e.preventDefault()
            const {
                form: { validateFields },
                state,
                customActiveKey,
                Login
            } = this
            state.loginBtn = true
            const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password', 'tenant'] : ['mobile', 'captcha']
            validateFields(validateFieldsKey, { force: true }, (err, values) => {
                if (!err) {
                    const loginParams = { ...values }
                    delete loginParams.username
                    loginParams[!state.loginType ? 'email' : 'username'] = values.username
                    // loginParams.password = values.password
                    getLoginToken()
                        .then((resToken) => {
                            loginParams.password = '04' + sm2.doEncrypt(values.password, resToken.data)
                            loginParams.pubKey = resToken.data
                            Login(loginParams)
                                .then((res) => {
                                    if (res.access_token) {
                                        this.loginSuccess(res)
                                    } else if (!res.success) {
                                        let msg = ''
                                        if (res.msg === 'auth.bad.credential') {
                                            msg = '账号或密码错误'
                                        } else if (res.msg === 'auth.user.disabled') {
                                            msg = '用户已被禁用'
                                        }
                                        notification.error({
                                            message: msg,
                                            type: 'error',
                                            duration: 5 * 1000
                                        })
                                    }
                                }).catch(err => this.requestFailed(err))
                                .finally(() => {
                                    state.loginBtn = false
                                })
                        }).catch(err => this.requestFailed(err))
                        .finally(() => {
                            state.loginBtn = false
                        })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                    }, 600)
                }
            })
        },
        getCaptcha (e) {
            e.preventDefault()
            const { form: { validateFields }, state } = this

            validateFields(['mobile'], { force: true }, (err, values) => {
                if (!err) {
                    state.smsSendBtn = true

                    const interval = window.setInterval(() => {
                        if (state.time-- <= 0) {
                            state.time = 60
                            state.smsSendBtn = false
                            window.clearInterval(interval)
                        }
                    }, 1000)

                    const hide = this.$message.loading('验证码发送中..', 0)
                    getSmsCaptcha({ mobile: values.mobile }).then(res => {
                        setTimeout(hide, 2500)
                        this.$notification['success']({
                            message: '提示',
                            description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                            duration: 8
                        })
                    }).catch(err => {
                        setTimeout(hide, 1)
                        clearInterval(interval)
                        state.time = 60
                        state.smsSendBtn = false
                        this.requestFailed(err)
                    })
                }
            })
        },
        stepCaptchaSuccess () {
            this.loginSuccess()
        },
        stepCaptchaCancel () {
            this.Logout().then(() => {
                this.loginBtn = false
                this.stepCaptchaVisible = false
            })
        },
        loginSuccess (res) {
            // check res.homePage define, set $router.push name res.homePage
            // Why not enter onComplete
            /*
            this.$router.push({ name: 'analysis' }, () => {
              console.log('onComplete')
              this.$notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`
              })
            })
            */
            this.$router.push({ path: '/' })
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                })
            }, 1000)
            this.isLoginError = false
        },
        requestFailed (err) {
            this.isLoginError = true
            this.$notification['error']({
                message: '错误',
                description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                duration: 4
            })
        }
    }
}
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .forge-password {
        font-size: 14px;
    }

    button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }

        .register {
            float: right;
        }
    }
}
</style>
