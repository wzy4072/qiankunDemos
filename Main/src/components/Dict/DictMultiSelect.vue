<style scoped>
    .dict-checkbox .ant-checkbox-wrapper,.dict-checkbox{
        margin-left: 0;
        line-height: 26px;
        height: 26px;
    }
</style>

<template>
  <div v-if="tagType=='checkbox'" style="line-height: normal">
    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange" v-if="hasCheckAll" class="dict-checkbox">
      {{ $t('dict.common.checkAll') }}
    </a-checkbox>
    <a-checkbox-group @change="onChange" :value="arrayValue" :disabled="disabled" class="dict-checkbox">
      <a-checkbox v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.name || item.label }}
      </a-checkbox>
    </a-checkbox-group>
  </div>

  <a-select
    v-else-if="tagType=='select'"
    :value="arrayValue"
    @change="onChange"
    :disabled="disabled"
    mode="multiple"
    :placeholder="placeholder"
    :getPopupContainer="getParentContainer"
    optionFilterProp="children"
    :filterOption="filterOption"
    allowClear>
    <a-select-option
      v-for="(item,index) in dictOptions"
      :key="index"
      :value="item.value">
      <span style="display: inline-block;width: 100%" :title=" item.name || item.label ">
        {{ item.name || item.label }}
      </span>
    </a-select-option>
  </a-select>

</template>

<script>
    import { dictGroup } from '@/components/Dict/dictUtil'

    export default {
        name: 'DictMultiSelect',
        props: {
            dictGroup: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: () => []
            },
            spliter: {
                type: String,
                required: false,
                default: ','
            },
            popContainer: {
                type: String,
                default: '',
                required: false
            },
            // 复选框全部
            hasCheckAll: {
                type: Boolean,
                default: false
            },
            // 是否返回选中的数据
            dataInValue: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                dictOptions: [],
                tagType: '',
                arrayValue: !this.value ? [] : this.value.split(this.spliter),
                indeterminate: false,
                checkAll: false
            }
        },
        created () {
            if (!this.type || this.type === 'list_multi') {
                this.tagType = 'select'
            } else {
                this.tagType = this.type
            }
            // 获取字典数据
            // this.initDictData();
        },
        watch: {
            options: function (val) {
                this.setCurrentDictOptions(val)
            },
            dictGroup: {
                immediate: true,
                handler () {
                    this.initDictData()
                }
            },
            value (val) {
                if (!val) {
                    this.arrayValue = []
                } else {
                    this.arrayValue = this.value.split(this.spliter)
                }
            }
        },
        methods: {
            initDictData () {
                if (this.options && this.options.length > 0) {
                    this.dictOptions = [...this.options]
                } else {
                    // 获取字典配置
                    dictGroup(this.dictGroup).then(res => {
                        this.dictOptions = res[this.dictGroup]
                        this.initCheckAll()
                    })
                }
            },
            onChange (selectedValue) {
                let selectValueArr = [...selectedValue]
                if (this.hasCheckAll) {
                    if (this.type === 'checkbox') {
                        this.indeterminate = !!selectValueArr.length && selectValueArr.length < this.dictOptions.length
                        this.checkAll = selectValueArr.length === this.dictOptions.length
                    } else {
                        if (selectedValue.indexOf('checkAll') !== -1) {
                            selectValueArr = []
                            this.dictOptions.forEach(dict => {
                                if (dict.value !== 'checkAll') {
                                    selectValueArr.push(dict.value)
                                }
                            })
                        }
                    }
                }
                if (this.dataInValue) {
                    const selectData = []
                    selectValueArr.map(item => {
                        selectData.push(this.dictOptions.filter(dict => dict.value === item)[0])
                    })
                    this.$emit('change', selectValueArr.join(this.spliter), JSON.parse(JSON.stringify(selectData)))
                } else {
                    this.$emit('change', selectValueArr.join(this.spliter))
                }
                this.$emit('input', selectValueArr.join(this.spliter))
            },
            onCheckAllChange (e) {
                const values = []
                if (e.target.checked) {
                   this.dictOptions.forEach(dict => {
                       values.push(dict.value)
                   })
                }
                this.arrayValue = values.join(this.spliter)
                if (this.dataInValue) {
                    let selectData = []
                    if (e.target.checked) {
                        selectData = JSON.parse(JSON.stringify(this.dictOptions))
                    }
                    this.$emit('change', this.arrayValue, selectData)
                } else {
                    this.$emit('change', this.arrayValue)
                }
                this.$emit('input', this.arrayValue)
                Object.assign(this, {
                    indeterminate: false,
                    checkAll: e.target.checked
                })
            },
            setCurrentDictOptions (dictOptions) {
                this.dictOptions = dictOptions
            },
            getCurrentDictOptions () {
                return this.dictOptions
            },
            getParentContainer (node) {
                if (!this.popContainer) {
                    return node.parentNode
                } else {
                    return document.querySelector(this.popContainer)
                }
            },
            // update--begin--autor:lvdandan-----date:20201120------for：LOWCOD-1086 下拉多选框,搜索时只字典code进行搜索不能通过字典text搜索
            filterOption (input, option) {
                return option.componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },
            // update--end--autor:lvdandan-----date:20201120------for：LOWCOD-1086 下拉多选框,搜索时只字典code进行搜索不能通过字典text搜索
            initCheckAll () {
                if (this.hasCheckAll) {
                    if (this.type === 'checkbox') {
                        // 全选
                        if (this.dictOptions.length === this.arrayValue.length) {
                            this.checkAll = true
                            this.indeterminate = false
                            // 半选
                        } else if (this.arrayValue.length > 0) {
                            this.checkAll = false
                            this.indeterminate = true
                            // 不选
                        } else {
                            this.checkAll = false
                            this.indeterminate = false
                        }
                    } else {
                        this.dictOptions.unshift({ label: this.$t('dict.common.checkAll'), value: 'checkAll' })
                    }
                }
            }

        },
        model: {
            prop: 'value',
            event: 'change'
        }
    }
</script>
