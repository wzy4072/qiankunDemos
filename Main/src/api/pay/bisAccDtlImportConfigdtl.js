import request from '@/utils/request'

// 新增离线流水智能导入配置
export function addBisAccDtlImportConfigdtl (data) {
    return request({
        url: '/pay/bisAccDtlImportConfigdtl',
        method: 'post',
        data: data
    })
}

// 删除离线流水智能导入配置
export function deleteBisAccDtlImportConfigdtl (ids) {
    return request({
        url: '/pay/bisAccDtlImportConfigdtl/delete',
        method: 'post',
        data: ids
    })
}

// 修改离线流水智能导入配置
export function updateBisAccDtlImportConfigdtl (data) {
    return request({
        url: '/pay/bisAccDtlImportConfigdtl/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBisAccDtlImportConfigdtl (query) {
    return request({
        url: '/pay/bisAccDtlImportConfigdtl/conditions',
        method: 'post',
        data: query
    })
}

// 查询离线流水智能导入配置列表
export function listBisAccDtlImportConfigdtl (query) {
    return request({
        url: '/pay/bisAccDtlImportConfigdtl/list',
        method: 'get',
        params: query
    })
}

// 查询离线流水智能导入配置详细
export function getBisAccDtlImportConfigdtl (id) {
    return request({
        url: '/pay/bisAccDtlImportConfigdtl/' + id,
        method: 'get'
    })
}
