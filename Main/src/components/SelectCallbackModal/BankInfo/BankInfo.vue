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
            <a-form-item :label="$t('pay.nisPersonnelDetail.field.bankCode')" class="query-form-item" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input v-model="queryParam.sysBankCode" :placeholder="$t('pay.nisPersonnelDetail.field.bankCode')"/>
            </a-form-item>
          </a-col>
          <a-col :md="12">
            <a-form-item :label="$t('pay.nisPersonnelDetail.field.bankName')" class="query-form-item" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input v-model="queryParam.bankName" :placeholder="$t('pay.nisPersonnelDetail.field.bankName')"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
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

    import { searchInfo } from '@/api/inputBankInfo'

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
            title: 'i18n:common.table.column.operation',
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
            title: 'i18n:basic.bisbifinit.field.typeId',
            dataIndex: 'typeName',
            key: 'typeName',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        }
    ]

    export default {
        name: 'BankInfo',
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
                formItemConfigs,
                visible: false
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
            // 获取TableHead
            getTableColumns () {
            },
            showModal () {
                this.visible = true
            },
            selectedRow (row) {
                this.$emit('selectCallBack', row)
                this.visible = false
            }
        }
    }
</script>
