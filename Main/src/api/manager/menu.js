import request from '@/utils/request'

// 获取菜单
export function getMenu (id) {
    return request({
        url: '/manager/menu/' + id,
        method: 'get'
    })
}

export function addMenu (data) {
    return request({
        url: '/manager/menu',
        method: 'post',
        data
    })
}

export function deleteMenu (ids) {
    return request({
        url: '/manager/menu/delete',
        method: 'post',
        data: ids
    })
}

export function updateMenu (data) {
    return request({
        url: '/manager/menu/' + data.id,
        method: 'put',
        data
    })
}

export function listMenuTree (data) {
    return request({
        url: '/manager/menu/list',
        method: 'post',
        data
    })
}

// 获取菜单树列表
export function getMenuTreeList (data) {
    return request({
        url: '/manager/menu/treeList',
        method: 'post',
        data
    })
}

// 查询父级菜单树列表(只获取父级节点的菜单)
export function getParentMenuTreeList (data) {
    return request({
        url: '/manager/menu/parentTreeList',
        method: 'post',
        data
    })
}

export function searchMenu (data) {
    return request({
        url: '/manager/menu/conditions',
        method: 'post',
        data
    })
}
