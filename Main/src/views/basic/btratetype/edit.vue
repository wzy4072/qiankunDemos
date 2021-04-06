<style scoped>
</style>
<template>
  <a-modal title="信息" :confirmLoading="submitLoading" :visible="visible" @ok="onSubmit" @cancel="handleCancel">
    <a-form-model
      ref="btRateTypeForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="typeName" label="名称" prop="typeName">
              <a-input v-model="formData.typeName"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="rmk" label="描述" prop="rmk">
              <a-input v-model="formData.rmk"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="validSign" label="有效标志" prop="validSign">
              <dict-multi-select
                v-model="formData.validSign"
                :options="dictOptions"
                type="checkbox">
              </dict-multi-select>

            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="decimalPlaces" label="汇率保留小数位数" prop="decimalPlaces">
              <a-input v-model="formData.decimalPlaces"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addType, getType, updateType } from '@/api/btratetype'

    export default {
        name: 'EditModal',
        data () {
            return {
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {},
                rules: {
                    typeName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                    rmk: [{ required: true, message: '请填写描述', trigger: 'blur' }, { max: 200, message: '最大不能超过100个字' }],
                    validSign: [{ required: true, message: '有效标志必选', trigger: 'blur' }],
                    decimalPlaces: [{ required: false, message: '为空则默认为4位', trigger: 'blur' }]
                },
                dictOptions: [{
          name: '有效',
          code: '1'
        }, {
          name: '无效',
          code: '2'
        }]
            }
        },
        methods: {
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getType(id).then((response) => {
                        if (response.code === '00000001') {
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
                this.$refs.btRateTypeForm && this.$refs.btRateTypeForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.btRateTypeForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateType(this.formData)
                    } else {
                        request = addType(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(response.msg)
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            if (response.code === '00020000') {
                                _this.$message.error(response.msg + ',' + response.data)
                            } else {
                                _this.$message.error(response.msg)
                            }
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
