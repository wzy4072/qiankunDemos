import request from '@/utils/request'

// 部署模型
export function deployModel (data) {
    return request({
        url: '/workflow/model/deploy',
        method: 'post',
        data: data
    })
}

// 分页查询流程定义
export function getProcessDefinitionPage (data) {
    return request({
        url: '/workflow/processDefinition/conditions',
        method: 'post',
        data: data
    })
}

// 删除流程定义
export function deleteProcessDefinition (processDefinitionIds) {
    return request({
        url: '/workflow/processDefinition/delete',
        method: 'post',
        data: processDefinitionIds
    })
}

// 分页查询流程部署模型
export function getProcessDeploymentPage (data) {
    return request({
        url: '/workflow/processDefinition/deployment/conditions',
        method: 'post',
        data: data
    })
}

// 删除流程部署模型
export function deleteDeployment (deploymentIds) {
    return request({
        url: '/workflow/processDefinition/deployment/delete',
        method: 'post',
        data: deploymentIds
    })
}
