import request from '@/utils/request'

// 新增供应商类别
export function addSupplierType (data) {
    return request({
        url: '/basic/supplierType',
        method: 'post',
        data: data
    })
}

// 删除供应商类别
export function deleteSupplierType (ids) {
    return request({
        url: '/basic/supplierType/delete',
        method: 'post',
        data: ids
    })
}

// 修改供应商类别
export function updateSupplierType (data) {
    return request({
        url: '/basic/supplierType/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchSupplierType (query) {
    return request({
        url: '/basic/supplierType/conditions',
        method: 'post',
        data: query
    })
}

// 查询供应商类别列表
export function listSupplierType (query) {
    return request({
        url: '/basic/supplierType/list',
        method: 'get',
        params: query
    })
}

// 查询供应商类别详细
export function getSupplierType (id) {
    return request({
        url: '/basic/supplierType/' + id,
        method: 'get'
    })
}
