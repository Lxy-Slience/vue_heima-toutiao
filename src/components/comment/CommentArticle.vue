<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index">
        <div slot="title">{{item.content}}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      // 获取评论查询参数
      queryInfo: {
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source, // 源id，文章id或评论id
        offset: null, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      },
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getComments(this.queryInfo)
        const { results } = res.data
        this.$emit('total', res.data.total_count)
        console.log(res)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = res.data.last_id
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