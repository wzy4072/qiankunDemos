<template>
  <a-input-number
    class="rate-input"
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
    @pressEnter="pressEnter"
    style="width: 100%;"
  />
</template>

<script>
    export default {
        name: 'RateInput',
        props: {
            /* eslint-disable */
            defaultValue: Number,
            // 比例符号名称
            type: {
                type: String,
                default: ''
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
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
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
                console.log(value)
                this.$emit('change', value)
                this.$emit('input', value)
            },
            pressEnter (e) {
                this.$emit('pressEnter', e)
            },
            formatter (value) {
                if (this.type === 'percent') {
                    return `${value}%`
                } else if (this.type === 'thousands') {
                    return `${value}‰`
                }
                return value
            },
            parser (value) {
                if (this.type === 'percent') {
                    return value.replace('%', '')
                } else if (this.type === 'thousands') {
                    return value.replace('‰', '')
                }
                return value
            }
        }
    }
</script>

<style scoped>
    .rate-input/deep/.ant-input-number-input{
        /*padding-right: 26px;*/
    }
    .rate-input/deep/ .ant-input-number-handler-wrap {
        display: none;
    }
</style>
