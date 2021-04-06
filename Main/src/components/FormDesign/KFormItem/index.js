/*
 * author kcz
 * date 2019-11-20
 */
import KFormItem from './index.vue'

KFormItem.install = function (Vue) {
  console.log('组件名字', KFormItem.name)
  Vue.component(KFormItem.name, KFormItem)
}

export default KFormItem
