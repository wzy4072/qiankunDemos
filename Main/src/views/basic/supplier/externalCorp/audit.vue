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
              <a-form-model-item :label="$t('basic.externalCorp.filed.code')" prop="code">
                <a-input v-model="queryParam.code" />
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item :label="$t('basic.externalCorp.filed.name')" prop="name">
                <a-input v-model="queryParam.name" />
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item :label="$t('basic.externalCorp.filed.sourceSystem')" prop="sourceSystem">
                <dict-select
                  v-model="queryParam.sourceSystem"
                  dictGroup="btExternalCorp.sourceSystem"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item :label="$t('basic.externalCorp.filed.bwType')" prop="bwType">
                <dict-select
                  v-model="queryParam.bwType"
                  dictGroup="btExternalCorp.bwType"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="状态" prop="auditStatus">
                <dict-select
                  v-model="queryParam.auditStatus"
                  dictGroup="btExternalCorp.auditStatus"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item :label="$t('basic.externalCorp.filed.isCommon')" prop="isCommon">
                <dict-select
                  v-model="queryParam.isCommon"
                  dictGroup="yesOrNo"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="queryParam.isCommon === '0'">
              <a-form-model-item :label="$t('basic.externalCorp.filed.corpId')" prop="corpId">
                <CorpTreeSelect :checkable="false" v-model="queryParam.corpId"></CorpTreeSelect>
              </a-form-model-item>
            </a-col>

            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <!-- 查询按钮 -->
                <a-button
                  type="primary"
                  @click="$refs.table.refresh(true)">{{ $t('common.btn.query') }}</a-button>
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
          <a @click="auditItem(row.id)">{{ $t('basic.externalCorp.btn.audit') }}</a>
          <a-divider type="vertical" />
          <a @click="detailItem(row.id)">{{ $t('common.btn.view') }}</a>
        </template>
        <template slot="stitle">
          <a-dropdown :disabled="selectedRowKeys.length === 0">
            <a-menu slot="overlay">
              <a-menu-item @click="batchAudit('95')">{{ $t('basic.externalCorp.btn.audit') }}</a-menu-item>
              <a-menu-item @click="batchAudit('-1')">{{ $t('basic.externalCorp.btn.back') }}</a-menu-item>
            </a-menu>
            <a-button>
              {{ $t('common.btn.moreOperation') }}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </template>
      </s-table>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" :title="$t('basic.externalCorp.title.auditMessage')">
      <a-row type="flex" justify="center" align="top">
        <a-col span="12">
          <a-form-model-item ref="attachmentId" :label="$t('basic.externalCorp.title.auditMessage')" prop="attachmentId">
            <a-input type="textarea" v-model="queryParam.auditMessage"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { STable } from '@/components'

import { auditConditions, audit } from '@/api/basic/supplier/externalCorp'
import { dict, dictGroup } from '@/components/Dict/dictUtil'

import IndexTbHead from './Indexs/IndexTbHead'
import formItemConfigs from './Indexs/IndexTbSearch'
import { handleJsonColumns } from '@/utils/util'
import CorpTreeSelect from '@/components/SelectTree/CorpTreeSelect'
import { i18nRender } from '@/locales'
// 1 查询TableHead
// 2 查询TableData
// 3/4/5 查询/保存/删除常用参数
// 6 修改或者保存TableHead
// 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

