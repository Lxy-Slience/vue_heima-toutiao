<template>
  <div class="article-item">
    <van-cell :to="`/article/${article.art_id}`">
      <!-- 左侧标题 -->
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <!-- 底部作者名，评论数 -->
      <div slot="label">
        <div v-if="article.cover.type===3" class="cover-wrap">
          <van-image
            class="cover-wrap__item"
            fit="cover"
            v-for="(item,index) in article.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
      <!-- 右侧图片 -->
      <div slot="default" v-if="article.cover.type===1">
        <van-image class="right-cover" :src="article.cover.images[0]" fit="cover" />
      </div>
    </van-cell>
  </div>
</template>


<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.article-item {
  background-color: #fff;
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .van-cell__label {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 24px;
    }
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .cover-wrap {
    display: flex;
    padding: 20px 0;
    .cover-wrap__item {
      flex: 1;
      width: 100%;
      height: 146px;
      margin-right: 5px;
    }
  }
}
</style>