<template>
  <a-modal v-model="visible" title="编辑字典数据" @ok="onHandleOk">
    <template slot="footer">
      <a-button key="back" @click="onHandleCancel">
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="onHandleOk">
        提交
      </a-button>
    </template>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="字典组名称">
        {{ form.groupName }}
      </a-form-model-item>
      <a-form-model-item ref="name" label="名称" prop="name">
        <a-input
          v-model="form.name"
          @blur="() => {$refs.name.onFieldBlur();}"/>
      </a-form-model-item>
      <a-form-model-item ref="value" label="数据值" prop="value">
        <a-input
          v-model="form.value"
          @blur="() => {$refs.value.onFieldBlur();}"/>
      </a-form-model-item>
      <!--      <a-form-model-item label="备注" prop="desc">-->
      <!--        <a-input v-model="form.desc" type="textarea" style="height: 32px;"/>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item ref="sort" label="排序值" prop="sort">
        <a-input-number
          v-model="form.sort"
          @blur="() => {$refs.sort.onFieldBlur();}"
          :min="0"
          :max="100"/>
      </a-form-model-item>
      <a-form-model-item label="是否启用" prop="initiate" v-if="isEditDict">
        <a-switch
          checked-children="启用"
          un-checked-children="不启用"
          v-model="form.initiate"/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { addDictData, updateDictData } from '@/api/basic/dict'

const defaultForm = {
    groupId: '',
    // 字典名称
    name: '',
    // 字典数据值
    value: undefined,
    // 字典排序
    sort: 1,
    // 字典启用
    initiate: false
}
export default {
    name: 'DictModal',
    data () {
        return {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
            visible: false,
            loading: false,
            // 编辑字典参数,是否启用不要
            isEditDict: false,
            form: { ...defaultForm },
            rules: {
                name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
                value: [{ required: true, message: '请输入字典数据值', trigger: 'blur' }],
                sort: [{ required: true, message: '请输入字典排序', trigger: 'blur' }]
            }
        }
    },
    methods: {
        onOpenDictModal (data) {
            if (data) {
                this.visible = data.visible
                this.form = { ...defaultForm }
                this.form.groupId = data.dictGroup.id
                this.form.groupName = data.dictGroup.name
            }
        },
        onOpenEditDictModal (data) {
            if (data) {
                this.visible = data.visible
                this.form = { ...data }
            }
        },
        onHandleOk () {
            const _this = this
            this.loading = true
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let request
                    if (this.form.id) {
                        request = updateDictData(this.form)
                    } else {
                        request = addDictData(this.form)
                    }
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(_this.$t(response.msg))
                            _this.$emit('refreshTable')
                            _this.onHandleCancel()
                        } else {
                            _this.$message.error(_this.$t(response.msg, response.msgParams))
                        }
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    this.loading = false
                    return false
                }
            })
        },
        onHandleCancel () {
            this.form = { ...defaultForm }
            this.$refs.ruleForm.resetFields()
            this.visible = false
        },
        destroyed () {
            console.log('destroyed')
        }
    }
}
</script>

<style scoped>

</style>
