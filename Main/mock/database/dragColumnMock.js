const columns = [
{ 'dataIndex': 111, 'title': '#', required: true, 'width': 60, 'show': true, 'customRender': '(text, record, index) => index + 1', 'fixed': 'left' },
{ 'dataIndex': 'description', 'title': '描述', 'width': 300, 'show': false, 'sorter': true, 'scopedSlots': { 'customRender': 'description' }, 'fixed': false },
{ 'dataIndex': 'no', 'title': '规则编号', 'width': 150, 'show': true, 'sorter': true, 'fixed': false },
{ 'dataIndex': 'callNo', 'title': '服务调用次数', 'width': 300, 'show': true, 'sorter': true, 'needTotal': true, 'fixed': false },
{ 'dataIndex': 'status', 'title': '状态', 'width': 200, 'show': true, 'scopedSlots': { 'customRender': 'status' }, 'fixed': false },
{ 'dataIndex': 'updatedAt', 'title': '更新时间', 'width': 200, 'show': true, 'sorter': true, 'fixed': false },
{ 'dataIndex': 'action', required: true, 'title': '操作', 'width': 200, 'show': true, 'scopedSlots': { 'customRender': 'action' }, 'fixed': 'right' }
]
export default columns
