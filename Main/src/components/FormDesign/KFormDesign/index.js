/*
 * author kcz
 * date 2019-11-20
 */
import KFormDesign from './index.vue'

KFormDesign.install = function (Vue) {
  console.log('组件名字', KFormDesign.name)
  Vue.component(KFormDesign.name, KFormDesign)
}

export default KFormDesign
