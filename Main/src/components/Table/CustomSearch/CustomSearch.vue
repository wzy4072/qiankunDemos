<template>
  <a-form v-show="visible" :form="form" class="custom-design-form">
    <template v-for="(group, gIndex) in customSearchData">
      <div :key="'group' + gIndex" class="custom-search-group">
        <a-button
          class="symbolbtn"
          :type="group.leftBracket ? 'primary' : 'default'"
          @click="group.leftBracket = !group.leftBracket"
        >(</a-button
        >
        <KFormItem
          :formConfig="formConfig"
          @change="
            (v, k) => {
              group.fieldName = v
              fieldNameChange(gIndex)
            }
          "
          :record="
            getFieldNameConfig({
              gIndex,
              defaultValue: group.fieldName
            })
          "
        />
        <!-- Relation -->
        <KFormItem
          class="group-relation"
          :formConfig="formConfig"
          @change="
            (v, k) => {
              group.relation = v
              relationChange(gIndex)
            }
          "
          :record="getRelationConfig({ gIndex, defaultValue: group.relation, group })"
        />
        <!-- fieldValue -->
        <KFormItem
          :formConfig="formConfig"
          @change="
            (v, k) => {
              group.fieldValue = v
            }
          "
          :dynamicData="dynamicData"
          :record="getFieldValueConfig({ gIndex, group })"
        />
        <!-- <KFormItem :formConfig="formConfig"  /> -->
        <a-button
          class="symbolbtn right-symbol"
          :type="group.rightBracket ? 'primary' : 'default'"
          @click="group.rightBracket = !group.rightBracket"
        >)</a-button
        >

        <a-button
          shape="circle"
          type="danger"
          icon="minus"
          :disabled="customSearchData.length === 1"
          ghost
          @click="delGroupItem(gIndex)"
          title="移除该条件"
          size="small"
        ></a-button>
      </div>
      <div :key="'groupcondition' + gIndex" class="group-condition">
        <KFormItem
          v-if="gIndex !== customSearchData.length - 1"
          :key="`item-condition-'${gIndex}`"
          :formConfig="formConfig"
          :record="getConditionConfig({ gIndex, defaultValue: group.condition })"
        />
      </div>
    </template>
    <!--  -->
    <div class="btn-group">
      <a-button @click="searchCustomParam" :type="visible ? 'primary' : 'default'">查询</a-button>
      <a-button icon="plus" @click="addGroup">添加条件</a-button>
      <!-- <a-button @click="addGroup" icon="plus">添加组</a-button> -->
      <a-button @click="saveCustomParam">设为常用</a-button>
      <a-button @click="setDefaultSet">重置</a-button>
      <a-button @click="visible = false">关闭</a-button>
    </div>
    <a-modal v-model="modalVisible" title="命名常用搜索" @ok="ensureSaveCustomParam">
      <a-input v-model="customParamName"></a-input>
    </a-modal>
  </a-form>
</template>

<script>
import baseConfigs from '@/utils/formDesignBaseConfig'

import cloneDeep from 'lodash.clonedeep'
import { addCustomParams } from '@/api/customSearch'
const conditionOptions = [
    { value: 'and', label: '并且' },
    { value: 'or', label: '或者' }
]
const relationBaseOptions = [
    { value: 'contains', title: '包含' },
    { value: 'notContains', title: '不包含' },
    { value: 'eq', title: '=' },
    { value: 'neq', title: '!=' },
    { value: 'gt', title: '>' },
    { value: 'geq', title: '>=' },
    { value: 'lt', title: '<' },
    { value: 'leq', title: '<=' },
    { value: 'between', title: '介于' }
]

// 常用搜索值 临时存放 用于提交
let customParamValue = null
/**
 * 新增一组时的默认数据
 */
function getBaseGroupValue () {
    return {
        leftBracket: false,
        rightBracket: false,
        condition: 'and',
        fieldName: null,
        relation: 'eq',
        fieldValue: ''
    }
}
/**
 * 检测括号逻辑
 */
