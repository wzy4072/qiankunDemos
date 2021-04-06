import request from '@/utils/request'

// 分页查询【运行实例】
export function getProcessInstancePage (data) {
    return request({
        url: '/workflow/processInstance/conditions',
        method: 'post',
        data: data
    })
}
