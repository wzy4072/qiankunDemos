import request from '@/utils/request'

// 获取已分配租户的【应用】列表
export function listTenantAssignedApplication (tenantId) {
    return request({
        url: '/manager/tenantMenu/listTenantAssignedApplication/' + tenantId,
        method: 'get'
    })
}
