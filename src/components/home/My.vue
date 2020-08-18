<template>
  <div>
    <!-- 已登录页面头部 -->
    <div class="header is-login" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round :src="userInfo.photo" fit="cover" />
          <span class="nickname">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round class="edit-btn" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="num">{{userInfo.art_count}}</span>
          <span class="name">头条</span>
        </div>
        <div class="data-item">
          <span class="num">{{userInfo.follow_count}}</span>
          <span class="name">关注</span>
        </div>
        <div class="data-item">
          <span class="num">{{userInfo.fans_count}}</span>
          <span class="name">粉丝</span>
        </div>
        <div class="data-item">
          <span class="num">{{userInfo.like_count}}</span>
          <span class="name">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录页面头部 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 收藏、历史 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-shoucang shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-lishi lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link size="large" />
    <van-cell title="小智同学" is-link size="large" />
    <van-cell
      class="login-out"
      title="退出登录"
      size="large"
      clickable
      v-if="user"
      @click="onLoginOut"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfo } from '@/api/users'
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    if (this.user) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    //点击退出登录 触发事件
    onLoginOut() {
      // 确认退出弹出对话框
      this.$dialog
        .confirm({
          title: '确定退出登录？',
        })
        .then(() => {
          // on confirm
          // 确认退出。清除登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          return
        })
    },
    // 获取数据列表
    async getUserInfo() {
      try {
        const { data: res } = await userInfo()
        this.userInfo = res.data
      } catch (err) {
        this.$toast('获取数据列表失败，请稍后重试')
      }
    },
  },
}
</script>
    
<style lang="less" scoped>
.header {
  height: 361px;
  background: url('~@/assets/banner.png') no-repeat;
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile-img {
      width: 136px;
      height: 136px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
    }
  }
}
.is-login {
  .base-info {
    box-sizing: border-box;
    height: 231px;
    display: flex;
    justify-content: space-between;
    padding: 76px 32px 23px;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 3px solid #fff;
      }
      .nickname {
        font-size: 30px;
        margin-left: 22px;
        color: #fff;
      }
    }
    .right {
      .edit-btn {
        width: 120px;
        height: 38px;
      }
    }
  }
  .data-stats {
    display: flex;
    height: 130px;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .num {
        font-size: 32px;
      }
      .name {
        font-size: 26px;
      }
    }
  }
}
.van-grid {
  margin-bottom: 30px;
  height: 142px;
  .van-grid-item {
    .shoucang {
      font-size: 47px;
      color: #ee6a6b;
    }
    .lishi {
      font-size: 47px;
      color: #ff9d1d;
    }
    .text {
      font-size: 30px;
    }
  }
}
.login-out {
  margin-top: 10px;
  color: #d86262;
  text-align: center;
}
</style>