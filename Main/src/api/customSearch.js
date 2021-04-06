import request from '@/utils/request'

export function addCustomParams (data) {
    return request({
        url: '/basic/customerTableData',
        method: 'post',
        data: data
    })
}
export function delCustomParams (ids) {
    return request({
        url: '/basic/customerTableData/delete',
        method: 'post',
        data: ids
    })
}
export function upDateTableColumns (data) {
    return request({
        url: '/basic/customerTableData/update/' + data.id,
        method: 'put',
        data: data
    })
}
export function getCustomParams (data) {
    return request({
        url: '/basic/customerTableData/list',
        method: 'post',
        data: data
    })
}
export function getCustomParam (data) {
    return request({
        url: '/basic/customerTableData/' + data.type + '/' + data.name,
        method: 'post',
        data: data
    })
}
