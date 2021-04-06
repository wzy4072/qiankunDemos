
const cols = ['index', 'userName', 'age', 'email', 'address', 'field1', 'field2', 'field3']
const stuName = ['李萌', '高雪薇', '王路', '杨佳', '毛毛', '高丽静', '于云鹏', '李小虎', '常向阳', '韩飞', '薛晓松', '小孩', '李晓阳']

function randomString (len) {
 len = len || 32
 var $chars = 'abcdefhijkmnprstwxyz2345678_'
 var maxPos = $chars.length
 var pwd = ''
 for (let i = 0; i < len; i++) {
 pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
 }
  return pwd
 }
function getRandomData () {
  const row = { id: 1 }
  cols.map(col => {
    if (col === 'email') {
      row[col] = randomString(5) + '@163.com'
      return
    }
    if (col === 'userName') {
      const s = parseInt(Math.random() * stuName.length)
      row[col] = stuName.slice(s, s + 1)
      return
    }
    if (col === 'age') {
      row[col] = 20 + parseInt(Math.random() * 20)
      return
    }
    if (col === 'field1') {
      row[col] = parseInt(Math.random() * 4)
      return
    }
    row[col] = randomString(4)
  })
  return row
}
const baseData = { 'code': '00000001',
'msg': '处理成功',
'time': 1614245317.126000000,
'data': {
  'content': [getRandomData()],
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
export default baseData
