<style scoped>
    .date-container /deep/ .ant-form-item-children > span {
        width: 100% !important;
    }
</style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="8" :sm="24">
            <a-form-item label="中文名称">
              <a-input v-model="queryParam.nameZh" placeholder="请输入中文名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="英文名称">
              <a-input v-model="queryParam.nameEn" placeholder="请输入英文名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="简称">
              <a-input v-model="queryParam.enCode" placeholder="请输入简称"/>
            </a-form-item>
          </a-col>
          <!--展开搜索-->

          <a-col :md="!advanced && 8 || 24" :sm="24" center>
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'center', overflow: 'hidden' } || {} ">
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
          <!--<a @click="$refs.editModal.showModal(row.id)">{{ $t('common.btn.edit') }}</a>-->
          <a-button type="link" size="small" @click="editItem(row.id)">{{ $t('common.btn.edit') }}</a-button>
          <a-divider type="vertical"/>
          <a @click="onHandleDeleteModule(row.id)">{{ $t('common.btn.delete') }}</a>
          <a-button type="link" size="small" @click="detailItem(row.id)">{{ $t('common.btn.view') }}</a-button>
        </template>
        <template slot="stitle">
          <a-button @click="addItem" type="primary">{{ $t('common.btn.add') }}</a-button>
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
    </a-card>
    <edit-modal ref="editModal" @refreshTable="$refs.table.refresh(true)"></edit-modal>
  </page-header-wrapper>
</template>
<script>

    import EditModal from '@/views/basic/countryCust/edit'
    import { deleteCountryCust, searchCountryCust } from '@/api/countryCust'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    import IndexTbHead from '@/views/basic/countryCust/indexs/IndexTbHead'
    import formItemConfigs from '@/views/basic/countryCust/indexs/IndexTbSearch'
    import { handleJsonColumns } from '@/utils/util'
    // 1 查询TableHead
    // 2 查询TableData
    // 3/4/5 查询/保存/删除常用参数
    // 6 修改或者保存TableHead
    // 动态tableHead使用到的方法以mixin方式引入 以TbHead引入

    const defaultColumns = [
        {
            title: '中文名称',
            dataIndex: 'nameZh',
            key: 'nameZh',
            isSearch: true,
            width: 200,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: '英文名称',
            dataIndex: 'nameEn',
            key: 'nameEn',
            isSearch: true,
            width: 200,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: '币种',
            dataIndex: 'curId',
            key: 'curId',
            isSearch: true,
            width: 110,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: '简称',
            dataIndex: 'enCode',
            key: 'enCode',
            isSearch: true,
            width: 220,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: '时区',
            dataIndex: 'timeZoneId',
            key: 'timeZoneId',
            isSearch: true,
            width: 200,
            defSearch: true,
            show: true,
            fixed: null
        },
        {
            title: '有效标志',
            dataIndex: 'validSign',
            key: 'validSign',
            isSearch: true,
            width: 50,
            defSearch: true,
            show: true,
            fixed: null,
            customRender: function (text, row) {
                return dict('validSign', text + '')
            }
        },
        {
            title: `()=>actionTitle`,
            dataIndex: 'action',
            width: 150,
            key: 'id',
            scopedSlots: { customRender: 'action' },
            isSearch: false,
            defSearch: false,
            show: true,
            fixed: 'right'
        }
    ]

    export default {
        name: 'CountryCustIndex',
        components: { EditModal },
        mixins: [IndexTbHead],
        data () {
            return {
                // 搜索 展开/关闭
                advanced: false,
                // 查询参数
                queryParam: {},
                // 加载数据方法 必须为 Promise 对象
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    const requestParameters = Object.assign({}, parameter, this.queryParam)
                    return searchCountryCust(requestParameters).then(res => res.data)
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
            await dictGroup('validSign')
        },
        methods: {
            // 删除数据
            onHandleDeleteModule (id) {
                let keys = this.selectedRowKeys
                if (id) {
                    keys = [id]
                }
                if (keys && keys.length === 0) {
                    this.$message.warn('请选择需要删除的数据')
                    return
                }
                const _this = this
                this.$confirm({
                    title: _this.$t('common.confirm.title'),
                    content: _this.$t('common.confirm.delete'),
                    onOk () {
                        return deleteCountryCust(keys).then((response) => {
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
            addItem () {
                // 页面将会以组件的方式渲染
                const pageName = 'countryCust'
                const pageSign = 'add'
                const tabFullPath = `/commonEdit/${pageName}/id/${pageSign}`
                this.$store.commit('SET_ASYNC_TABS', {
                    componentDirPath: '/basic/countryCust/test', // 必填 组件地址 '@/views/pay/voucherType/edit.vue'
                    props: { id: null }, // 非必填 组件需要的参数
                    title: '新增国家地区', // 必填
                    parentPath: this.$route.fullPath, // 必填 组件tab关闭后 返回的页面
                    tabFullPath // 必填 子组件的fullPath路径
                })
                this.$router.push({ path: tabFullPath })
            },
            editItem (id) {
                const pageName = 'countryCust'
                const pageSign = id
                const tabFullPath = `/commonEdit/${pageName}/id/${pageSign}`
                this.$store.commit('SET_ASYNC_TABS', {
                    componentDirPath: '/basic/countryCust/test', // 必填 组件地址 '@/views/pay/voucherType/edit.vue'
                    props: { id }, // 非必填 组件需要的参数
                    title: '编辑编辑国家地区', // 必填
                    parentPath: this.$route.fullPath, // 必填 组件tab关闭后 返回的页面
                    tabFullPath // 必填 子组件的fullPath路径
                })
                this.$router.push({ path: tabFullPath })
            },
            detailItem (id) {
                const pageName = 'countryCust'
                const pageSign = id
                const tabFullPath = `/commonEdit/${pageName}/id/${pageSign}`
                this.$store.commit('SET_ASYNC_TABS', {
                    componentDirPath: '/basic/countryCust/descriptionsModal', // 必填 组件地址 '@/views/supplier/externalCorp/edit.vue'
                    props: { id }, // 非必填 组件需要的参数
                    title: '国家地区详情', // 必填
                    parentPath: this.$route.fullPath, // 必填 组件tab关闭后 返回的页面
                    tabFullPath // 必填 子组件的fullPath路径
                })
                this.$router.push({ path: tabFullPath })
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
                        return deleteCountryCust(keys).then(response => {
                            // 判断状态码
                            if (response.code === '00000001') {
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
            // 获取TableHead
            getTableColumns () {

            }
        }
    }
</script>
