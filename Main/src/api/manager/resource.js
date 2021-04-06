import request from '@/utils/request'

export function addResource (data) {
    return request({
        url: '/manager/resource',
        method: 'post',
        data
    })
}

export function deleteResource (ids) {
    return request({
        url: '/manager/resource/delete',
        method: 'post',
        data: ids
    })
}

export function updateResource (data) {
    return request({
        url: '/manager/resource/' + data.id,
        method: 'put',
        data
    })
}
export function getResource (id) {
    return request({
        url: '/manager/resource/' + id,
        method: 'get'
    })
}
export function listResource (data) {
    return request({
        url: '/manager/resource/list',
        method: 'post',
        data
    })
}
export function searchResource (data) {
    return request({
        url: '/manager/resource/conditions',
        method: 'post',
        data
    })
}
