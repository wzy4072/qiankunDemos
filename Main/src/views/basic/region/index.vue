<style scoped>
</style>
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="$refs.editModal.showAddModal(region)">新增
        </a-button>
        <a-button v-if="queryParam.id" type="primary" @click="doBack()">返回
        </a-button>
      </div>
      <a-form layout="inline">
        <a-spin :spinning="loading">
          <a-row :gutter="48">
            <div v-for="(item, index) in list" :key="index">
              <a-col :md="8" :sm="24">
                <a-card :title="item.name" size="small" :body-style="{ 'text-align': 'center' }">
                  <a-row type="flex" justify="center" :gutter="8" >
                    <a-col :md="8" :sm="24">
                      <a-button type="primary" @click="$refs.editModal.showEditModal(item.id)">编辑
                      </a-button>
                    </a-col>
                    <a-col :md="8" :sm="24">
                      <a-button type="danger" @click="deleteRegion(item.id)">删除
                      </a-button>
                    </a-col>
                    <a-col :md="8" :sm="24" v-if="!queryParam.id">
                      <a-button type="primary" @click="jumpManager(item)">管理
                      </a-button>
                    </a-col>
                  </a-row>
                </a-card>
              </a-col>
            </div>
          </a-row>
        </a-spin>
      </a-form>

    </a-card>
    <edit-modal ref="editModal" @refreshData="loadData()"></edit-modal>
  </page-header-wrapper>
</template>
<script>
import EditModal from '@/views/basic/region/edit'
import { deleteRegion, searchRegion } from '@/api/basic/region'

export default {
    name: 'DataList',
    components: { EditModal },
    data () {
        return {
            queryParam: {
                id: ''
            },
            region: [],
            list: [],
            loading: false
        }
    },
    created () {
    },
    mounted () {
        this.loadData()
    },
    methods: {
        loadData () {
            this.loading = true
            const requestParameters = Object.assign({}, this.queryParam)
            searchRegion(requestParameters).then(res => {
                const _this = this
                _this.list = res.data
                this.loading = false
            })
        },
        deleteRegion (id) {
            const _this = this
            this.$confirm({
                title: '信息提示',
                content: '确认要删除所选的区域吗?',
                onOk () {
                    const deleteIds = [id]
                    return deleteRegion(deleteIds).then((res) => {
                        if (res.success) {
                            _this.$message.success(_this.$t(res.msg))
                            _this.loadData()
                        } else {
                            _this.$message.error(_this.$t(res.msg, res.msgParams))
                        }
                    })
                }
            })
        },
        jumpManager (data) {
            const _this = this
            _this.queryParam.id = data.id
            _this.region = data
            _this.list = []
            _this.loadData()
        },
        doBack () {
            const _this = this
            _this.queryParam.id = ''
            _this.list = []
            _this.loadData()
        }
    }
}
</script>
