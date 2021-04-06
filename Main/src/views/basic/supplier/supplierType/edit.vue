<style scoped>
</style>
<template>
  <a-modal
    :title="this.$t('basic.supplierType.title')"
    :confirmLoading="submitLoading"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="onSubmit"
    @cancel="handleCancel">
    <a-form-model
      ref="supplierTypeForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="supplierCode" :label="$t('basic.supplierType.filed.supplierCode')" prop="supplierCode">
              <a-input v-model="formData.supplierCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="supplierName" :label="$t('basic.supplierType.filed.supplierName')" prop="supplierName">
              <a-input v-model="formData.supplierName"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="rmk" :label="$t('common.field.rmk')" prop="rmk">
              <a-input type="textarea" v-model="formData.rmk"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="validSign" :label="$t('common.field.validSign')" prop="validSign">
                <dict-select type="radio" dictGroup="yesOrNo" v-model="formData.validSign" />
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal
    title="供应商类别">
</template>
<script>
    import { addSupplierType, getSupplierType, updateSupplierType } from '@/api/basic/supplier/supplierType'

    export default {
        name: 'EditModal',
        data () {
            return {
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    validSign: '1'
                },
                rules: {
                    supplierCode: [
                            { required: true, message: this.$t('basic.supplierType.rule.supplierCode'), trigger: 'blur' },
                            { max: 60, message: this.$t('common.rule.max.sixty'), trigger: 'blur' }
                        ],
                    supplierName: [
                            { required: true, message: this.$t('basic.supplierType.rule.supplierName'), trigger: 'blur' },
                            { max: 100, message: this.$t('common.rule.max.hundred'), trigger: 'blur' }
                        ],
                    rmk: [{ max: 60, message: this.$t('common.rule.max.sixty'), trigger: 'blur' }],
                    validSign: [{ required: true, message: this.$t('basic.supplierType.rule.validSign'), trigger: 'blur' }]
                }
            }
        },
        methods: {
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getSupplierType(id).then((response) => {
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
                this.formData = {
                    validSign: '1'
                }
                this.$refs.supplierTypeForm && this.$refs.supplierTypeForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.supplierTypeForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateSupplierType(this.formData)
                    } else {
                        request = addSupplierType(this.formData)
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
