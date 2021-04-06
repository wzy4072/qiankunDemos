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
          onChange: keys => (selectedRowKeys = keys)
        }"
        :data="loadData"
        :formItemConfigs="formItemConfigs"
        @updateClumns="getTableColumns"
        @getCustomParams="getCustomParams"
      >
        <template slot="action" slot-scope="text, row">
          <a @click="$refs.editModal.showModal(row.id)">{{ $t('common.btn.edit') }}</a>
            <a-divider v-if="row.auditStatus !== 11" type="vertical" />
          <a-button type="link" size="small" @click="detailItem(row)">{{ $t('common.btn.view') }}</a-button>
            <a-divider v-if="row.auditStatus !== 11" type="vertical" />
          <a-button type="link" size="small" @click="deleteItem(row.id)">{{ $t('common.btn.delete') }}</a-button>
        </template>
        <template slot="stitle">
          <a-button
            @click="$refs.editModal.showModal(null)"
            type="primary"
          >{{ $t('common.btn.add') }}
          </a-button>
          <a-dropdown :disabled="selectedRowKeys.length === 0">
            <a-menu slot="overlay">
              <a-menu-item @click="deleteData">{{ $t('common.btn.batch.delete') }}</a-menu-item>
            </a-menu>
            <a-button>
              {{ $t('common.btn.moreOperation') }}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </template>
      </s-table>
      <DescriptionsModal ref="DescriptionsModal"></DescriptionsModal>
    </a-card>
    <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
  </page-header-wrapper>
</template>
<script>

import EditModal from '@/views/basic/supplier/supplierType/edit'
import { deleteSupplierType, searchSupplierType } from '@/api/basic/supplier/supplierType'

import IndexTbHead from './Indexs/IndexTbHead'
import formItemConfigs from './Indexs/IndexTbSearch'
import { handleJsonColumns } from '@/utils/util'
import { dict, dictGroup } from '@/components/Dict/dictUtil'
import DescriptionsModal from './DescriptionsModal'
import { i18nRender } from '@/locales'
// 1 查询TableHead
// 2 查询TableData
// 3/4/5 查询/保存/删除常用参数
// 6 修改或者保存TableHead
// 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

const defaultColumns = [
    {
      title: () => i18nRender('basic.supplierType.filed.supplierCode'),
      dataIndex: 'supplierCode',
      key: 'supplierCode',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: () => i18nRender('basic.supplierType.filed.supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: () => i18nRender('common.field.rmk'),
      dataIndex: 'rmk',
      key: 'rmk',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: () => i18nRender('common.field.validSign'),
      dataIndex: 'validSign',
      key: 'validSign',
      isSearch: true,
      width: 220,
      customRender: function (text, row) {
          return dict('yesOrNo', row.validSign)
      },
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: () => i18nRender('common.table.column.operation'),
        dataIndex: 'action',
        width: 220,
        key: 'id',
        scopedSlots: { customRender: 'action' },
        isSearch: false,
        defSearch: false,
        show: true,
        fixed: 'right'
    }
]

export default {
    name: 'SupplierTypeIndex',
    components: { EditModal, DescriptionsModal },
    mixins: [IndexTbHead],
    data () {
        return {
            // 搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                return searchSupplierType(requestParameters).then(res => res.data)
            },
            selectedRowKeys: [],
            columns: handleJsonColumns(defaultColumns, this),
            formItemConfigs
        }
    },
    // 组件创建完成
    created () {},
    // 组件挂载完成
    async mounted () {
        // 加载指定字典组
        await dictGroup('yesOrNo')
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
                title: this.$t('common.title.info'),
                content: this.$t('common.confirm.delete'),
                onOk () {
                    return deleteSupplierType(keys).then(response => {
                        if (response.success) {
                            // 操作成功
                            _this.$message.success(_this.$t(response.msg))
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(_this.$t(response.msg))
                        }
                    })
                }
            })
        },
        // 删除数据
        deleteItem (id) {
            const keys = [ id ]
            const _this = this
            this.$confirm({
                title: this.$t('common.title.info'),
                content: this.$t('common.confirm.delete'),
                onOk () {
                    return deleteSupplierType(keys).then(response => {
                        if (response.success) {
                            // 操作成功
                            _this.$message.success(_this.$t(response.msg))
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(_this.$t(response.msg))
                        }
                    })
                }
            })
        },
        // 获取TableHead
        getTableColumns () {

        },
        detailItem (row) {
            this.$refs.DescriptionsModal.show({
                descProps: {
                    title: this.$t('basic.supplierType.title')
                },
                descItems: [
                    { label: this.$t('basic.supplierType.filed.supplierCode'), value: row.supplierCode, span: 2 },
                    { label: this.$t('basic.supplierType.filed.supplierName'), value: row.supplierName, span: 2 },
                    { label: this.$t('common.field.rmk'), value: row.rmk, span: 2 },
                    { label: this.$t('common.field.validSign'), value: dict('yesOrNo', row.validSign), span: 2 }
                ]
            })
        }
    }
}
</script>
