<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search-header"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow=false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 搜索联想 -->
    <search-suggesstion v-else-if="searchText.trim()" :search-text="searchText" @search="onSearch" />

    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @clear-search-history="searchHistories=[]"
      @search="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from '@/views/search/SearchHistory'
import SearchSuggesstion from '@/views/search/SearchSuggesstion'
import SearchResult from '@/views/search/SearchResult'
import { setItem, getItem } from '../utils/storage'
export default {
  data() {
    return {
      // 搜索框内容
      searchText: '',
      // 控制搜索结果的显示状态
      isResultShow: false,
      // 搜索历史数据
      searchHistories: getItem('TOUTIAO_HISTORY') || [],
    }
  },
  watch: {
    searchHistories(val) {
      setItem('TOUTIAO_HISTORY', val)
    },
  },
  components: {
    SearchHistory,
    SearchSuggesstion,
    SearchResult,
  },
  created() {},
  methods: {
    onSearch(val) {
      // 更新搜索框内容
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      //   显示搜素结果组件
      this.isResultShow = true
    },
    // 点击取消触发事件
    onCancel() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>