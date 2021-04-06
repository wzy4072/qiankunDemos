// 支持但不限于
// 基础类型 input textarea date time number radio checkbox select rate switch slider uploadImg uploadFile cascader treeSelect
// 基础加强类型 numberRange dataRange
// 完全自定义类型（业务组件） 字典 tableSelect CorpTree(单位下拉树)

// input
export function getBaseInputConfig (i = 0) {
  return {
'type': 'input',
'label': '输入框',
'icon': 'icon-write',
'options': {
  'type': 'text',
  'width': '100px',
  'defaultValue': '',
  'placeholder': '请输入',
  'clearable': false,
  'maxLength': null,
  'hidden': false,
  'disabled': false
    },
'model': `group[${i}]fieldValue`,
'key': 'input_',
'rules': []
  }
}
// date
 export function getBaseDateConfig (i = 0) {
  return {
  'type': 'date',
  'label': '日期选择框',
  'options': {
    'width': '100px',
    'defaultValue': '',
    'rangeDefaultValue': [],
    'range': false,
    'showTime': false,
    'disabled': false,
    'hidden': false,
    'clearable': false,
    'placeholder': '请选择',
    'rangePlaceholder': [
      '开始时间',
      '结束时间'
      ],
    'format': 'YYYY-MM-DD'
    },
  'model': `group[${i}]fieldValue`,
  'key': '',
  'help': '',
  'rules': []
  }
}
// dateRange
export function getBaseDateRangeConfig (i = 0) {
  const config = getBaseDateConfig(i)
  config.options.range = true
  config.options.width = '200px'
  return config
}

// number
export function getBaseNumberConfig (i = 0) {
  return 	{
  'type': 'number',
  'label': '数字输入框',
  'options': {
    'width': '100px',
    'defaultValue': 0,
    'min': null,
    'max': null,
    'precision': null,
    'step': 1,
    'hidden': false,
    'disabled': false,
    'placeholder': '请输入'
    },
  'model': `group[${i}]fieldValue`,
  'key': '',
  'help': '',
  'prefix': '',
  'suffix': '',
  'rules': []
  }
}
// numberRange
export function getBaseNumberRangeConfig (i = 0) {
  const config = getBaseNumberConfig(i)
  config.options.defaultValue = [0, 0]
  config.options.width = '200px'
  config.type = 'numberRange'
  return config
}
export function getBaseSelectConfig (i = 0) {
  return {
'type': 'select',
'label': '',
'options': {
  'width': '100px',
  'multiple': false,
  'disabled': false,
  'clearable': false,
  'hidden': false,
  'placeholder': '请选择',
  'dynamicKey': '',
  'dynamic': false,
  'options': [],
  'showSearch': false
    },
'model': `group[${i}]fieldValue`,
'key': '',
'rules': []
}
}
// Textarea
export function getTextareaConfig (i = 0) {
  return {
        'type': 'textarea',
        'label': '文本框',
        'options': {
          'width': '100px',
          'minRows': 4,
          'maxRows': 6,
          'maxLength': null,
          'defaultValue': '',
          'clearable': false,
          'hidden': false,
          'disabled': false,
          'placeholder': '请输入'
        },
        'model': 'textarea_1615603084113',
        'key': 'textarea_1615603084113',
        'help': '',
        'rules': [
          {
            'required': false,
            'message': '必填项'
          }
        ]
      }
}
// time
export function getTimeConfig (i = 0) {
return {
			'type': 'time',
			'label': '时间选择框',
			'options': {
				'width': '100px',
				'defaultValue': '',
				'disabled': false,
				'hidden': false,
				'clearable': false,
				'placeholder': '请选择',
				'format': 'HH:mm:ss'
			},
			'model': 'time_1615603131330',
			'key': 'time_1615603131330',
			'help': '',
			'rules': [
				{
					'required': false,
					'message': '必填项'
				}
			]
		}
}
export function getCorpTreeSelectConfig () {
  return {
    type: 'CorpTreeSelect',
    label: '单位组件',
    options: {
        checkable: false, // 单选配置false
        defaultValue: '', // 单选配置 ‘’
        // checkable: true,// 多选配置true
        // defaultValue: [],// 多选配置true
        width: '200px'
    },
    model: 'CorpTreeSelectValue',
    help: '',
    rules: [{ required: true, message: '必填项' }]
}
}

export default {
  getBaseInputConfig, getBaseDateConfig, getBaseDateRangeConfig, getBaseNumberConfig, getBaseNumberRangeConfig, getBaseSelectConfig, getTextareaConfig, getTimeConfig, getCorpTreeSelectConfig
}
