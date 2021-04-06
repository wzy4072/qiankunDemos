import request from '@/utils/request'

export function addTenant (data) {
    return request({
        url: '/manager/tenant',
        method: 'post',
        data
    })
}

export function assignApp (data) {
    return request({
        url: '/manager/tenant/assignApp',
        method: 'post',
        data
    })
}

export function deleteTenant (ids) {
    return request({
        url: '/manager/tenant/delete',
        method: 'post',
        data: ids
    })
}

export function updateTenant (data) {
    return request({
        url: '/manager/tenant/' + data.id,
        method: 'put',
        data
    })
}

export function queryTenant (data) {
    return request({
        url: '/manager/tenant/conditions',
        method: 'post',
        data
    })
}

export function getTenant (id) {
    return request({
        url: '/manager/tenant/' + id,
        method: 'get'
    })
}

export function tenantApps (id) {
    return request({
        url: '/manager/tenant/' + id + '/apps',
        method: 'get'
    })
}
