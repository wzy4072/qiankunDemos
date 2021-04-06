import request from '@/utils/request'

// 删除租户菜单
export function deleteTenantMenu (ids) {
    return request({
        url: '/system/tenantMenu/delete',
        method: 'post',
        data: ids
    })
}

// 查询租户菜单树列表
export function getTenantMenuTreeList (data) {
    return request({
        url: '/system/tenantMenu/treeList',
        method: 'post',
        data: data
    })
}

// 查询当前用户菜单树列表
export function getCurrentUserMenuTreeList () {
    return request({
        url: '/system/userMenuTree',
        method: 'get'
    })
}
