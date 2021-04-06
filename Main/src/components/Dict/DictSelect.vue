<template>
  <a-radio-group v-if="tagType=='radio'" @change="handleInput" :value="value" :disabled="disabled">
    <a-radio v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.name }}</a-radio>
  </a-radio-group>
  <a-select
    v-else-if="tagType=='select'"
    :getPopupContainer="getPopupContainer"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="value"
    @change="handleInput">
    <a-select-option :value="undefined">请选择</a-select-option>
    <a-select-option v-for="(item, key) in dictOptions" :key="key" :value="item.value">
      <span style="display: inline-block;width: 100%" :title=" item.name || item.label ">
        {{ item.name || item.label }}
      </span>
    </a-select-option>
  </a-select>
</template>
<script>
    import { dictGroup } from '@/components/Dict/dictUtil'

    export default {
        name: 'DictSelect',
        props: {
            dictGroup: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: ''
            },
            triggerChange: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number, Object],
                default () {
                    return ''
                }
            },
            type: {
                type: String,
                default: 'select'
            },
            spliter: {
                type: String,
                required: false,
                default: ','
            },
            // 是否返回选中的数据
            dataInValue: {
                type: Boolean,
                default: false
            },
            getPopupContainer: {
                type: Function,
                default: (node) => node.parentNode
            }
        },
        data () {
            return {
                dictOptions: [],
                tagType: ''
            }
        },
        watch: {
            dictGroup: {
                immediate: true,
                handler () {
                    if (this.options && this.options.length > 0) {
                        this.dictOptions = [...this.options]
                    } else {
                        // 获取字典组
                        dictGroup(this.dictGroup).then(res => {
                            this.dictOptions = res[this.dictGroup]
                        })
                    }
                }
            },
            type: {
                immediate: true,
                handler () {
                    if (!this.type || this.type === 'list') {
                        this.tagType = 'select'
                    } else {
                        this.tagType = this.type
                    }
                }
            }
        },
        created () { },
        methods: {
            handleInput (e) {
                let val
                if (this.tagType === 'radio') {
                    val = e.target.value
                } else {
                    val = e
                }
                if (this.dataInValue) {
                    const currentItem = this.dictOptions.filter(dict => dict.value === val)
                    this.$emit('change', val, currentItem[0]) // @change
                } else {
                    this.$emit('change', val)
                }
                this.$emit('input', val)
            },
            setCurrentDictOptions (dictOptions) {
                this.dictOptions = dictOptions
            },
            getCurrentDictOptions () {
                return this.dictOptions
            }
        }
    }
</script>
