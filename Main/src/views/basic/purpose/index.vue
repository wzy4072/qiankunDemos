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
              <a-form-model-item :label="$t('basic.purpose.field.purpose')" prop="purpose">
                <a-input v-model="queryParam.purpose" />
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item :label="$t('basic.purpose.field.sysBusType')" prop="sysBusType">
                <dict-select
                  v-model="queryParam.sysBusType"
                  dictGroup="btPurpose.sysBusType"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item :label="$t('basic.purpose.field.corpId')" prop="corpId">
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
      >addPurpose
        <template slot="action" slot-scope="text, row">
          <a @click="viewDetail(row)">{{ $t('common.btn.view') }}</a>
          <a-divider type="vertical"/>
          <a @click="$refs.editModal.showModal(row.id)">{{ $t('common.btn.edit') }}</a>
          <a-divider type="vertical"/>
          <a @click="deleteData(row.id)">{{ $t('common.btn.delete') }}</a>
        </template>
        <template slot="stitle">
          <a-button
            @click="$refs.editModal.showModal(null)"
            type="primary"
          >{{ $t('common.btn.add') }}
          </a-button>
          <a-dropdown :disabled="selectedRowKeys.length === 0">
            <a-menu slot="overlay">
              <a-menu-item @click="deleteBatchData">{{ $t('common.btn.delete') }}</a-menu-item>
            </a-menu>
            <a-button>
              {{ $t('common.btn.moreOperation') }}
              <a-icon type="down"/>
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

    import EditModal from '@/views/basic/purpose/edit'
    import { deletePurpose, searchPurpose } from '@/api/basic/purpose'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    import CorpTreeSelect from '@/components/SelectTree/CorpTreeSelect'
    import IndexTbHead from './Indexs/IndexTbHead'
    import formItemConfigs from './Indexs/IndexTbSearch'
    import { handleJsonColumns } from '@/utils/util'
    import DescriptionsModal from '@/views/basic/purpose/DescriptionsModal'
    // 1 查询TableHead
    // 2 查询TableData
    // 3/4/5 查询/保存/删除常用参数
    // 6 修改或者保存TableHead
    // 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

    const defaultColumns = [
        {
            title: 'i18n:basic.purpose.field.purpose',
            dataIndex: 'purpose',
            key: 'purpose',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.purpose.field.sysBusType',
            dataIndex: 'sysBusType',
            key: 'sysBusType',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            customRender: function (text, row, index) {
                if (!row.sysBusType) {
                    return ''
                }
                // 分割用途所属类别组装输出
                const sysBusTypes = row.sysBusType.split(',')
                let sysBusType = ''
                sysBusTypes.map((busType) => {
                    if (sysBusType === '') {
                        sysBusType = dict('btPurpose.sysBusType', busType)
                    } else {
                        sysBusType += ',' + dict('btPurpose.sysBusType', busType)
                    }
                })
                return sysBusType
            }
        },
        {
            title: 'i18n:basic.purpose.field.corpId',
            dataIndex: 'corpName',
            key: 'corpName',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            customRender: function (text, row, index) {
                if (!row.corpName) {
                    return ''
                }
                const corps = row.corpName.split(',')
                if (corps.length > 2) {
                    return corps[0] + ',' + corps[1] + ' ...'
                } else {
                    return row.corpName
                }
            }
        },
        {
            title: `()=>createdTimeTitle`,
            dataIndex: 'createdTime',
            key: 'createdTime',
            sorter: true,
            width: 220,
            customRender: `()=>createdRender`,
            isSearch: true,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: `()=>updateTimeTitle`,
            dataIndex: 'updateTime',
            key: 'updateTime',
            sorter: true,
            width: 220,
            customRender: `()=>updateTimeRender`,
            isSearch: true,
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
        name: 'PurposeIndex',
        components: { EditModal, CorpTreeSelect, DescriptionsModal },
        mixins: [IndexTbHead],
        data () {
            return {
                // 搜索 展开/关闭
                advanced: false,
                // 查询参数
                queryParam: {
                    sysBusType: '',
                    purpose: '',
                    corpId: ''
                },
                // 加载数据方法 必须为 Promise 对象
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    const requestParameters = Object.assign({}, parameter, this.queryParam)
                    return searchPurpose(requestParameters).then(res => res.data)
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
            await dictGroup('btPurpose.sysBusType')
            this.$refs.table.refresh()
        },
        methods: {
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
                        console.log(JSON.stringify(values))
                        this.queryParam = values
                        this.$refs.table.refresh()
                    }
                })
            },
            // 删除数据
            deleteData (id) {
                if (id) {
                    const _this = this
                    this.$confirm({
                        title: this.$t('common.title.detail'),
                        content: this.$t('common.confirm.delete'),
                        onOk () {
                            return deletePurpose([id]).then(response => {
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
                }
            },
            deleteBatchData () {
                const keys = this.selectedRowKeys
                const _this = this
                this.$confirm({
                    title: '信息提示',
                    content: '确认要删除选中的数据吗?',
                    onOk () {
                        return deletePurpose(keys).then(response => {
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
                // 分割用途所属类别组装输出
                const sysBusTypes = row.sysBusType.split(',')
                let sysBusType = ''
                sysBusTypes.map((busType) => {
                    if (sysBusType === '') {
                        sysBusType = dict('btPurpose.sysBusType', busType)
                    } else {
                        sysBusType += ',' + dict('btPurpose.sysBusType', busType)
                    }
                })
                this.$refs.DescriptionsModal.show(
                    {
                    descProps: {
                        title: this.$t('common.title.detail')
                    },
                    descItems: [
                        { label: this.$t('basic.purpose.field.sysBusType'), value: sysBusType, span: 2 },
                        { label: this.$t('basic.purpose.field.purpose'), value: row.purpose, span: 2 },
                        { label: this.$t('basic.purpose.field.corpId'), value: row.corpIds, span: 2, id: 'shareCorp' }
                    ]
                })
            }
        }
    }
</script>
