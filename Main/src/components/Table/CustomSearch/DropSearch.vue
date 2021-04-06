<template>
  <a-dropdown :trigger="['click']">
    <a-button type="link" class="icon-btn" title="自定义常用搜索"><a-icon type="down-circle" style="margin-left:8px;" /></a-button>
    <a-menu slot="overlay">
      <a-menu-item
        v-for="(cusParam, cIndex) in customParams"
        :key="'cusParam' + cIndex"
        @click="searchAndShowParam(cusParam)"
      >{{ cusParam.name }}</a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
/**
 * 该组件只用于展示/删除/抛出 常用搜索参数
 * 不参与搜索
 */
import { getCustomParams } from '@/api/customSearch'
const localKey = location.pathname + 'ShowCustomerSearch'
export default {
    name: 'DropSearch',
    data () {
        return {
            customParams: [],
            defultOpenCustomSearch: !!localStorage.getItem(localKey)
        }
    },
    mounted () {
        this.getCustomerParams()
    },
    methods: {
        updateParams () {
            this.getCustomerParams()
        },
        getCustomerParams () {
            getCustomParams({ type: 'queryParams' }).then(res => {
                this.customParams = JSON.parse(localStorage.getItem('mockCustomerParam' + location.pathname)) || []
            })
        },
        searchAndShowParam (cusParam) {
            this.$emit('getCustomParam', Object.assign({}, cusParam, { display: false }))
        },
        showCustomSearch () {
          this.$emit('openSearch')
        }
    }
}
</script>

<style></style>
