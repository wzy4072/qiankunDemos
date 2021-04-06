<template>
  <div>
    <a-form :form="form" class="custom-design-form">

      <KFormItem :formConfig="{}" :record="record" />

    </a-form>
    <a-button @click="saveCustomParam">submit</a-button>
  </div>
</template>

<script>
// import { showDetail } from './temp'
import CorpTreeSelect from '@/components/SelectTree/CorpTreeSelect'
import formDesign from '@/components/FormDesign/mini'
formDesign.setConfig({ title: '用户自定义组件', list: [{ type: 'CorpTreeSelect', component: CorpTreeSelect }] })
export default {
    data () {
        return {
            record: {
                type: 'CorpTreeSelect',
                label: '单位组件',
                options: {
                    checkable: false,
                    defaultValue: '',
                    // checkable: true,
                    // defaultValue: [],
                    width: '200px'
                },
                model: 'CorpTreeSelectValue',
                help: '',
                rules: [{ required: true, message: '必填项' }]
            },
            form: this.$form.createForm(this) // async from
        }
    },
    methods: {
        saveCustomParam () {
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values)
                }
            })
        }
    }
}
</script>

<style></style>
