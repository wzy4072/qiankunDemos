import request from '@/utils/request'

// 新增职工信息
export function addNisPersonnelDetail (data) {
    return request({
        url: '/pay/nisPersonnelDetail',
        method: 'post',
        data: data
    })
}

// 删除职工信息
export function deleteNisPersonnelDetail (ids) {
    return request({
        url: '/pay/nisPersonnelDetail/delete',
        method: 'post',
        data: ids
    })
}

// 修改职工信息
export function updateNisPersonnelDetail (data) {
    return request({
        url: '/pay/nisPersonnelDetail/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchNisPersonnelDetail (query) {
    return request({
        url: '/pay/nisPersonnelDetail/conditions',
        method: 'post',
        data: query
    })
}

// 查询职工信息列表
export function listNisPersonnelDetail (query) {
    return request({
        url: '/pay/nisPersonnelDetail/list',
        method: 'get',
        params: query
    })
}

// 查询职工信息详细
export function getNisPersonnelDetail (id) {
    return request({
        url: '/pay/nisPersonnelDetail/' + id,
        method: 'get'
    })
}

// 查询接口代码列表
export function loadBifInitData () {
    return request({
        url: '/basic/bisbif/list',
        method: 'get'
    })
}
