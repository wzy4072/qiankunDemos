import request from '@/utils/request'
import { CACHE__DICT } from '@/store/mutation-types'
import Vue from 'vue'

/**
 * 新增字典组
 * @param data
 * @returns {AxiosPromise}
 */
export function addDictGroup (data) {
    return request({
        url: '/basic/dict/group/add',
        method: 'post',
        data: data
    })
}
/**
 * 新增字典
 * @param data
 * @returns {AxiosPromise}
 */
export function addDictData (data) {
    return request({
        url: '/basic/dict/data/add',
        method: 'post',
        data: data
    })
}

/**
 * 删除字典组
 * @param ids
 * @returns {AxiosPromise}
 */
export function deleteDictGroup (ids) {
    return request({
        url: '/basic/dict/group/delete',
        method: 'post',
        data: ids
    })
}

/**
 * 删除字典
 * @param ids
 * @returns {AxiosPromise}
 */
export function deleteDictData (ids) {
    return request({
        url: '/basic/dict/data/delete',
        method: 'post',
        data: ids
    })
}

/**
 * 修改字典组
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDictGroup (data) {
    return request({
        url: '/basic/dict/group/' + data.id,
        method: 'put',
        data: data
    })
}

/**
 * 修改字典
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDictData (data) {
    return request({
        url: '/basic/dict/data/' + data.id,
        method: 'put',
        data: data
    })
}

/**
 * 获取字典组
 * @param data
 * @returns {AxiosPromise}
 */
export function asyncGetDictGroup (dictGroup) {
    return request({
        url: '/basic/dict/group/conditions',
        method: 'post',
        data: dictGroup
    })
}

/**
 * 获取字典
 * @param data{groupCodes: []}
 * @returns {AxiosPromise}
 */
export function asyncGetDictByGroup (dictGroup) {
    return request({
        url: '/basic/dict/listByGroup',
        method: 'post',
        data: dictGroup
    })
}
/**
 * 从缓存中获取字典配置
 */

export function getDictItemsFromCache (dictGroup) {
    if (Vue.ls.get(CACHE__DICT + dictGroup)) {
        const dictItems = Vue.ls.get(CACHE__DICT + dictGroup)
        return dictItems
    }
}

/**
 * 查询字典数据
 * @param biz
 * @returns {AxiosPromise}
 */
export function asyncGetDictByBiz (biz) {
    return request({
        url: '/basic/dict/data/conditions',
        method: 'post',
        data: biz
    })
}
