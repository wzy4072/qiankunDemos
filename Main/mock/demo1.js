import dragColumns from './database/dragColumnMock'
import demoTable2 from './database/demoTable2'

const authOauthToken = { 'data': 'asdfafdasdfas', 'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOm51bGwsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCJdLCJ0ZW5hbnRJZCI6IjBkYmZhOWM2NmI5OTRkMjE4ZGE4Njk4ZDE0MzcxY2E1IiwiZXhwIjoxNjE0MjQ4MTczLCJkYXRhU2NvcGUiOiIwIiwidXNlcklkIjoiNzhhNDlmMjJiZjBhNGE4NWI1YTgwNjE1NmY3YmUyNDAiLCJhdXRob3JpdGllcyI6WyI2NDc3MmE1N2MzNmQ0OTI1OGEzZTlmNDg4MDU4MTE0YiJdLCJqdGkiOiJkZTMzZGIxOC1mNDBjLTRmNDktYTlkNC1jYjE1OGJlNTc3N2YiLCJjbGllbnRfaWQiOiJ0ZXN0X2NsaWVudCJ9.kzqcaN64gAsOH8it7x6TsDOCFjgFzQ-3ximPrHRdnEg', 'token_type': 'bearer', 'refresh_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOm51bGwsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCJdLCJhdGkiOiJkZTMzZGIxOC1mNDBjLTRmNDktYTlkNC1jYjE1OGJlNTc3N2YiLCJ0ZW5hbnRJZCI6IjBkYmZhOWM2NmI5OTRkMjE4ZGE4Njk4ZDE0MzcxY2E1IiwiZXhwIjoxNjE0MzIzMjgwLCJkYXRhU2NvcGUiOiIwIiwidXNlcklkIjoiNzhhNDlmMjJiZjBhNGE4NWI1YTgwNjE1NmY3YmUyNDAiLCJhdXRob3JpdGllcyI6WyI2NDc3MmE1N2MzNmQ0OTI1OGEzZTlmNDg4MDU4MTE0YiJdLCJqdGkiOiJmZWVjNDY5ZS0wNGNjLTQ5OTYtOTk1Ny0zMTgxN2JiYmMzNzciLCJjbGllbnRfaWQiOiJ0ZXN0X2NsaWVudCJ9.KvtT37SJhOEPsWw3Ph2fOXq2HWnzwrzwOE5lYVfq5jM', 'expires_in': 2991, 'scope': 'read' }
const managerAppConditions = { 'code': '00000001', 'msg': '处理成功', 'time': '2021-02-25T08:39:56.953Z', 'data': { 'content': [{ 'id': '048a299805c55066c8cbbb43d1d733ef', 'createdBy': null, 'createdTime': null, 'updateBy': null, 'updateTime': '2021-02-07T23:51:02.000+08:00', 'appId': 'manager', 'name': '系统设置', 'version': '1.0.0', 'description': '系统设置描述', 'dependent': null, 'status': '0', 'menus': null }, { 'id': '3111f3ad3e0cef06af4ff2669d548c74', 'createdBy': null, 'createdTime': null, 'updateBy': null, 'updateTime': '2021-02-07T23:51:02.000+08:00', 'appId': 'system', 'name': '权限管理', 'version': '1.0.0', 'description': '权限管理', 'dependent': null, 'status': '0', 'menus': null }], 'pageable': { 'sort': { 'sorted': false, 'unsorted': true, 'empty': true }, 'pageNumber': 0, 'pageSize': 10, 'offset': 0, 'paged': true, 'unpaged': false }, 'totalElements': 2, 'totalPages': 1, 'last': true, 'sort': { 'sorted': false, 'unsorted': true, 'empty': true }, 'numberOfElements': 2, 'first': true, 'number': 0, 'size': 10, 'empty': false } }
const systemUser = { 'code': '00000001', 'msg': '处理成功', 'time': 1614244534.612000000, 'data': { 'id': '78a49f22bf0a4a85b5a806156f7be240', 'name': '超级管理员', 'mobile': '', 'username': 'admin_demo', 'corpId': 'd5a5d7fffe6a47329b37bb5c452375b1', 'tenantId': '0dbfa9c66b994d218da8698d14371ca5', 'corpName': null, 'description': null, 'enabled': true, 'accountNonExpired': true, 'credentialsNonExpired': true, 'accountNonLocked': true, 'deleted': null, 'roleIds': ['64772a57c36d49258a3e9f488058114b'], 'createdBy': 'system', 'createdTime': 1610838074000, 'updateBy': '101', 'updateTime': 1611560400000 } }
const demoTable1 = { 'code': '00000001',
'msg': '处理成功',
'time': 1614245317.126000000,
'data': {
  'content': [{ 'key': 1, 'id': 1, 'no': 'No---------------- 1', 'description': '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述', 'callNo': 138138138138138138138138138138138, 'status': 1, 'updatedAt': '1973-04-18 03:35:19', 'editable': false }, { 'key': 2, 'id': 2, 'no': 'No 2', 'description': '这是一段描述', 'callNo': 663, 'status': 2, 'updatedAt': '1993-05-08 04:01:50', 'editable': false }, { 'key': 3, 'id': 3, 'no': 'No 3', 'description': '这是一段描述', 'callNo': 762, 'status': 2, 'updatedAt': '1998-11-03 00:12:18', 'editable': false }, { 'key': 4, 'id': 4, 'no': 'No 4', 'description': '这是一段描述', 'callNo': 659, 'status': 1, 'updatedAt': '1998-02-25 20:52:48', 'editable': false }, { 'key': 5, 'id': 5, 'no': 'No 5', 'description': '这是一段描述', 'callNo': 580, 'status': 0, 'updatedAt': '2001-05-25 03:42:02', 'editable': false }, { 'key': 6, 'id': 6, 'no': 'No 6', 'description': '这是一段描述', 'callNo': 233, 'status': 3, 'updatedAt': '1986-04-09 08:32:52', 'editable': false }, { 'key': 7, 'id': 7, 'no': 'No 7', 'description': '这是一段描述', 'callNo': 61, 'status': 3, 'updatedAt': '1977-07-27 01:52:46', 'editable': false }, { 'key': 8, 'id': 8, 'no': 'No 8', 'description': '这是一段描述', 'callNo': 335, 'status': 1, 'updatedAt': '1995-12-04 09:10:32', 'editable': false }, { 'key': 9, 'id': 9, 'no': 'No 9', 'description': '这是一段描述', 'callNo': 716, 'status': 3, 'updatedAt': '1983-06-25 08:46:32', 'editable': false }, { 'key': 10, 'id': 10, 'no': 'No 10', 'description': '这是一段描述', 'callNo': 660, 'status': 2, 'updatedAt': '2004-09-17 05:13:12', 'editable': false }],
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
    url: '/auth/oauth/token',
    type: 'post',
    response: config => authOauthToken
  },
  {
    url: '/auth/oauth/loginToken',
    type: 'get',
    response: config => authOauthToken
  },
  {
    url: '/system/user',
    type: 'get',
    response: config => systemUser
  },
  {
    url: '/manager/app/conditions',
    type: 'post',
    response: config => managerAppConditions
  },
  {
    url: '/demo/dragColumns',
    type: 'get',
    response: config => ({
       'code': '00000001', 'msg': '处理成功', 'time': '2021-02-25T08:39:56.953Z', 'data': dragColumns
    })
  },
  {
    url: '/demo/service',
    type: 'get',
    response: config => demoTable1
  },
  {
    url: '/demo/demo2/table',
    type: 'get',
    response: config => demoTable2
  },
  {
    url: '/demo/post',
    type: 'post',
    response: config => ({
      'code': '00000001', 'msg': '处理成功', 'time': '2021-02-25T08:39:56.953Z', 'data': {}
   })
  },
  {
    url: '/demo/get',
    type: 'get',
    response: config => ({
      'code': '00000001', 'msg': '处理成功', 'time': '2021-02-25T08:39:56.953Z', 'data': {}
   })
  },
  {
    url: '/demo/corpTreeSelect',
    type: 'get',
    response: config => ({ 'code': '00000001', 'msg': '处理成功', 'time': '2021-02-25T08:39:56.953Z', 'data': {} })
  }
]
