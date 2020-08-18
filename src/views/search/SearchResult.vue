<template>
  <div class="search-history">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      // 查询参数
      queryInfo: {
        page: 1,
        per_page: 10,
        q: this.searchText,
      },
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getSearchResult(this.queryInfo)
        const { results } = res.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.queryInfo.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>