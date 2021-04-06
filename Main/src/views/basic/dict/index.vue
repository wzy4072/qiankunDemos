<template>
  <div class="dict-container">
    <!-- 字典左侧菜单-->
    <div class="dict-menu">

      <div class="dict-menu-btn">
        <a-button type="primary" icon="plus" class="dict-btn-add" @click="onHandleAddBtnClick('dictGroupModal')">
          添加字典
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="onHandleMoreBtnClick">
            <a-menu-item key="1" @click="onHandleEditDictGroup">
              {{ $t('common.btn.edit') }}
            </a-menu-item>
            <a-menu-item key="2" @click="onHandleDeleteDictGroup">
              {{ $t('common.btn.delete') }}
            </a-menu-item>
          </a-menu>
          <a-button > 更多操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </div>
      <div class="dict-menu-search">
        <a-alert :message="currentSelectDict" type="info" show-icon/>
        <a-input-search class="input-search" placeholder="输入搜索字典" @search="onSearch" />
      </div>
      <div class="dict-menu-list">
        <div
          v-for="item in dictGroups"
          :key="item.id"
          @click="onHandleDictGroupsItemClick(item)"
          :class="{'active':selectDictGroup.id === item.id}">
          {{ item.name }}
        </div>
      </div>
    </div>
    <!--        字典右侧展示列表-->
    <div class="dict-table">
      <a-card :bordered="false" style="margin-top: 24px">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          showPagination="auto"
          :columns="columns"
          :data="loadData"
          :rowSelection="rowSelection"
          bordered>
          <span slot="serialNumber" slot-scope="text,row,index">{{ index+1 }}</span>
          <a slot="name" slot-scope="text">{{ text }}</a>
          <template slot="action" slot-scope="text, row">
            <a @click="onHandleEdit(row)">{{ $t('common.btn.edit') }}</a>
            <a-divider type="vertical" />
            <a @click="onHandleDelete(row.id)">{{ $t('common.btn.delete') }}</a>
          </template>
          <template slot="stitle">
            <a-button type="primary" icon="plus" class="table-operator-btn" @click="onHandleAddBtnClick('dictModal')">添加数据</a-button>
            <a-button icon="delete" class="table-operator-btn" @click="onHandleDelete()">批量删除</a-button>
          </template>
        </s-table>
      </a-card>
    </div>
    <dict-group-modal ref="dictGroupModal" @refresh="getDictGroup"/>
    <dict-modal ref="dictModal" @refreshTable="$refs.table.refresh(true)"/>
  </div>
</template>

