import './Header.less'
import 'ant-design-vue/es/layout/style'
import Layout from 'ant-design-vue/es/layout'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import BaseMenu from './components/RouteMenu/BaseMenu'
import { defaultRenderLogoAntTitle, SiderMenuProps } from './components/SiderMenu/SiderMenu'
import GlobalHeader, { GlobalHeaderProps } from './components/GlobalHeader'
import { VueFragment } from './components'
import { isFun } from './utils/util'

function _objectSpread (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable })) } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]) }) } return target }

function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj }
var Header = Layout.Header
export var HeaderViewProps = _objectSpread({}, GlobalHeaderProps, SiderMenuProps, {
  isMobile: PropTypes.bool.def(false),
  collapsed: PropTypes.bool,
  logo: PropTypes.any,
  hasSiderMenu: PropTypes.bool,
  autoHideHeader: PropTypes.bool,
  menuRender: PropTypes.any,
  headerRender: PropTypes.any,
  rightContentRender: PropTypes.any,
  visible: PropTypes.bool.def(true)
})

var renderContent = function renderContent (h, props) {
  var isTop = props.layout === 'topmenu'
  var maxWidth = 1200 - 280 - 120
  var contentWidth = props.contentWidth === 'Fixed'
  var baseCls = 'ant-pro-top-nav-header'
  var logo = props.logo
      var title = props.title
      var theme = props.theme
      var isMobile = props.isMobile
      var headerRender = props.headerRender
      var rightContentRender = props.rightContentRender
      var menuHeaderRender = props.menuHeaderRender
  var rightContentProps = {
    theme: theme,
    isTop: isTop,
    isMobile: isMobile
  }
  var defaultDom = h(GlobalHeader, {
    props: props
  })

  if (isTop && !isMobile) {
    defaultDom = h('div', {
      'class': [baseCls, theme]
    }, [h('div', {
      'class': [''.concat(baseCls, '-main'), contentWidth ? 'wide' : '']
    }, [menuHeaderRender && h('div', {
      'class': ''.concat(baseCls, '-left')
    }, [h('div', {
      'class': ''.concat(baseCls, '-logo'),
      key: 'logo',
      attrs: {
        id: 'logo'
      }
    }, [defaultRenderLogoAntTitle(h, {
      logo: logo,
      title: title,
      menuHeaderRender: menuHeaderRender
    })])]), h('div', {
      'class': ''.concat(baseCls, '-menu'),
      style: {
        maxWidth: ''.concat(maxWidth, 'px'),
        flex: 1
      }
    }, [h(BaseMenu, {
      props: props
    })]), isFun(rightContentRender) && rightContentRender(h, rightContentProps) || rightContentRender])])
  }

  if (headerRender) {
    return headerRender(h, props)
  }

  return defaultDom
}

var HeaderView = {
  name: 'HeaderView',
  props: HeaderViewProps,
  render: function render (h) {
    var _this$$props = this.$props
        var visible = _this$$props.visible
        var isMobile = _this$$props.isMobile
        var layout = _this$$props.layout
        var collapsed = _this$$props.collapsed
        var siderWidth = _this$$props.siderWidth
        var fixedHeader = _this$$props.fixedHeader
        // var autoHideHeader = _this$$props.autoHideHeader
        var hasSiderMenu = _this$$props.hasSiderMenu
    var props = this.$props
    var isTop = layout === 'topmenu'
    var needSettingWidth = fixedHeader && hasSiderMenu && !isTop && !isMobile
    var className = {
      'ant-pro-fixed-header': fixedHeader,
      'ant-pro-top-menu': isTop
    } // 没有 <></> 暂时代替写法

    return visible ? h(VueFragment, [fixedHeader && h(Header), h(Header, {
      style: {
        padding: 0,
        width: needSettingWidth ? 'calc(100% - '.concat(collapsed ? 48 : siderWidth, 'px)') : '100%',
        zIndex: 9,
        right: fixedHeader ? 0 : undefined
      },
      'class': className
    }, [renderContent(h, props)])]) : null
  }
}
export default HeaderView
