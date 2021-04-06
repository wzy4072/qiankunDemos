import request from '@/utils/request'

// 新增用户
export function addUser (data) {
    return request({
        url: '/system/user',
        method: 'post',
        data
    })
}

// 删除用户
export function deleteUser (ids) {
    return request({
        url: '/system/user/delete',
        method: 'post',
        data: ids
    })
}

// 修改用户
export function updateUser (data) {
    return request({
        url: '/system/user/' + data.id,
        method: 'put',
        data
    })
}

// 重置密码
export function resetPassword (ids) {
    return request({
        url: '/system/user/resetPassword',
        method: 'put',
        data: ids
    })
}

// 用户分配角色
export function assignRole (userId, data) {
    return request({
        url: '/system/user/' + userId + '/assignRole',
        method: 'put',
        data
    })
}

// 查询用户
export function searchUser (data) {
    return request({
        url: '/system/user/conditions',
        method: 'post',
        data: data
    })
}

// 获取用户
export function getUser (id) {
    return request({
        url: '/system/user/' + id,
        method: 'get'
    })
}

// 根据用户ID获取用户列表
export function listUserByIds (ids) {
    return request({
        url: '/system/user/list',
        method: 'post',
        data: ids
    })
}

// 根据成员单位ID获取用户列表
export function listByTenantIdAndCorpId (corpId) {
    return request({
        url: '/system/user/listByCorpId?corpId=' + corpId,
        method: 'get'
    })
}
