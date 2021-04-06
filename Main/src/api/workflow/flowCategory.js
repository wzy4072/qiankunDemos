import request from '@/utils/request'

// 新增工作流-流程分类
export function addFlowCategory (data) {
    return request({
        url: '/workflow/flowCategory',
        method: 'post',
        data: data
    })
}

// 删除工作流-流程分类
export function deleteFlowCategory (ids) {
    return request({
        url: '/workflow/flowCategory/delete',
        method: 'post',
        data: ids
    })
}

// 修改工作流-流程分类
export function updateFlowCategory (data) {
    return request({
        url: '/workflow/flowCategory/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchFlowCategory (query) {
    return request({
        url: '/workflow/flowCategory/conditions',
        method: 'post',
        data: query
    })
}

// 获取流程分类树
export function getFlowCategoryTree () {
    return request({
        url: '/workflow/flowCategory/tree',
        method: 'get'
    })
}

// 查询工作流-流程分类列表
export function listFlowCategory (query) {
    return request({
        url: '/workflow/flowCategory/list',
        method: 'get',
        params: query
    })
}

// 查询工作流-流程分类详细
export function getFlowCategory (id) {
    return request({
        url: '/workflow/flowCategory/' + id,
        method: 'get'
    })
}
