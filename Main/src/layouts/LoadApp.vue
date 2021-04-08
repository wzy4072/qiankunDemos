<template>
  <div id="app-container"></div>
</template>

<script>
import { start } from 'qiankun'
export default {
    mounted () {
        console.log('LoadApp mounted, window.qiankunStarted:', window.qiankunStarted)
        if (!window.qiankunStarted) {
            window.qiankunStarted = true
            start()
        }
    }
}
</script>

<style></style>
