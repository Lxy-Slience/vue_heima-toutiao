<template>
  <van-button
    :icon="value?'star':'star-o'"
    :class="{ active:value}"
    @click="onCollect"
    :loading="loading"
  />
</template>
    
<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  data() {
    return {
      loading: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，进行取消收藏
          await deleteCollect(this.articleId)
          this.$toast('取消收藏')
        } else {
          // 未收藏，添加收藏
          await addCollect(this.articleId)
          this.$toast('收藏成功')
        }
        this.$emit('input', !this.value)
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
  color: #ffa500;
}
.van-button--default {
  border: 0;
  margin-left: 50px;
}
</style>