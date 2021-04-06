<template>
  <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
    <span v-if="bank" slot="title" class="numeric-input-title">
      {{ bank !== '-' ? formatNumber(bank) : '-' }}
    </span>
    <template v-else slot="title">
      {{ placeholder }}
    </template>
    <a-input
      :value="bank"
      :placeholder="placeholder"
      :max-length="25"
      style="width: 100%"
      @change="onChange"
      @blur="onBlur"
    />
  </a-tooltip>
</template>
<script>
    function formatNumber (value) {
        value.trim()
        return value.replace(/(....)(?=.)/g, '$1 ')
        // value += '';
        // const list = value.split('.');
        // const prefix = list[0].charAt(0) === '-' ? '-' : '';
        // let num = prefix ? list[0].slice(1) : list[0];
        // let result = '';
        // while (num.length > 3) {
        //     result = `,${num.slice(-3)}${result}`;
        //     num = num.slice(0, num.length - 3);
        // }
        // if (num) {
        //     result = num + result;
        // }
        // return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
    }

    export default {
        props: {
            maxLength: {
                type: Number,
                default: 30
            },
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: ''
            }
        },
        name: 'BankInput',
        data () {
            return {
                bank: ''
            }
        },
        watch: {
            value: {
                immediate: true,
                handler (value) {
                    if (!value) {
                        this.bank = ''
                    } else {
                        this.bank = value
                    }
                }
            }
        },
        methods: {
            formatNumber,
            onChange (e) {
                this.bank = e.target.value.trim()
                this.$emit('change', this.bank)
                this.$emit('input', this.bank)
            },
            // '.' at the end or only '-' in the input box.
            onBlur () {
                const { value, onChange } = this
                const valueTemp = value
                if (value.charAt(value.length - 1) === '.' || value === '-') {
                    onChange({ value: value.slice(0, -1) })
                }
            }
        }
    }
</script>
<style>
    /* to prevent the arrow overflow the popup container,
    or the height is not enough when content is empty */

    .numeric-input {
        max-width: 450px;
    }
    .numeric-input .ant-tooltip-inner,
    .numeric-input .ant-tooltip-arrow::before {
        background-color: #0a95e4!important;
    }
    .numeric-input .ant-tooltip-inner {
        min-width: 32px;
        min-height: 37px;
    }
    .numeric-input .numeric-input-title {
        font-size: 18px;
    }
</style>
