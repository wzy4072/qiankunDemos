/*
 * author kcz
 * date 2019-11-20
 */
import KFormBuild from './index.vue'

KFormBuild.install = function (Vue) {
  console.log('组件名字', KFormBuild.name)
  Vue.component(KFormBuild.name, KFormBuild)
}

export default KFormBuild
