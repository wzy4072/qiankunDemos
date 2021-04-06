// 付款方信息 - 字段模板对象
export const payerAccountTemplateObj = {
    totalAmount: null, // 交易总金额
    payerAccount: null, // 付款方账户
    payerAccountName: null, // 付款账户名称
    payerBank: null, // 付款账户开户行名称
    payerBankCode: null, // 付款账户开户行行号
    payerProvinceCode: null, // 付款账户省份
    payerCityCode: null, // 付款账户城市
    currencyCode: null, // 币别
    urgent: 0 // 加急标识 0-否 1-是
}

// 收款方信息 - 字段模板对象
export const payeeAccountTemplateObj = {
    tradeAmount: null, // 交易总金额
    payeeAccount: null, // 收款账户
    payeeAccountName: null, // 收款账户名称
    payeeBank: null, // 收款账户开户行名称
    payeeBankCode: null, // 收款账户开户行行号
    payeeProvinceCode: null, // 收款账户省份
    payeeCityCode: null, // 收款账户城市

    otherBank: 0, // 同行标识  0-同行 1-他行
    otherArea: 0, // 同城标识  0-同城 1-异地
    urgent: 0, // 加急标识 0-否 1-是
    purpose: null, // 用途
    remark: null, // 备注
    postscript: null // 附言
}

// 付款方信息 - 表单校验规则
export const payerAccountTemplateRuleObj = {
    'payerAccount.payerAccount': [{ required: true, message: '请输入付款账户', trigger: 'blur' }],
    'payerAccount.payerAccountName': [{ required: true, message: '请输入付款账户名称', trigger: 'blur' }],
    'payerAccount.payerBank': [{ required: true, message: '请输入付款账户开户行名称', trigger: 'blur' }],
    'payerAccount.payerBankCode': [{ required: true, message: '请输入付款账户开户行行号', trigger: 'blur' }],
    'payerAccount.payerProvinceCode': [{ required: true, message: '请输入付款账户省份', trigger: 'blur' }],
    'payerAccount.payerCityCode': [{ required: true, message: '请输入付款账户城市', trigger: 'blur' }],

    'payerAccount.currencyCode': [{ required: true, message: '请输入币别', trigger: 'blur' }],
    'payerAccount.totalAmount': [{
        required: true,
        pattern: /^[0-5]{1}.[0-9]{2}$/,
        message: '请输入交易金额（限制在5.00以内）',
        trigger: 'blur'
    }]
}

// 收款方信息 - 表单校验规则
export const payeeAccountTemplateRuleObj = {
    'payeeAccount.payeeAccount': [{ required: true, message: '请输入收款方账户', trigger: 'blur' }],
    'payeeAccount.payeeAccountName': [{ required: true, message: '请输入收款方账户名称', trigger: 'blur' }],
    'payeeAccount.payeeBank': [{ required: true, message: '请输入收款方账户开户行名称', trigger: 'blur' }],
    'payeeAccount.payeeBankCode': [{ required: true, message: '请输入收款账户开户行行号', trigger: 'blur' }],
    'payeeAccount.payeeProvinceCode': [{ required: true, message: '请输入收款账户省份', trigger: 'blur' }],
    'payeeAccount.payeeCityCode': [{ required: true, message: '请输入收款账户城市', trigger: 'blur' }],

    'payeeAccount.tradeAmount': [{
        required: true,
        pattern: /^[0-5]{1}.[0-9]{2}$/,
        message: '请输入交易金额（限制在5.00以内）',
        trigger: 'blur'
    }],
    'payeeAccount.purpose': [{ required: true, message: '请输入用途', trigger: 'blur' }],
    'payeeAccount.remark': [{ required: true, message: '请输入备注', trigger: 'blur' }],
    'payeeAccount.postscript': [{ required: true, message: '请输入附言', trigger: 'blur' }]
}

export const utc2beijing = function (utcDatetime) {
    if (utcDatetime === undefined) {
        return ''
    }
    // 转为正常的时间格式 年-月-日 时:分:秒
    const TPos = utcDatetime.indexOf('T')
    const ZPos = utcDatetime.indexOf('Z')
    const yearMonthDay = utcDatetime.substr(0, TPos)
    const hourMinuteSecond = utcDatetime.substr(TPos + 1, ZPos - TPos - 1)
    const newDatetime = yearMonthDay + ' ' + hourMinuteSecond // 2017-03-31 08:02:06

    // 处理成为时间戳
   let timestamp = new Date(Date.parse(newDatetime))
    timestamp = timestamp.getTime()
    timestamp = timestamp / 1000

    // 增加8个小时，北京时间比utc时间多八个时区
     timestamp = timestamp + 8 * 60 * 60
    // 时间戳转为时间
    const beijingDatetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
    return beijingDatetime // 2017-03-31 16:02:06
}

/**
 * 用于生成随机字符串
 * @param len
 * @returns {string|string}
 */
export const getRandomString = function (len) {
    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const tempLen = chars.length; let tempStr = ''
    for (let i = 0; i < len; ++i) {
        tempStr += chars.charAt(Math.floor(Math.random() * tempLen))
    }
    return tempStr
}

const USERNAME = 'admin'
const APPNAME = 'bytter-bank'
/**
 * 存贮业务测试缓存数据
 * @param businessTestType 测试业务类型
 * @param data 需要存贮的数据
 * @returns {string|string}
 */

export const setBusinessTestCache = function (businessTestType, data) {
    const key = APPNAME + ':' + USERNAME + ':' + 'business:test:' + businessTestType
    const dataObj = JSON.parse(localStorage.getItem(key))
    if (!dataObj) {
        localStorage.setItem(key, JSON.stringify(data))
    } else {
        for (const key in data) {
            dataObj[key] = data[key]
        }
        localStorage.setItem(key, JSON.stringify(dataObj))
    }
}

/**
 * 获取业务测试缓存数据
 * @param businessTestType 测试业务类型
 * @param data需要存贮的数据
 * @returns {string|string}
 */
export const getBusinessTestCache = function (businessTestType) {
    const key = APPNAME + ':' + USERNAME + ':' + 'business:test:' + businessTestType
    return JSON.parse(localStorage.getItem(key))
}
