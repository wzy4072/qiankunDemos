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
        <template slot="netbankCfcaDate" slot-scope="text, row">
          <span>{{ dateFormatter(row.netbankCfcaDate) }}</span>
        </template>
        <template slot="action" slot-scope="text, row">
          <a @click="viewDetail(row)">{{ $t('common.btn.view') }}</a>
          <a @click="$refs.editModal.showModal(row.id)" style="margin-left: 10px">{{
            $t('common.btn.edit') }}</a>
          <span v-if="row.isSystem == '0' || row.isSystem == null">
            <a @click="deleteData(row.id)" style="margin-left: 10px">{{ $t('common.btn.delete') }}</a>
          </span>
        </template>
        <template slot="stitle">
          <a-button
            @click="$refs.editModal.showModal(null)"
            type="primary"
          >{{ $t('common.btn.add') }}
          </a-button>
          <a-dropdown :disabled="selectedRowKeys.length === 0">
            <a-menu slot="overlay">
              <a-menu-item @click="()=> deleteData()">{{ $t('common.btn.delete') }}</a-menu-item>
            </a-menu>
            <a-button>
              {{ $t('common.btn.moreOperation') }}
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </template>
      </s-table>
    </a-card>
    <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
    <descriptions-modal ref="DescriptionsModal"></descriptions-modal>
  </page-header-wrapper>
</template>
<script>

    import EditModal from '@/views/basic/bankType/edit'
    import { deleteBtBankType, searchBtBankType } from '@/api/bankType'
    import DescriptionsModal from '@/components/Descriptions/DescriptionsModal'
    import IndexTbHead from './Indexs/IndexTbHead'
    import formItemConfigs from './Indexs/IndexTbSearch'
    import { handleJsonColumns } from '@/utils/util'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    // 1 查询TableHead
    // 2 查询TableData
    // 3/4/5 查询/保存/删除常用参数
    // 6 修改或者保存TableHead
    // 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

    const defaultColumns = [
        {
            title: 'i18n:basic.bankType.bankType',
            dataIndex: 'bankType',
            key: 'bankType',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            relations: 'eq,neq'
        },
        {
            title: 'i18n:basic.bankType.typeName',
            dataIndex: 'typeName',
            key: 'typeName',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            relations: 'eq,neq'
        },
        {
            title: 'i18n:basic.bankType.bankPrefix',
            dataIndex: 'bankPrefix',
            key: 'bankPrefix',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bankType.bankNamePrefix',
            dataIndex: 'bankNamePrefix',
            key: 'bankNamePrefix',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bankType.isDomesticBank',
            dataIndex: 'isDomesticBank',
            key: 'isDomesticBank',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            relations: 'eq',
            scopedSlots: { customRender: 'isDomesticBank' },
            customRender: function (text, row) {
                return dict('yesOrNo', text)
            }
        },
        {
            title: 'i18n:basic.bankType.netbankCfcaDate',
            dataIndex: 'netbankCfcaDate',
            key: 'netbankCfcaDate',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            relations: 'eq,neq',
            scopedSlots: { customRender: 'netbankCfcaDate' }
        },
        {
            title: 'i18n:basic.bankType.rmk',
            dataIndex: 'rmk',
            key: 'rmk',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bankType.validSign',
            dataIndex: 'validSign',
            key: 'validSign',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            relations: 'eq',
            scopedSlots: { customRender: 'validSign' },
            customRender: function (text, row) {
                return dict('yesOrNo', text)
            }
        },
        {
            title: `()=>actionTitle`,
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
        name: 'BtBankTypeIndex',
        components: { EditModal, DescriptionsModal },
        mixins: [IndexTbHead],
        data () {
            return {
                // 搜索 展开/关闭
                advanced: false,
                // 查询参数
                queryParam: {
                    bankType: '',
                    typeName: '',
                    bankPrefix: '',
                    rmk: '',
                    validSign: '',
                    isSystem: '',
                    netbankCfcaDate: '',
                    isDomesticBank: '',
                    bankNamePrefix: '',
                    icon: '',
                    gradient: '',
                    tenantId: ''
                },
                // 加载数据方法 必须为 Promise 对象
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    const requestParameters = Object.assign({}, parameter, this.queryParam)
                    return searchBtBankType(requestParameters).then(res => res.data)
                },
                selectedRowKeys: [],
                columns: handleJsonColumns(defaultColumns, this),
                formItemConfigs
            }
        },
        // 组件创建完成
        created () {
        },
        // 组件挂载完成
        async mounted () {
            this.getTableColumns()
            await dictGroup('yesOrNo')
        },
        methods: {
            dateFormatter (date) {
                // Object对象转为日期格式
                date = new Date(date)
                var strDate = date.getFullYear() + '-'
                var month = date.getMonth() + 1
                var day = date.getDate()
                var hours = date.getHours()
                var minutes = date.getMinutes()
                var seconds = date.getSeconds()
                // 格式化日期,月日时分秒保持两位
                strDate =
                    strDate + ' ' +
                    (month > 8 ? month : '0' + month) +
                    '-' +
                    (day > 9 ? day : '0' + day)
                if (strDate == '1970- 01-01') {
                    return ' '
                }
                return strDate
            },
            resetForm () {
            },
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
            deleteData (id) {
                const keys = id ? [id] : [...this.selectedRowKeys]
                const _this = this
                this.$confirm({
                    title: _this.$t('common.tips.information'),
                    content: _this.$t('common.confirm.delete'),
                    onOk () {
                        return deleteBtBankType(keys).then(response => {
                            // 判断状态码
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
            viewDetail (row) {
                var _this = this
                this.$refs.DescriptionsModal.show({
                    descProps: {
                        title: this.$t('common.title.detail')
                    },
                    descItems: [
                        { label: this.$t('basic.bankType.bankType'), value: row.bankType, span: 2 },
                        { label: this.$t('basic.bankType.typeName'), value: row.typeName, span: 2 },
                        { label: this.$t('basic.bankType.bankPrefix'), value: row.bankPrefix, span: 2 },
                        { label: this.$t('basic.bankType.bankNamePrefix'), value: row.bankNamePrefix, span: 2 },
                        {
                            label: this.$t('basic.bankType.netbankCfcaDate'),
                            value: _this.dateFormatter(row.netbankCfcaDate),
                            span: 2
                        },
                        { label: this.$t('basic.bankType.rmk'), value: row.rmk, span: 2 },
                        { label: this.$t('common.field.validSign'), value: dict('validSign', row.validSign), span: 2 },
                        {
                            label: this.$t('basic.bankType.isDomesticBank'),
                            value: dict('validSign', row.isDomesticBank),
                            span: 2
                        }
                    ]
                })
            }
        }
    }
</script>
