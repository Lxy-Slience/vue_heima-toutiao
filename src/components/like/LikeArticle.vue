<template>
  <van-button
    :icon="value===1?'good-job':'good-job-o'"
    :class="{ active:value===1}"
    @click="onLiked"
    :loading="loading"
  />
</template>

<script>
import { addLiked, deleteLiked } from '@/api/article'
export default {
  data() {
    return {
      loading: false,
    }
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onLiked() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          //   已点赞，取消点赞
          await deleteLiked(this.articleId)
          this.$toast('取消点赞')
        } else {
          // 未点赞 ，添加点赞
          await addLiked(this.articleId)
          this.$toast('点赞成功')
          status = 1
        }
        this.$emit('input', status)
      } catch (err) {
        this.$toast('操作失败，请重试！')
      }
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.active {
  color: red;
  border: 0;
}
.van-button--default {
  border: 0;
}
</style>