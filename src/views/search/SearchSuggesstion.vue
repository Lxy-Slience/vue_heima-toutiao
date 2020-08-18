<template>
  <div class="search-suggesstion">
    <van-cell
      v-for="(item,index) in suggesstionList"
      :key="index"
      icon="search"
      @click="$emit('search',item)"
    >
      <div slot="title" v-html="hightLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSussestion } from '@/api/search'
// 导入lodash 的防抖方法
import { debounce } from 'lodash'
export default {
  data() {
    return {
      // 联想建议数据列表
      suggesstionList: [],
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  // Vue 实例将会在实例化时调用 $watch()
  watch: {
    // 监听搜索框数据的变化 handler函数会获得 搜索框的内容
    searchText: {
      handler: debounce(function (val) {
        this.loadSraechSuggesstion(val)
      }, 200),
      // handler(val) {
      //
      // },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
  methods: {
    // 发请求获取联想建议数据列表
    async loadSraechSuggesstion(q) {
      try {
        const { data: res } = await getSearchSussestion(q)
        this.suggesstionList = res.data.options
      } catch (err) {
        this.$toast('获取数据失败！')
      }
    },
    hightLight(item) {
      const hightStr = `<span style="color: #3296fa">${this.searchText}</span>`
      // RegExp 正则表达式的构造函数
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, hightStr)
    },
  },
}
</script>

<style lang="less" scoped>
</style>