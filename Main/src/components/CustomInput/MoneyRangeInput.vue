<script>
    import { InputNumberProps } from 'ant-design-vue/es/input-number'
    export default {
        props: Object.assign({}, InputNumberProps, {
            value: {
                type: Array,
                required: true
            },
            symbol: {
                type: String,
                default: '¥'
            },
            // 有效数字
            precision: {
                type: Number,
                default: 2
            },
            width: {
                type: [Number, String],
                default: 120
            }
        }),
        data () {
            return {}
        },
        methods: {
            blur0 (e) {
                let money = e.target.value && e.target.value.replace(this.symbol, '').trim()
                money = money.replace(/,/g, '')
                if (money === '') return
                const v = Number(money)
                if (v === this.value[0]) return
                const emitValue = v > this.value[1] ? [this.value[1], v] : [v, this.value[1]]
                this.$emit('input', emitValue)
                this.$emit('change', emitValue)
            },
            blur1 (e) {
                let money = e.target.value && e.target.value.replace(this.symbol, '').trim()
                money = money.replace(/,/g, '')
                if (money === '') return
                const v = Number(money)
                if (v === this.value[1]) return
                const emitValue = v < this.value[0] ? [v, this.value[0]] : [this.value[0], v]
                this.$emit('input', emitValue)
                this.$emit('change', emitValue)
            },
            change0 (v) {},
            change1 (v) {},
            formatterValue (value) {
                value = value && value.replace(this.symbol, '').trim()
                return `${this.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
            parserValue (value) {
                value = value && value.replace(this.symbol, '').trim()
                return value.replace(/\$\s?|(,*)/g, '')
            }
        },
        render () {
            const props = {}
            Object.keys(InputNumberProps).map(k => {
                this[k] && (props[k] = this[k])
                if (k === 'formatter') {
                    props[k] = this.formatterValue
                }
                if (k === 'parser') {
                    props[k] = this.parserValue
                }
            })
            return (
                <div class="number-range">
                <a-input-number
            {...{ props: Object.assign({}, props, { value: this.value[0] }) }}
            onblur={this.blur0}
            style= {{ width: this.width + 'px' }}
            class="money-input"/>
            <span class="number-symbol"> ~ </span>
            <a-input-number
            {...{ props: Object.assign({}, props, { value: this.value[1] }) }}
            onblur={this.blur1}
            style= {{ width: this.width + 'px' }}
            class="money-input"
            />
            </div>
        )
        }
    }
</script>

<style lang="less">
    .number-range .ant-input-number-handler-wrap {
        display: none;
    }
    .number-range .money-input input {
        text-align: right
    }
</style>
