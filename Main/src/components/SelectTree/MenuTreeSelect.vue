<script>
import Tree from 'ant-design-vue/es/tree'
import Icon from 'ant-design-vue/es/icon'

import { contains, findDOMNode, getTreeItem, getTreeKeys } from '@/utils/util'
import lodashGet from 'lodash.get'
import { listMenuTree } from '@/api/manager/menu'

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
const menuMap = new Map()
export default {
    name: 'MenuTreeSelect',
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
            default: 'menuTreeSelect'
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
            // if (nVal) {
            //     this.$refs['corp-tree-select-input'].focus()
            //     window.document.addEventListener('mousedown', this.onDocumentClick)
            // } else {
            //     this.$refs['corp-tree-select-input'].blur()
            //     window.document.removeEventListener('mousedown', this.onDocumentClick)
            // }
        }
    },
    computed: {
        displayTags () {
            return this.checkable ? this.value.slice(0, this.maxTagCount) : []
        }
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
        expand (expandedKeys, { expanded: bool, node }) {
        },
        load (loadedKeys, { event, node }) {
        },
        select (selectedKeys, { selected, node }) {
            // 抛出单值
            if (!this.checkable) {
                console.log(typeof lodashGet)
                const nodeOption = lodashGet({ '0': this.localTreeData }, node.pos.split('-'))
                this.$emit('input', node.eventKey)
                this.$emit('change', nodeOption)
                this.toggleDisplay(false)
                return
            }
            const checkedKeysSet = new Set(this.value)
            const nodeKey = node.eventKey
            checkedKeysSet.has(nodeKey) ? checkedKeysSet.delete(nodeKey) : checkedKeysSet.add(nodeKey)
            this.$emit('input', [...checkedKeysSet])
        },
        check ({ checked: checkedKeys }, { checked, node }) {
            console.log('check')
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
        },
        removeItem (key) {
            const checkedKeysSet = new Set(this.value)
            checkedKeysSet.delete(key)
            this.$emit('input', [...checkedKeysSet])
        },
        removeAll () {
            this.$emit('input', this.checkable ? [] : '')
        },
        // 获取单位内容
        getTreeData () {
            const dataSourceApi = this.apiName ? listMenuTree : listMenuTree
            const cb = item => {
                menuMap.set(item.id, item.name)
                // item.scopedSlots = { title: 'customTitle' }
                return item
            }
            dataSourceApi(this.apiParams).then(res => {
                this.localTreeData = recursionHandleItem({ list: res.data, cb })
            })
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
        console.log('===props', props)
        // if (this.checkable) {
        //     props.checkedKeys = this.value
        // } else {
        //     props.selectedKeys = [this.value]
        // }

        const tree = (
            <a-tree
                {...{
                    props,
                    scopedSlots: {
                        ...this.$scopedSlots
                    }
                }}
                oncheck={this.check}
                // onexpand={this.expand}
                onload={this.load}
                onselect={this.select}
            >
                {' '}
            </a-tree>
        )
        return (
            <div>
                {tree}
            </div>
            // <div class="select-table-wrap">
            //     <div
            //         tabindex="-1"
            //         class={{ 'corp-select ant-select ant-select-selection': true, focus: this.visible }}
            //         onclick_native={() => {
            //             this.toggleDisplay(true)
            //         }}
            //     >
            //         {disPlayValues}
            //     </div>
            //
            //     <div
            //         class={{
            //             'table-options': true,
            //             onfocus: this.visible,
            //             start: this.animaStart,
            //             end: !this.animaStart
            //         }}
            //     >
            //         {tree}
            //     </div>
            // </div>
        )
    }
}
</script>
<style lang="less">
@import '~ant-design-vue/es/style/themes/default.less';

.select-table-wrap {
    position: relative;
    // overflow: hidden;
    .corp-select {
        padding: 4px 8px;
        display: block;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-top-width: 1.02px;
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
        }

        .corp-val-items {
            display: flex;
            overflow: hidden;
            flex-wrap: wrap;

            input.val-item {
                min-width: 12px;
                width: 12px;
                height: 100%;
                font-size: 100%;
                line-height: 1;
                background: transparent;
                border-width: 0;
                border-radius: 2px;
                outline: 0;
                flex-grow: 1;
            }
        }
    }

    .table-options {
        position: absolute;
        // bottom:1px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: all 500;
        width: 100%;
        // top: 26;
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
