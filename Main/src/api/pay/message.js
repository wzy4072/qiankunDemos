import request from '@/utils/request'

// 新增结算日志
export function addMessage(data) {
    return request({
        url: '/pay/message',
        method: 'post',
        data: data
    })
}

// 删除结算日志
export function deleteMessage(ids) {
    return request({
        url: '/pay/message/delete',
        method: 'post',
        data: ids
    })
}

// 修改结算日志
export function updateMessage(data) {
    return request({
        url: '/pay/message/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchMessage(query) {
    return request({
        url: '/pay/message/conditions',
        method: 'post',
        data: query
    })
}

// 查询结算日志列表
export function listMessage(query) {
    return request({
        url: '/pay/message/list',
        method: 'get',
        params: query
    })
}

// 查询结算日志详细
export function getMessage(id) {
    return request({
        url: '/pay/message/' + id,
        method: 'get'
    })
}
