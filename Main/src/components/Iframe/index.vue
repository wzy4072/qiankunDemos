<template>
  <a-spin :spinning="loading" :style="'height:'+ height">
    <iframe :src="src" frameborder="no" :style="'height:'+ height" scrolling="auto" width="100%"/>
  </a-spin>
</template>
<script>
  export default {
    props: {
      src: {
        type: String,
        default: '',
        required: true
      }
    },
    data () {
      return {
        height: document.documentElement.clientHeight - 350 + 'px;',
        loading: true
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.loading = false
      }, 230)
      const that = this
      console.log(this.height)
      window.onresize = function temp () {
        that.height = document.documentElement.clientHeight - 350 + 'px;'
      }
    }
  }
</script>
