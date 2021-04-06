const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  userName: state => state.user.username,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  needRefresh: state => (parentPath) => state.pages.refreshPathSet.has(parentPath),
  asyncTabProps: state => (tabPath) => state.pages.asyncTabs.get(tabPath)
}

export default getters
