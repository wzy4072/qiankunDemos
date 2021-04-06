import request from '@/utils/request'

// 新增银行类型
export function addBtBankType (data) {
    return request({
        url: '/basic/bankType',
        method: 'post',
        data: data
    })
}

// 删除银行类型
export function deleteBtBankType (ids) {
    return request({
        url: '/basic/bankType/delete',
        method: 'post',
        data: ids
    })
}

// 修改银行类型
export function updateBtBankType (data) {
    return request({
        url: '/basic/bankType/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBtBankType (query) {
    return request({
        url: '/basic/bankType/conditions',
        method: 'post',
        data: query
    })
}

// 查询银行类型列表
export function listBtBankType (query) {
    return request({
        url: '/basic/bankType/list',
        method: 'get',
        params: query
    })
}

// 查询银行类型详细
export function getBtBankType (id) {
    return request({
        url: '/basic/bankType/' + id,
        method: 'get'
    })
}

// 上传图片
export function uploading (data) {
    return request({
        url: '/basic/attachment/upload',
        method: 'post',
        data
    })
}
