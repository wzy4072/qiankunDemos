<template>
  <div>
    用户默认信息 userInfo {{ userInfo }}
    <a-input placeholder="Basic usage" />
  </div>
</template>

<script>
export default {
    props: ['userInfo'],
    data () {
        return {}
    },
    created () {
        // this.asyProps = this.$store.getters.asyncTabProps(this.$route.fullPath).props
    },
    mounted () {
        console.log('addUserModel mounted')
    },
    updated () {
        console.log('addUserModel updated')
    },
    activated () {
        console.log('addUserModel activated')
    },
    deactivated () {
        console.log('addUserModel deactivated')
    },
    beforeRouteEnter (to, from, next) {
        console.log('addUserModel beforeRouteEnter')
        next()
    },
    beforeRouteUpdate (to, from, next) {
        console.log('addUserModel beforeRouteEnter')
        next()
    }
}
</script>

<style></style>
