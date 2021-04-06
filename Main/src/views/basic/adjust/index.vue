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
              <a-form-model-item label="汇率类型" prop="rateType">
                <a-select v-model="queryParam.typeId" placeholder="请选择">
                  <a-select-option v-for="item in typeIds" :key="item.id" :value="item.id">
                    {{ item.typeName }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="标准币种" prop="curId">
                <a-select v-model="queryParam.curId" placeholder="请选择">
                  <a-select-option v-for="item in curIds" :key="item.id" :value="item.id">
                    {{ item.curName }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="报价币种" prop="referCurId">
                <a-select v-model="queryParam.referCurId" placeholder="请选择">
                  <a-select-option v-for="item in curIds" :key="item.id" :value="item.id">
                    {{ item.curName }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="执行日期">
                <a-range-picker
                  ref="preTime"
                  :format="dateFormat"
                  v-model="queryParam.date"
                  @change="onChangeTime"
                />
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="状态" prop="status">
                <a-select v-model="queryParam.status" placeholder="请选择">
                  <a-select-option
                    v-for="item in status"
                    :key="item.value"
                    :value="item.value">{{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
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
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: keys => (selectedRowKeys = keys)
        }"
        :data="loadData"
        :formItemConfigs="formItemConfigs"
        @updateColumns="getTableColumns"
        @getCustomParams="getCustomParams"
      >
        <template slot="action" slot-scope="text, row">
          <a @click="viewDetail(row)">{{ $t('common.btn.view') }}</a><a-divider v-if="row.status == '暂存' || row.status == '打回'" type="vertical"/>
          <a @click="$refs.editModal.showModal(row.id)" v-if="row.status == '暂存' || row.status == '打回'">{{ $t('common.btn.edit') }}</a><a-divider v-if="row.status == '暂存' || row.status == '打回'" type="vertical"/>
          <a @click="deleteRowData(row.id)" v-if="row.status == '暂存' || row.status == '打回'">{{ $t('common.btn.delete') }}</a>
        </template>
        <template slot="stitle">
          <a-button
            @click="$refs.editModal.showModal(null)"
            type="primary"
          >{{ $t('common.btn.add') }}
          </a-button>
          <a-button
            @click="batchCommit"
            type="primary"
          >批量提交
          </a-button>
          <a-dropdown :disabled="selectedRowKeys.length === 0">
            <!--<a-menu slot="overlay">-->
            <!--<a-menu-item @click="deleteData">{{ $t('common.btn.delete') }}</a-menu-item>-->
            <!--</a-menu>-->
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
import moment from 'moment'
import dateUtil from '@/utils/date'
import EditModal from '@/views/basic/adjust/edit'
import { deleteAdjust, searchAdjust, batchCommit, listRateType, listCruId } from '@/api/adjust'
// import IndexTbHead from './Indexs/IndexTbHead'
import formItemConfigs from './Indexs/IndexTbSearch'
import DescriptionsModal from '@/views/basic/adjust/DescriptionsModal'
import { handleJsonColumns } from '@/utils/util'
moment.locale('zh-cn')
// 1 查询TableHead
// 2 查询TableData
// 3/4/5 查询/保存/删除常用参数
// 6 修改或者保存TableHead
// 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

const defaultColumns = [
    {
        title: '汇率类型',
        dataIndex: 'typeId',
        key: 'typeId',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
      title: '标准币种',
      dataIndex: 'curId',
      key: 'curId',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: '报价币种',
      dataIndex: 'referCurId',
      key: 'referCurId',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: '执行日期',
      dataIndex: 'preTime',
      key: 'preTime',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null,
        customRender: (text, row, index) => dateUtil.dateTime(row.preTime)
    },
    {
      title: '原汇率',
      dataIndex: 'oldExchangeRate',
      key: 'oldExchangeRate',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: '即期汇率',
      dataIndex: 'newExchangeRate',
      key: 'newExchangeRate',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: '汇买价',
      dataIndex: 'foreignExchangePurchase',
      key: 'foreignExchangePurchase',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: '汇卖价',
      dataIndex: 'foreignExchangeSell',
      key: 'foreignExchangeSell',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
      title: '中间价',
      dataIndex: 'foreignExchangeMiddle',
      key: 'foreignExchangeMiddle',
      isSearch: true,
      width: 220,
      defSearch: true,
      show: true,
      fixed: null
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: '备注',
        dataIndex: 'rmk',
        key: 'rmk',
        isSearch: true,
        width: 220,
        defSearch: true,
        show: true,
        fixed: null
    },
    {
        title: 'i18n:common.field.action',
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
    name: 'AdjustIndex',
    components: { EditModal, DescriptionsModal },
    // mixins: [IndexTbHead],
    data () {
        return {
            typeIds: [],
            curIds: [],
            startDate: new Date(),
            endDate: new Date(),
            dateFormat: 'YYYY-MM-DD',
            // 搜索 展开/关闭
            advanced: false,
            // 查询参数
            queryParam: {},
            // 加载数据方法 必须为 Promise 对象
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)
                if (requestParameters.date) {
                    requestParameters.createdTime = dateUtil.dateTime(requestParameters.date[0])
                    requestParameters.createdTimeEnd = dateUtil.dateTime(requestParameters.date[1])
                }
                return searchAdjust(requestParameters).then(res => {
                    if (!res.success) {
                        this.$message.warning(res.msg)
                    } else {
                        res.data.content.map(item => {
                                if (item.status == '95') {
                                    item.status = '复核通过'
                                } else if (item.status == '11') {
                                    item.status = '待复核'
                                } else if (item.status == '-1') {
                                    item.status = '打回'
                                } else if (item.status == '0') {
                                    item.status = '暂存'
                                }
                            this.typeIds.map(e => {
                                if (e.id == item.typeId) {
                                    item.typeId = e.typeName
                                }
                            })
                            this.curIds.map(e => {
                                if (e.id == item.curId) {
                                    item.curId = e.curName
                                }
                                if (e.id == item.referCurId) {
                                    item.referCurId = e.curName
                                }
                            })
                            }
                        )
                    }
                    return res.data
                })
            },
            selectedRowKeys: [],
            columns: handleJsonColumns(defaultColumns, this),
            formItemConfigs,
            status: [
                {
                    value: '0',
                    label: '暂存'
                },
                {
                    value: '-1',
                    label: '打回'
                },
                {
                    value: '11',
                    label: '待复核'
                },
                {
                    value: '95',
                    label: '复核通过'
                }
            ]
        }
    },
    // 组件创建完成
    created () {
        this.listRateType()
        this.listCruId()
    },
    // 组件挂载完成
    mounted () {
        this.getTableColumns()
    },
    computed: {
        getValueSting () {
            // 当有null或“” placeholder不显示
            return this.value != null ? this.value.toString() : undefined
        }
    },
    methods: {
        listRateType () {
            var _this = this
            listRateType().then(res => {
                if (res.success) {
                    _this.typeIds = res.data
                } else {
                    _this.typeIds = []
                }
            })
        },
        listCruId () {
            var _this = this
            listCruId().then(res => {
                if (res.success) {
                    _this.curIds = res.data
                } else {
                    _this.curIds = []
                }
            })
        },
        resetForm () {},
        getCustomParams (customParam) {
            this.queryParam = customParam
            this.$refs.table.refresh()
        },
        searchTable () {
            // 如果需要表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log(JSON.stringify(values))
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
                    return deleteAdjust(keys).then(response => {
                        // 判断状态码
                        if (response.success) {
                            // 操作成功
                            _this.$message.success('删除成功')
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(response.msg)
                        }
                    })
                }
            })
        },
        // 批量提交
        batchCommit () {
            var aa = []
            const keys = this.selectedRowKeys
            const _this = this
            aa = document.getElementsByClassName('ant-table-row-selected ant-table-row ant-table-row-level-0')
            for (let i = 0; i < aa.length; i++) {
                if (aa[i].children.length > 6 && aa[i].children[10].innerText == '复核通过' || aa[i].children.length > 6 && aa[i].children[10].innerText == '待复核') {
                    _this.$message.error('只能提交暂存和打回状态数据')
                    return
                }
            }

            this.$confirm({
                title: '信息提示',
                content: '确认要提交选中的数据吗?',
                onOk () {
                    return batchCommit(keys).then(response => {
                        // 判断状态码
                        if (response.success) {
                            // 操作成功
                            _this.$message.success('提交成功')
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(response.msg)
                        }
                    })
                }
            })
        },
        deleteRowData (id) {
            const keys = [id]
            const _this = this
            this.$confirm({
                title: '信息提示',
                content: '确认要删除吗?',
                onOk () {
                    return deleteAdjust(keys).then(response => {
                        // 判断状态码
                        if (response.success) {
                            // 操作成功
                            _this.$message.success('删除成功')
                            _this.$refs.table.refresh(true)
                        } else {
                            // 操作失败
                            _this.$message.error(response.msg)
                        }
                    })
                }
            })
        },
        // 获取TableHead
        getTableColumns () {

        },
        onChangeTime (dates, dateStrings) {
            const _this = this
            _this.startDate = dateStrings[0]
            _this.endDate = dateStrings[1]
        },
        viewDetail (row) {
            this.$refs.DescriptionsModal.show({
                descProps: {
                    title: '详情'
                },
                descItems: [
                    { label: '汇率类型', value: row.typeId, span: 2 },
                    { label: '标准币种', value: row.curId, span: 2 },
                    { label: '报价币种', value: row.referCurId, span: 2 },
                    { label: '执行日期', value: dateUtil.dateTime(row.preTime), span: 2 },
                    { label: '原汇率', value: row.oldExchangeRate, span: 2 },
                    { label: '即期汇率', value: row.newExchangeRate, span: 2 },
                    { label: '汇买价', value: row.foreignExchangePurchase, span: 2 },
                    { label: '汇卖价', value: row.foreignExchangeSell, span: 2 },
                    { label: '中间价', value: row.foreignExchangeMiddle, span: 2 },
                    { label: '备注', value: row.rmk, span: 2 }
                ]
            })
        }
    }
}
</script>
