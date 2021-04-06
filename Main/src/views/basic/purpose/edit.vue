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
      ref="purposeForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="sysBusType" :label="$t('basic.purpose.field.sysBusType')" prop="sysBusType">
              <dict-multi-select
                type="checkbox"
                :has-check-all="true"
                v-model="formData.sysBusType"
                dictGroup="btPurpose.sysBusType"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="purpose" :label="$t('basic.purpose.field.purpose')" prop="purpose">
              <a-input v-model="formData.purpose"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="corpId" :label="$t('basic.purpose.field.corpId')" prop="corpId">
              <CorpTreeSelect v-model="formData.corpId"></CorpTreeSelect>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addPurpose, getPurpose, updatePurpose } from '@/api/basic/purpose'
    import CorpTreeSelect from '@/components/SelectTree/CorpTreeSelect'

    export default {
        name: 'EditModal',
        components: { CorpTreeSelect },
        data () {
            return {
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    sysBusType: '',
                    purpose: '',
                    corpId: []
                },
                rules: {
                        corpId: [{ required: true, message: this.$t('common.fill.select') + this.$t('basic.purpose.field.corpId'), trigger: 'blur' }],
                        sysBusType: [{ required: true, message: this.$t('common.fill.select') + this.$t('basic.purpose.field.sysBusType'), trigger: 'blur' }],
                        purpose: [{ required: true, message: this.$t('common.fill.in') + this.$t('basic.purpose.field.purpose'), trigger: 'blur' }]
                }
            }
        },
        methods: {
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getPurpose(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.formData.corpId = response.data.corpIds
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {
                    sysBusType: '',
                    purpose: '',
                    corpId: []
                }
                this.$refs.purposeForm && this.$refs.purposeForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.purposeForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updatePurpose(this.formData)
                    } else {
                        request = addPurpose(this.formData)
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
