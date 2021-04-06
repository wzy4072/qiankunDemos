import request from '@/utils/request'

export function search (data) {
    return request({
        url: '/manager/app/conditions',
        method: 'post',
        data
    })
}

export function register () {
    return request({
        url: '/manager/app/register',
        method: 'post'
    })
}

export function getTree () {
    return request({
        url: '/manager/app/tree',
        method: 'get'
    })
}

export function getMenuAndResourceById (applicationId) {
    return request({
        url: '/manager/app/getMenuAndResource/' + applicationId,
        method: 'get'
    })
}

export function metadata () {
    return request({
        url: '/manager/app/metadata',
        method: 'get'
    })
}
