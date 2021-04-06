/**
 * 字典 util
 * author: scott
 * date: 20190109
 */

import { asyncGetDictByGroup, getDictItemsFromCache } from '@/api/basic/dict'
import { CACHE__DICT } from '@/store/mutation-types'
import Vue from 'vue'

/**
 * 获取字典数组
 * @param group 字典Code,可以传入多个
 * @return List<Map>
 */
export async function dictGroup (group) {
    if (!group) {
        return 'dictGroup参数不能为空!'
    }
    const groups = [...arguments]
    const noCacheGroups = []
    // 为了保持与后台返回一致，统一改成返回对象
    const dicts = {}
    // 优先从缓存中读取字典配置
    for (let i = 0; i < groups.length; i++) {
        if (!getDictItemsFromCache(groups[i])) {
            noCacheGroups.push(groups[i])
        } else {
            dicts[groups[i]] = getDictItemsFromCache(groups[i])
        }
    }
    if (!noCacheGroups.length) {
        return dicts
    }

    // 获取字典数组
    return asyncGetDictByGroup({ groupCodes: noCacheGroups }).then((res) => {
        if (res.success) {
            const data = res.data
            for (const key in data) {
                Vue.ls.set(CACHE__DICT + key, data[key], 7 * 24 * 60 * 60 * 1000)
                dicts[key] = data[key]
            }
            return dicts
        } else {
            return dicts
        }
    }).catch((res) => {
        console.error('dictGroup error: ', res)
        return {}
    })
}

/**
 * 获取字典数组中的指定name值
 * @param dictCode 字典Code value 字典值
 * @return List<Map>
 */

export function dict (group, value) {
    // 转字符串
    group += ''
    value += ''
    const dictItems = Vue.ls.get(CACHE__DICT + group)
    if (dictItems) {
        const item = dictItems.filter(item => item.value === value)
        if (item[0]) {
            return item[0].name
        }
    }
    return ''
}
