<script>
import { InputNumberProps } from 'ant-design-vue/es/input-number'
export default {
    props: Object.assign({}, InputNumberProps, {
        value: {
            type: Array,
            required: true
        }
    }),
    data () {
        return {}
    },
    methods: {
        blur0 (e) {
            const v = Number(e.target.value)
            if (v === this.value[0]) return
            console.log('onChange1', this.value, v)
            const emitValue = v > this.value[1] ? [this.value[1], v] : [v, this.value[1]]
            this.$emit('input', emitValue)
            this.$emit('change', emitValue)
        },
        blur1 (e) {
            const v = Number(e.target.value)
            if (v === this.value[1]) return
            console.log('onChange2', this.value, v)
            const emitValue = v < this.value[0] ? [v, this.value[0]] : [this.value[0], v]
            this.$emit('input', emitValue)
            this.$emit('change', emitValue)
        },
        change0 (v) {},
        change1 (v) {}
    },
    render () {
        const props = {}
        Object.keys(InputNumberProps).map(k => {
            this[k] && (props[k] = this[k])
        })
        return (
            <div class="number-range">
                <a-input-number
                    {...{ props: Object.assign({}, props, { value: this.value[0] }) }}
                    onblur={this.blur0}
                />
                <a-input-number
                    {...{ props: Object.assign({}, props, { value: this.value[1] }) }}
                    onblur={this.blur1}
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
</style>