const defaultColumns = [
    {
        title: () => i18nRender('basic.externalCorp.filed.code'),
        dataIndex: 'code',
        key: 'code',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
      title: () => i18nRender('basic.externalCorp.filed.name'),
      dataIndex: 'name',
      key: 'name',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: () => i18nRender('basic.externalCorp.filed.abbreviate'),
      dataIndex: 'abbreviate',
      key: 'abbreviate',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorp.filed.isNative'),
        dataIndex: 'isNative',
        key: 'isNative',
        isSearch: true,
        width: 220,
        customRender: function (text, row) {
            return dict('yesOrNo', row.isNative + '')
        },
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorp.filed.corpId'),
        dataIndex: 'corpId',
        key: 'corpId',
        isSearch: true,
        width: 220,
        customRender: function (text, row) {
            if (row.isCommon === '1') {
                return i18nRender('basic.externalCorp.title.commonCorp')
            }
            return row.corpName
        },
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorp.filed.isCommon'),
        dataIndex: 'isCommon',
        key: 'isCommon',
        isSearch: true,
        width: 220,
        customRender: function (text, row) {
            return dict('yesOrNo', row.isCommon)
        },
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorp.filed.sourceSystem'),
        dataIndex: 'sourceSystem',
        key: 'sourceSystem',
        isSearch: true,
        width: 220,
        customRender: function (text, row) {
            return dict('btExternalCorp.sourceSystem', row.sourceSystem)
        },
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorp.filed.status'),
        dataIndex: 'status',
        key: 'status',
        isSearch: true,
        width: 220,
        customRender: function (text, row) {
            return dict('yesOrNo', row.status + '')
        },
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: () => i18nRender('basic.externalCorp.filed.isCommon'),
        dataIndex: 'externalType',
        key: 'externalType',
        isSearch: true,
        width: 220,
        customRender: function (text, row) {
            return dict('btExternalCorp.externalType', row.externalType)
        },
        defSearch: true,
        show: true,
        fixed: null
    },
    {
      title: () => i18nRender('basic.externalCorp.filed.supplierId'),
      dataIndex: 'supplierId',
      key: 'supplierId',
      isSearch: true,
      width: 220,
        customRender: function (text, row) {
            return row.supplierName
        },
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: () => i18nRender('basic.externalCorp.filed.auditStatus'),
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      isSearch: true,
      width: 220,
      customRender: function (text, row) {
          return dict('btExternalCorp.auditStatus', row.auditStatus + '')
      },
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
    name: 'ExternalCorpIndex',
    components: { STable, CorpTreeSelect },
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
                return auditConditions(requestParameters).then(res => res.data)
            },
            selectedRowKeys: [],
            columns: defaultColumns,
            formItemConfigs
        }
    },
    // 组件创建完成
    created () {},
    // 组件挂载完成
    async mounted () {
        this.getTableColumns()
        await dictGroup('btExternalCorp.sourceSystem')
        await dictGroup('yesOrNo')
        await dictGroup('btExternalCorp.bwType')
        await dictGroup('btExternalCorp.status')
        await dictGroup('btExternalCorp.externalType')
        this.$refs.table.refresh()
    },
    activated () {
        const { fullPath } = this.$route
        if (this.$store.getters.needRefresh(fullPath)) {
            // 刷新
            this.$refs.table.refresh(true)
            // 清除
            this.$store.commit('REMOVE_REFRESH_PATH', fullPath)
        }
    },
    methods: {
        auditItem (id) {
            const pageName = 'externalCorp'
            const pageSign = id
            const tabFullPath = `/commonEdit/${pageName}/id/${pageSign}`
            this.$store.commit('SET_ASYNC_TABS', {
                componentDirPath: '/basic/supplier/externalCorp/auditModal',
                props: { id },
                title: '复核客商资料',
                parentPath: this.$route.fullPath,
                tabFullPath // 必填 子组件的fullPath路径
            })
            this.$router.push({ path: tabFullPath })
        },
        detailItem (id) {
            const pageName = 'externalCorp'
            const pageSign = id
            const tabFullPath = `/commonEdit/${pageName}/id/${pageSign}`
            this.$store.commit('SET_ASYNC_TABS', {
                componentDirPath: '/basic/supplier/externalCorp/auditDetail',
                props: { id },
                title: '查看客商资料',
                parentPath: this.$route.fullPath,
                tabFullPath // 必填 子组件的fullPath路径
            })
            this.$router.push({ path: tabFullPath })
        },
        resetForm () {},
        // 获取TableHead
        getTableColumns () {},
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
        // 批量审核
        batchAudit (auditStatus) {
            const keys = this.selectedRowKeys
            const _this = this
            const params = {}
            params.ids = keys
            params.auditStatus = auditStatus
            params.auditMessage = this.queryParam.auditMessage
            this.$confirm({
                title: '信息提示',
                content: '确认要审核选中的数据吗?',
                onOk () {
                    return audit(params).then(response => {
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
        }
    }
}
</script>
