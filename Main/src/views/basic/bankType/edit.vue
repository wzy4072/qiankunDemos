<style scoped>
</style>
<template>
  <a-modal
    :title="$t('common.tips.edit')"
    :confirmLoading="submitLoading"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="onSubmit"
    @cancel="handleCancel">
    <a-form-model
      ref="btBankTypeForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="bankType" :label="$t('basic.bankType.bankType')" prop="bankType">
              <a-input v-model="formData.bankType" :placeholder="$t('basic.bankType.bankType')"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="typeName" :label="$t('basic.bankType.typeName')" prop="typeName">
              <a-input v-model="formData.typeName" :placeholder="$t('basic.bankType.typeName')"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="bankPrefix" :label="$t('basic.bankType.bankPrefix')" prop="bankPrefix">
              <a-input v-model="formData.bankPrefix" :placeholder="$t('basic.bankType.bankPrefix')"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="isDomesticBank"
              :label="$t('basic.bankType.isDomesticBank')"
              prop="isDomesticBank">
              <dict-select
                type="radio"
                dictGroup="yesOrNo"
                v-model="formData.isDomesticBank"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="netbankCfcaDate"
              :label="$t('basic.bankType.netbankCfcaDate')"
              prop="netbankCfcaDate">
              <a-date-picker
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                v-model="formData.netbankCfcaDate"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="bankNamePrefix"
              :label="$t('basic.bankType.bankNamePrefix')"
              prop="bankNamePrefix">
              <a-input
                v-model="formData.bankNamePrefix"
                :placeholder="$t('basic.bankType.bankNamePrefix')"/>
              {{ $t('basic.bankType.explain') }}
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="icon" :label="$t('basic.bankType.icon')" prop="icon">
              <a-upload
                name="file"
                :multiple="false"
                :headers="headers"
                :showUploadList="false"
                :withCredentials="true"
                :customRequest="downloadFilesCustomRequest"
                :before-upload="beforeUpload"
              >
                <a-button>
                  <a-icon type="upload"/>
                  上传图片
                </a-button>
                <span style="color: red">{{ $t('basic.bankType.img') }}</span>
              </a-upload>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="gradient" :label="$t('basic.bankType.gradient')" prop="gradient">
              <a-input v-model="formData.gradient"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="rmk" :label="$t('basic.bankType.rmk')" prop="rmk">
              <a-input v-model="formData.rmk" style="height: 60px"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="validSign" :label="$t('basic.bankType.validSign')" prop="validSign">
              <dict-select
                type="radio"
                dictGroup="yesOrNo"
                v-model="formData.validSign"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addBtBankType, getBtBankType, updateBtBankType, uploading } from '@/api/bankType'
    import { ACCESS_TOKEN } from '@/store/mutation-types'
    import storage from 'store'
    import DictModal from '@/views/basic/dict/dictModal'

    export default {
        name: 'EditModal',
        components: { DictModal },
        data () {
            return {
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    bankType: '',
                    typeName: '',
                    bankPrefix: '',
                    isDomesticBank: '1',
                    netbankCfcaDate: '',
                    bankNamePrefix: '',
                    gradient: '',
                    rmk: '',
                    validSign: '1'
                },
                headers: {
                    authorization: 'Bearer ' + storage.get(ACCESS_TOKEN)
                },
                rules: {
                    bankType: [{ required: true, message: this.$t('basic.bankType.bankTypeRules'), trigger: 'blur' }],
                    typeName: [{ required: true, message: this.$t('basic.bankType.typeNameRules'), trigger: 'blur' }],
                    bankPrefix: [{
                        required: true,
                        message: this.$t('basic.bankType.bankPrefixRules'),
                        trigger: 'blur'
                    }, {
                        max: 3,
                        message: this.$t('basic.bankType.bankPrefixLengthRules')
                    }],
                    isDomesticBank: [{
                        required: true,
                        message: this.$t('basic.bankType.isDomesticBankRules'),
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            // 重写a-upload的文件上传处理方式
            downloadFilesCustomRequest (data) {
                this.saveFile(data)
            },
            // 上传并保存文件
            saveFile (data) {
                const formData = new FormData()
                formData.append('files', data.file)
                formData.append('serviceName', 'basic')
                uploading(formData).then((response) => {
                    if (response.success) {
                        this.formData.icon = response.data[0]
                        this.$message.success(this.$t(response.msg))
                    } else {
                        this.$message.success(this.$t(response.msg))
                    }
                })
            },
            beforeUpload (file) {
                const isJpgOrPng = file.type === 'image/png'
                if (!isJpgOrPng) {
                    this.$message.error(this.$t('basic.bankType.imgRules'))
                }
                return isJpgOrPng
            },
            dateFormatter (date) {
                // Object对象转为日期格式
                date = new Date(date)
                var strDate = date.getFullYear() + '-'
                var month = date.getMonth() + 1
                var day = date.getDate()
                var hours = date.getHours()
                var minutes = date.getMinutes()
                var seconds = date.getSeconds()
                // 格式化日期,月日时分秒保持两位
                strDate =
                    strDate +
                    (month > 8 ? month : '0' + month) +
                    '-' +
                    (day > 9 ? day : '0' + day)
                return strDate
            },
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getBtBankType(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.$set(this.formData, 'validSign', response.data.validSign)
                            this.$set(this.formData, 'isDomesticBank', response.data.isDomesticBank)
                            this.formData.netbankCfcaDate = this.dateFormatter(this.formData.netbankCfcaDate)
                            if (this.formData.netbankCfcaDate == '1970-01-01') {
                                this.formData.netbankCfcaDate = ''
                            }
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                } else {
                    this.formData = {
                        bankType: '',
                        typeName: '',
                        bankPrefix: '',
                        isDomesticBank: '1',
                        netbankCfcaDate: '',
                        bankNamePrefix: '',
                        gradient: '',
                        rmk: '',
                        validSign: '1'
                    }
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.btBankTypeForm && this.$refs.btBankTypeForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.btBankTypeForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateBtBankType(this.formData)
                    } else {
                        request = addBtBankType(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(this.$t(response.msg))
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            if (response.success === '00020000') {
                                _this.$message.error(this.$t(response.msg + ',' + response.data))
                            } else {
                                _this.$message.error(this.$t(response.msg))
                            }
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
