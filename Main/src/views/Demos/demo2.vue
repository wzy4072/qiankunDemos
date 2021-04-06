<template>
  <div>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="Activity name">
        <a-input v-model="form.name" size="large"/>
      </a-form-model-item>
      <a-form-model-item label="Activity name">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="Activity name" >
        <a-input v-model="form.name" size="small"/>
      </a-form-model-item>
      <a-form-model-item label="单位" class="query-form-item">
        <CorpTreeSelect v-model="form.corpId" :checkable="false" style="width:200px;" size="large"></CorpTreeSelect>
      </a-form-model-item>
      <a-form-model-item label="单位" class="query-form-item">
        <CorpTreeSelect v-model="form.corpId" :checkable="false" style="width:200px;" ></CorpTreeSelect>
      </a-form-model-item>
      <a-form-model-item label="单位" class="query-form-item">
        <CorpTreeSelect v-model="form.corpId" :checkable="false" style="width:200px;" size="small"></CorpTreeSelect>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import CorpTreeSelect from '@/components/SelectTree/CorpTreeSelect'

export default {
    components: { CorpTreeSelect },

    data () {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                name: '',
                corpId: '08927ee5545d4fd58322bb736c89248f'
            },
            controlHeight: 0
        }
    },
    methods: {},
    created () {

    }
}
</script>

<style></style>
