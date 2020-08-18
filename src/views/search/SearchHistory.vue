<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow=true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="deleteHistory(item,index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 删除按钮
      isDeleteShow: false,
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteHistory(item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>