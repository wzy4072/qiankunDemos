<style scoped>
</style>
<template>
  <a-modal :title="$t('common.edit.detail')" :confirmLoading="submitLoading" :visible="visible" @ok="onSubmit" @cancel="handleCancel">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item :label="$t('basic.multiLang.field.locale')" prop="locale">
              <dict-select v-model="formData.locale" dictGroup="multiLang"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item :label="$t('basic.multiLang.field.key')" prop="langKey">
              <a-input v-model="formData.langKey"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item :label="$t('basic.multiLang.field.text')" prop="langText">
              <a-input v-model="formData.langText"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addMultiLang, getMultiLang, updateMultiLang } from '@/api/multiLang'

    export default {
        name: 'EditModal',
        data () {
            return {
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {},
                rules: {
                    langKey: [{ required: true, message: '请填写国际化键', trigger: 'blur' }],
                    langText: [{ required: true, message: '请填写国际化值', trigger: 'blur' }]
                }
            }
        },
        methods: {
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getMultiLang(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                        } else {
                            this.$message.error(response.msg)
                        }
                        this.loading = false
                    })
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.ruleForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateMultiLang(this.formData)
                    } else {
                        request = addMultiLang(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(_this.$t(response.msg, response.msgParams))
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            _this.$message.error(_this.$t(response.msg, response.msgParams))
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
