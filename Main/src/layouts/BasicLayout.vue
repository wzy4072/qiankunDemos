<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
    :siderWidth="208"
  >
    <!-- Ads begin
      广告代码 真实项目中请移除
      production remove this Ads
    -->
    <!--    <ads v-if="isProPreviewSite && !collapsed"/>-->
    <!-- Ads end -->

    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <!-- layout content 64px-->
    <a-layout-content :style="{ height: '100%', margin: '0 0 40px 0', paddingTop: '0' }">
      <multi-tab v-if="settings.multiTab" @select="onMenuSelect"></multi-tab>
      <transition name="page-transition"> </transition>
    </a-layout-content>

    <template v-slot:menuHeaderRender>
      <div>
        <logo-svg />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <!-- 设置-->
    <setting-drawer :settings="settings" @change="handleSettingChange" ref="settingDrawer" />
    <!-- 页面头-->
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme">
        <template v-slot:avatar>
          <avatar-dropdown
            :menu="true"
            :current-user="currentUser"
            class="ant-pro-global-header-index-action"
            @showSettingDrawer="showSettingDrawer"
          ></avatar-dropdown>
        </template>
      </right-content>
    </template>
    <!-- 页面内容-->

    <!-- <keep-alive v-if="$route.meta.keepAlive">
      <router-view v-if="reloadFlag" :key="$route.path" />
    </keep-alive>
    <template v-else>
      <router-view v-if="reloadFlag" />
    </template> -->
    <!-- <keep-alive>
      <router-view :key="$route.path" />
    </keep-alive> -->

    <router-view />
    <!-- 页面脚-->
    <template v-slot:footerRender>
      <global-footer />
    </template>
  </pro-layout>
</template>
<script>
// import {  updateTheme ,SettingDrawer} from '@ant-design-vue/pro-layout'
import { updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE, TOGGLE_MULTI_TAB } from '@/store/mutation-types'
import store from '@/store'

import SettingDrawer from '@/components/SettingDrawer/SettingDrawer'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import Ads from '@/components/Other/CarbonAds'
import LogoSvg from '../assets/logo.svg?inline'
import AvatarDropdown from '@/components/GlobalHeader/AvatarDropdown'
import proLayout from '@/components/pro-layout'

import RouteView from '@/layouts/RouteView'

const indexKey = '/index'

export default {
    name: 'BasicLayout',
    components: {
        AvatarDropdown,
        SettingDrawer,
        RightContent,
        GlobalFooter,
        LogoSvg,
        Ads,
        RouteView,
        proLayout
    },
    data () {
        return {
            // preview.pro.antdv.com only use.
            isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
            // end

            // base
            menus: [],
            // 侧栏收起状态
            collapsed: false,
            title: defaultSettings.title,
            settings: {
                // 布局类型
                layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
                // CONTENT_WIDTH_TYPE
                contentWidth:
                    defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
                // 主题 'dark' | 'light'
                theme: defaultSettings.navTheme,
                // 主色调
                primaryColor: defaultSettings.primaryColor,
                fixedHeader: defaultSettings.fixedHeader,
                fixSiderbar: defaultSettings.fixSiderbar,
                colorWeak: defaultSettings.colorWeak,
                multiTab: defaultSettings.multiTab,
                hideHintAlert: false,
                hideCopyButton: false
            },
            // 媒体查询
            query: {},

            // 是否手机模式
            isMobile: false,
            currentUser: {},
            reloadFlag: true,
            pageList: [],
            linkList: [],
            activePage: ''
        }
    },
    computed: {
        ...mapState({
            // 动态主路由
            mainMenu: state => state.permission.addRouters,
            multipage: state => state.app.multiTab
        })
    },
    created () {
        const routes = this.mainMenu.find(item => item.path === '/')
        this.menus = (routes && routes.children) || []
        // 处理侧栏收起状态
        this.$watch('collapsed', () => {
            this.$store.commit(SIDEBAR_TYPE, this.collapsed)
        })
        this.$watch('isMobile', () => {
            this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
        })
    },
    mounted () {
        const userAgent = navigator.userAgent
        if (userAgent.indexOf('Edge') > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed
                setTimeout(() => {
                    this.collapsed = !this.collapsed
                }, 16)
            })
        }

        // first update color
        // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
        if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
            updateTheme(this.settings.primaryColor)
        }
        setTimeout(() => {
            this.currentUser = {
                name: store.getters.userName
            }
        }, 1500)
    },
    methods: {
        i18nRender,
        handleMediaQuery (val) {
            this.query = val
            if (this.isMobile && !val['screen-xs']) {
                this.isMobile = false
                return
            }
            if (!this.isMobile && val['screen-xs']) {
                this.isMobile = true
                this.collapsed = false
                this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
                // this.settings.fixSiderbar = false
            }
        },
        handleCollapse (val) {
            this.collapsed = val
        },
        handleSettingChange ({ type, value }) {
            console.log('type', type, value)
            type && (this.settings[type] = value)
            switch (type) {
                case 'contentWidth':
                    this.settings[type] = value
                    break
                case 'layout':
                    if (value === 'sidemenu') {
                        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
                    } else {
                        this.settings.fixSiderbar = false
                        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
                    }
                    break
                case 'multiTab':
                    this.$store.commit(TOGGLE_MULTI_TAB, value)
                    break
            }
        },
        showSettingDrawer () {
            this.$refs.settingDrawer.showDrawer()
        },
        onMenuSelect (key, target) {
            console.info('basic layout onMenuSelect')
            this.reloadFlag = false
            this.$store.commit(TOGGLE_MULTI_TAB, false)
            this.$nextTick(() => {
                this.$store.commit(TOGGLE_MULTI_TAB, true)
                this.reloadFlag = true
            })
        }
    }
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
