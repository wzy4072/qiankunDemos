<script>
export default {
    name: 'CustomComponent',
    // eslint-disable-next-line vue/require-prop-types
    props: ['record', 'formConfig', 'disabled', 'dynamicData'],
    computed: {
        customComponent () {
            // 计算需要显示的组件
            const customComponentList = {}
            if (window.$customComponentList) {
                // 将数组映射成json
                window.$customComponentList.forEach(item => {
                    customComponentList[item.type] = item.component
                })
            }
            return customComponentList[this.record.type]
        }
    },
    methods: {
        handleChange (value, key) {
            this.$emit('change', value, key)
        }
    },
    render () {
        const Tag = this.customComponent
        return (
            <a-form-item
                label={this.record.label}
                label-col={this.formConfig.layout === 'horizontal' ? this.formConfig.labelCol : {}}
                wrapper-col={this.formConfig.layout === 'horizontal' ? this.formConfig.wrapperCol : {}}
            >
                <Tag
                    {...{ props: this.record.options }}
                    v-decorator={[
                        this.record.model,
                        {
                            initialValue: this.record.options.defaultValue,
                            rules: this.record.rules
                        }
                    ]}
                    style={{ width: this.record.options.width }}
                    onchange={this.handleChange}
                    disabled={this.disabled}
                    dynamicData={this.dynamicData}
                ></Tag>
            </a-form-item>
        )
    }
}
</script>
