import request from '@/utils/request'
/**
 * 调整
 * @param data
 * @returns {AxiosPromise}
 */
export function adjust (data) {
    return request({
        url: '/basic/calendar/adjust',
        method: 'post',
        data: data
    })
}

/**
 * 查询
 * @param data
 * @returns {AxiosPromise}
 */
export function listWorkDay (data) {
    return request({
        url: '/basic/calendar/listWorkDay',
        method: 'post',
        data: data
    })
}

/**
 * 查询国家地区
 * @param data
 * @returns {AxiosPromise}
 */
export function loadCountryCust () {
    return request({
        url: '/basic/calendar/loadCountryCust',
        method: 'post'
    })
}
