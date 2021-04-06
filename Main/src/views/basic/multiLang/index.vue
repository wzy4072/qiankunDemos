<style scoped>
.date-container /deep/ .ant-form-item-children > span {
    width: 100% !important;
}
</style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false" style="margin-top: 24px">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        showPagination="auto"
        :columns="columns"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          columnWidth: 60,
          fixed: true,
          onChange: keys => (selectedRowKeys = keys)
        }"
        :data="loadData"
        @updateColumns="getTableColumns"
        @getCustomParams="getCustomParams"
      >
        <template slot="action" slot-scope="text, row">
          <a @click="$refs.editModal.showModal(row.id)">{{ $t('common.btn.edit') }}</a>
        </template>
        <template slot="stitle">
          <a-button
            @click="$refs.editModal.showModal(null)"
            type="primary"
          >{{ $t('common.btn.add') }}
          </a-button>
          <a-dropdown :disabled="selectedRowKeys.length === 0">
            <a-menu slot="overlay">
              <a-menu-item @click="deleteData">{{ $t('common.btn.delete') }}</a-menu-item>
            </a-menu>
            <a-button>
              {{ $t('common.btn.moreOperation') }}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </template>
      </s-table>
    </a-card>
    <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
  </page-header-wrapper>
</template>
<script>
import EditModal from '@/views/basic/multiLang/edit'
import { dictGroup, dict } from '@/components/Dict/dictUtil'
import { searchMultiLang, deleteMultiLang } from '@/api/multiLang'
import { handleJsonColumns } from '@/utils/util'
// 1 查询TableHead
// 2 查询TableData
// 3/4/5 查询/保存/删除常用参数
// 6 修改或者保存TableHead
// 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

const defaultColumns = [
    {
        title: 'i18n:basic.multiLang.field.locale',
        dataIndex: 'locale',
        key: 'locale',
        width: 80,
        isSearch: true,
        defSearch: false,
        show: true,
        fixed: null,
        customRender: (value) => dict('multiLang', value)
    },
    {
        title: 'i18n:basic.multiLang.field.key',
        dataIndex: 'langKey',
        key: 'langKey',
        width: 220,
        isSearch: true,
        defSearch: true,
        show: true,
        fixed: null,
        relations: 'eq,contains,notContains'
    },
    {
        title: 'i18n:basic.multiLang.field.text',
        dataIndex: 'langText',
        key: 'langText',
        width: 220,
        isSearch: true,
        defSearch: true,
        show: true,
        fixed: null,
        relations: 'eq,contains,notContains'
    },
    {
        title: 'i18n:common.table.column.operation',
        dataIndex: 'action',
        width: 100,
        key: 'id',
        scopedSlots: { customRender: 'action' },
        isSearch: false,
        defSearch: false,
        show: true,
        fixed: 'right'
    }
]

export default {
    name: 'RoleIndex',
    components: { EditModal },
    // mixins: [],
    data () {
        return {
            // 搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                return searchMultiLang(requestParameters).then(res => res.data)
            },
            selectedRowKeys: [],
            columns: handleJsonColumns(defaultColumns, this)
        }
    },
    // 组件创建完成
    created () {},
    // 组件挂载完成
    async mounted () {
        await dictGroup('multiLang')
        this.getTableColumns()
    },
    methods: {
        resetForm () {},
        getCustomParams (customParam) {
            this.queryParam = customParam
            this.$refs.table.refresh()
        },
        searchTable () {
            // 如果需要表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.queryParam = values
                    this.$refs.table.refresh()
                }
            })
        },
        // 删除数据
        deleteData () {
            const keys = this.selectedRowKeys
            const _this = this
            this.$confirm({
                title: '信息提示',
                content: '确认要删除选中的数据吗?',
                onOk () {
                    return deleteMultiLang(keys).then(response => {
                        // 判断状态码
                        if (response.success) {
                            // 操作成功
                            _this.$message.success(response.msg, response.msgParams)
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(response.msg, response.msgParams)
                        }
                    })
                }
            })
        },
        // 获取TableHead，该功能暂未实现
        getTableColumns () {
            // getRoleColumns()
            //     .then(res => {
            //         // 如果用户有保存 则使用用户的数据 否则不修改默认columns
            //         // if(res.xxx){ this.columns = res.xxx }
            //         // this.columns = handleJsonColumns(getTempRoleColumns(), this)
            //     })
            //     .catch(() => {
            //         // this.columns = handleJsonColumns(getTempRoleColumns())
            //     })
        }
    }
}
</script>
