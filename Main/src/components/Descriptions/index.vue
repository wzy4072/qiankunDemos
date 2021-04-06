<template>
  <a-descriptions
    :class="{'s-desc':desc.descProps.bordered,'s-desc-3':desc.descProps.column && desc.descProps.column === 3}"
    :bordered="desc.descProps.bordered || true"
    :column="desc.descProps.column || 2"
    :layout="desc.descProps.layout || 'horizontal'"
    :colon="desc.descProps.colon || true"
  >
    <template v-for="(item, index) in desc.descItems">
      <a-descriptions-item
        :key="'key' + index"
        :label="item.label"
        :span="item.span || 1"
      >
        {{ item.value }}
      </a-descriptions-item>
    </template>
  </a-descriptions>
</template>
<script>
    export default {
        name: 'SDescriptions',
        props: {
            desc: {
                type: Object,
                default () {
                    return {
                        descProps: {},
                        descItems: []
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .s-desc /deep/ .ant-descriptions-item-label {
        text-align: right;
        width: 20%;
    }
    .s-desc /deep/ .ant-descriptions-item-content {
        width: 30%;
    }
    .s-desc-3 /deep/ .ant-descriptions-item-label {
        text-align: right;
        width: 15%;
    }
    .s-desc-3 /deep/ .ant-descriptions-item-content {
        width: 17%;
    }
</style>
