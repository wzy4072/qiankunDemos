import T from 'ant-design-vue/es/tree-select/index'
import get from 'lodash.get'

export default {
    data () {
        return {
            // needTotalList: [],
            //
            // selectedRows: [],
            // selectedRowKeys: [],
            //
            // localLoading: false,
            // localDataSource: [],
            // localPagination: Object.assign({}, this.pagination)
        }
    },
    props: Object.assign({}, T.props, {
        replaceFields: {
            type: Object,
            default: () => {
                return {
                    children: 'children',
                    key: 'id',
                    value: 'id'
                }
            }
        }
        // data: {
        //     type: Function,
        //     required: true
        // }
    }),
    watch: {
        // 'localPagination.current' (val) {
        //     this.pageURI && this.$router.push({
        //         ...this.$route,
        //         name: this.$route.name,
        //         params: Object.assign({}, this.$route.params, {
        //             pageNo: val
        //         })
        //     })
        //     // change pagination, reset total data
        //     this.needTotalList = this.initTotalList(this.columns)
        //     this.selectedRowKeys = []
        //     this.selectedRows = []
        // },
        // pageNum (val) {
        //     Object.assign(this.localPagination, {
        //         current: val
        //     })
        // },
        // pageSize (val) {
        //     Object.assign(this.localPagination, {
        //         pageSize: val
        //     })
        // },
        // showSizeChanger (val) {
        //     Object.assign(this.localPagination, {
        //         showSizeChanger: val
        //     })
        // }
    },
    created () {
        // const { pageNo } = this.$route.params
        // const localPageNum = this.pageURI && (pageNo && parseInt(pageNo)) || this.pageNum
        // this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
        //     current: localPageNum,
        //     pageSize: this.pageSize,
        //     showSizeChanger: this.showSizeChanger
        // }) || false
        // this.needTotalList = this.initTotalList(this.columns)
        // this.loadData()
    },
    methods: {

    },

    render () {
        const props = {}
        // const localKeys = Object.keys(this.$data)
        // const showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show) && typeof this.rowSelection.selectedRowKeys !== 'undefined' || this.alert

        Object.keys(T.props).forEach(k => {
            // const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
            // if (localKeys.includes(localKey)) {
            //     props[k] = this[localKey]
            //     return props[k]
            // }
            // if (k === 'rowSelection') {
            //     if (showAlert && this.rowSelection) {
            //         // 如果需要使用alert，则重新绑定 rowSelection 事件
            //         props[k] = {
            //             ...this.rowSelection,
            //             selectedRows: this.selectedRows,
            //             selectedRowKeys: this.selectedRowKeys,
            //             onChange: (selectedRowKeys, selectedRows) => {
            //                 this.updateSelect(selectedRowKeys, selectedRows)
            //                 typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows)
            //             }
            //         }
            //         return props[k]
            //     } else if (!this.rowSelection) {
            //         // 如果没打算开启 rowSelection 则清空默认的选择项
            //         props[k] = null
            //         return props[k]
            //     }
            // }
            this[k] && (props[k] = this[k])
            return props[k]
        })
        console.log(props)

        return (
            <a-tree-select {...{ props, scopedSlots: { ...this.$scopedSlots } }} onSelect={ (value, record) => { this.$emit('value', value, record) } }>
                { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
            </a-tree-select>
        )
    }
}
