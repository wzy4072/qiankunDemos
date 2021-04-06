<template>
  <div>
    <a-input-search :placeholder="placeholder" @search="onSearch" :value="value.workNo" :disabled="disabled"/>
    <PersonnerDetailInfo ref="selectCallback" @selectCallBack="selectCallBack"></PersonnerDetailInfo>
  </div>

</template>

<script>
    import PersonnerDetailInfo from '@/components/SelectCallbackModal/PersonnerDetailInfo/PersonnerDetailInfo'
    export default {
        name: 'PersonnerDetailSearch',
        components: {
            PersonnerDetailInfo
        },
        props: {
            value: {
                type: Object,
                default: () => { return { workNo: '' } }
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            corpId: {
                type: String,
                default: ''
            }
        },
        methods: {
            onSearch () {
                // 打开弹框选择页面
                this.$refs.selectCallback.showModal(this.corpId)
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
