<template>
  <a-result style="background:#fff;" title="页面没找到或者不支持刷新，请返回主页面重试">
    <template #extra>
      <a-button key="console" type="primary" @click="goBack">
        返回
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
    data () {
        return {}
    },
    methods: {
        goBack () {
            history.go(-1)
        }
    }
}
</script>

<style></style>
