# DictSelect 字典单选组件用法
----
- 组件已经全局注册，可以直接使用,支持单选radio/select
- 字典数据存在缓存中，如果没有会去后台获取相关的数据
##使用示例：
```html
<dict-select  v-model="queryParam.sex" placeholder="请输入用户性别"
                  dictGroup="Accbook.EmergencySign"/>
```
##使用示例：v-decorator用法：
```html
<dict-select dictGroup="Accbook.EmergencySign" type="select"
     v-decorator="[ '单位',{ initialValue: 'G'， rules: [{ required: true, message: 'Please input your note!' }] }]"/>
```
## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| placeholder      |string   | | placeholder |
| disabled      |Boolean   | | 是否禁用 |
| type      |string   | | 单选选类型 select/radio 默认是select |
| dictGroup      |string   | | 数据字典编码|

# DictMultiSelect 字典多选组件
---
- 组件已经全局注册，可以直接使用,支持checkbox/mulselect


## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| placeholder      |string   | | placeholder |
| disabled      |Boolean   | | 是否禁用 |
| type      |string   | | 多选类型 select/checkbox 默认是select |
| dictGroup      |string   | | 数据字典编码,如果提供了options参数 则此参数可不填|
| options      |Array   | | 多选项,如果dictCode参数未提供,可以设置此参数加载多选项 |
| has-check-all      |Boolean   | | 是否有全选功能 |

使用示例
----
```vue
<template>
  <a-form>
    <a-form-item label="下拉多选" style="width: 300px">
      <dict-multi-select
        v-model="selectValue"
        :options="dictOptions"
        placeholder="请做出你的选择">
      </dict-multi-select>
      {{ selectValue }}
    </a-form-item>
    <a-form-item label="checkbox">
      <dict-multi-select
        v-model="checkboxValue"
        :options="dictOptions"
        type="checkbox">
      </dict-multi-select>
      {{ checkboxValue }}
    </a-form-item>
 <a-form-item>
     <dict-multi-select 
        type="checkbox" 
        :has-check-all="true" 
        v-model="test" placeholder="请输入用户性别" 
        dictGroup="Accbook.EmergencySign" 
        @change="change" />
     </a-form-item>
  </a-form >
</template>

<script>
  export default {
    data() {
      return {
        selectValue:"",
        checkboxValue:"",
        test:'G,F',
        dictOptions:[{
          name:"选项一",
          value:"1"
        },{
          name:"选项二",
          value:"2"
        },{
          name:"选项三",
          value:"3"
        }]
      }
    }
  }
</script>
```
# 字典内容自定义应用
---
- 在实际业务应用中，如果需要对字典内容进行过滤或者自定义内容，可以参考下面示例


使用示例
----
```vue
<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-row>
      <a-col :span="12">
        <a-form-item label="过滤字典">
          <dict-multi-select
            v-model="selectValue1"
            :options="dictOptions1">
          </dict-multi-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典文本自定义">
          <dict-multi-select
            v-model="selectValue2"
            :options="dictOptions2">
          </dict-multi-select>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
    import { dictGroup } from '@/components/Dict/dictUtil'

    export default {
        data () {
            return {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                selectValue1: '',
                selectValue2: '',
                dictOptions1: [],
                dictOptions2: []
            }
        },
        mounted () {
            // dictGroup方法可以加载多个字典
            dictGroup('cashTransSign', 'bisExc.sendMode').then(result => {
                // 过滤字典
                this.dictOptions1 = result['cashTransSign'].filter(item => item.value === 'C')

                // 字典文本自定义
                result['bisExc.sendMode'].map(item => {
                    item.name += '(' + item.value + ')'
                })
                this.dictOptions2 = result['bisExc.sendMode']
            })
        }
    }
</script>

```

