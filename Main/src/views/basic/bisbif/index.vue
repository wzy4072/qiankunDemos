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
              <a-menu-item @click="deleteData">{{ $t('common.btn.delete') }}</a-menu-item>
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

    import EditModal from '@/views/basic/bisbif/edit'
    import DescriptionsModal from '@/views/basic/bisbif/DescriptionsModal'
    import { deleteBisbif, searchBisbif } from '@/api/basic/bisbif'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'

    import formItemConfigs from './Indexs/IndexTbSearch'
    import IndexTbHead from './Indexs/IndexTbHead'
    import { handleJsonColumns } from '@/utils/util'

    // 1 查询TableHead
    // 2 查询TableData
    // 3/4/5 查询/保存/删除常用参数
    // 6 修改或者保存TableHead
    // 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

    const defaultColumns = [
        {
            title: 'i18n:basic.bisbifinit.field.bifCode',
            dataIndex: 'bifCode',
            key: 'bifCode',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bisbifinit.field.name',
            dataIndex: 'name',
            key: 'name',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bisbifinit.field.typeId',
            dataIndex: 'typeId',
            key: 'typeId',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: 'i18n:basic.bisbifinit.field.isDomesticBank',
            dataIndex: 'isDomesticBank',
            key: 'isDomesticBank',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            customRender: function (text, row) {
                return dict('yesOrNo', text)
            }
        },
        {
            title: 'i18n:basic.common.field.validSign',
            dataIndex: 'validSign',
            key: 'validSign',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null,
            customRender: function (text, row) {
                return dict('validSign', text)
            }
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
        name: 'BisbifIndex',
        components: { EditModal, DescriptionsModal },
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
                    return searchBisbif(requestParameters).then(res => res.data)
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
            // 加载指定字典组
            await dictGroup('validSign')
            await dictGroup('yesOrNo')
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
                        title: _this.$t('common.tips.information'),
                        content: _this.$t('common.confirm.delete'),
                        onOk () {
                            return deleteBisbif([id]).then(response => {
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
            },
            // 获取TableHead
            getTableColumns () {

            },
            viewDetail (row) {
                this.$refs.DescriptionsModal.show({
                    descProps: {
                        title: '详情'
                    },
                    descItems: [
                        { label: this.$t('basic.bisbifinit.field.bifCode'), value: row.bifCode, span: 2 },
                        { label: this.$t('basic.bisbifinit.field.name'), value: row.name, span: 2 },
                        { label: this.$t('basic.bisbifinit.field.typeId'), value: row.typeId, span: 2 },
                        {
                            label: this.$t('basic.bisbifinit.field.isDomesticBank'),
                            value: dict('yesOrNo', row.isDomesticBank),
                            span: 2
                        },
                        {
                            label: this.$t('basic.common.field.validSign'),
                            value: dict('validSign', row.validSign),
                            span: 2
                        }
                    ]
                })
            }
        }
    }
</script>
