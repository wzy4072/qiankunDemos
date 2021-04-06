import request from '@/utils/request'

// 启动工作流实例
export function startProcessInstance (data) {
  return request({
    url: '/workflow/processInstance/start',
    method: 'post',
    data: data
  })
}

// 启动工作流实例
export function startProcessInstanceByKey (processDefinitionKey, data) {
  return request({
    url: '/workflow/processInstance/start/' + processDefinitionKey,
    method: 'post',
    data: data
  })
}

// 分页查询待办任务
export function getTodoTaskPage (data) {
  return request({
    url: '/workflow/task/todo/conditions',
    method: 'post',
    data: data
  })
}

// 分页查询待办任务
export function getTodoListAll (data) {
  return request({
    url: '/workflow/task/todo/listAll',
    method: 'post',
    data: data
  })
}
