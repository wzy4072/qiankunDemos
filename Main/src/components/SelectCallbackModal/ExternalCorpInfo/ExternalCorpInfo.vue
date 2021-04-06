<style scoped>
    .date-container /deep/ .ant-form-item-children > span {
        width: 100% !important;
    }
    .query-table-container {
        /*background: #fff;*/
    }
    .query-table-body /deep/ .ant-table-small > .ant-table-title {
        display: none;
    }
    .query-form-item {
        margin-bottom: 10px;
        width: 100%;
    }
</style>
<template>
  <a-modal
    :maskClosable="false"
    :destroyOnClose="true"
    title="信息"
    :visible="visible"
    @cancel="visible = false"
    :footer="null"
    width="800px">
    <div class="query-table-container">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="12">
            <a-form-model-item :label="$t('basic.externalCorp.filed.name')" prop="externalName">
              <a-input v-model="queryParam.externalName" />
            </a-form-model-item>
          </a-col>
          <a-col :md="12">
            <a-form-model-item :label="$t('basic.externalCorpBankAcc.filed.externalAcc')" prop="externalAcc">
              <a-input v-model="queryParam.externalAcc" />
            </a-form-model-item>
          </a-col>
          <a-col :md="12">
            <a-form-model-item :label="$t('basic.externalCorp.filed.bwType')" prop="bwType">
              <dict-select
                v-model="queryParam.bwType"
                dictGroup="btExternalCorp.bwType"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" :style="{ textAlign: 'right',marginBottom: '24px'}">
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
      <s-table
        class="query-table-body"
        ref="table"
        border="true"
        size="small"
        rowKey="id"
        showPagination="auto"
        :columns="columns"
        :data="loadData"
        :formItemConfigs="formItemConfigs"
        @updateClumns="getTableColumns"
        @getCustomParams="getCustomParams"
      >
        <a slot="action" slot-scope="text, record" @click="selectedRow(record)">{{ $t('common.btn.select') }}</a>
      </s-table>
    </div>
  </a-modal>
</template>
<script>
import { searchExternalCorpInfo } from '@/api/basic/supplier/externalCorp'
import { dict, dictGroup } from '@/components/Dict/dictUtil'
import IndexTbHead from './Indexs/IndexTbHead'
import formItemConfigs from './Indexs/IndexTbSearch'
import { i18nRender } from '@/locales'
import { handleJsonColumns } from '@/utils/util'
// 1 查询TableHead
// 2 查询TableData
// 3/4/5 查询/保存/删除常用参数
// 6 修改或者保存TableHead
// 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

const defaultColumns = [
    {
        title: () => i18nRender('common.table.column.operation'),
        dataIndex: 'action',
        width: 60,
        key: 'id',
        scopedSlots: { customRender: 'action' },
        isSearch: false,
        defSearch: false,
        show: true,
        fixed: 'left'
    },
    {
      title: () => i18nRender('basic.externalCorp.filed.name'),
      dataIndex: 'externalName',
      key: 'externalName',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorpBankAcc.filed.externalAcc'),
        dataIndex: 'externalAcc',
        key: 'externalAcc',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorpBankAcc.filed.bank'),
        dataIndex: 'bank',
        key: 'bank',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorpBankAcc.filed.bankSourcecode'),
        dataIndex: 'bankSourcecode',
        key: 'bankSourcecode',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorpBankAcc.filed.accProvince'),
        dataIndex: 'accProvinceName',
        key: 'accProvinceName',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorpBankAcc.filed.accCity'),
        dataIndex: 'accCityName',
        key: 'accCityName',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
      title: () => i18nRender('basic.externalCorp.filed.bwType'),
      dataIndex: 'bwType',
      key: 'bwType',
      isSearch: true,
      width: 220,
      customRender: function (text, row) {
          return dict('btExternalCorp.bwType', row.bwType + '')
      },
      defSearch: true,
      show: true,
      fixed: null
    }
]

export default {
    name: 'ExternalCorpInfo',
    mixins: [IndexTbHead],
    data () {
        return {
            // 搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {
                corpId: ''
            },
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                return searchExternalCorpInfo(requestParameters).then(res => res.data)
            },
            selectedRowKeys: [],
            columns: handleJsonColumns(defaultColumns, this),
            formItemConfigs,
            visible: false
        }
    },
    // 组件创建完成
    created () {},
    // 组件挂载完成
    async mounted () {
        this.getTableColumns()
        await dictGroup('btExternalCorp.bwType')
        this.$refs.table && this.$refs.table.refresh()
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
        // 获取TableHead
        getTableColumns () {},
        showModal (corpId) {
            this.visible = true
            this.queryParam.corpId = corpId
            this.$refs.table && this.$refs.table.refresh()
        },
        selectedRow (row) {
            this.$emit('selectCallBack', row)
            this.visible = false
        }
    }
}
</script>
