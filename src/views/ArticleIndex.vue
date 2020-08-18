<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="文章详情" @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
            @click="onFollow"
            :loading="followLoading"
          >已关注</van-button>
          <van-button
            @click="onFollow"
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
          >关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="artivleContent"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论组件 -->
        <comment-article :source="article.art_id" @total="totalCount=$event" />
        <!-- /评论组件 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!-- 收藏组件 -->
          <collect-article v-model="article.is_collected" :articleId="article.art_id" />
          <!-- 点赞组件 -->
          <like-article v-model="article.attitude" :articleId="article.art_id" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
// 导入图片预览组件
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/users'
import collectArticle from '@/components/collect/collectArticle'
import likeArticle from '@/components/like/LikeArticle'
import commentArticle from '@/components/comment/CommentArticle'

export default {
  data() {
    return {
      //文章详情数据对象
      article: {},
      // 加载状态的显示
      loading: true,
      // 数据加载失败时返回的错误状态码
      errStatus: 0,
      // 关注按钮点击loading状态
      followLoading: false,
      // 文章评论总数
      totalCount: 0,
    }
  },
  components: { collectArticle, likeArticle, commentArticle },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data: res } = await getArticleById(this.articleId)
        this.loading = false
        this.article = res.data
        // 通过异步处理，利用ref引用获取容器节点
        setTimeout(() => {
          this.previewImages()
        }, 0)
      } catch (err) {
        this.loading = false
        if (err.response.status === 404) {
          this.errStatus = 404
        }
      }
    },
    previewImages() {
      // 通过ref 获取到 容器
      const articleContent = this.$refs['artivleContent']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      // 遍历获取到的所有img 节点
      imgs.forEach((img, index) => {
        images.push(img.src)
        // 点击图片，触发图片预览
        img.onclick = () => {
          ImagePreview({
            //   预览的图片地址数组
            images: images,
            // 从哪张图片开始预览
            startPosition: index,
          })
        }
      })
    },
    // 切换关注与已关注
    async onFollow() {
      this.followLoading = true
      try {
        if (this.article.is_followed) {
          //   已关注，进行取消关注
          await deleteFollow(this.article.aut_id)
          this.$toast('取消了关注！')
        } else {
          // 未关注，进行关注操作
          await addFollow(this.article.aut_id)
          this.$toast('关注成功！')
        }
        this.followLoading = false
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast('你不能关注你自己！')
        } else {
          this.$toast('操作失败，请重试！')
        }
        this.followLoading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>