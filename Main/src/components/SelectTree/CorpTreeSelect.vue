<script>
import Tree from 'ant-design-vue/es/tree'
import Icon from 'ant-design-vue/es/icon'

import { mockTreeData } from '@/utils/generateMockData' // 组件封装测试 临时使用
import { contains, findDOMNode, getTreeItem, getTreeKeys } from '@/utils/util'
import lodashGet from 'lodash.get'
import { getCorpTree } from '@/api/corp'

function recursionHandleItem ({ list, childrenName = 'children', cb = () => ({}) }) {
    return list.map(item => {
        if (item[childrenName] && item[childrenName].length > 0) {
            item[childrenName] = recursionHandleItem({ list: item[childrenName], childrenName, cb })
        }
        return cb(item)
    })
}

/**
 * 组件使用说明
 *
 * 组件仅薄封装了数据源
 * 其他属性及使用参考官方a-tree-select手册
 */
/**
 * 使用动态表单KFormDesign渲染时 注册过程
 * import CorpTreeSelect from './TempComponents/CorpTreeSelect'
 * import formDesign from '@/components/FormDesign/mini'
 * formDesign.setConfig({ title: '用户自定义组件', list: [{ type: 'CorpTreeSelect', component: CorpTreeSelect }] })
 * config.options存放需要传递的props
 * 如 unitTreeItemConfig: {
                type: 'CorpTreeSelect',
                label: '单位组件',
                options: {
                  allowClear: true,
                  treeCheckStrictly: true,
                  treeCheckable: true
                },
                model: 'CorpTreeSelectValue',
                help: '',
                rules: [{ required: true, message: '必填项' }]
            }
 */
