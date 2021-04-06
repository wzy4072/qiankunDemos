<template>
  <a-modal
    :maskClosable="false"
    :destroyOnClose="true"
    :title="desc.descProps&&desc.descProps.title"
    :visible="visible"
    @cancel="visible = false"
    :width="width">
    <s-descriptions :desc="desc"></s-descriptions>
    <template slot="footer">
      <a-button type="primary" @click="visible = false">{{ i18nRender('common.btn.close') }}</a-button>
    </template>
  </a-modal>
</template>
<script>
    import SDescriptions from '@/components/Descriptions/index'
    import { i18nRender } from '@/locales/index'
    export default {
        name: 'DescriptionsModal',
        props: {
            width: {
                type: String,
                default: '800px'
            }
        },
        components: { SDescriptions },
        data () {
            return {
                visible: false,
                desc: {},
                i18nRender
            }
        },
        methods: {
            show (info) {
                this.desc = { ...info }
                this.visible = true
            }
        }
    }
</script>
