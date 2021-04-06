<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomCenter">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"/>
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <!--        <a-menu-item v-if="menu" key="center" @click="handleToCenter">-->
        <!--          <a-icon type="user" />-->
        <!--          个人中心-->
        <!--        </a-menu-item>-->
        <!--        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">-->
        <!--          <a-icon type="setting" />-->
        <!--          个人设置-->
        <!--        </a-menu-item>-->
        <!--        <a-menu-divider v-if="menu" />-->
        <a-menu-item key="settings" @click="openSettingDraw">
          <a-icon type="setting"/>
          风格设置
        </a-menu-item>
        <a-menu-item key="clearCache" @click="clearCache">
          <a-icon type="delete"/>
          清理缓存
        </a-menu-item>
        <a-menu-item key="waterMark" @click="clearWaterMark">
          <a-icon type="border-horizontal"/>
          {{ watermarksName }}
        </a-menu-item>
        <a-menu-divider v-if="menu"/>
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout"/>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }"/>
  </span>
</template>

<script>
    import { Modal } from 'ant-design-vue'
    import storage from 'store'
    import { APP_WATERMASK } from '@/store/mutation-types'
    import WaterMask from '@/assets/watermark'
    import store from '@/store'

    export default {
        name: 'AvatarDropdown',
        props: {
            currentUser: {
                type: Object,
                default: () => null
            },
            menu: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                watermarksName: '清除水印'
            }
        },
        created () {
            this.watermarksName = storage.get(APP_WATERMASK) !== false ? '清除水印' : '添加水印'
        },
        methods: {
            handleToCenter () {
                this.$router.push({ path: '/account/center' })
            },
            handleToSettings () {
                // this.$router.push({path: '/account/settings'})
                //   this.$emit('showSettingsDrawer');
            },
            handleLogout (e) {
                Modal.confirm({
                    title: '信息',
                    content: '请确认退出系统吗?',
                    // title: this.$t('layouts.usermenu.dialog.title'),
                    // content: this.$t('layouts.usermenu.dialog.content'),
                    onOk: () => {
                        // return new Promise((resolve, reject) => {
                        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
                        // }).catch(() => console.log('Oops errors!'))
                        return this.$store.dispatch('Logout').then(() => {
                            this.$router.push({ name: 'login' })
                        })
                    },
                    onCancel () {
                    }
                })
            },
            openSettingDraw () {
                this.$emit('showSettingDrawer')
            },
            // 清缓存
            clearCache () {
                this.$ls.clear()
                this.$message.success('刷新缓存完成！')
            },
            clearWaterMark () {
                if (storage.get(APP_WATERMASK)) {
                    setTimeout(() => {
                        this.watermarksName = '添加水印'
                        const canvas = document.getElementById('watermask')
                        const cxt = canvas.getContext('2d')
                        cxt.clearRect(0, 0, canvas.width, canvas.height)
                        storage.set(APP_WATERMASK, false)
                    }, 500)
                } else {
                    setTimeout(() => {
                        this.watermarksName = '清除水印'
                        storage.set(APP_WATERMASK, true)
                        document.getElementById('watermask').style.display = 'block'
                        new WaterMask({
                            font: store.getters.userName,
                            // rows: 20,
                            // cols: 20,
                            xGap: 360,
                            yGap: 200
                        })
                    }, 500)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .ant-pro-drop-down {
        /deep/ .action {
            margin-right: 8px;
        }

        /deep/ .ant-dropdown-menu-item {
            min-width: 160px;
        }
    }
</style>
