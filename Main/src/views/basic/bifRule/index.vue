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
        :dynamicData="dynamicData"
        @updateClumns="getTableColumns"
        @getCustomParams="getCustomParams"
      >
        <template slot="action" slot-scope="text, row">
          <a @click="viewDetail(row)">{{ $t('common.btn.view') }}</a>
          <a @click="$refs.editModal.showModal(row.id)" style="margin-left: 10px">{{
            $t('common.btn.edit') }}</a>
          <a @click="deleteData(row.id)" style="margin-left: 10px">{{ $t('common.btn.delete') }}</a>
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

    import EditModal from '@/views/basic/bifRule/edit'
    import { deleteBisBifRule, searchBisBifRule } from '@/api/bifRule'
    import { listBisbif } from '@/api/basic/bisbif'
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
            title: 'i18n:basic.bifRule.bifCode',
            dataIndex: 'bifCode',
            key: 'bifCode',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            relations: 'eq,neq'
        },
        {
            title: 'i18n:basic.bifRule.bifName',
            dataIndex: 'bifName',
            key: 'bifName',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.payerName',
            dataIndex: 'payerName',
            key: 'payerName',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.payerAcc',
            dataIndex: 'payerAcc',
            key: 'payerAcc',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.payerBank',
            dataIndex: 'payerBank',
            key: 'payerBank',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.payeeName',
            dataIndex: 'payeeName',
            key: 'payeeName',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.payeeAcc',
            dataIndex: 'payeeAcc',
            key: 'payeeAcc',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.payeeBank',
            dataIndex: 'payeeBank',
            key: 'payeeBank',
            isSearch: false,
            width: 220,
            defSearch: false,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.purpose',
            dataIndex: 'purpose',
            key: 'purpose',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.addWord',
            dataIndex: 'addWord',
            key: 'addWord',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bifRule.isPurpose',
            dataIndex: 'isPurpose',
            key: 'isPurpose',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            scopedSlots: { customRender: 'isPurpose' },
            customRender: function (text, row) {
                return dict('yesOrNo', text)
            }
        },
        {
            title: 'i18n:basic.bifRule.isBankOnline',
            dataIndex: 'isBankOnline',
            key: 'isBankOnline',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            scopedSlots: { customRender: 'isBankOnline' },
            customRender: function (text, row) {
                return dict('yesOrNo', text)
            }
        },
        {
            title: 'i18n:basic.bifRule.sendNum',
            dataIndex: 'sendNum',
            key: 'sendNum',
            isSearch: false,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
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
        name: 'BisBifRuleIndex',
        components: { EditModal, DescriptionsModal },
        mixins: [IndexTbHead],
        data () {
            return {
                // 搜索 展开/关闭
                advanced: false,
                dynamicData: {
                    bifCode: []
                },
                // 查询参数
                queryParam: {},
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    const requestParameters = Object.assign({}, parameter, this.queryParam)
                    return searchBisBifRule(requestParameters).then(res => res.data)
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
            this.getBifInitList()
            this.getTableColumns()
            await dictGroup('yesOrNo')
        },
        methods: {
            getBifInitList () {
                listBisbif().then(res => {
                    if (res.success) {
                        this.dynamicData.bifCode = res.data.map(({ bifCode, name }) => ({
                            value: bifCode,
                            label: name
                        }))
                    }
                })
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
                        return deleteBisBifRule(keys).then(response => {
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
                        { label: this.$t('basic.bifRule.bifCode'), value: row.bifCode, span: 2 },
                        { label: this.$t('basic.bifRule.bifName'), value: row.bifName, span: 2 },
                        { label: this.$t('basic.bifRule.payerName'), value: row.payerName, span: 2 },
                        { label: this.$t('basic.bifRule.payerAcc'), value: row.payerAcc, span: 2 },
                        { label: this.$t('basic.bifRule.payerBank'), value: row.payerBank, span: 2 },
                        { label: this.$t('basic.bifRule.payeeName'), value: row.payeeName, span: 2 },
                        { label: this.$t('basic.bifRule.payeeAcc'), value: row.payeeAcc, span: 2 },
                        { label: this.$t('basic.bifRule.payeeBank'), value: row.payeeBank, span: 2 },
                        { label: this.$t('basic.bifRule.purpose'), value: row.purpose, span: 2 },
                        { label: this.$t('basic.bifRule.addWord'), value: row.addWord, span: 2 },
                        { label: this.$t('basic.bifRule.isPurpose'), value: dict('yesOrNo', row.isPurpose), span: 2 },
                        {
                            label: this.$t('basic.bifRule.isBankOnline'),
                            value: dict('yesOrNo', row.isBankOnline),
                            span: 2
                        },
                        { label: this.$t('basic.bifRule.sendNum'), value: row.sendNum, span: 2 }
                    ]
                })
            }
        }
    }
</script>