function checkBrackets (datas) {
    let start = 0
    for (let i = 0; i < datas.length; i++) {
        if (start < 0) break
        const element = datas[i]
        if (element.leftBracket) start = start + 1
        if (element.rightBracket) start = start - 1
    }
    return start === 0
}

/**
 * 该组件只用于收集/渲染/保存 常用搜索条件
 * 不参与搜索
 */
export default {
    name: 'CustomSearch',
    props: {
        columns: {
            type: Array,
            required: true,
            default: () => []
        },
        // eslint-disable-next-line vue/require-default-prop
        formItemConfigs: { type: Object },
        dynamicData: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            formConfig: {},
            form: this.$form.createForm(this), // async from
            customSearchData: [getBaseGroupValue()],
            customParamName: null, // 存放常用搜索名字
            visible: false,
            modalVisible: false
        }
    },
    mounted () {},
    computed: {
        fieldNameOptions () {
            return this.columns
                .filter(({ isSearch }) => isSearch)
                .map(({ title, dataIndex }) => {
                    return { label: typeof title === 'function' ? title() : title, value: dataIndex }
                })
        },
        relationMap () {
            const relationMap = {}
            this.columns
                .filter(({ isSearch }) => isSearch)
                .map(({ dataIndex, relations }) => {
                    const optionsfilters = relations ? relations.split(',') : ['eq']
                    relationMap[dataIndex] = relationBaseOptions.filter(({ value }) => optionsfilters.includes(value))
                })
            return relationMap
        },
        defCustomSearchData () {
            return this.columns
                .filter(col => col.isSearch && col.defSearch)
                .map(({ dataIndex }) => ({
                    leftBracket: false,
                    rightBracket: false,
                    condition: 'and',
                    fieldName: dataIndex,
                    relation: '',
                    fieldValue: ''
                }))
        }
    },
    methods: {
        // 打开搜索面板并重置
        open () {
            this.visible = true
            this.setDefaultSet()
        },
        // 重置
        setDefaultSet () {
            this.customSearchData = cloneDeep(this.defCustomSearchData)
            this.form.resetFields()
        },
        // 展示预置数据
        updateCustomParam (values) {
            this.customSearchData = values
            this.visible = true
        },
        // fieldName config
        getFieldNameConfig ({ gIndex, defaultValue }) {
            const baseConf = baseConfigs.getBaseSelectConfig()
            Object.assign(baseConf.options, {
                width: '100px',
                options: this.fieldNameOptions,
                defaultValue
            })
            Object.assign(baseConf, {
                label: '',
                rules: [{ required: true, message: ' ' }],
                model: `group[${gIndex}].fieldName`
            })
            return baseConf
        },
        // relation config
        getRelationConfig ({ gIndex, defaultValue, group }) {
            const baseConf = baseConfigs.getBaseSelectConfig()
            Object.assign(baseConf.options, { width: '66px', options: this.relationMap[group.fieldName], defaultValue })
            Object.assign(baseConf, {
                label: '',
                rules: [{ required: true, message: ' ' }],
                model: `group[${gIndex}].relation`
            })
            return baseConf
        },
        // condition config
        getConditionConfig ({ gIndex, defaultValue }) {
            const selectOptions = conditionOptions
            const baseConf = baseConfigs.getBaseSelectConfig()
            Object.assign(baseConf.options, { width: '66px', options: selectOptions, defaultValue })
            Object.assign(baseConf, {
                label: '',
                rules: [{ required: true, message: ' ' }],
                model: `group[${gIndex}].condition`
            })
            return baseConf
        },
        // 获取表单渲染配置
        getFieldValueConfig ({ gIndex, group: { fieldName, fieldValue, relation } }) {
            const configKey = `${fieldName}_${relation}`
            // const tempValue = fieldValue[0] || fieldValue
            const relationFieldValue = relation === 'between' ? [] : null
            let baseConf = null
            const confInfo = this.formItemConfigs[configKey]
            if (!confInfo) baseConf = baseConfigs.getBaseInputConfig(gIndex) // 未定义 则使用默认
            if (Object.prototype.toString.call(confInfo) === '[object String]') {
                baseConf = baseConfigs[confInfo]?.(gIndex) || baseConfigs.getBaseInputConfig(gIndex)
            }
            if (Object.prototype.toString.call(confInfo) === '[object Function]') {
                baseConf = confInfo()
            }
            if (Object.prototype.toString.call(confInfo) === '[object Object]') {
                baseConf = confInfo
            }
            Object.assign(baseConf.options, { defaultValue: relationFieldValue })
            Object.assign(baseConf, {
                label: '',
                model: relation === 'between' ? `group[${gIndex}].fieldValues` : `group[${gIndex}].fieldValue`
            })
            return baseConf
        },
        // 新增一组
        addGroup () {
            this.customSearchData.push(getBaseGroupValue())
        },
        delGroupItem (gIndex) {
            this.customSearchData.splice(gIndex, 1)
            this.form.resetFields()
        },
        fieldNameChange (gIndex) {
            this.form.resetFields([`group[${gIndex}].fieldValue`])
        },
        relationChange (gIndex) {
            this.form.resetFields([`group[${gIndex}].fieldValue`])
        },
        // 保存自定义
        saveCustomParam () {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (!checkBrackets(this.customSearchData)) {
                        this.$message.error('括号使用逻辑有误，请检查后重试！')
                        return false
                    }
                    this.modalVisible = true
                    this.customParamName = null

                    customParamValue = this.customSearchData.map((group, i) => {
                        const { leftBracket, rightBracket } = group
                        return Object.assign({}, values.group[i], { leftBracket, rightBracket })
                    })
                    console.log(JSON.stringify(customParamValue))
                }
            })
        },
        // 查询自定义
        searchCustomParam () {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (!checkBrackets(this.customSearchData)) {
                        this.$message.error('括号使用逻辑有误，请检查后重试！')
                        return false
                    }
                    customParamValue = this.customSearchData.map((group, i) => {
                        const { leftBracket, rightBracket } = group
                        return Object.assign({}, values.group[i], { leftBracket, rightBracket })
                    })
                    this.$emit('searchCustom', { display: false, values: customParamValue })
                }
            })
        },
        // 保持常用查询参数
        ensureSaveCustomParam () {
            const { customParamName } = this
            const s = JSON.parse(localStorage.getItem('mockCustomerParam' + location.pathname)) || []
            s.push({ name: customParamName, values: customParamValue })
            // 模拟保存
            localStorage.setItem('mockCustomerParam' + location.pathname, JSON.stringify(s))
            addCustomParams({
                name: customParamName,
                type: 'queryParams',
                values: JSON.stringify(customParamValue)
            }).then(res => {
                this.$emit('updateCustomParams')
                this.modalVisible = false // 保存成功关闭弹窗
            })
        }
    }
}
</script>
<style lang="less">
.custom-design-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    // margin-bottom: 16px;
    // border: 1px solid #e6e6e6;
    transition: all 0.3s;
    // &:hover {
    //     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    // }
    .ant-form-item {
        margin-bottom: 0;
        .ant-form-explain,
        .ant-form-extra {
            display: none;
        }
    }
    .custom-search-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        // justify-content: space-around;
        // width: 358px;
        // background-color: #efefef;
        padding: 0 4px;
        // margin-bottom: 8px;

        .symbolbtn.ant-btn {
            padding: 0 8px;
            margin-top: 4px;
            border-radius: 0;
            &.right-symbol {
                // border-left: none;
            }
        }
        .ant-input,
        .ant-select-selection {
            // border-left: none;
            border-radius: 0;
        }
        .ant-btn.ant-btn-danger.ant-btn-circle {
            margin-top: 7px;
            margin-left: 8px;
        }
    }
    .group-condition {
        margin: 0 16px;
    }
    .addgroup-btn {
        margin-top: 12px;
        margin-left: -32px;
    }
    .btn-group {
        width: 100%;
        padding-top: 2px;
        text-align: center;
        .ant-btn:not(:first-child) {
            margin-left: 8px;
        }
    }
}
</style>
