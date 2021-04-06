<template>
  <a-modal
    :maskClosable="false"
    :destroyOnClose="true"
    title="信息"
    :visible="visible"
    @cancel="visible = false"
    :footer="null"
    width="900px">
    <a-table :columns="columns" :data-source="data" bordered size="small">
      <a slot="name" slot-scope="text, record" @click="selectedRow(record)"> 选择</a>
    </a-table>
  </a-modal>
</template>
<script>
    const columns = [
        {
            title: '操作',
            dataIndex: 'key',
            key: 'key',
            width: 60,
            scopedSlots: { customRender: 'name' }
        },
        {
            title: '开户行',
            dataIndex: 'bankCode',
            key: 'bankCode',
            width: 200
        },
        {
            title: '开户行名称',
            dataIndex: 'bankName',
            key: 'bankName',
            ellipsis: true
        },

        {
            title: '所在省',
            dataIndex: 'province',
            key: 'province',
            ellipsis: true
        },
        {
            title: '所在市',
            dataIndex: 'city',
            key: 'city',
            ellipsis: true
        }
    ]

    const data = [
        {
            key: '1',
            bankCode: '1255654488669',
            bankName: '深圳农商银行',
            province: '广东',
            city: '深圳'
        },
        {
            key: '2',
            bankCode: '1255654488888',
            bankName: '深圳建设银行',
            province: '广东',
            city: '深圳'
        },
        {
            key: '3',
            bankCode: '1255654499999',
            bankName: '深圳平安银行',
            province: '广东',
            city: '深圳'
        },
        {
            key: '4',
            bankCode: '1255654477777',
            bankName: '深圳工商银行',
            province: '广东',
            city: '深圳'
        }
    ]

    export default {
        data () {
            return {
                data,
                columns,
                visible: false
            }
        },
        methods: {
            showModal () {
                this.visible = true
            },
            selectedRow (row) {
                this.$emit('selectCallBack', row)
                this.visible = false
            }
        }
    }
</script>
