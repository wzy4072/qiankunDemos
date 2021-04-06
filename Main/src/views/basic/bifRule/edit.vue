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
    @cancel="handleCancel"
    width="50%">
    <a-form-model
      ref="bisBifRuleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="bifCode" :label="$t('basic.bifRule.bifName')" prop="bifCode">
              <a-select
                show-search
                :placeholder="$t('common.fill.select')"
                option-filter-prop="children"
                style="width: 525px"
                :option="bifInitData"
                v-model="bifInit"
                :filter-option="filterOption"
                @change="handleChange"
              >
                <a-select-option v-for="item in bifInitData" :key="item.id" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="bifName" :label="$t('basic.bifRule.bifCode')" prop="bifName">
              <a-input v-model="formData.bifCode" :disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="payerName" :label="$t('basic.bifRule.payerName')" prop="payerName">
              <a-input v-model="formData.payerName"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="payerAcc" :label="$t('basic.bifRule.payerAcc')" prop="payerAcc">
              <a-input v-model="formData.payerAcc"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="payerBank" :label="$t('basic.bifRule.payerBank')" prop="payerBank">
              <a-input v-model="formData.payerBank"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="payeeName" :label="$t('basic.bifRule.payeeName')" prop="payeeName">
              <a-input v-model="formData.payeeName"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="payeeAcc" :label="$t('basic.bifRule.payeeAcc')" prop="payeeAcc">
              <a-input v-model="formData.payeeAcc"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="payeeBank" :label="$t('basic.bifRule.payeeBank')" prop="payeeBank">
              <a-input v-model="formData.payeeBank"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="purpose" :label="$t('basic.bifRule.purpose')" prop="purpose">
              <a-input v-model="formData.purpose"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="addWord" :label="$t('basic.bifRule.addWord')" prop="addWord">
              <a-input v-model="formData.addWord"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="isPurpose" :label="$t('basic.bifRule.isPurpose')" prop="isPurpose">
              <dict-select
                type="radio"
                dictGroup="yesOrNo"
                v-model="formData.isPurpose"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="isBankOnline"
              :label="$t('basic.bifRule.isBankOnline')"
              prop="isBankOnline">
              <dict-select
                type="radio"
                dictGroup="yesOrNo"
                v-model="formData.isBankOnline"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="sendNum" :label="$t('basic.bifRule.sendNum')" prop="sendNum">
              <a-input v-model="formData.sendNum"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addBisBifRule, getBisBifRule, updateBisBifRule, loadBifInitData } from '@/api/bifRule'
    import DictModal from '@/views/basic/dict/dictModal'

    export default {
        name: 'EditModal',
        components: { DictModal },
        data () {
            return {
                visible: false,
                submitLoading: false,
                bifInitData: [],
                bifInit: '',
                loading: false,
                formData: {
                    payerName: '150',
                    payerAcc: '30',
                    payerBank: '150',
                    payeeName: '150',
                    payeeAcc: '30',
                    payeeBank: '150',
                    purpose: '30',
                    addWord: '150',
                    isPurpose: '1',
                    isBankOnline: '1',
                    sendNum: '300'
                },
                rules: {
                    payerName: [{
                        required: true,
                        message: this.$t('basic.bifRule.payerNameRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    payerAcc: [{
                        required: true,
                        message: this.$t('basic.bifRule.payerAccRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    payerBank: [{
                        required: true,
                        message: this.$t('basic.bifRule.payerBankRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    payeeName: [{
                        required: true,
                        message: this.$t('basic.bifRule.payeeNameRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    payeeAcc: [{
                        required: true,
                        message: this.$t('basic.bifRule.payeeAccRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    payeeBank: [{
                        required: true,
                        message: this.$t('basic.bifRule.payeeBankRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    purpose: [{
                        required: true,
                        message: this.$t('basic.bifRule.purposeRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    addWord: [{
                        required: true,
                        message: this.$t('basic.bifRule.addWordRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }],
                    sendNum: [{
                        required: true,
                        message: this.$t('basic.bifRule.sendNumRules'),
                        trigger: 'blur'
                    }, { validator: this.checkedValue }]
                }
            }
        },
        methods: {
            getBifInitData () {
                loadBifInitData().then(response => {
                    if (response.success) {
                        this.bifInitData = response.data
                    } else {
                        this.$message.error(response.msg)
                    }
                })
            },
            handleChange (value) {
                const _this = this
                _this.bifInitData.map(item => {
                    if (item.id == value) {
                        _this.formData.bifName = item.name
                        _this.formData.bifCode = item.bifCode
                    }
                })
            },
            filterOption (input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                )
            },
            checkedValue (rule, value, callback) {
                var reg = /^[0-9]+.?[0-9]*$/
                if (!reg.test(value)) {
                    callback(new Error(this.$t('basic.bifRule.numberRules')))
                }
                var a = /[^A-Za-z0-9]/g
                if (a.test(value)) {
                    callback(new Error(this.$t('basic.bifRule.decimalsRules')))
                }
                if (value.length > 10) {
                    callback(new Error(this.$t('basic.bifRule.lengthRules')))
                }
                callback()
            },
            // 显示弹框
            async showModal (id) {
                this.visible = true
                /**
                 * 银行信息维护
                 */
                await this.getBifInitData()
                if (id) {
                    this.loading = true
                    await getBisBifRule(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.bifInitData.map(item => {
                                if (response.data.bifCode == item.bifCode) {
                                    this.bifInit = item.id
                                }
                            })
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                } else {
                    this.formData = {
                        payerName: '150',
                        payerAcc: '30',
                        payerBank: '150',
                        payeeName: '150',
                        payeeAcc: '30',
                        payeeBank: '150',
                        purpose: '30',
                        addWord: '150',
                        isPurpose: '1',
                        isBankOnline: '1',
                        sendNum: '300'
                    }
                    this.bifInit = ''
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.bisBifRuleForm && this.$refs.bisBifRuleForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.bisBifRuleForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateBisBifRule(this.formData)
                    } else {
                        request = addBisBifRule(this.formData)
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
