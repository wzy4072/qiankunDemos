const pages = {
  state: {
    refreshPathSet: new Set(),
    asyncTabs: new Map(), // 打开异步标签时 存储props
    removeTargetKey: null// 用于代码方式关闭当前tab标签页
  },
  mutations: {
    /**
     * 修改了业务后 在监控板添加需要刷新的path
     * @param {*} state
     * @param {*} tabPath
     */
    SET_REFRESH_PATH: (state, tabPath) => {
     const tabAsyncProps = state.asyncTabs.get(tabPath)
     tabAsyncProps && state.refreshPathSet.add(tabAsyncProps.parentPath)
    },
    /**
     * 刷新后从refreshPathSet移出需要刷新的path
     * @param {*} state
     * @param {*} parentPath
     */
    REMOVE_REFRESH_PATH: (state, parentPath) => {
      state.refreshPathSet.delete(parentPath)
    },
    /**
     * 打开异步标签，存储异步标签的 componentDirPath prop title parentPath
     * asyncProps :{
     * componentDirPath: '/Demos/TempComponents/addUser',
    * props: { userInfo: { name: 'tom' } },
    * title: '新增用户' + this.tempId,
    * parentPath: this.$route.fullPath,
    * tabFullPath:''
    * }
     * @param {*} state
     * @param {*} asyncProps
     */
    SET_ASYNC_TABS: (state, asyncProps) => {
      const { tabFullPath } = asyncProps
      state.asyncTabs.set(tabFullPath, asyncProps)
    },
    SET_REMOVE_KEY: (state, key) => {
      state.removeTargetKey = key
    }
  }

}

export default pages
