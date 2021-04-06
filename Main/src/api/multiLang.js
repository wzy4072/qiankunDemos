import request from '@/utils/request'

// 新增国际化
export function addMultiLang (data) {
    return request({
        url: '/basic/multiLang',
        method: 'post',
        data
    })
}

// 删除国际化
export function deleteMultiLang (ids) {
    return request({
        url: '/basic/multiLang/delete',
        method: 'post',
        data: ids
    })
}

// 修改国际化
export function updateMultiLang (data) {
    return request({
        url: '/basic/multiLang/' + data.id,
        method: 'put',
        data
    })
}

// 查询国际化
export function searchMultiLang (data) {
    return request({
        url: '/basic/multiLang/conditions',
        method: 'post',
        data
    })
}

// 获取国际化
export function getMultiLang (id) {
    return request({
        url: '/basic/multiLang/' + id,
        method: 'get'
    })
}

// 获取国际化
export function getMultiLangByPrefix (prefix) {
    return request({
        url: '/basic/multiLang/prefix/' + prefix,
        method: 'get'
    })
}
