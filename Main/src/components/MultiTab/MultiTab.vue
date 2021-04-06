<script>
import events from './events'
import { bxAnaalyse } from '@/core/icons'
import { i18nRender } from '@/locales'
const indexKey = '/index' // 首页
export default {
    name: 'MultiTab',
    data () {
        return {
            fullPathList: [],
            pages: [],
            activeKey: '',
            newTabIndex: 0
        }
    },
    created () {
        // bind event
        events
            .$on('open', val => {
                if (!val) {
                    throw new Error(`multi-tab: open tab ${val} err`)
                }
                this.activeKey = val
            })
            .$on('close', val => {
                if (!val) {
                    this.closeThat(this.activeKey)
                    return
                }
                this.closeThat(val)
            })
            .$on('rename', ({ key, name }) => {
                try {
                    const item = this.pages.find(item => item.path === key)
                    item.meta.customTitle = name
                    this.$forceUpdate()
                } catch (e) {}
            })
        // 添加首页

        if (this.$route.fullPath !== indexKey) {
            this.addIndexToFirst()
        }
        this.pages.push(this.$route)
        this.fullPathList.push(this.$route.fullPath)
        this.selectedLastPath()
    },
    methods: {
        // 将首页添加到第一位
        addIndexToFirst () {
            this.pages.splice(0, 0, {
                name: 'index',
                path: indexKey,
                fullPath: indexKey,
                meta: {
                    icon: bxAnaalyse,
                    title: '首页'
                }
            })
            this.fullPathList.splice(0, 0, indexKey)
        },
        onEdit (targetKey, action) {
            this[action](targetKey)
        },
        remove (targetKey) {
            this.pages = this.pages.filter(page => page.fullPath !== targetKey)
            this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
            // ------------- 新增编辑弹窗关闭时 返回父页面的动作------------start
            const parentPath = this.$store.getters.asyncTabProps(targetKey)?.parentPath || null
            if (this.fullPathList.includes(parentPath)) {
                this.activeKey = parentPath
                // ------------- 新增编辑弹窗关闭时 返回父页面的动作------------end
            } else if (!this.fullPathList.includes(this.activeKey)) {
                // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
                this.selectedLastPath()
            } else {
                this.selectedLastPath()
            }
        },
        selectedLastPath () {
            this.activeKey = this.fullPathList[this.fullPathList.length - 1]
        },
        // content menu
        refresh (e) {
            this.$emit('select')
        },
        closeThat (e) {
            // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
            // 如果是首页，也不充许关闭
            if (this.fullPathList.length > 1 && indexKey !== e) {
                this.remove(e)
            } else {
                if (indexKey === e) {
                    this.$message.info(i18nRender('sys.message.tab.noclose.home'))
                } else {
                    this.$message.info(i18nRender('sys.message.tab.noclose.onlytab'))
                }
            }
        },
        closeLeft (e) {
            const currentIndex = this.fullPathList.indexOf(e)
            if (currentIndex > 0) {
                this.fullPathList.forEach((item, index) => {
                    if (index < currentIndex && item !== indexKey) {
                        this.remove(item)
                    }
                })
            } else {
                this.$message.info(i18nRender('sys.message.tab.noclose.left'))
            }
        },
        closeRight (e) {
            const currentIndex = this.fullPathList.indexOf(e)
            if (currentIndex < this.fullPathList.length - 1) {
                this.fullPathList.forEach((item, index) => {
                    if (index > currentIndex) {
                        this.remove(item)
                    }
                })
            } else {
                this.$message.info(i18nRender('sys.message.tab.noclose.right'))
            }
        },
        closeAll (e) {
            this.fullPathList.forEach((item, index) => {
                if (item !== indexKey) {
                    this.remove(item)
                }
            })
            this.$router.push(indexKey)
        },
        closeMenuClick (key, route) {
            this[key](route)
        },
        renderTabPaneMenu (e) {
            return (
                <a-menu
                    {...{
                        on: {
                            click: ({ key, item, domEvent }) => {
                                this.closeMenuClick(key, e)
                            }
                        }
                    }}
                >
                    <a-menu-item key="refresh">
                        <a-icon type="reload" />
                        {i18nRender('common.btn.refresh')}
                    </a-menu-item>
                    <a-menu-item key="closeThat">
                        <a-icon type="close" />
                        {i18nRender('common.tab.close.current')}
                    </a-menu-item>
                    <a-menu-item key="closeRight">
                        <a-icon type="arrow-right" />
                        {i18nRender('common.tab.close.right')}
                    </a-menu-item>
                    <a-menu-item key="closeLeft">
                        <a-icon type="arrow-left" />
                        {i18nRender('common.tab.close.left')}
                    </a-menu-item>
                    <a-menu-item key="closeAll">
                        <a-icon type="close" />
                        {i18nRender('common.tab.close.all')}
                    </a-menu-item>
                </a-menu>
            )
        },
        // render
        renderTabPane (title, keyPath) {
            const menu = this.renderTabPaneMenu(keyPath)

            return (
                <a-dropdown overlay={menu} trigger={['contextmenu']}>
                    <span style={{ userSelect: 'none', display: 'inline-block', padding: '0 10px' }}>{title}</span>
                </a-dropdown>
            )
        }
    },
    watch: {
        $route: function (newVal) {
            this.activeKey = newVal.fullPath
            if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
                this.fullPathList.push(newVal.fullPath)
                this.pages.push(newVal)
            }
        },
        activeKey: function (newPathKey) {
            this.$router.push({ path: newPathKey })
        },
        '$store.state.pages.removeTargetKey': {
            deep: true,
            handler: function (newVal, oldVal) {
                newVal && this.remove(newVal)
                this.$store.commit('SET_REMOVE_KEY', null)
            }
        }
    },
    render () {
        const {
            onEdit,
            $data: { pages }
        } = this
        const panes = pages.map(page => {
            return (
                <a-tab-pane
                    style={{ height: 0 }}
                    tab={this.renderTabPane(page.meta.customTitle || page.meta.title, page.fullPath)}
                    key={page.fullPath}
                    closable={page.fullPath !== '/index'}
                ></a-tab-pane>
            )
        })

        return (
            <div class="ant-pro-multi-tab">
                <div class="ant-pro-multi-tab-wrapper">
                    <a-tabs
                        hideAdd
                        type={'editable-card'}
                        v-model={this.activeKey}
                        tabBarStyle={{
                            background: '#FFF',
                            margin: 0,
                            paddingLeft: '16px',
                            paddingTop: '1px',
                            height: '52px',
                            border: 'none'
                        }}
                        {...{ on: { edit: onEdit } }}
                    >
                        {panes}
                    </a-tabs>
                </div>
            </div>
        )
    }
}
</script>
