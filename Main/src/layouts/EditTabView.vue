<script>
// keepAlive:false 时,触发select（刷新tab）事件时触发，created mounted 周期函数
// keepAlive:true 时,触发select（刷新tab）事件时触发，activated 周期函数
// 刷新事件可通过该周期方法实现
import DefCom from './DefCom'
import LoadCom from './LoadCom'
import Vue from 'vue'

let asyProps = {}
export default {
    props: {
        pageName: {
            type: String,
            require: true,
            default: 'addUser'
        },
        id: {
            type: [String, Number],
            require: true,
            default: 'add'
        }
    },
    data () {
        return {
            componentsName: null
        }
    },
    components: {
        DefCom: DefCom,
        LoadCom
    },
    render () {
        if (!asyProps.componentDirPath) {
            return <DefCom></DefCom>
        }
        if (!this.componentsName) {
            return <LoadCom></LoadCom>
        }
        // console.log('渲染组件', this.componentsName)
        return <this.componentsName {...{ props: asyProps.props }}></this.componentsName>
    },
    created () {
        asyProps = this.$store.getters.asyncTabProps(this.$route.fullPath) || {}

        const { componentDirPath } = asyProps
        if (componentDirPath) {
            const TagName = componentDirPath.replaceAll('/', '')
            import(`@/views${componentDirPath}`).then(component => {
                Vue.component(TagName, component.default)
                this.componentsName = TagName
            })
        }

        // console.log('EditTabView created')
    },
    mounted () {
        // console.log('EditTabView mounted')
    },
    updated () {
        // console.log('EditTabView updated')
    },
    beforeDestroy () {
        // console.log('EditTabView beforeDestroy', this.$route.query.mainPage)
    },
    destroyed () {
        // console.log('EditTabView destroyed')
    },
    activated () {
        const titleDom = document
            .querySelector('.ant-tabs-tab-active.ant-tabs-tab')
            ?.querySelector('.ant-dropdown-trigger')
        titleDom && (titleDom.textContent = asyProps.title)
        // console.log('EditTabView activated')
    },
    deactivated () {
        // this.$destroy(asyProps.componentDirPath)
        // console.log('EditTabView deactivated')
    }
}
</script>

<style></style>
