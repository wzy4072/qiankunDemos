<template>
  <a-modal v-model="visible" title="添加字典" @ok="onHandleOk">
    <template slot="footer">
      <a-button key="back" @click="onHandleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="onHandleOk">
        提交
      </a-button>
    </template>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="code" label="字典组代码" prop="code">
        <a-input v-model="form.code" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="字典组名称" prop="name">
        <a-input v-model="form.name" />
      </a-form-model-item>

    </a-form-model>
  </a-modal>
</template>

<script>
import { addDictGroup, updateDictGroup } from '@/api/basic/dict'

export default {
        name: 'DictModal',
        data () {
            return {
                labelCol: { span: 5 },
                wrapperCol: { span: 16 },
                visible: false,
                loading: false,
                // 编辑字典参数,是否启用不要
                isEditDict: false,
                form: {
                    // 字典名称
                    name: '',
                    // 字典类型
                    code: ''
                },
                rules: {
                    code: [{ required: true, message: '请输入字典组代码', trigger: 'blur' }],
                    name: [{ required: true, message: '请输入字典组名称', trigger: 'blur' }]
                }
            }
        },
        methods: {
            onOpenDictModal (data) {
                const _this = this
                _this.visible = data.visible
                if (data.dictGroupData) {
                    _this.form = { ...data.dictGroupData }
                }
            },
            onHandleOk () {
                const _this = this
                this.loading = true
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        let request
                        if (this.form.id) {
                            request = updateDictGroup(this.form)
                        } else {
                            request = addDictGroup(this.form)
                        }
                        request.then((response) => {
                            if (response.success) {
                                _this.$message.success(_this.$t(response.msg))
                                _this.visible = false
                                _this.$emit('refresh')
                                _this.onHandleCancel()
                            } else {
                                _this.$message.error(_this.$t(response.msg, response.msgParams))
                            }
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        this.loading = false
                        return false
                    }
                })
            },
            onHandleCancel () {
                this.$refs.ruleForm.resetFields()
                this.visible = false
            },
            destroyed () {
                console.log('destroyed')
            }
        }
    }
</script>

<style scoped>

</style>
