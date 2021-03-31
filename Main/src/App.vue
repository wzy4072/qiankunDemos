<template>
  <div id="root">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline">
          <a-menu-item
            v-for="routeItem in buttonList"
            :key="routeItem.name"
            @click="$router.push({ path: routeItem.path })"
          >
            {{ routeItem.name }}--{{ routeItem.path }}
          </a-menu-item>
          <a-menu-item
            v-for="routeItem in app1Menus"
            :key="routeItem.name"
            @click="$router.push({ path: routeItem.path })"
          >
            {{ routeItem.name }}--{{ routeItem.path }}
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view />
          <div id="app-container"></div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- <h1>MainApp</h1>
    <router-link v-for="(n, i) in buttonList" :key="'key' + i" :to="n.path">
      <a-button>{{ n.title }} </a-button>
    </router-link>
    <hr />
    app1 menu
    <router-link v-for="(n, i) in app1Menus" :key="'app1' + i" :to="n.path">
      <a-button>{{ n.title }} </a-button>
    </router-link>
    <hr />
    <keep-alive>
      <router-view :key="$route.path" />
    </keep-alive> -->
  </div>
</template>

<script>
import { routes } from "./routers";
export default {
  name: "App",
  components: {},
  data() {
    return {
      collapsed: false,
      buttonList: routes,
      app1Menus: [
        { title: "app1-page1", path: "/app1/page1" },
        { title: "app1-page2", path: "/app1/page2" },
        { title: "app1-page3", path: "/app1/page3" },
      ],
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
  margin-top: 60px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
