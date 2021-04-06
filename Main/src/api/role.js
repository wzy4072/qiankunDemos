import request from '@/utils/request'

// 新增角色
export function addRole (data) {
    return request({
        url: '/system/role',
        method: 'post',
        data
    })
}

// 删除角色
export function deleteRole (ids) {
    return request({
        url: '/system/role/delete',
        method: 'post',
        data: ids
    })
}

// 修改角色
export function updateRole (data) {
    return request({
        url: '/system/role/' + data.id,
        method: 'put',
        data
    })
}

// 获取所有角色
export function getAllRole () {
    return request({
        url: '/system/role/all',
        method: 'get'
    })
}

// 查询角色
export function searchRole (data) {
    return request({
        url: '/system/role/conditions',
        method: 'post',
        data
    })
}

// 获取角色
export function getRole (id) {
    return request({
        url: '/system/role/' + id,
        method: 'get'
    })
}

// 获取角色
export function getRoleByUserId (id) {
    return request({
        url: '/system/role/user/' + id,
        method: 'get'
    })
}

// 保存角色数据权限
export function saveDataScope (data) {
    return request({
        url: '/system/role/saveDataScope',
        method: 'post',
        data
    })
}

export function saveRoleResource (roleId, resource) {
    return request({
        url: '/system/role/saveRoleResource/' + roleId,
        method: 'post',
        data: resource
    })
}

export function getResourceIdsByRoleId (roleId) {
    return request({
        url: '/system/role/roleResource/' + roleId,
        method: 'get'
    })
}

export function saveRoleMenu (roleId, resourceIds) {
    return request({
        url: '/system/role/saveRoleMenu/' + roleId,
        method: 'post',
        data: resourceIds
    })
}

export function getRoleMenuListByRoleId (roleId) {
    return request({
        url: '/system/role/roleMenu/' + roleId,
        method: 'get'
    })
}

export function getRoleColumns (data) {
    return request({
        url: '/demo/post',
         method: 'post',
        data: data
    })
}

export function getCustomParams (data) {
    return request({
        url: '/demo/post',
         method: 'post',
        data: data
    })
}

export function queryMenuResourceIdsByRoleId (roleId) {
    return request({
        url: '/system/role/roleMenu/queryMenuResourceIdsByRoleId/' + roleId,
        method: 'get'
    })
}
