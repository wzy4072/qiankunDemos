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
                            <a-form-item :label="$t('basic.currency.field.curCode')">
                                <a-input
                                    v-model="queryParam.curCode"
                                    :placeholder="$t('basic.currency.field.curCode')" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item :label="$t('basic.currency.field.curName')">
                                <a-input
                                    v-model="queryParam.curName"
                                    :placeholder="$t('basic.currency.field.curName')" />
                            </a-form-item>
                        </a-col>

                        <!--展开搜索-->

                        <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                  class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <!-- 查询按钮 -->
                <a-button
                    type="primary"
                    @click="$refs.table.refresh(true)">{{ $t('common.search.button.query') }}</a-button>
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
            <div class="table-operator">
                <a-button @click="$refs.editModal.showModal(null)" type="primary">{{ $t('common.btn.add') }}
                </a-button>
                <a-dropdown :disabled="selectedRowKeys.length===0">
                    <a-menu slot="overlay">
                        <a-menu-item @click="deleteData">{{ $t('common.btn.delete') }}</a-menu-item>
                    </a-menu>
                    <a-button> {{ $t('common.btn.moreOperation') }}
                        <a-icon type="down" />
                    </a-button>
                </a-dropdown>
            </div>
            <s-table
                ref="table"
                size="default"
                rowKey="id"
                showPagination="auto"
                :columns="columns"
                :rowSelection="rowSelection"
                :data="loadData">
                <template slot="action" slot-scope="text, row">
                    <a @click="$refs.editModal.showModal(row.id)">{{ $t('common.btn.edit') }}</a>

                    <!--<a @click="$refs.editModal.showModal(row.id)">{{$t('common.btn.get')}}</a>-->

                    <a-button type="link" size="small" @click="detailItem(row)">查看</a-button>
                </template>

            </s-table>
            <DescriptionsModal ref="DescriptionsModal"></DescriptionsModal>
        </a-card>
        <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
    </page-header-wrapper>
</template>
<script>
import { dict, dictGroup } from '@/components/Dict/dictUtil'
import { i18nRender } from '@/locales'
import EditModal from '@/views/basic/currency/edit'
import { deleteCurrency, searchCurrency } from '@/api/currency'
import DescriptionsModal from '@/views/basic/currency/DescriptionsModal'

export default {
    name: 'DataList',
    components: { EditModal, DescriptionsModal },
    data () {
        return {
            // 搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                return searchCurrency(requestParameters).then(res => res.data)
            },
            selectedRowKeys: []
        }
    },
    // 组件创建完成
    created () {
    },
    // 组件挂载完成
    async mounted () {
        await dictGroup('yesOrNo', 'validSign', 'btCurrency.nonWorkDay', 'btCurrency.nonWorkDayRule')
        //  this.getTableColumns()
        this.$refs.table.refresh()
    },
    computed: {
        columns () {
            return [
                {
                    title: () => i18nRender('basic.currency.field.curCode'),
                    dataIndex: 'curCode',
                    key: 'curCode',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.curName'),
                    dataIndex: 'curName',
                    key: 'curName',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.englishCode'),
                    dataIndex: 'englishCode',
                    key: 'englishCode',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.curExrate'),
                    dataIndex: 'curExrate',
                    key: 'curExrate',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.curSign'),
                    dataIndex: 'curSign',
                    key: 'curSign',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.naturalSign'),
                    dataIndex: 'naturalSign',
                    key: 'naturalSign',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null,
                    customRender: function (text, row, index) {
                        if (!row.naturalSign) {
                            return ''
                        }
                        // 是否配置
                        var naturalSign = row.naturalSign
                        naturalSign = dict('yesOrNo', naturalSign)
                        return naturalSign
                    }
                },
                {
                    title: () => i18nRender('basic.currency.field.pbScaleCode'),
                    dataIndex: 'pbScaleCode',
                    key: 'pbScaleCode',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.rmk'),
                    dataIndex: 'rmk',
                    key: 'rmk',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null
                },
                {
                    title: () => i18nRender('basic.currency.field.validSign'),
                    dataIndex: 'validSign',
                    key: 'validSign',
                    isSearch: true,
                    width: 220,
                    defSearch: true,
                    show: true,
                    fixed: null,
                    customRender: function (text, row, index) {
                        if (!row.validSign) {
                            return ''
                        }
                        // 有效配置
                        var validSign = row.validSign
                        validSign = dict('validSign', validSign)
                        return validSign
                    }
                },
                {
                    title: () => this.$i18n.t('common.field.action'),
                    dataIndex: 'id',
                    width: '220px',
                    show: true,
                    key: 'id',
                    scopedSlots: { customRender: 'action' }
                }
            ]
        },
        rowSelection () {
            return {
                selectedRowKeys: this.selectedRowKeys,
                onChange: (keys) => this.selectedRowKeys = keys
            }
        }
    },
    methods: {
        // 删除数据
        deleteData () {
            const keys = this.selectedRowKeys
            const _this = this
            this.$confirm({
                title: this.$t('common.title.detail'),
                content: this.$t('common.confirm.delete'),
                onOk () {
                    return deleteCurrency(keys).then((response) => {
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
        },
        detailItem (row) {
            row.nonworkDayRule = dict('btCurrency.nonWorkDayRule', row.nonworkDayRule)
            row.validSign = dict('validSign', row.validSign)
            this.$refs.DescriptionsModal.show({
                descProps: {
                    title: this.$t('common.title.detail')
                },
                descItems: [
                    { label: this.$t('basic.currency.field.curCode'), value: row.curCode, span: 2 },
                    { label: this.$t('basic.currency.field.curName'), value: row.curName, span: 2 },
                    { label: this.$t('basic.currency.field.englishCode'), value: row.englishCode, span: 2 },
                    { label: this.$t('basic.currency.field.curExrate'), value: row.curExrate, span: 2 },
                    { label: this.$t('basic.currency.field.curSign'), value: row.curSign, span: 2 },
                    { label: this.$t('basic.currency.field.pbScaleCode'), value: row.pbScaleCode, span: 2 },
                    { label: this.$t('basic.currency.field.rmk'), value: row.rmk, span: 2 },
                    { label: this.$t('basic.currency.field.validSign'), value: row.validSign, span: 2 },
                    { label: this.$t('basic.currency.field.nonworkDayRule'), value: row.nonworkDayRule, span: 2 },
                    { label: this.$t('basic.currency.field.nonworkDay'), value: row.nonworkDay, span: 2 }
                ]
            })
        }
    }
}
</script>
