<template>
  <a-input-number
    class="money-input"
    :value="value"
    :default-value="defaultValue"
    :autoFocus="autoFocus"
    :max="max"
    :min="min"
    :size="size"
    :disabled="disabled"
    :step="step"
    :precision="precision"
    :formatter="formatter"
    :parser="parser"
    @change="change"
    @blur="blur"
    @pressEnter="pressEnter"
    style="width: 100%;"
  />
</template>

<script>
    export default {
        name: 'MoneyInput',
        props: {
            /* eslint-disable */
            defaultValue: {
                type: Number
            },
            // 币别符号
            symbol: {
                type: String,
                default: '¥'
            },
            // 有效数字
            precision: {
                type: Number,
                default: 2
            },
            autoFocus: {
                type: Boolean,
                default: false
            },
            /* eslint-disable */
            max: {
                type: Number
            },
            /* eslint-disable */
            min: {
                type: Number
            },
            size: {
                type: String,
                default: 'default'
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            step: {
                type: [String, Number],
                default: ''
            },
            /* eslint-disable */
            value: {
                type: [String, Number]
            }
        },
        methods: {
            change (value) {
                this.$emit('change', value)
                this.$emit('input', value)
            },
            blur (value) {
                this.$emit('blur', value)
            },
            pressEnter (e) {
                this.$emit('pressEnter', e)
            },
            formatter (value) {
                value = value && value.replace(this.symbol, '').trim()
                return `${this.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
            parser (value) {
                value = value && value.replace(this.symbol, '').trim()
                return value.replace(/\$\s?|(,*)/g, '')
            }
        }
    }
</script>

<style scoped>
    .money-input/deep/.ant-input-number-input{
        text-align: right;
    }
    .money-input/deep/ .ant-input-number-handler-wrap {
        display: none;
    }
</style>