const corpMap = new Map()
export default {
    name: 'CorpTreeSelect',
    props: Object.assign({}, Tree.props, {
        /**
         * 当作为自定义组件在 kformdesign渲染 props会通过record.option传递进来
         * 不考虑headSearch时，可以不要改属性
         */
        record: {
            type: Object,
            requred: false
        },
        // 通过参数控制不同数据源
        apiName: {
            type: String,
            default: 'corpTreeSelect'
        },
        // 请求数据时的参数
        apiParams: {
            type: Object,
            default: () => ({ type: 'xxx' })
        },
        value: {
            type: [Array, Number, String, null, undefined],
            requred: true
        },
        checkable: {
            type: Boolean,
            default: true
        },
        checkStrictly: {
            type: Boolean,
            default: true
        },
        maxTagCount: {
            type: Number,
            default: 3
        },
        allowClear: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'default'
        }
    }),
    data () {
        return {
            localTreeData: [],
            // 修改默认
            localReplaceFields: { children: 'children', title: 'name', key: 'id', value: 'id' },
            // localAllowClear: true,
            // localShowSearch: true,
            // localTreeDefaultExpandAll: true,
            localSelectedKeys: [],
            visible: false,
            animaStart: true
        }
    },
    mounted () {
        this.getTreeData()
    },
    watch: {
        visible (nVal) {
            if (nVal) {
                this.$refs['corp-tree-select-input'].focus()
                window.document.addEventListener('mousedown', this.onDocumentClick)
            } else {
                this.$refs['corp-tree-select-input'].blur()
                window.document.removeEventListener('mousedown', this.onDocumentClick)
            }
        }
    },
    computed: {
        displayTags () {
            return this.checkable ? this.value.slice(0, this.maxTagCount) : []
        }
        // optionsForShow () {
        //     return this.value.map(key => ({ value: key, label: corpMap.get(key) }))
        // }
    },
    methods: {
        onDocumentClick (event) {
            const target = event.target
            const root = findDOMNode(this)
            if (!contains(root, target)) {
                this.toggleDisplay(false)
            }
        },
        toggleDisplay (v) {
            if (this.visible === false) {
                if (v === false) return
                this.visible = true
                setTimeout(() => {
                    this.animaStart = false
                })
            } else {
                if (v === true) return
                this.animaStart = true
                setTimeout(() => {
                    this.visible = false
                })
            }
        },
        expand (expandedKeys, { expanded: bool, node }) {},
        load (loadedKeys, { event, node }) {},
        select (selectedKeys, { selected, node }) {
            // 抛出单值
            if (!this.checkable) {
                console.log(typeof lodashGet)
                const nodeOption = lodashGet({ '0': this.localTreeData }, node.pos.split('-'))
                this.$emit('input', node.eventKey)
                this.$emit('change', node.eventKey)
                // this.$emit('change', nodeOption)
                this.toggleDisplay(false)
                return
            }
            const checkedKeysSet = new Set(this.value)
            const nodeKey = node.eventKey
            checkedKeysSet.has(nodeKey) ? checkedKeysSet.delete(nodeKey) : checkedKeysSet.add(nodeKey)
            this.$emit('input', [...checkedKeysSet])
            this.$emit('change', [...checkedKeysSet])
        },
        check ({ checked: checkedKeys }, { checked, node }) {
            // 抛出多值
            const nodeItem = getTreeItem({
                list: this.localTreeData,
                keyName: this.localReplaceFields.value,
                keyValue: node.eventKey
            })
            const childrenKeys = getTreeKeys({ list: [nodeItem], keyName: this.localReplaceFields.value })
            const checkedKeysSet = new Set(checkedKeys)
            const methodName = !node.checked ? 'add' : 'delete'
            childrenKeys.map(k => {
                checkedKeysSet[methodName](k)
            })
            this.$emit('input', [...checkedKeysSet])
            this.$emit('change', [...checkedKeysSet])
        },
        removeItem (key) {
            const checkedKeysSet = new Set(this.value)
            checkedKeysSet.delete(key)
            this.$emit('input', [...checkedKeysSet])
            this.$emit('change', [...checkedKeysSet])
        },
        removeAll () {
            this.$emit('input', this.checkable ? [] : '')
            this.$emit('change', this.checkable ? [] : '')
        },
        // 获取单位内容
        getTreeData () {
            const dataSourceApi = this.apiName ? getCorpTree : getCorpTree
            const cb = item => {
                corpMap.set(item.id, item.name)
                // item.scopedSlots = { title: 'customTitle' }
                return item
            }
            dataSourceApi(this.apiParams).then(res => {
                this.localTreeData = recursionHandleItem({ list: res.data, cb })
            })

            // 使用模拟数据
            // const mockData = mockTreeData({
            //     level: 2,
            //     minLen: 2,
            //     maxLen: 5,
            //     labelKey: 'name',
            //     valueKey: 'id'
            // })
            // this.localTreeData = recursionHandleItem({ list: mockData, cb })
        }
    },
    render () {
        const props = {}
        const localKeys = Object.keys(this.$data)
        Object.keys(Tree.props).forEach(k => {
            const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
            if (localKeys.includes(localKey)) {
                props[k] = this[localKey]
                return props[k]
            }
            // 兼容 kformDesign
            if (this.record && this.record.options[k] !== undefined) {
                props[k] = this.record.options[k]
            }
            this[k] !== undefined && (props[k] = this[k])
            return props[k]
        })
        if (this.checkable) {
            props.checkedKeys = this.value
        } else {
            props.selectedKeys = [this.value]
        }

        // props.checkedKeys = this.value
        // 过滤功能
        // props.filterTreeNode = (v, t) => {
        //   const { name, code } = t.data.props
        //   return name.includes(v) || code.includes(v)
        // }
        // customTitle: props => <span>{`${props.name}(${props.id})`}</span>
        const restValueCount = this.checkable ? (this.value?.length || 0) - this.maxTagCount : 0
        const tree = (
            <a-tree
                {...{
                    props,
                    scopedSlots: {
                        ...this.$scopedSlots
                    }
                }}
                oncheck={this.check}
                onexpand={this.expand}
                onload={this.load}
                onselect={this.select}
            >
                {' '}
            </a-tree>
        )
        //  <div class="val-item">
        const disPlayValues = (
            <div class="corp-val-items">
                {this.checkable ? (
                    this.displayTags.map(key => {
                        return (
                            <a-tag
                                closable
                                key={key}
                                onclose={() => {
                                    this.removeItem(key)
                                }}
                            >
                                {corpMap.get(key)}
                            </a-tag>
                        )
                    })
                ) : this.value ? (
                    <span class="corp-tag" key={'key' + this.value}>
                        {corpMap.get(this.value)}
                    </span>
                ) : (
                    ''
                )}
                {restValueCount > 0 && <a-tag>+{restValueCount}...</a-tag>}

                <input
                    size={this.size}
                    ref="corp-tree-select-input"
                    autocomplete="off"
                    onfocus={() => {
                        this.toggleDisplay(true)
                    }}
                />

                {this.value?.length > 0 && (
                    <span class="ant-select-selection__clear" onclick={this.removeAll}>
                        <Icon
                            {...{
                                attrs: { type: 'close-circle', theme: 'filled' },
                                class: 'anticon anticon-close-circle ant-select-clear-icon'
                            }}
                        ></Icon>
                    </span>
                )}
            </div>
        )

        return (
            <div
                class={{
                    'select-tree-wrap': true,
                    'tree-sm': this.size === 'small',
                    'tree-lg': this.size === 'large',
                    focus: this.visible
                }}
                tabindex="-1"
                style={{ width: this.width || '100%' }}
            >
                <div
                    class={{
                        'corp-select': true
                    }}
                    onclick_native={() => {
                        this.toggleDisplay(true)
                    }}
                >
                    {disPlayValues}
                </div>

                <div
                    class={{
                        'table-options': true,
                        onfocus: this.visible,
                        start: this.animaStart,
                        end: !this.animaStart
                    }}
                >
                    {tree}
                </div>
            </div>
        )
    }
}
</script>
<style lang="less">
@import '~ant-design-vue/es/style/themes/default.less';

