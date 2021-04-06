import request from '@/utils/request'

// 新增费用报销制单
export function addNisExpenseDetail (data) {
    return request({
        url: '/pay/nisExpenseDetail',
        method: 'post',
        data: data
    })
}

// 删除费用报销制单
export function deleteNisExpenseDetail (ids) {
    return request({
        url: '/pay/nisExpenseDetail/delete',
        method: 'post',
        data: ids
    })
}

// 修改费用报销制单
export function updateNisExpenseDetail (data) {
    return request({
        url: '/pay/nisExpenseDetail/' + data.id,
        method: 'put',
        data: data
    })
}

// 批量提交费用报销单
export function batchSubmit (ids) {
    return request({
        url: '/pay/nisExpenseDetail/batchSubmit',
        method: 'post',
        data: ids
    })
}

// 查询数据源列表
export function searchNisExpenseDetail (query) {
    return request({
        url: '/pay/nisExpenseDetail/conditions',
        method: 'post',
        data: query
    })
}

// 查询费用报销制单列表
export function listNisExpenseDetail (query) {
    return request({
        url: '/pay/nisExpenseDetail/list',
        method: 'get',
        params: query
    })
}

// 查询费用报销制单详细
export function getDetailById (id) {
    return request({
        url: '/pay/nisExpenseDetail/getDetailById/' + id,
        method: 'get'
    })
}

// 业务类型集合
export function getBusType () {
    return request({
        url: '/pay/nisBusinessType/list',
        method: 'get'
    })
}

// 操作类型集合
export function getlistOpType (busType) {
    return request({
        url: '/pay/nisBusinessType/listOpType/' + busType,
        method: 'get'
    })
}

// 查询接口代码列表
export function getBisBifInit () {
    return request({
        url: '/basic/bisbif/list',
        method: 'get'
    })
}

// 根据单位id和用途类型查询用途信息
export function getPurpose (corpId) {
    return request({
        url: '/basic/purpose/' + corpId + '/1',
        method: 'get'
    })
}

// 费用报销查询
export function getExpenseListPage (query) {
    return request({
        url: '/pay/nisExpenseDetail/getExpenseListPage',
        method: 'post',
        data: query
    })
}

// 费用报销详情查看
export function getExpenseDetailById (query) {
    return request({
        url: '/pay/nisExpenseDetail/getExpenseDetailById',
        method: 'post',
        data: query
    })
}
