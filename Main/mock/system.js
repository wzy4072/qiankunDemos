const systemRoleConditions = { 'code': '00000001',
'msg': '处理成功',
'time': 1614245317.126000000,
'data': {
  'content': [
    { id: 1, name: 'xxx', description: '这是测试数据', code: '2021', createdTime: 1614843151627, updateTime: 1614843151627
  }
  ],
'pageable': { 'sort': { 'sorted': false, 'unsorted': true, 'empty': true }, 'pageNumber': 0, 'pageSize': 10, 'offset': 0, 'paged': true, 'unpaged': false },
'totalPages': 1,
'totalElements': 2,
'last': true,
'sort': { 'sorted': false, 'unsorted': true, 'empty': true },
'numberOfElements': 2,
'first': true,
'number': 0,
'size': 10,
'empty': false } }
export default [
  {
    url: '/system/role/conditions',
    type: 'post',
    response: config => systemRoleConditions
  },
    {
        url: '/system/dictByBiz',
        type: 'post',
        response: config => ({ "message": "", "timestamp": 1611130173820,"success":true ,"result": [
                {id:'21',name: "女",value:'0',group: "Accbook.EmergencySign.sex",desc: '',sort:1,initiate:true},
                {id:'22',name: "男",value:'1',group: "Accbook.EmergencySign.sex",desc: '',sort:1,initiate:true},
                {id:'23',name: "人民币",value:'rmb',group: "Accbook.EmergencySign.currency",desc: '222',sort:1,initiate:false},
                {id:'24',name: "美元",value:'$',group: "Accbook.EmergencySign.Currency",desc: '333',sort:2,initiate:true},
            ]})
    },
{
    url: '/basic/dictData/listByGroup',
    type: 'post',
    response: config => ({ "message": "", "timestamp": 1611130173820,success: true ,"data": [
            {value: "G",groupCode: "Accbook.EmergencySign",name: "否"},
            {value: "F",groupCode: "Accbook.EmergencySign",name: "是"}
        ]})
},

]
