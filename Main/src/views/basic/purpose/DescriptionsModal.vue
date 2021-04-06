<template>
  <a-modal :maskClosable="false" :title="descProps.title" :visible="visible" @cancel="visible = false" width="50%">
    <a-descriptions
      :bordered="descProps.bordered || true"
      :column="descProps.column || 2"
      :layout="descProps.layout || 'horizontal'"
    >
      <template v-for="(item, index) in descItems">
        <a-descriptions-item
          :key="'key' + index"
          :label="item.label"
          :span="item.span || 1"
          v-if="item.id !== 'shareCorp'" >
          {{ item.value }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="item.label"
          :key="'key' + index"
          v-else>
          <a-tree
            :show-icon="true"
            :defaultExpandAll="true"
            :tree-data="treeData"
            :replaceFields="replaceFields"
            :key="treeKey"
          >
            <a-icon slot="icon" type="carry-out" />
          </a-tree>
        </a-descriptions-item>
      </template>

    </a-descriptions>
    <template slot="footer">
      <a-button type="primary" @click="visible = false">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getCorpTree } from '@/api/corp'

// 根据选中值获取所有的选中节点
const getTreeNode = (id, nodes, arr) => {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            const node = { ...nodes[i] }
            node.children = []
            arr.push(node)
            break
        } else if (nodes[i].children && nodes[i].children.length) {
            getTreeNode(id, nodes[i].children, arr)
        }
    }
}
// 递归组装树
const createTreeNode = function (node, arr) {
    const child = []
    for (let i = 0; i < arr.length; i++) {
        if (node.id === arr[i].parentId && !arr[i].flag) {
            createTreeNode(arr[i], arr)
            child.push(arr[i])
            // flag 代表已经添加至父节点了，下次再遍历时，不再处理
            arr[i].flag = true
        }
    }
    node.children = [...node.children, ...child]
}

export default {
  name: 'DescriptionsModal',
  data () {
    return {
        visible: false,
        descProps: {},
        descItems: [],
        treeData: [],
        treeKey: 0,
        replaceFields: { children: 'children', title: 'name', key: 'id' }
    }
  },
  methods: {
    show (info) {
      this.descProps = info.descProps
      this.descItems = info.descItems
      this.visible = true
        getCorpTree().then(res => {
            const shareCorp = this.descItems.find(item => item.id === 'shareCorp')
            if (shareCorp.value && shareCorp.value.length) {
                const arr = []
                const length = shareCorp.value.length
                for (let k = 0; k < length; k++) {
                    getTreeNode(shareCorp.value[k], res.data, arr)
                }
                for (let i = 0; i < arr.length; i++) {
                    const parentIds = arr[i].parentIds
                    if (parentIds) {
                        let newParentIds = ''
                        let index = 0
                        const parentIdsArr = parentIds.split(',')
                        const valuesStr = shareCorp.value.join(',')
                        for (let j = 0; j < parentIdsArr.length; j++) {
                            // 更新节点上 parentIds / parentId值
                            if (valuesStr.indexOf(parentIdsArr[j]) !== -1 && parentIdsArr[j] !== '') {
                                if (newParentIds) {
                                    newParentIds += ',' + parentIdsArr[j]
                                } else {
                                    newParentIds += parentIdsArr[j]
                                }
                            }
                        }
                        const newParentIdsArr = newParentIds.split(',')
                        index = newParentIdsArr.length
                        arr[i].parentIds = newParentIds
                        arr[i].parentId = newParentIdsArr && newParentIdsArr.length > 1 ? newParentIdsArr[newParentIdsArr.length - 2] : ''
                        arr[i].sort = index
                    }
                }
                // 排序
                arr.sort(function (a, b) {
                    return a.sort - b.sort
                })
                const treeData = []
                for (let i = 0; i < arr.length; i++) {
                    // flag 代表已经添加至父节点了，下次再遍历时，不再处理
                    const item = arr[i]
                    if (!item.flag) {
                        if (!item.parentId) {
                            treeData.push(arr[i])
                        }
                        item.flag = true
                        createTreeNode(item, arr)
                    }
                }
                this.treeData = treeData
                this.treeKey++
            } else {
                this.treeData = []
            }
        })
    }
  }
}
</script>