<script>
    import DictModal from '@/views/basic/dict/dictModal'
    import dictGroupModal from '@/views/basic/dict/dictGroupModal'
    import { asyncGetDictGroup, asyncGetDictByBiz, deleteDictGroup, deleteDictData } from '@/api/basic/dict'

    export default {
        components: {
            DictModal,
            dictGroupModal
        },
        data () {
            return {
                // 当前选中的字典
                currentSelectDict: '当前选择: ',
                // 字典组
                dictGroups: [],
                selectDictGroup: {
                    id: '',
                    name: ''
                },
                queryParam: {
                    groupId: ''
                },
                loadData: parameter => {
                    const requestParameters = Object.assign({}, parameter, this.queryParam)
                    return asyncGetDictByBiz(requestParameters).then(res => res.data)
                },
                selectedRowKeys: [],
                cardLoading: false
            }
        },
        computed: {
            columns () {
                return [
                    {
                        title: '序号',
                        dataIndex: 'id',
                        key: 'index',
                        width: 80,
                        align: 'center',
                        scopedSlots: { customRender: 'serialNumber' },
                        show: true
                    },
                    {
                        title: '字典组名称',
                        dataIndex: 'groupName',
                        key: 'groupName',
                        show: true
                    },
                    {
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name',
                        show: true
                    },
                    {
                        title: '数据值',
                        dataIndex: 'value',
                        key: 'value',
                        show: true
                    },
                    {
                        title: '排序',
                        dataIndex: 'sort',
                        width: 100,
                        key: 'sort',
                        defaultSortOrder: 'ascend',
                        sorter: (a, b) => a.sort - b.sort,
                        show: true
                    },
                    {
                        title: () => this.$i18n.t('common.field.action'),
                        dataIndex: 'id',
                        width: '120px',
                        key: 'id',
                        fixed: 'right',
                        scopedSlots: { customRender: 'action' },
                        show: true
                    }
                ]
            },
            rowSelection () {
                const _this = this
                return {
                    selectedRowKeys: _this.selectedRowKeys,
                    onChange: keys => { _this.selectedRowKeys = keys }
                }
            }
        },
        mounted () {
            this.getDictGroup()
        },
        methods: {
            // 查询字典组
            getDictGroup (parameter) {
                this.cardLoading = true
                asyncGetDictGroup(parameter).then(res => {
                    this.dictGroups = res.data
                    this.cardLoading = false
                })
            },
            // 新增
            onHandleAddBtnClick (modal) {
                if (modal === 'dictModal' && !this.selectDictGroup.id) {
                    this.$message.warn('请选择字典组')
                    return
                }
                this.$refs[modal].onOpenDictModal({
                    visible: true,
                    dictGroup: this.selectDictGroup
                })
            },
            onHandleEditDictGroup () {
                const _this = this
                if (!_this.selectDictGroup.id) {
                    _this.$message.warn('请选择字典组')
                    return
                }
                _this.$refs['dictGroupModal'].onOpenDictModal({
                    visible: true,
                    dictGroupData: _this.selectDictGroup
                })
            },
            onHandleDeleteDictGroup () {
                const id = this.selectDictGroup.id
                if (!id) {
                    this.$message.warn('请选择字典组')
                    return
                }
                const keys = [id]
                const _this = this
                this.$confirm({
                    title: '信息提示',
                    content: '确认要删除选中的数据吗?',
                    onOk () {
                        return deleteDictGroup(keys).then((response) => {
                            // 判断状态码
                            if (response.success) {
                                // 操作成功
                                _this.$message.success(_this.$t(response.msg))
                                _this.$refs.table.refresh(true)
                                _this.getDictGroup()
                            } else {
                                // 操作失败
                                _this.$message.error(_this.$t(response.msg, response.msgParams))
                            }
                        })
                    }
                })
            },
            // 选中字典组
            onHandleDictGroupsItemClick (dict) {
                if (dict) {
                    if (dict.id === this.selectDictGroup.id) {
                        this.selectDictGroup = {}
                        this.currentSelectDict = '当前选择: '
                        this.queryParam.groupId = ''
                    } else {
                        this.selectDictGroup = dict
                        this.currentSelectDict = '当前选择: ' + dict.name + '(' + dict.code + ')'
                        this.queryParam.groupId = dict.id
                    }
                } else {
                    this.currentSelectDict = '当前选择: '
                }
                this.$refs.table.refresh(true)
            },
            onHandleEdit (row) {
                if (row) {
                    this.$refs['dictModal'].onOpenEditDictModal({
                        visible: true,
                        id: row.id,
                        groupId: row.groupId,
                        groupName: row.groupName,
                        name: row.name,
                        value: row.value,
                        sort: row.sort
                    })
                }
            },
            // 删除数据
            onHandleDelete (id) {
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
                    title: '信息提示',
                    content: '确认要删除选中的数据吗?',
                    onOk () {
                        return deleteDictData(keys).then((response) => {
                            // 判断状态码
                            if (response.success) {
                                // 操作成功
                                _this.$message.success(_this.$t(response.msg))
                                _this.$refs.table.refresh(true)
                            } else {
                                // 操作失败
                                _this.$message.error(_this.$t(response.msg, response.msgParams))
                            }
                        })
                    }
                })
            },
            // 更多操作
            onHandleMoreBtnClick (key) {
                console.log(key)
            },
            // 搜索
            onSearch (value) {
                console.log(value)
            }
        }
    }
</script>

<style scoped>
    .dict-container {
        position:relative;
        height: calc(100vh - 280px);
        background-color: #fff;
    }
    .dict-menu {
        /*height: calc(100vh - 280px);*/
        width: 350px;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        padding: 24px;
        box-sizing: border-box;
        overflow:auto;
    }
    .dict-menu .ant-card-body {
        padding-left: 0;
        padding-right: 0;
    }

    .dict-table {
        /*height: calc(100vh - 280px);*/
        width: 100%;
        padding-left: 350px;
        background: #fff;
    }

    .dict-btn-add {
        margin-right: 20px;
    }

    .dict-menu-btn {
        margin-bottom: 16px;
    }

    .dict-menu-search .input-search {
        margin-top: 16px;
    }

    .dict-menu-list {
        padding: 10px 0;
        display: inline-block;
        width: 100%;
        height: calc(100vh - 400px);
        overflow: auto
    }

    .dict-menu-list > div {
        font-size: 16px;
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        cursor: pointer;
    }

    .dict-menu-list > div:hover {
        background-color: #e6f7ff;
    }

    .active {
        background-color: #e6f7ff;
        color: #1890ff;
    }

</style>
