import request from '@/utils/request'

// 新增离线流水智能导入配置
export function addBisAccDtlImportConfig (data) {
    return request({
        url: '/pay/bisAccDtlImportConfig',
        method: 'post',
        data: data
    })
}

// 删除离线流水智能导入配置
export function deleteBisAccDtlImportConfig (ids) {
    return request({
        url: '/pay/bisAccDtlImportConfig/delete',
        method: 'post',
        data: ids
    })
}

// 修改离线流水智能导入配置
export function updateBisAccDtlImportConfig (data) {
    return request({
        url: '/pay/bisAccDtlImportConfig/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBisAccDtlImportConfig (query) {
    return request({
        url: '/pay/bisAccDtlImportConfig/conditions',
        method: 'post',
        data: query
    })
}

// 查询离线流水智能导入配置列表
export function listBisAccDtlImportConfig (query) {
    return request({
        url: '/pay/bisAccDtlImportConfig/list',
        method: 'get',
        params: query
    })
}

// 查询离线流水智能导入配置详细
export function getBisAccDtlImportConfig (id) {
    return request({
        url: '/pay/bisAccDtlImportConfig/' + id,
        method: 'get'
    })
}
