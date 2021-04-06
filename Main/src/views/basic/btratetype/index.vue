<style scoped>
    .date-container/deep/ .ant-form-item-children > span{
        width: 100%!important;
    }
</style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">

            <a-col :md="8" :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.typeName" placeholder="请输入名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="有效标志">
                <!-- <a-input v-model="queryParam.validSign" placeholder="请输入有效标志"/> -->
                <dict-multi-select
                  v-model="queryParam.validSign"
                  :options="dictOptions">
                </dict-multi-select>
              </a-form-item>
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
                <!-- <a @click="advanced=!advanced" style="margin-left: 8px">{{ advanced ? $t('common.search.advanced.up') : $t('common.search.advanced.down') }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a> -->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-card :bordered="false" style="margin-top: 24px">
      <div class="table-operator">
        <a-button @click="$refs.editModal.showModal(null)" type="primary">{{ $t('common.btn.add') }}</a-button>
        <a-dropdown :disabled="selectedRowKeys.length===0">
          <a-menu slot="overlay">
            <a-menu-item @click="deleteData">{{ $t('common.btn.delete') }}</a-menu-item>
          </a-menu>
          <a-button> {{ $t('common.btn.moreOperation') }}<a-icon type="down"/></a-button>
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
        </template>
      </s-table>
    </a-card>
    <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
  </page-header-wrapper>
</template>
<script>
    import dateUtil from '@/utils/date'

    import EditModal from '@/views/basic/btratetype/edit'
    import { deleteType, searchType } from '@/api/btratetype'

    export default {
        name: 'DataList',
        components: { EditModal },
        data () {
            return {
                // 搜索 展开/关闭
                // advanced: false,
                // 查询参数
                queryParam: {},
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    const requestParameters = Object.assign({}, parameter, this.queryParam)
                    return searchType(requestParameters).then(res => res.data)
                },
                selectedRowKeys: [],
                dictOptions: [{
          name: '有效',
          code: '1'
        }, {
          name: '无效',
          code: '2'
        }]
            }
        },
        // 组件创建完成
        created () {
        },
        // 组件挂载完成
        mounted () {
        },
        computed: {
            columns () {
                return [
                    {
                        title: '名称',
                        dataIndex: 'typeName',
                        key: 'typeName'
                    },
                    {
                        title: '描述',
                        dataIndex: 'rmk',
                        key: 'rmk'
                    },
                    {
                        title: '有效标志',
                        dataIndex: 'validSign',
                        key: 'validSign'
                    },
                    {
                        title: '汇率保留小数位数',
                        dataIndex: 'decimalPlaces',
                        key: 'decimalPlaces'
                    },
                    {
                        title: '创建人',
                        dataIndex: 'createBy',
                        key: 'createBy'
                    },
                    {
                        title: () => this.$i18n.t('common.createdTime'),
                        dataIndex: 'createdTime',
                        key: 'createdTime',
                        sorter: true,
                        customRender: (text, row, index) => dateUtil.dateTime(row.createdTime)
                    },
                    {
                        title: () => this.$i18n.t('common.field.action'),
                        dataIndex: 'id',
                        width: '220px',
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
                    title: '信息提示',
                    content: '确认要删除选中的数据吗?',
                    onOk () {
                        return deleteType(keys).then((response) => {
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
            }
        }
    }
</script>
