<style scoped>
</style>
<template>
  <a-modal :title="$t('common.edit.detail')" :confirmLoading="submitLoading" :visible="visible" @ok="onSubmit" @cancel="handleCancel">
    <a-form-model
      ref="regionForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="name" label="名称" prop="name">
              <a-input v-model="formData.name"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="bankProv" label="省代码">
              <a-input v-model="formData.bankProv"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="bankCity" label="市代码">
              <a-input v-model="formData.bankCity"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
import { addRegion, getRegion, updateRegion } from '@/api/basic/region'

export default {
    name: 'EditModal',
    data () {
        return {
            visible: false,
            submitLoading: false,
            loading: false,
            formData: {},
            rules: {
                name: [{ required: true, message: '请填写地域名称', trigger: 'blur' }]
            }
        }
    },
    methods: {
        showAddModal (data) {
            this.visible = true
            if (data) {
                this.formData.parentId = data.id
                this.formData.bankProv = data.bankProv
            }
        },
        // 显示弹框
        showEditModal (id) {
            this.visible = true
            if (id) {
                this.loading = true
                getRegion(id).then((response) => {
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
            this.$refs.regionForm && this.$refs.regionForm.resetFields()
        },
        onSubmit () {
            const _this = this
            this.$refs.regionForm.validate(valid => {
                if (!valid) {
                    return false
                }
                let request
                if (this.formData.id) {
                    request = updateRegion(this.formData)
                } else {
                    request = addRegion(this.formData)
                }
                this.submitLoading = true
                request.then((response) => {
                    if (response.success) {
                        _this.$message.success(response.msg)
                        _this.visible = false
                        _this.$emit('refreshData', this.formData.id)
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
