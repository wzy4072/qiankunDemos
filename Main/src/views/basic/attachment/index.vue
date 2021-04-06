<style scoped>
.date-container/deep/ .ant-form-item-children > span{
    width: 100%!important;
}
</style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="服务名称">
                <a-input v-model="queryParam.name" placeholder="请输入服务名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="附件名称">
                <a-input v-model="queryParam.code" placeholder="请输入附件名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="{ float: 'right', overflow: 'hidden' } || {} ">
                <!-- 查询按钮 -->
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('common.search.button.query') }}</a-button>
                <!-- 重置按钮 -->
                <a-button
                  style="margin-left: 8px"
                  @click="() => {this.queryParam = {};$refs.table.refresh(true)}">{{ $t('common.search.button.reset') }}</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false" style="margin-top: 24px">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        showPagination="auto"
        :columns="columns"
        :useDragColumns="false"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: (keys) => selectedRowKeys = keys
        }"
        :data="loadData">
        <template slot="action" slot-scope="text, row">
          <a @click="downloadFile(row.id, row.oldName)">下载</a>
          <a-divider type="vertical"/>
          <a-divider type="vertical"/>
          <a @click="deleteData(row.id)">删除</a>
        </template>
        <template slot="stitle">
          <a-button @click="deleteData()" type="primary">批量删除</a-button>
        </template>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { deleteAttachment, downloadAttachment, searchAttachment } from '@/api/basic/attachment'

export default {
    name: 'DataList',
    data () {
        return {
            actionUrl: '',
            // 查询参数
            queryParam: {},
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                return searchAttachment(requestParameters).then(res => res.data)
            },
            selectedRowKeys: []
        }
    },
    // 组件创建完成
    created () {
    },
    // 组件挂载完成
    mounted () {
    },
    computed: {
        columns () {
            return [
                {
                    title: '服务名称',
                    dataIndex: 'serviceName',
                    key: 'serviceName'
                },
                {
                    title: '上传用户',
                    dataIndex: 'userName',
                    key: 'userName'
                },
                {
                    title: '附件名称',
                    dataIndex: 'oldName',
                    key: 'oldName'
                },
                {
                    title: '下载次数',
                    dataIndex: 'downloadCount',
                    key: 'downloadCount',
                    align: 'center'
                },
                {
                    title: () => this.$i18n.t('common.field.action'),
                    dataIndex: 'id',
                    width: '220px',
                    key: 'id',
                    scopedSlots: { customRender: 'action' }
                }
            ]
        }
    },
    methods: {
        downloadFile (id, name) {
            const _this = this
            downloadAttachment(id).then((res) => {
                if (!res) {
                    _this.$message.error('下载文件失败')
                    return false
                }
                const blob = new Blob([res], { type: 'application/octet-stream;charset=utf-8' })
                const downloadElement = document.createElement('a')
                const href = window.URL.createObjectURL(blob)
                downloadElement.style.display = 'none'
                downloadElement.href = href
                downloadElement.download = name // 下载后文件名
                document.body.appendChild(downloadElement)
                downloadElement.click() // 点击下载
                document.body.removeChild(downloadElement) // 下载完成移除元素
                window.URL.revokeObjectURL(href) // 释放掉blob对象
                _this.$refs.table.refresh(true)
            })
        },
        // 删除数据
        deleteData (id) {
            let keys = this.selectedRowKeys
            if (id) {
                keys = [id]
            }
            const _this = this
            this.$confirm({
                title: '信息提示',
                content: '确认要删除选中的数据吗?',
                onOk () {
                    return deleteAttachment(keys).then((response) => {
                        // 判断状态码
                        if (response.success) {
                            // 操作成功
                            _this.$message.success(response.msg)
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(response.msg)
                        }
                    })
                }
            })
        }
    }
}
</script>
