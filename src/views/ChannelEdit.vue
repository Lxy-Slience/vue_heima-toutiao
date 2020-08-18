<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="van-cell">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        size="mini"
        round
        @click="isEdit=!isEdit"
      >{{isEdit?'完成': '编辑'}}</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid :gutter="10" class="grid-my">
      <van-grid-item v-for="(item,index) in myChannels" :key="index" @click="update(item,index)">
        <van-icon slot="icon" name="close" v-if="isEdit && !includeId.includes(item.id)"></van-icon>
        <span slot="text" :class="{active: active===index}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell class="van-cell">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 宫格 -->
    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item
        v-for="(item,index) in recommendChannels"
        :key="index"
        :text="item.name"
        icon="plus"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>


<script>
import {
  getAllChannels,
  addMyChannels,
  deleteUserChannels,
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  data() {
    return {
      // 所有频道数据列表
      allChannelList: [],
      // 控制编辑状态图片的显示和隐藏
      isEdit: false,
      // 不进行删除图片显示的ID
      includeId: [0],
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    // 获取所有频道列表数据
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels()
        this.allChannelList = res.data.channels
      } catch (err) {
        this.$toast('获取数据失败！')
      }
    },
    // 点击 推荐频道项 添加到我的频道
    async onAddChannel(item) {
      this.myChannels.push(item)
      // 判断是否登录状态
      if (this.user) {
        // 登录状态
        try {
          await addMyChannels({
            id: item.id, //频道ID
            seq: this.myChannels.length, // 序号
          })
        } catch (err) {
          this.$toast('添加频道失败，请稍后重试！')
        }
      } else {
        // 未登录状态
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 点击我的频道项,删除用户频道
    update(item, index) {
      if (this.isEdit) {
        // 编辑状态
        if (this.includeId.includes(item.id)) {
          return
        }
        // 删除我的频道项
        this.myChannels.splice(index, 1)
        if (index < this.active) {
          this.$emit('update-active', this.active - 1, true)
        }

        this.deleteUserChannel(item)
      } else {
        // 非编辑状态
        this.$emit('update-active', index, false)
      }
    },
    // 删除指定用户频道项操作
    async deleteUserChannel(item) {
      if (this.user) {
        // 登录状态
        try {
          await deleteUserChannels(item.id)
        } catch (err) {
          this.$toast('删除失败，请稍后重试！')
        }
      } else {
        // 未登录状态
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道数据列表
    recommendChannels() {
      return this.allChannelList.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 88px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .van-button--mini {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85c5c;
  }
  .van-cell {
    margin: 10px 0;
  }
  .van-cell::after {
    border-bottom: 0;
  }
  /deep/.grid-my {
    .van-icon {
      position: absolute;
      top: -38px;
      right: -96px;
    }
  }
  /deep/.van-grid-item__content--center {
    background-color: #f4f5f6;
    width: 160px;
    height: 86px;

    font-size: 28px;
    color: #222;
  }
  /deep/.van-grid-item__text {
    font-size: 28px;
    color: #222;
    margin: 0px;
  }
  /deep/.van-grid-item__icon {
    font-size: 28px;
    color: #222;
  }
  .active {
    color: red;
  }
}
</style>