'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = exports.RouteMenuProps = void 0

var _vueTypes = _interopRequireDefault(require('ant-design-vue/es/_util/vue-types'))

require('ant-design-vue/es/menu/style')

var _menu = _interopRequireDefault(require('ant-design-vue/es/menu'))

require('ant-design-vue/es/icon/style')

var _icon = _interopRequireDefault(require('ant-design-vue/es/icon'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

function _extends () { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }; return _extends.apply(this, arguments) }

var MenuItem = _menu['default'].Item
    var SubMenu = _menu['default'].SubMenu
var RouteMenuProps = {
  menus: _vueTypes['default'].array,
  theme: _vueTypes['default'].string.def('dark'),
  mode: _vueTypes['default'].string.def('inline'),
  collapsed: _vueTypes['default'].bool.def(false),
  i18nRender: _vueTypes['default'].oneOfType([_vueTypes['default'].func, _vueTypes['default'].bool]).def(false)
}
exports.RouteMenuProps = RouteMenuProps
var httpReg = /(http|https|ftp):\/\/([\w.]+\/?)\S*/

var renderMenu = function renderMenu (h, item, i18nRender) {
  if (item && !item.hidden) {
    var bool = item.children && !item.hideChildrenInMenu
    return bool ? renderSubMenu(h, item, i18nRender) : renderMenuItem(h, item, i18nRender)
  }

  return null
}

var renderSubMenu = function renderSubMenu (h, item, i18nRender) {
  return h(SubMenu, {
    key: item.path,
    attrs: {
      title: h('span', [renderIcon(h, item.meta.icon), h('span', [renderTitle(h, item.meta.title, i18nRender)])])
    }
  }, [!item.hideChildrenInMenu && item.children.map(function (cd) {
    return renderMenu(h, cd, i18nRender)
  })])
}

var renderMenuItem = function renderMenuItem (h, item, i18nRender) {
  var meta = _extends({}, item.meta)

  var target = meta.target || null
  var hasRemoteUrl = httpReg.test(item.path)
  var CustomTag = target && 'a' || 'router-link'
  var props = {
    to: {
      name: item.name
    }
  }
  var attrs = hasRemoteUrl || target ? {
    href: item.path,
    target: target
  } : {}

  if (item.children && item.hideChildrenInMenu) {
    // ?????????????????? ?????? ?????????????????????????????????
    // ??????????????????????????? hidden ??????
    // ??????????????????????????? selectedKeys ????????????
    item.children.forEach(function (cd) {
      cd.meta = _extends(cd.meta || {}, {
        hidden: true
      })
    })
  }

  return h(MenuItem, {
    key: item.path
  }, [h(CustomTag, {
    props: props,
    attrs: attrs
  }, [renderIcon(h, meta.icon), renderTitle(h, meta.title, i18nRender)])])
}

var renderIcon = function renderIcon (h, icon) {
  if (icon === undefined || icon === 'none' || icon === null) {
    return null
  }

  var props = {}
  typeof icon === 'object' ? props.component = icon : props.type = icon
  return h(_icon['default'], {
    props: props
  })
}

var renderTitle = function renderTitle (h, title, i18nRender) {
  return h('span', [i18nRender && i18nRender(title) || title])
}

var RouteMenu = {
  name: 'RouteMenu',
  props: RouteMenuProps,
  data: function data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      cachedSelectedKeys: []
    }
  },
  render: function render (h) {
    var _this = this

    var mode = this.mode
        var theme = this.theme
        var menus = this.menus
        var i18nRender = this.i18nRender

    var handleOpenChange = function handleOpenChange (openKeys) {
      // ??????????????????????????????????????????
      if (mode === 'horizontal') {
        _this.openKeys = openKeys
        return
      }

      var latestOpenKey = openKeys.find(function (key) {
        return !_this.openKeys.includes(key)
      })

      if (!_this.rootSubmenuKeys.includes(latestOpenKey)) {
        _this.openKeys = openKeys
      } else {
        _this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }

    var dynamicProps = {
      props: {
        mode: mode,
        theme: theme,
        openKeys: this.openKeys,
        selectedKeys: this.selectedKeys
      },
      on: {
        select: function select (menu) {
          _this.$emit('select', menu)

          if (!httpReg.test(menu.key)) {
            _this.selectedKeys = menu.selectedKeys
          }
        },
        openChange: handleOpenChange
      }
    }
    var menuItems = menus.map(function (item) {
      if (item.hidden) {
        return null
      }

      return renderMenu(h, item, i18nRender)
    })
    return h(_menu['default'], dynamicProps, [menuItems])
  },
  methods: {
    updateMenu: function updateMenu () {
      var routes = this.$route.matched.concat()
      var hidden = this.$route.meta.hidden

      if (routes.length >= 3 && hidden) {
        routes.pop()
        this.selectedKeys = [routes[routes.length - 1].path]
      } else {
        this.selectedKeys = [routes.pop().path]
      }

      var openKeys = []

      if (this.mode === 'inline') {
        routes.forEach(function (item) {
          item.path && openKeys.push(item.path)
        })
      }

      this.collapsed ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
    }
  },
  computed: {
    rootSubmenuKeys: function rootSubmenuKeys (vm) {
      var keys = []
      vm.menus.forEach(function (item) {
        return keys.push(item.path)
      })
      return keys
    }
  },
  created: function created () {
    var _this2 = this

    this.$watch('$route', function () {
      _this2.updateMenu()
    })
    this.$watch('collapsed', function (val) {
      if (val) {
        _this2.cachedOpenKeys = _this2.openKeys.concat()
        _this2.openKeys = []
      } else {
        _this2.openKeys = _this2.cachedOpenKeys
      }
    })
  },
  mounted: function mounted () {
    this.updateMenu()
  }
}
var _default = RouteMenu
exports['default'] = _default
