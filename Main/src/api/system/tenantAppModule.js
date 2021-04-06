import request from '@/utils/request'

// 删除租户-应用/模块分配
export function deleteTenantAppModule (ids) {
    return request({
        url: '/system/tenantAppModule/delete',
        method: 'post',
        data: ids
    })
}

// 修改租户-应用/模块分配
export function updateTenantAppModule (data) {
    return request({
        url: '/system/tenantAppModule/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询租户-应用/模块分配详细
export function getTenantAppModule (id) {
    return request({
        url: '/system/tenantAppModule/' + id,
        method: 'get'
    })
}

// 获取获取租户-应用-模块树列表
export function getTenantApplicationModuleTree () {
    return request({
        url: '/system/tenantAppModule/tree',
        method: 'get'
    })
}
