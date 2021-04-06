<style scoped></style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false" style="margin-top: 24px">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        showPagination="auto"
        :columns="columns"
        :useDragColumns="false"
        :data="loadData"
      >
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { searchLog } from '@/api/basic/logAudit'
import { handleJsonColumns } from '@/utils/util'

const defaultColumns = [
    {
        title: '操作名称',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
        defSearch: true,
        show: true,
        width: 150,
        fixed: 'left'
    },
    {
        title: '请求类型',
        dataIndex: 'requestType',
        key: 'requestType',
        width: 150
    },
    {
        title: '请求路径',
        dataIndex: 'requestUrl',
        key: 'requestUrl',
        width: 300
    },
    {
        title: '请求参数',
        dataIndex: 'requestParam',
        key: 'requestParam',
        width: 200
    },
    {
        title: '登录账号',
        dataIndex: 'username',
        key: 'username',
        width: 100
    },
    {
        title: 'IP',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
        width: 150
    },
    {
        title: '耗时(毫秒)',
        dataIndex: 'costTime',
        key: 'costTime',
        width: 130
    },
    {
        title: '设备信息',
        dataIndex: 'device',
        key: 'device',
        width: 400
    },
    {
        title: 'i18n:common.table.column.createdTime',
        dataIndex: 'createdTime',
        key: 'createdTime',
        customRender: 'date:-',
        isSearch: true,
        defSearch: true,
        show: true,
        width: 200,
        fixed: 'right'
    }
]
export default {
    name: 'DataList',
    data () {
        return {
            actionUrl: '',
            // 查询参数
            queryParam: {},
            columns: handleJsonColumns(defaultColumns, this),
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                return searchLog(requestParameters).then(res => res.data)
            }
        }
    },
    // 组件创建完成
    created () {},
    // 组件挂载完成
    mounted () {},
    computed: {},
    methods: {}
}
</script>
