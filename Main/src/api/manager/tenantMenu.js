import request from '@/utils/request'

// 删除租户菜单
export function deleteTenantMenu (ids) {
    return request({
        url: '/manager/tenantMenu/delete',
        method: 'post',
        data: ids
    })
}

// 查询应用-模块-菜单树列表
export function getAppModuleMenuTree () {
    return request({
        url: '/manager/menu/appModuleMenuTree',
        method: 'get'
    })
}

// 查询租户应用-模块-菜单-资源树列表
export function getTenantAppModuleMenuResourceTreeList (tenantId) {
    return request({
        url: '/manager/tenantMenu/listTenantMenuResource?tenantId=' + tenantId,
        method: 'get',
        query: {
            tenantId: tenantId
        }
    })
}

// 查询租户菜单树列表
export function getTenantMenuTreeList (tenantId, data) {
    return request({
        url: '/manager/tenantMenu/treeList/' + tenantId,
        method: 'post',
        data: data
    })
}
