<template>
  <div class="home-container">
    <!-- 头部搜索框 -->
    <van-nav-bar fixed>
      <van-button class="search-btn" slot="title" round icon="search" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- 导航 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id">
        <!-- 文章列表组件 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <!-- 插槽 -->
      <!-- 占位的盒子 -->
      <div slot="nav-right" class="empty"></div>
      <!-- 编辑按钮 -->
      <div slot="nav-right" class="edit-btn" @click="editChannelShow=true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 编辑频道按钮弹出层 -->
    <van-popup
      v-model="editChannelShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 编辑按钮弹出层组件内容 -->
      <channel-edit :my-channels="channelsList" :active="active" @update-active="updateActive" />
    </van-popup>
  </div>
</template>

<script>
import { channelList } from '@/api/users'
import ArticleList from './IndexList/ArticleList'
import ChannelEdit from '@/views/ChannelEdit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data() {
    return {
      active: 0,
      channelsList: [],
      // 控制编辑频道弹出层的显示与隐藏
      editChannelShow: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.getChannelList()
  },
  methods: {
    async getChannelList() {
      // 登录状态
      if (this.user) {
        try {
          const { data: res } = await channelList()
          this.channelsList = res.data.channels
        } catch (err) {
          this.$toast('获取用户频道列表失败！' + err)
        }
      } else {
        // 未登录状态
        const localChannels = getItem('TOUTIAO_CHANNELS')
        console.log(localChannels)

        if (localChannels) {
          this.channelsList = localChannels
        } else {
          const { data: res } = await channelList()
          this.channelsList = res.data.channels
        }
      }
    },
    updateActive(index, isShow) {
      this.active = index
      this.editChannelShow = isShow
    },
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
}
</script>
    
<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 31px;
    .van-icon {
      font-size: 40px;
    }
  }
  /deep/.van-tab--active {
    color: #5b5b5b !important;
  }
  /deep/.van-tab {
    width: 190px;
    height: 82px;
    border-right: 1px solid #edeff3;
    font-size: 28px;
    color: #a2a2a2;
  }
  /deep/.van-tabs__wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    z-index: 1;
    height: 82px;
  }
  /deep/.van-tabs__line {
    bottom: 38px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  /deep/.edit-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    border-left: 1px solid #edeff3;
  }
  .empty {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
}
</style>
