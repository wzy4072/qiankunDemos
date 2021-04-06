<style scoped>
</style>
<template>
  <a-modal
    title="信息"
    :confirmLoading="submitLoading"
    :visible="visible"
    @ok="onSubmit"
    @cancel="handleCancel">
    <a-form-model
      ref="bisBifInitForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="bifCode" :label="$t('basic.bisbifinit.field.bifCode')" prop="bifCode">
              <a-input v-model="formData.bifCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="name" :label="$t('basic.bisbifinit.field.name')" prop="name">
              <a-input v-model="formData.name"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="bifCode" :label="$t('basic.bisbifinit.field.typeId')" prop="typeId">
              <a-select v-model="formData.typeId" placeholder="请选择">
                <a-select-option v-for="item in typeIds" :key="item.id" :value="item.id">
                  {{ item.typeName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="isDomesticBank"
              :label="$t('basic.bisbifinit.field.isDomesticBank')"
              prop="isDomesticBank">
              <dict-select v-model="formData.isDomesticBank" dictGroup="yesOrNo" type="radio"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="validSign" :label="$t('basic.common.field.validSign')" prop="validSign">
              <dict-select v-model="formData.validSign" dictGroup="yesOrNo" type="radio"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addBisbif, getBisbif, updateBisbif, listBankType } from '@/api/basic/bisbif'

    export default {
        name: 'EditModal',
        data () {
            return {
                typeIds: [],
                visible: false,
                submitLoading: false,
                loading: false,
                formData: { isDomesticBank: '1', validSign: '1' },
                rules: {
                    bifCode: [{ required: true, message: this.$t('basic.bisbif.bifCodeRules'), trigger: 'blur' }],
                    name: [{ required: true, message: this.$t('basic.bisbif.nameRules'), trigger: 'blur' }],
                    typeId: [{ required: true, message: this.$t('basic.bisbif.typeIdRules'), trigger: 'blur' }],
                    isDomesticBank: [{
                        required: true,
                        message: this.$t('basic.bisbif.isDomesticBankRules'),
                        trigger: 'blur'
                    }],
                    validSign: [{ required: true, message: this.$t('basic.bisbif.validSignRules'), trigger: 'blur' }]
                }
            }
        },
        // 组件创建完成
        created () {
            this.listBankType()
        },
        methods: {
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getBisbif(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            },
            listBankType () {
                const _this = this
                listBankType().then(res => {
                    if (res.success) {
                        _this.typeIds = res.data
                    } else {
                        _this.typeIds = []
                    }
                })
            },
            handleCancel () {
                this.visible = false
                this.formData = { isDomesticBank: '1', validSign: '1' }
                this.$refs.bisBifInitForm && this.$refs.bisBifInitForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.bisBifInitForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateBisbif(this.formData)
                    } else {
                        request = addBisbif(this.formData)
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
