<script>
import T from 'ant-design-vue/es/table/Table'
import debounce from 'lodash.debounce'
import { contains, findDOMNode } from '@/utils/util'
/**
 * tableSelect
 *
 * 支持table所有props
 * 支持插槽
 * 后端查询/分页
 * 查询防抖
 * 支持 v-model v-decorator
 *
 * 使用如下
 */
export default {
    props: Object.assign({}, T.props, {
        // 获取DataSource的参数
        tableParams: {
            type: Object,
            default: () => ({})
        },
        // 获取DataSource的api
        tableDataApi: {
            type: Function,
            required: true
        },
        // 值得取值字段
        valueKey: {
            type: String,
            default: 'id'
        },
        labelKey: {
            type: String,
            default: 'name'
        },
        // 展示值
        value: {
            type: Object,
            required: true,
            default: { id: '', value: '' }
        },
        // searchValue的fieldName
        searchForField: {
            type: String,
            default: 'name'
        },
        // 是否启用搜索功能
        search: {
            type: Boolean,
            default: true
        },
        tableWidth: {
            type: Number,
            default: 400
        }
    }),
    data () {
        return {
            localBordered: true,
            localSize: 'small',
            localDataSource: [],
            localPagination: Object.assign(
                {
                    current: 1,
                    pageSize: 10,
                    total: 0,
                    size: 'small' // 样式的大小
                },
                this.pagination || {}
            ),
            localRowClassName: (record, index) => {
                const selected = record[this.valueKey] === this.value[this.valueKey] ? 'selected-row ' : ''

                const focus = index === this.focusRowIndex ? 'focus-row ' : ''
                return selected + focus
            },
            selectedIndex: -1,
            focusRowIndex: -1,
            visible: false,
            animaStart: true,
            searchValue: null
        }
    },
    watch: {
        visible (nVal) {
            if (nVal) {
                this.getTableData()
                window.document.addEventListener('mousedown', this.onDocumentClick)
                window.document.addEventListener('keyup', this.onDocumentKeyup)
            } else {
                this.$refs['select-table-input'].blur()
                window.document.removeEventListener('mousedown', this.onDocumentClick)
                window.document.removeEventListener('keyup', this.onDocumentKeyup)
            }
        },
        searchValue: debounce(function (nv) {
            this.getTableData(true)
        }, 500)
    },
    methods: {
        // 获取table数据

        getTableData (p) {
            if (p) this.localPagination.current = 1
            const requestData = Object.assign(
                {},
                { size: this.localPagination.pageSize, current: this.localPagination.current },
                this.tableParams,
                {
                    [this.searchForField]: this.searchValue
                }
            )
            this.tableDataApi(requestData).then(res => {
                this.localPagination.total = res.data?.totalElements || 0
                this.localDataSource = res.data?.content || []
            })
        },
        valueChange (record) {
            this.$emit('input', record)
            this.$emit('change', record)
        },
        clickRow (record) {
            this.valueChange(record)
        },
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
        tableChange (pagination) {
            this.localPagination = Object.assign(this.localPagination, pagination)
            this.getTableData()
        },
        onDocumentKeyup (e) {
            const { localDataSource, focusRowIndex } = this
            if (this.localDataSource.length === 0) {
                return
            }
            // 回车
            if (e.keyCode === 13) {
                this.valueChange(localDataSource[focusRowIndex])
                this.focusRowIndex = -1
                this.toggleDisplay(false)
            }
            // 上
            if (e.keyCode === 38) {
                if (focusRowIndex < 1) {
                    this.focusRowIndex = localDataSource.length - 1
                } else {
                    this.focusRowIndex -= 1
                }
            }
            // // 下键
            if (e.keyCode === 40) {
                if (focusRowIndex === localDataSource.length - 1) {
                    this.focusRowIndex = 0
                } else {
                    this.focusRowIndex += 1
                }
            }
        }
    },
    render () {
        const aTableProps = {}
        const localKeys = Object.keys(this.$data)
        Object.keys(T.props).forEach(k => {
            const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
            if (localKeys.includes(localKey)) {
                aTableProps[k] = this[localKey]
                return aTableProps[k]
            }
            this[k] && (aTableProps[k] = this[k])
            return aTableProps[k]
        })
        // onchange={e => this.valueChange(e.target.value)}
        return (
            <div class="select-table-wrap">
                <a-input
                    ref="select-table-input"
                    onfocus={() => {
                        this.toggleDisplay(true)
                    }}
                    value={this.value[this.labelKey]}
                ></a-input>
                <div
                    style={{ width: this.tableWidth + 'px' }}
                    class={{
                        'table-options': true,
                        onfocus: this.visible,
                        start: this.animaStart,
                        end: !this.animaStart
                    }}
                >
                    <a-input class="search-input" v-model={this.searchValue} placeholder="输入关键字搜索">
                        <a-icon slot="prefix" type="search" />
                    </a-input>
                    {this.visible && (
                        <a-table
                            {...{ props: aTableProps, scopedSlots: { ...this.$scopedSlots } }}
                            onchange={this.tableChange}
                            style={{ 'margin-bottom': '8px' }}
                            customRow={record => ({
                                on: {
                                    click: e => {
                                        this.clickRow(record)
                                    }
                                }
                            })}
                        >
                            {Object.keys(this.$slots).map(name => (
                                <template slot={name}>{this.$slots[name]}</template>
                            ))}
                        </a-table>
                    )}
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
@import '~ant-design-vue/es/style/themes/default.less';

.select-table-wrap {
    position: relative;
    .table-options {
        position: absolute;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: all 500;
        // top: 26;
        max-height: 536px;
        overflow-y: auto;
        padding: 0 8px;
        z-index: 100;
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
