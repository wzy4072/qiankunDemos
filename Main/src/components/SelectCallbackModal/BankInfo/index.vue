<template>
  <div>
    <a-input-search :placeholder="placeholder" @search="onSearch" :value="value.sysBankCode" :disabled="disabled"/>
    <!--收款帐号选择页面-->
    <BankInfo ref="selectCallback" @selectCallBack="selectCallBack"></BankInfo>
  </div>

</template>

<script>
    import BankInfo from '@/components/SelectCallbackModal/BankInfo/BankInfo'
    export default {
        name: 'InputBankSearch',
        components: {
            BankInfo
        },
        props: {
            value: {
                type: Object,
                default: () => { return { sysBankCode: '' } }
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onSearch () {
                // 打开弹框选择页面
                this.$refs.selectCallback.showModal()
            },
            // 选择银行帐号的回调
            selectCallBack (data) {
                this.$emit('input', data)
                this.$emit('change', data)
            }
        }
    }
</script>

<style scoped>

</style>
