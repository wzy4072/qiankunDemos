/*
 * author kcz
 * date 2019-11-20
 */
import KFormPreview from './index.vue'

KFormPreview.install = function (Vue) {
  console.log('组件名字', KFormPreview.name)
  Vue.component(KFormPreview.name, KFormPreview)
}

export default KFormPreview
