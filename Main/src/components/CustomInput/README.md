# moneyInput组件用法
----
- 金额输入组件

##使用示例：
```javascript
//javascript 引入组件，并在当前页面进行注册
import MoneyInput from '@/components/CustomInput/MoneyInput'
```
```html
//template
 <money-input  :default-value="100" @change="onChange" v-model="input"></money-input>
```

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| defaultValue      |Number   | | - |
| max      |Number   | | Infinity |
| min      |Number   | | Infinity |
| disabled      |Boolean   | | 是否禁用 |
| symbol      |string   | | 币别符号,默认为人民币符号¥ |｜
| precision      |string   | | 有效数字,默认为2|
| step      |number/string   | | 每次改变步数，可以为小数，默认1|
| change      |Function(value: number /string)   | 变化回调|-
| pressEnter      |function(e)   | | 按下回车的回调|2


使用示例
----
```vue
<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="金额">
      <money-input  :default-value="100" @change="onChange" v-model="money"></money-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
    import MoneyInput from '@/components/MoneyInput/MoneyInput.vue'

export default {
    components: {
        MoneyInput
    },
    data () {
        return {
            formLayout: 'horizontal',
            money:'',
            form: this.$form.createForm(this, { name: 'coordinated' })
        }
    },
    mounted () {
    },
    methods:{
        onChange(value) {
            console.log('changed', value);
        },
    }
}
</script>
```
# RateInput组件用法
----
- 比率输入组件

##使用示例：
```javascript
//javascript 引入组件，并在当前页面进行注册
import RateInput from '@/components/CustomInput/RateInput'
```
```html
//template
 <rate-input type="percent" v-model="rate"/>
```

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| defaultValue      |Number   | | - |
| type      |String   |比例符号名称,默认为无，支持percent/thousands/无 | - |
| max      |Number   | | Infinity |
| min      |Number   | | Infinity |
| disabled      |Boolean   | | 是否禁用 |
| symbol      |string   | | 币别符号,默认为人民币符号¥ |｜
| precision      |string   | | 有效数字,默认为2|
| step      |number/string   | | 每次改变步数，可以为小数，默认1|
| change      |Function(value: number /string)   | 变化回调|-
| pressEnter      |function(e)   | | 按下回车的回调|


使用示例
----
```vue
<template>
    <div>
        <a-form>
            <a-form-item>
                <rate-input type="percent" v-model="rate"/>
            </a-form-item>
        </a-form>

    </div>
</template>
<script>
    import RateInput from '@/components/CustomInput/RateInput'
    export default {
        components:{
            RateInput
        },
        data() {
            return {
                rate:''
            };
        },
        methods: {
            change(rate){
                console.log(rate);
            },
        },
    };
</script>
```
# BankInput组件用法
----
- 银行帐号输入组件

##使用示例：
```javascript
//javascript 引入组件，并在当前页面进行注册
import BankInput from '@/components/CustomInput/BankInput';
```
```html
//template
 <bank-input :value="value" @change="change"></bank-input>
```

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| value      |Number   | | - |
| maxLength      |Number   | | 银行帐号长度，默认为25 |
| placeholder      |String   | | 占位符,默认为请输入银行帐号 |


使用示例
----
```vue
<template>
    <div>
        <a-form>
            <a-form-item>
                <bank-input :value="bank" @change="change"></bank-input>
            </a-form-item>
        </a-form>

    </div>
</template>
<script>
    import BankInput from "@/components/CustomInput/BankInput";
    export default {
        components:{
           BankInput
        },
        data() {
            return {
                bank:''
            };
        },
        methods: {
            change(bank){
                console.log(bank);
            }
        },
    };
</script>
```

# MoneyRangeInput组件用法
----
- 金额范围输入组件

##使用示例：
```javascript
//javascript 引入组件，并在当前页面进行注册
import MoneyRangeInput from '@/components/CustomInput/MoneyRangeInput'
```
```html
//template
 <money-range-input v-model="value" @change="change" width="160"/>
```

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| max      |Number   | | Infinity |
| min      |Number   | | Infinity |
| disabled      |Boolean   | | 是否禁用 |
| symbol      |string   | | 币别符号,默认为人民币符号¥ |｜
| precision      |string   | | 有效数字,默认为2|
| change      |Function(value: number /string)   | 变化回调|-


使用示例
----
```vue
<template>
    <div>
        <a-form>
            <a-form-item label="金额">
                <money-range-input v-model="value" @change="change" width="160"/>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import MoneyRangeInput from '@/components/CustomInput/MoneyRangeInput'
    export default {
        components: {
            MoneyRangeInput
        },
        data () {
            return {
                value: [],
                max: 666,
                min: 22
            }
        },
        methods: {
            change (value) {
                console.log(value)
            }
        }
    }
</script>

```
