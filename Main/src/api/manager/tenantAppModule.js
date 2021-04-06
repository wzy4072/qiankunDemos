import request from '@/utils/request'

// 保存租户【应用-模块-菜单】分配数据
export function saveTenantAppModuleMenuAssignedData (tenantId, data) {
    return request({
        url: '/manager/tenantAppModule/' + tenantId,
        method: 'post',
        data: data
    })
}

// 获取租户【应用-模块-菜单】分配数据
export function getTenantAssignedAppModuleMenuData (tenantId) {
    return request({
        url: '/manager/tenantAppModule/tenantAssignedAppModuleMenuData/' + tenantId,
        method: 'get'
    })
}

// 获取获取租户-应用-模块树列表
export function getTenantApplicationModuleTree (tenantId) {
    return request({
        url: '/manager/tenantAppModule/tree/' + tenantId,
        method: 'get'
    })
}
