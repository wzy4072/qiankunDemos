import request from '@/utils/request'

const api = {
  mockDemo1: '/demo/dragColumns',
  service: '/demo/service',
  service2: '/demo/demo2/table',
  corpTreeSelect: '/demo/corpTreeSelect'
}

export default api

export function getDragColumns (parameter) {
  return request({
    url: api.mockDemo1,
    method: 'get',
    params: parameter
  })
}
export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}
export function getServiceList2 (parameter) {
  return request({
    url: api.service2,
    method: 'get',
    params: parameter
  })
}
export function corpTreeSelect (parameter) {
  return request({
    url: api.corpTreeSelect,
    method: 'get',
    params: parameter
  })
}

export function demoPostApi (data) {
  return request({
      url: '/demo/post',
       method: 'post',
      data: data
  })
}
