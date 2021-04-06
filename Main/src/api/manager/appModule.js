import request from '@/utils/request'

// 新增应用
export function addApplication (data) {
    return request({
        url: '/manager/appModule/add/application',
        method: 'post',
        data: data
    })
}

// 新增模块
export function addModule (data) {
    return request({
        url: '/manager/appModule/add/module',
        method: 'post',
        data: data
    })
}

// 删除应用-模块
export function deleteAppModule (ids) {
    return request({
        url: '/manager/appModule/delete',
        method: 'post',
        data: ids
    })
}

// 修改应用-模块
export function updateApplication (data) {
    return request({
        url: '/manager/appModule/application/' + data.id,
        method: 'put',
        data: data
    })
}

// 修改模块
export function updateModule (data) {
    return request({
        url: '/manager/appModule/module/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询应用-模块列表
export function searchAppModule (query) {
    return request({
        url: '/manager/appModule/conditions',
        method: 'post',
        data: query
    })
}

// 查询模块列表
export function searchModule (query) {
    return request({
        url: '/manager/appModule/module/conditions',
        method: 'post',
        data: query
    })
}

// 查询应用列表
export function listAllApplication (query) {
    return request({
        url: '/manager/appModule/application/listAll',
        method: 'get',
        params: query
    })
}

// 查询应用-模块列表
export function listAppModule (query) {
    return request({
        url: '/manager/appModule/list',
        method: 'get',
        params: query
    })
}

// 查询应用-模块详细
export function getAppModule (id) {
    return request({
        url: '/manager/appModule/' + id,
        method: 'get'
    })
}

// 查询模块详细
export function getModule (id) {
    return request({
        url: '/manager/appModule/module/' + id,
        method: 'get'
    })
}

// 获取【应用-模块】树（两个层级：应用->模块）
export function getApplicationModuleTree () {
    return request({
        url: '/manager/appModule/tree',
        method: 'get'
    })
}
