// 1、需要使用的数据


// 2、需要使用的函数

// 3、自定义规则
var genderRule = (rule, value, callback) => {
    if (value != "0" && value != "1") {
        callback(new Error('请正确的选择性别'))
    }
    callback()
};
var phoneRule = (rule, value, callback) => {
    var reg = /^\d{11}$/g
    if (!reg.test(value)) {
        callback(new Error('请输入11位数字'))
    }
    callback()
};
var statusRule = (rule, value, callback) => {
    if (value != "0" && value != "1") {
        callback(new Error('请正确的选择状态'))
    }
    callback()
};
var costRule = (rule, value, callback) => {
    const regExp = /^([1-9][0-9]*)+(\.[0-9]{1})?$/g  // 非零开头的最多带一位小数的数字
    if (!regExp.test(value)) {
        callback(new Error('请填写正确格式的费用'))
    }
    callback()
};
var discountRule = (rule, value, callback) => {
    const regExp = /^([1-9][0-9]*)+(\.[0-9]{1})?$/g  // 非零开头的最多带一位小数的数字
    if (!regExp.test(value)) {
        callback(new Error('请填写正确格式的费用'))
    }
    callback()
};
// 4、基本规则
const fromRules = {
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 1, max: 20, message: '姓名在20个字符以内', trigger: 'blur' }
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 1, max: 20, message: '昵称在20个字符以内', trigger: 'blur' }
    ],
    idcard: [{ min: 18, max: 18, message: '身份证号码必须18位', trigger: 'blur' }],
    gender: [
        { required: true, message: '请选择性别', trigger: 'change' },
        { validator: genderRule, trigger: 'change' }, // 自定义规则
    ],
    birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
    phone: [
        { required: true, message: '请填写手机号', trigger: 'blur' },
        { validator: phoneRule, trigger: 'blur' }],
    status: [
        { required: true, message: '请选择状态', trigger: 'change' },
        { validator: statusRule, trigger: 'change' }, // 自定义规则
    ],
    schoolid: [{ required: true, message: '请选择校区', trigger: 'change' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码在6到20个字符范围内', trigger: 'blur' },
    ],
    passwordsecond: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
    homeaddress: [{ min: 0, max: 500, message: '家庭住址在500个字符以内', trigger: 'change' }],
    passwordsecond: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
    cost: [
        { required: true, message: '请填写费用', trigger: 'blur' },
        { validator: costRule, trigger: 'blur' }, // 自定义规则
    ],
    discount: [{ validator: discountRule, trigger: 'blur' }]
}

export {fromRules}