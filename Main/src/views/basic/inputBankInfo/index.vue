<style scoped>
.date-container /deep/ .ant-form-item-children > span {
    width: 100% !important;
}
</style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('pay.nisPersonnelDetail.field.bankCode')">
                <a-input v-model="queryParam.sysBankCode" :placeholder="$t('pay.nisPersonnelDetail.field.bankCode')"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('pay.nisPersonnelDetail.field.bankName')">
                <a-input v-model="queryParam.bankName" :placeholder="$t('pay.nisPersonnelDetail.field.bankName')"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <!-- 查询按钮 -->
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('common.btn.query') }}</a-button>
                <!-- 重置按钮 -->
                <a-button
                  style="margin-left: 8px"
                  @click="() => {this.queryParam = {};$refs.table.refresh(true)}">{{ $t('common.btn.reset') }}</a-button>
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
          <a-button type="link" size="small" @click="infoSee(row)">查看</a-button>
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
      <Descriptions ref="Descriptions"></Descriptions>
    </a-card>
    <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
  </page-header-wrapper>
</template>
<script>

import EditModal from '@/views/basic/inputBankInfo/edit'
import Descriptions from '@/views/basic/inputBankInfo/Descriptions'
import { deleteInfo, searchInfo } from '@/api/inputBankInfo'

import IndexTbHead from './Indexs/IndexTbHead'
import formItemConfigs from './Indexs/IndexTbSearch'
import { handleJsonColumns } from '@/utils/util'
// 1 查询TableHead
// 2 查询TableData
// 3/4/5 查询/保存/删除常用参数
// 6 修改或者保存TableHead
// 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

const defaultColumns = [
    {
      title: 'i18n:pay.nisPersonnelDetail.field.bankCode',
      dataIndex: 'sysBankCode',
      key: 'sysBankCode',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: 'i18n:pay.nisPersonnelDetail.field.bankName',
      dataIndex: 'bankName',
      key: 'bankName',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: 'i18n:pay.nisPersonnelDetail.field.prov',
      dataIndex: 'provName',
      key: 'provName',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: 'i18n:pay.nisPersonnelDetail.field.city',
      dataIndex: 'cityName',
      key: 'cityName',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: 'i18n:common.table.column.operation',
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
    name: 'InfoIndex',
    components: { EditModal, Descriptions },
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
                return searchInfo(requestParameters).then(res => res.data)
            },
            selectedRowKeys: [],
            columns: handleJsonColumns(defaultColumns, this),
            formItemConfigs
        }
    },
    // 组件创建完成
    created () {},
    // 组件挂载完成
    mounted () {
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
                    return deleteInfo(keys).then(response => {
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
        // 查看数据
        infoSee (row) {
            this.$refs.Descriptions.show({
                descProps: {
                    title: '信息'
                },
                descItems: [
                    { label: this.$t('pay.nisPersonnelDetail.field.bankCode'), value: row.sysBankCode, span: 2 },
                    { label: this.$t('pay.nisPersonnelDetail.field.bankName'), value: row.bankName, span: 2 },
                    { label: this.$t('pay.nisPersonnelDetail.field.prov'), value: row.provName, span: 2 },
                    { label: this.$t('pay.nisPersonnelDetail.field.city'), value: row.cityName, span: 2 }
                ]
            })
        }
    }
}
</script>
