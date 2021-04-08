### 本项目用于探索微前端乾坤框架的使用

- 下载代码 git clone git@github.com:wzy4072/qiankunDemos.git
- 仓库地址： https://github.com/wzy4072/qiankunDemos.git

#### 三个项目基于 vue-cli 创建的 hello-word 工程

- 日志：2021.3.31 16.40
  根据乾坤官方文档 进行了基本配置 实现了预期效果。
  配置概括如下
  1 主应用 注册子应用
  2 主应用 配置路由 设置挂载点
  3 子应用 配置 output
  4 子应用 配置钩子函数

- 任务 主应用登录 子应用使用 token

### 需求

- 1 微应用可以独立访问
- 2

### MainApp

#### main.js

```js
import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: "vue app",
    entry: "//localhost:5001",
    container: "#container-app1",
    activeRule: "/app1",
  },
]);

start();
```

### MicroApp

#### main.js

```js
export async function bootstrap() {
  console.log("react app bootstraped");
}

export async function mount(props) {
  ReactDOM.render(
    <App />,
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

export async function update(props) {
  console.log("update props", props);
}
```

#### vue.config.js

```js
const packageName = require("./package.json").name;
module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

#### 配置方案 Vue 微应用

> public-path.js 内容

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

> main.js

```js
import "./public-path";

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/app-vue/" : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
```

> vue.config.js

```js
const { name } = require("./package");
module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

#################################### 微应用问题记录 #################################################################################

- 1

```js
// 微应用不加载，无报错
```

主应用注册与微应用打包 registerMicroApps(option)[option.name] 与 configureWebpack.output.library 应保持一致

- 3

```js
 application 'app1' died in status LOADING_SOURCE_CODE: [qiankun] Target container with #app-container not existed while app1 loading!
```

解决： 路由内挂载完毕后调用 qiankun  
 mounted () {
if (!window.qiankunStarted) {
window.qiankunStarted = true
start()
}
}

- 4

````js
Uncaught TypeError: application 'app1' died in status LOADING_SOURCE_CODE: Failed to fetch
解决：微应用没有启动
```
- 5
```js
 A [import-html-entry]: error occurs while executing entry script http://xxx
 B application 'xxx' died in status LOADING_SOURCE_CODE: Cannot redefine property: $router
````
