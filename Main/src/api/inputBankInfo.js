import request from '@/utils/request'

// 新增联行号
export function addInfo (data) {
    return request({
        url: '/basic/inputBankInfo',
        method: 'post',
        data: data
    })
}

// 删除联行号
export function deleteInfo (ids) {
    return request({
        url: '/basic/inputBankInfo/delete',
        method: 'post',
        data: ids
    })
}

// 修改联行号
export function updateInfo (data) {
    return request({
        url: '/basic/inputBankInfo/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchInfo (query) {
    return request({
        url: '/basic/inputBankInfo/conditions',
        method: 'post',
        data: query
    })
}

// 查询联行号列表
export function listInfo (query) {
    return request({
        url: '/basic/inputBankInfo/list',
        method: 'get',
        params: query
    })
}

// 查询联行号详细
export function getInfo (id) {
    return request({
        url: '/basic/inputBankInfo/' + id,
        method: 'get'
    })
}
