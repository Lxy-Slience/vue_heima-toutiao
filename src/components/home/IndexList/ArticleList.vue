<template >
  <div class="article-list">
    <!-- // 下拉刷新 -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshingText"
      :uccess-duration="1500"
    >
      <!-- List列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，点击重新加载"
        @load="onLoad"
      >
        <article-item v-for="(item,index) in list" :key="index" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import ArticleItem from '@/views/ArticleItem'
export default {
  data() {
    return {
      // 数据列表
      list: [],
      // 加载状态
      loading: false,
      // 数据加载完成
      finished: false,
      // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      timestamp: null,
      // 请求加载失败时的状态提示
      error: false,
      // 控制下拉刷新的loading状态
      refreshing: false,
      // 下拉刷新提示
      refreshingText: '刷新成功',
    }
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArticleItem,
  },
  methods: {
    // list列表加载时候触发事件，滚动条与底部距离小于 offset 时触发
    async onLoad() {
      // 异步更新数据
      try {
        // 获取频道推荐文章请求
        const { data: res } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0,
        })
        const { results } = res.data
        // 将获取到的数据追加到list中渲染倒到页面
        this.list.push(...results)
        // 加载一次成功之后 继续加载
        this.loading = false
        if (results.length) {
          // 请求前一页历史数据的时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          // 数据全部加载完成
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新触发该事件
    async onRefresh() {
      try {
        const { data: res } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 0,
        })
        const { results } = res.data
        this.list.unshift(...results)
        this.refreshing = false
        this.refreshingText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshing = false
        this.refreshingText = '刷新失败，请稍后重试'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>