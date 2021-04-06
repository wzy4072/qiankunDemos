<template>
  <div>
    <a-button @click="addUser()">添加用户 </a-button>
    <a-input> </a-input>
  </div>
</template>

<script>
export default {
    // components: {
    //     CorpTreeSelect
    // },
    data () {
        return {
            tempId: 666
        }
    },
    computed: {
        needRefresh () {
            const result = this.$store.getters.refreshPath === this.$route.fullPath
            this.$store.commit('SET_REFRESH_PATH', null)
            return result
        }
    },
    methods: {
        addUser () {
            this.tempId++
            const tabFullPath = `/commonEdit/addUser/id/${this.tempId}`
            this.$store.commit('SET_ASYNC_TABS', {
                componentDirPath: '/Demos/TempComponents/addUser',
                props: { userInfo: { name: 'tom' } },
                title: '新增用户' + this.tempId,
                parentPath: this.$route.fullPath,
                tabFullPath
            })
            this.$router.push({ path: tabFullPath })
        }
    },
    created () {
        console.log('demo1 created')
    },
    mounted () {
        console.log('demo1 mounted')
    },
    updated () {
        console.log('demo1 updated')
    },
    activated () {
        if (this.needRefresh) {
            this.$message.info('触发刷新动作！')
        }
        console.log('demo1 activated')
    },
    deactivated () {
        console.log('demo1 deactivated')
    }
}
</script>

<style></style>
