const flowCategoryData = {
    'code': '00000001',
    'msg': '处理成功',
    'time': 1614245317.126000000,
    'data': {
        'content': [
            {
                id: '流程分类ID1',
                tenantId: '租户ID',
                name: '流程分类名称1',
                processKey: '流程Key1',
                type: '1',
                url: 'url',
                mobileUrl: 'url',
                batchRevokable: '0',
                mustApprove: '0',
                mobileApprovalFlag: '0',
                createdTime: 1614843151627,
                updateTime: 1614843151627,
                children: [
                    {
                        id: '流程分类ID1-1',
                        tenantId: '租户ID',
                        name: '流程分类名称1-1',
                        processKey: '流程Key1-1',
                        type: '1',
                        url: 'url',
                        mobileUrl: 'url',
                        batchRevokable: '0',
                        mustApprove: '0',
                        mobileApprovalFlag: '0',
                        createdTime: 1614843151627,
                        updateTime: 1614843151627
                    }
                ]
            },
            {
                id: '流程分类ID2',
                tenantId: '租户ID',
                name: '流程分类名称2',
                processKey: '流程Key2',
                type: '1',
                url: 'url',
                mobileUrl: 'url',
                batchRevokable: '0',
                mustApprove: '0',
                mobileApprovalFlag: '0',
                createdTime: 1614843151627,
                updateTime: 1614843151627
            }
        ],
        'pageable': {
            'sort': {'sorted': false, 'unsorted': true, 'empty': true},
            'pageNumber': 0,
            'pageSize': 10,
            'offset': 0,
            'paged': true,
            'unpaged': false
        },
        'totalPages': 1,
        'totalElements': 2,
        'last': true,
        'sort': {'sorted': false, 'unsorted': true, 'empty': true},
        'numberOfElements': 2,
        'first': true,
        'number': 0,
        'size': 10,
        'empty': false
    }
}
export default [
    {
        url: '/workflow/category/conditions',
        type: 'post',
        response: config => {
            return flowCategoryData
        }
    },
]
