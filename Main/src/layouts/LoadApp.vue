<template>
  <div id="app-container"></div>
</template>

<script>
import { start } from 'qiankun'
export default {
    mounted () {
        if (!window.qiankunStarted) {
            window.qiankunStarted = true
            start()
        }
    }
}
</script>

<style></style>
