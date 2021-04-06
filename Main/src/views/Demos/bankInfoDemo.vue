<template>
  <a-form-model
    ref="formModel"
    :model="formData"
    :label-col="{ span: 6}"
    :wrapper-col="{ span: 14 }"
  >
    <a-row>
      <a-col span="8">
        <a-form-model-item label="收款帐号" prop="payeeAcc">
          <InputBankSearch v-model="payeeAcc" @change="selectCallBack" :value="formData.payeeAcc"></InputBankSearch>
        </a-form-model-item>
      </a-col>
      {{ formData.name }}
    </a-row>
    <a-row>
      <a-col span="8">
        <a-form-model-item label="收款人" prop="payeeAcc">
          <ExternalCorpSearch v-model="payeeAccName" @change="selectCallBack1" :value="formData.payeeAccName"></ExternalCorpSearch>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
    import InputBankSearch from '@/components/SelectCallbackModal/BankInfo/index'
    import ExternalCorpSearch from '@/components/SelectCallbackModal/ExternalCorpInfo/index'
    import { toChinese } from '@/utils/digit'

    export default {
        components: {
            InputBankSearch, ExternalCorpSearch
        },
        data () {
            return {
                payeeAcc: {},
                payeeAccName: {},
                formData: {
                    payeeAcc: '',
                    payeeAccName: '',
                    name: toChinese(10000)
                }
            }
        },
        methods: {
            // 选择银行帐号的回调
            selectCallBack (data) {
                if (data) {
                    this.formData.payeeAcc = data.sysBankCode
                }
            },
            // 选择客商资料
            selectCallBack1 (data) {
                if (data) {
                    this.formData.payeeAccName = data.externalName
                }
            }
        }
    }
</script>
