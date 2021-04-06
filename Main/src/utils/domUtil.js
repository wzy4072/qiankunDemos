import config from '@/config/defaultSettings'
import Vue from 'vue'

export const setDocumentTitle = function (title) {
  // document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const domTitle = config.title

let detailNode = null
export function detailModal (info) {
    if (detailNode) {
        detailNode.show(info)
    } else {
         import(`@/components/Descriptions/DescriptionsModal.vue`).then((component) => {
            const ComponentFun = Vue.extend(component.default)
             detailNode = new ComponentFun().$mount()
            document.body.appendChild(detailNode.$el)
            detailNode.show(info)
      })
    }
}
