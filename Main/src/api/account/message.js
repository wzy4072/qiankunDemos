import request from '@/utils/request'

// 新增账户管理日志
export function addMessage(data) {
    return request({
        url: '/account/message',
        method: 'post',
        data: data
    })
}

// 删除账户管理日志
export function deleteMessage(ids) {
    return request({
        url: '/account/message/delete',
        method: 'post',
        data: ids
    })
}

// 修改账户管理日志
export function updateMessage(data) {
    return request({
        url: '/account/message/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchMessage(query) {
    return request({
        url: '/account/message/conditions',
        method: 'post',
        data: query
    })
}

// 查询账户管理日志列表
export function listMessage(query) {
    return request({
        url: '/account/message/list',
        method: 'get',
        params: query
    })
}

// 查询账户管理日志详细
export function getMessage(id) {
    return request({
        url: '/account/message/' + id,
        method: 'get'
    })
}
