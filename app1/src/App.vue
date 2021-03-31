<template>
  <div id="app">
    <h1>app1</h1>
    ?
    <router-link v-for="(n, i) in buttonList" :key="'key' + i" :to="n.path">
      <a-button>{{ n.title }} </a-button>
    </router-link>
    ?
    <hr>
    <keep-alive>
      <router-view :key="$route.path" />
    </keep-alive>
  </div>
</template>

<script>
import { routes } from "./routers";
export default {
  name: "App",
  components: {},
  data() {
    return {
      buttonList: routes,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dcffde;
}
</style>
