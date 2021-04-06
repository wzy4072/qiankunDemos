<template>
  <div>
    <a-form-model
      ref="countryCustForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
      width="80%"
    >
      <a-card>
        <a-row>
          <a-col span="24">
            <a-form-model-item hidden ref="countryId" label="国家Id" prop="countryId">
              <a-input v-model="formData.countryId"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="nameZh" label="中文名称" prop="nameZh">
              <a-select
                v-model="formData.nameZh"
                placeholder="请选择"
                show-search
                :filter-option="filterOption"
                option-filter-prop="children"
                @change="selectChange">
                <a-select-option
                  v-for="countryDetail in countryCustData"
                  :key="countryDetail.id"
                  :label="countryDetail.nameZh"
                  :value="countryDetail.id">
                  {{ countryDetail.nameZh }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="nameEn" label="英文名称" prop="nameEn">
              <a-input v-model="formData.nameEn" :disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="curId" label="币种" prop="curId">
              <a-select v-model="formData.curId" placeholder="请选择" @change="getTapByStripe">
                <a-select-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.curName"
                  :value="item.id">
                  {{ item.curName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="enCode" label="简称" prop="enCode">
              <a-input v-model="formData.enCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="code" label="代码" prop="code">
              <a-input v-model="formData.code"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="timeZoneId" label="时区" prop="timeZoneId">
              <a-select v-model="formData.timeZoneId" placeholder="请选择" @change="getTime">
                <a-select-option
                  v-for="item in times"
                  :key="item.id"
                  :label="item.timeZone"
                  :value="item.id">
                  {{ item.timeZone }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="validSign" label="有效标志" prop="validSign">
              <a-radio-group v-model="formData.validSign" :defaultValue="Number(formData.validSign)">
                <dict-select
                  type="radio"
                  v-model="formData.validSign"
                  dictGroup="validSign"/>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
        <span>
          <!-- 提交按钮 -->
          <a-button type="primary" @click="onSubmit">{{ $t('common.btn.onSubmit') }}</a-button>
          <!-- 重置按钮 -->
          <a-button
            style="margin-left: 8px"
            @click="() => {this.formData = {};$refs.table.refresh(true)}">{{ $t('common.btn.reset') }}</a-button>
        </span>
      </a-card>
      <a-card style="margin-top: 24px" :bordered="false">
        <a-button type="primary" @click="addRow(count)">新增</a-button>
        <a-table rowKey="key" :columns="columnsNative" :dataSource="formData.formDataList" :pagination="false">
          <a-form-model-item
            slot="nameZh"
            :rules="[{ required: true, message: '请填地区名称' }]"
            slot-scope="text, record, index"
            :prop="`formDataList[${index}].nameZh`">
            <a-input v-model="record.nameZh"/>
          </a-form-model-item>
          <a-form-model-item
            slot="nameEn"
            :rules="[{ required: true, message: '请填地区英文名称' }]"
            slot-scope="text, record, index"
            :prop="`formDataList[${index}].nameEn`">
            <a-input v-model="record.nameEn"/>
          </a-form-model-item>
          <a-form-model-item
            slot="code"
            :rules="[{ required: true, message: '请填写地区代码' }]"
            slot-scope="text, record, index"
            :prop="`formDataList[${index}].code`">
            <a-input v-model="record.code"/>
          </a-form-model-item>
          <a-form-model-item
            slot="timeZoneId"
            :rules="[ { required: true, message: '请填写时区' }]"
            slot-scope="text, record, index"
            :prop="`formDataList[${index}].timeZoneId`">
            <a-select
              placeholder="请选择"
              v-model="record.timeZoneId"
            >
              <a-select-option
                v-for="item in times"
                :key="item.id"
                :label="item.timeZone"
                :value="item.id">
                {{ item.timeZone }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item slot="operation" slot-scope="text, record, index">
            <a-popconfirm
              title="是否确定删除?"
              @confirm="() => deleteRow(index)"
            >
              <div v-if="count !== 1">
                <a href="javascript:;">删除</a>
              </div>
              <div v-else>
                <a href="javascript:;"></a>
              </div>
            </a-popconfirm>
          </a-form-model-item>
        </a-table>
      </a-card>
    </a-form-model>
  </div>
</template>

<script>
    import {
        getNameZhs,
        getTimePlace,
        getTapByStripeid,
        addCountryCust,
        getCountryCust,
        updateCountryCust
    } from '@/api/countryCust'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    const columnsNative = [
        {
            title: '中文名称',
            dataIndex: 'nameZh',
            key: 'nameZh',
            scopedSlots: { customRender: 'nameZh' }
        },
        {
            title: '英文名称',
            dataIndex: 'nameEn',
            key: 'nameEn',
            scopedSlots: { customRender: 'nameEn' }
        },
        {
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            scopedSlots: { customRender: 'code' }
        },
        {
            title: '时区',
            dataIndex: 'timeZoneId',
            key: 'timeZoneId',
            scopedSlots: { customRender: 'timeZoneId' }
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
        }
    ]
    export default {
        name: 'Test',
        props: ['id'],
        data () {
            return {
                countryCustData: [],
                count: 1,
                columnsNative,
                form: this.$form.createForm(this),
                options: [],
                times: [],
                timeZones: [],
                isShow: false,
                formData: {
                    nameEn: '',
                    countryId: '',
                    curId: '',
                    timeZoneId: '',
                    validSign: '1',
                    formDataList: [
                        {
                            key: '0',
                            nameZh: '',
                            nameEn: '',
                            code: '',
                            timeZoneId: ''
                        }
                    ]
                },
                rules: {
                    nameZh: [{ required: true, message: '请填写中文名称', trigger: 'blur' }],
                    nameEn: [{ required: true, message: '请填写英文名称', trigger: 'blur' }],
                    curId: [{ required: true, message: '请选择币种', trigger: 'blur' }],
                    enCode: [{ required: true, message: '请填写简称', trigger: 'blur' }],
                    code: [{ required: true, message: '请填写代码', trigger: 'blur' }],
                    timeZoneId: [{ required: true, message: '请选择时区', trigger: 'blur' }],
                    validSign: [{ required: true, message: '请选择有效标志', trigger: 'blur' }]
                }
            }
        },
        async mounted () {
            this.loadaaa()
            this.getTapByStripe()
            this.getTime()
            await dictGroup('validSign')
            this.id && this.showModal(this.id)
        },
        methods: {
            filterOption (input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                )
            },
            addRow (count) {
                const newData = {
                    key: count,
                    nameZh: '',
                    nameEn: '',
                    code: '',
                    timeZoneId: ''
                }
                this.formData.formDataList.push(newData)
                this.count = count + 1
                this.isShow = true
            },
            loadaaa () {
                getNameZhs().then(res => {
                    this.countryCustData = res.data
                })
            },
            deleteRow (index) {
                this.formData.formDataList.splice(index, 1)
                this.count = this.count - 1
                if (this.count !== 1) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            getTime () {
                getTimePlace().then(res => {
                    this.times = res.data
                })
            },
            selectChange (value) {
                const countryCustOne = this.countryCustData.filter(item => item.id === value)[0]
                this.formData.nameEn = countryCustOne.nameEn
                this.formData.countryId = countryCustOne.id
            },
            getTapByStripe () {
                getTapByStripeid().then(res => {
                    this.options = res.data
                })
            },
            onSubmit () {
                console.log(this.formData)
                const _this = this
                this.$refs.countryCustForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    if (this.formData.id) {
                        request = updateCountryCust(this.formData)
                    } else {
                        request = addCountryCust(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(response.msg)
                            _this.visible = false
                            _this.$emit('refreshTable')
                        } else {
                            if (response.code === '00020000') {
                                _this.$message.error(response.msg + ',' + response.data)
                            } else {
                                _this.$message.error(response.msg)
                            }
                        }
                        this.submitLoading = false
                    })
                })
            },
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getCountryCust(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.$set(this.formData, 'validSign', response.data.validSign)
                        } else {
                            this.$message.error(response.msg)
                        }
                        this.loading = false
                    })
                } else {
                    this.$set(this.formData, 'validSign', '1')
                }
            }
        }
    }
</script>
