<template>
  <page-header-wrapper>
    <a-card :loading="loading" :bordered="false">
      <a-form-model
        ref="configForm"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 4}"
        :wrapper-col="{ span: 16 }">
        <a-tabs>
          <a-tab-pane key="basic" tab="基础配置">
            <a-card :bordered="false" size="small">
              <a-row>
                <a-form-model-item label="集团（公司名称）" prop="companyName">
                  <a-col span="16"><a-input v-model="formData.companyName"/></a-col>
                </a-form-model-item>
                <a-form-model-item label="启用国际化" prop="i18nEnable">
                  <a-col span="8">
                    <a-radio-group name="radioGroup" v-model="formData.i18nEnable">
                      <a-radio value="1">启用</a-radio>
                      <a-radio value="2">禁用</a-radio>
                    </a-radio-group>
                  </a-col>
                </a-form-model-item>
                <a-form-model-item label="客商资料系统复核">
                  <a-col span="8">
                    <dict-select
                      v-model="formData.externalCorpAutoAudit"
                      placeholder="客商资料系统复核"
                      type="radio"
                      dictGroup="yesOrNo"/>
                  </a-col>
                </a-form-model-item>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="password" tab="密码配置" force-render>
            <a-card :bordered="false" size="small">
              <a-row>
                <a-form-model-item label="初始化密码" prop="initPassword">
                  <a-col span="8"><a-input-password v-model="formData.initPassword"/></a-col>
                </a-form-model-item>
                <a-form-model-item label="密码最小长度" prop="passwordLength">
                  <a-col span="8"><a-input-number v-model="formData.passwordLength"/></a-col>
                </a-form-model-item>
                <a-form-model-item label="密码组成方式" prop="passwordModel">
                  <a-col span="8">
                    <a-select placeholder="请选择" v-model="formData.passwordModel">
                      <a-select-option value="0">数字</a-select-option>
                      <a-select-option value="1">字母</a-select-option>
                      <a-select-option value="2">数字+字母</a-select-option>
                      <a-select-option value="3">字母+数字+特殊字符</a-select-option>
                    </a-select>
                  </a-col>
                </a-form-model-item>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="attachment" tab="文件配置" force-render>
            <a-card :bordered="false" size="small">
              <a-row>
                <a-form-model-item label="上传附件最大值" prop="attachmentSize">
                  <a-col span="8"><a-input-number v-model="formData.attachmentSize"/>个</a-col>
                </a-form-model-item>
                <a-form-model-item label="上传附件大小限制" prop="attachmentMaxSize">
                  <a-col span="8"><a-input-number v-model="formData.attachmentMaxSize"/>MB</a-col>
                </a-form-model-item>
                <a-form-model-item label="上传根路径" prop="attachmentRootPath">
                  <a-col span="8"><a-input v-model="formData.attachmentRootPath"/></a-col>
                  <a-col span="16">说明：盘符:/父级目录</a-col>
                </a-form-model-item>
                <a-form-model-item label="上传子路径" prop="attachmentChildPath">
                  <a-col span="8"><a-input v-model="formData.attachmentChildPath"/></a-col>
                  <a-col span="8">说明：/子目录</a-col>
                </a-form-model-item>
                <a-form-model-item label="上传附件格式限制" prop="formatTip">
                  <a-col span="8"><a-input v-model="formData.formatTip"/></a-col>
                  <a-col span="16">说明：文件后缀，不带点，多个用逗号分割，如：zip,rar</a-col>
                </a-form-model-item>
              </a-row>
            </a-card>
          </a-tab-pane>
          <!-- 查询按钮 -->
          <a-button type="primary" slot="tabBarExtraContent" @click="onSubmit">{{ $t('common.btn.save') }}</a-button>
          <a-button slot="tabBarExtraContent" style="margin-left: 8px" @click="resetForm" >{{ $t('common.search.button.reset') }}</a-button>
        </a-tabs>
      </a-form-model>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { saveConfig, searchConfig } from '@/api/basic/config'

export default {
    data () {
        return {
            visible: false,
            submitLoading: false,
            loading: false,
            serviceName: 'system',
            typeName: 'sys',
            formData: {
                companyName: '',
                i18nEnable: '',
                externalCorpAutoAudit: '1',
                attachmentRootPath: 'D:/files',
                attachmentChildPath: '/uploadFiles'
            },
            rules: {}
        }
    },
    mounted () {
        this.loadData()
    },
    methods: {
        loadData () {
            this.loading = true
            searchConfig(this.serviceName, this.typeName).then(response => {
                const _this = this
                response.data.forEach(res => {
                    _this.formData[res.name] = res.value
                })
                this.loading = false
            })
        },
        onSubmit: function () {
            const _this = this
            this.$refs.configForm.validate(valid => {
                if (!valid) {
                    return false
                }
                this.loading = true
                const paramData = []
                Object.keys(_this.formData).forEach(key => {
                    const param = {
                        service: _this.serviceName,
                        type: _this.typeName,
                        name: key,
                        value: _this.formData[key]
                    }
                    paramData.push(param)
                })
                const request = saveConfig(paramData)
                request.then((response) => {
                    if (response.success) {
                        _this.$message.success(_this.$t(response.msg))
                        _this.loadData()
                    } else {
                        _this.$message.error(_this.$t(response.msg, response.msgParams))
                    }
                    this.loading = false
                })
            })
        },
        resetForm () {
            this.$refs.configForm.resetFields()
        }
    }
}
</script>

<style scoped>

</style>
