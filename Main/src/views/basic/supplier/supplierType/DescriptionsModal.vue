<template>
  <a-modal :maskClosable="false" :title="descProps.title" :visible="visible" @cancel="visible = false" width="50%">
    <a-descriptions
      :bordered="descProps.bordered || true"
      :column="descProps.column || 2"
      :layout="descProps.layout || 'horizontal'"
    >
      <a-descriptions-item
        v-for="(item, index) in descItems"
        :key="'key' + index"
        :label="item.label"
        :span="item.span || 1"
      >
        {{ item.value }}
      </a-descriptions-item>
    </a-descriptions>
    <template slot="footer">
      <a-button type="primary" @click="visible = false">{{ $t('common.btn.close') }}</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'DescriptionsModal',
  data () {
    return {
      visible: false,
      descProps: {},
      descItems: []
    }
  },
  methods: {
    show (info) {
      this.descProps = info.descProps
      this.descItems = info.descItems
      this.visible = true
    }
  }
}
</script>
