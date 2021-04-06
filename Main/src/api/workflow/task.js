import request from '@/utils/request'

// 执行审批
export function completeTask (data) {
    return request({
        url: '/workflow/task/complete',
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

// 分页查询已办任务
export function getHistoryTaskPage (data) {
    return request({
        url: '/workflow/task/history/conditions',
        method: 'post',
        data: data
    })
}
