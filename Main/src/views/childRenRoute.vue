<template>
  <div>
    <h1>this is chidlren Route</h1>
    <div id="app-container"></div>
  </div>
</template>

<script>
import { start } from "qiankun";
export default {
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
};
</script>

<style></style>