.select-tree-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #d9d9d9;
    height: 32px;
    padding: 4px 11px;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;

    &.focus,
    &:hover {
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
        box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
        .ant-select-selection__clear {
            opacity: 1;
        }
    }

    // overflow: hidden;
    .corp-select {
        // padding: 4px 8px;

        display: block;
        box-sizing: border-box;
        line-height: 1;
        // background-color: #fff;
        // border-top-width: 1.02px;

        .corp-val-items {
            display: flex;
            // overflow: hidden;
            flex-wrap: wrap;
            // .val-item {
            //     width: auto;
            //     display: inline;
            //     flex-grow: 1;
            input {
                flex-grow: 1;
                min-width: 12px;
                width: 12px; // 不给宽度flex-grow: 1 不生效，会自动换行
                // width: 100%;

                background: transparent;
                border-width: 0;
                border-radius: 2px;
                outline: 0;
                border-width: 0;
                min-width: 12px;

                &:focus {
                    border-width: 0;
                }
            }
            // }
            .corp-tag {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                font-variant: tabular-nums;

                list-style: none;
                font-feature-settings: 'tnum';
                display: inline-block;
                height: 22px;
                margin-right: 8px;
                padding: 0 7px;
                font-size: 12px;
                line-height: 21px;
                white-space: nowrap;
                background: #fafafa;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                cursor: default;
                opacity: 1;
                transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            }
        }
    }
    &.tree-sm {
        height: 24px;
        padding: 1px 7px;
        .corp-select .corp-val-items .corp-tag {
            height: 20px;
            line-height: 18px;
        }
    }
    &.tree-lg {
        height: 40px;
        padding: 6px 11px;
        font-size: 16px;
        .corp-select .corp-val-items .corp-tag {
            height: 26px;
            font-size: 16px;
            line-height: 22px;
        }
    }
    .table-options {
        position: absolute;
        // bottom:1px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: all 500;
        width: 100%;
        top: 32px;
        left: 0px;
        overflow: hidden;
        padding: 0 8px;
        z-index: 1;
        max-height: 280px;
        overflow-y: auto;
        &.start {
            height: 0;
        }
        &.end {
            height: auto;
        }
        &.onfocus {
            display: block;
        }
        .ant-table-tbody > tr.selected-row > td {
            background: @table-selected-row-bg;
        }
        .ant-table-tbody > tr.focus-row > td {
            background: @table-row-hover-bg;
        }
        .search-input {
            margin: 8px 0;
            width: 200px;
        }
    }
}
</style>
