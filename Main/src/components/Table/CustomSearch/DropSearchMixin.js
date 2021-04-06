export default {
  methods: {
       // 接收参数 并查询
       setCustomParams ({ display, values }) {
          this.$emit('getCustomParams', { customParam: values })
      },
      // 打开自定义搜索面板
      openSearch () {
        this.$refs.CustomSearch.open()
      },
      // 发出更新自定义查询的通知
      updateCustomParams () {
        this.$refs.DropSearch.updateParams()
      }
  }
}
