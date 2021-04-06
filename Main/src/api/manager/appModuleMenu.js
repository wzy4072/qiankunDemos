import request from '@/utils/request'

// 保存【模块-菜单】关联关系
export function saveModuleMenuAssignedData (data) {
    return request({
        url: '/manager/moduleMenu',
        method: 'post',
        data: data
    })
}

// 获取【应用-模块-菜单】关联关系
export function getModuleMenuAssignedData (data) {
    return request({
        url: '/manager/moduleMenu/assignedData',
        method: 'get',
        data: data
    })
}

// 获取指定应用的【模块-菜单】关联关系
export function getApplicationModuleMenuAssignedData (appId) {
    return request({
        url: '/manager/moduleMenu/assignedData/' + appId,
        method: 'get'
    })
}
