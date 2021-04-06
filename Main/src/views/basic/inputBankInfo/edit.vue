<style scoped>
</style>
<template>
  <a-modal
    title="信息"
    :confirmLoading="submitLoading"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="onSubmit"
    @cancel="handleCancel">
    <a-form-model
      ref="btInputBankInfoForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="sysBankCode" :label="$t('pay.nisPersonnelDetail.field.bankCode')" prop="sysBankCode">
              <a-input v-model="formData.sysBankCode" :disabled="formData.id"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="bankName" :label="$t('pay.nisPersonnelDetail.field.bankName')" prop="bankName">
              <a-input v-model="formData.bankName"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addInfo, getInfo, updateInfo } from '@/api/inputBankInfo'

    export default {
        name: 'EditModal',
        data () {
            return {
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    sysBankCode: '',
                    bankName: ''
                },
                rules: {
                    sysBankCode: [{ required: true, message: '请填写开户行行号', trigger: 'blur' }, { max: 30, message: '账户性质编码不能超过30个字符！' }],
                    bankName: [{ required: true, message: '请填写开户行名称', trigger: 'blur' }, { max: 30, message: '账户性质编码不能超过30个字符！' }]
                }
            }
        },
        methods: {
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getInfo(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.btInputBankInfoForm && this.$refs.btInputBankInfoForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.btInputBankInfoForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateInfo(this.formData)
                    } else {
                        request = addInfo(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(_this.$t(response.msg))
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            _this.$message.error(_this.$t(response.msg))
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
