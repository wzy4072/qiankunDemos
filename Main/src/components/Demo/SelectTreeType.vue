<template>
  <a-modal
    title="信息"
    :visible="visible"
    @ok="onSubmit"
  >
    <a-tree-select
      v-model="value"
      style="width: 100%"
      show-search
      :treeCheckable="isCheckbox"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeData"
      placeholder="Please select"
      :filterTreeNode="filterTreeNode"
      tree-default-expand-all
    >
      <span slot="title" slot-scope="{ value:soltValue,title }" style="color: #08c">
        {{ title + ' ( ' +soltValue+' )' }}
      </span>
    </a-tree-select>
  </a-modal>
</template>
<script>
  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          value: '0-0-1',
          key: '0-0-1',
          title: '单位1',
          checkable: false
          // scopedSlots: {
          //   // custom title
          //   title: 'title',
          // },
        },
        {
          title: '拜特公司',
          value: '0-0-2',
          key: '0-0-2'
        },
        {
          value: '0-0-3',
          key: '0-0-3',
          title: '单位2',
          scopedSlots: {
            // custom title
            title: 'title'
          }
        },
        {
          title: '拜特子公司',
          value: '0-0-4',
          key: '0-0-4',
          isLeaf: false,
          children: [
            {
              value: '0-4-0',
              key: '0-4-0',
              title: '单位3',
              scopedSlots: {
                // custom title
                title: 'title'
              }
              },
            {
              value: '0-4-1',
              key: '0-4-1',
              title: '单位4',
              scopedSlots: {
                // custom title
                title: 'title'
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          value: '1-0-1',
          key: '1-0-1',
          title: '单位5',
          scopedSlots: {
            // custom title
            title: 'title'
          }
        }
      ]
    }
  ]
    export default {
        name: 'SelectTreeType',
      data () {
          return {
            value: undefined,
            treeData: treeData,
            isCheckbox: false, // 是否支持复选多选 单选才支持 show-search
            visible: false
          }
      },
      mounted () {

      },
      methods: {
        // 模糊搜索功能
        filterTreeNode (inputValue, treeNode) {
            return treeNode.data.props.title.includes(inputValue) || treeNode.data.props.value.includes(inputValue)
        },
        showModal (data) {
          this.visible = true
        },
        onSubmit () {
          this.visible = false
        }
      }
    }
</script>

<style scoped>

</style>
