<template>
  <div class="user-nickname">
    <van-nav-bar
      title="设置昵称"
      class="page-nav-bar"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    ></van-nav-bar>

    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/users'
export default {
  data() {
    return {
      message: this.value,
    }
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      const newNickname = this.message
      try {
        if (!this.message.length) {
          this.$toast.fail('昵称不能为空！')
          return
        }
        await editUserProfile({
          name: newNickname,
        })
        this.$emit('input', newNickname)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('修改失败，请重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.user-nickname {
  .page-nav-bar {
    background-color: #fff;
    /deep/ .van-nav-bar__title {
      color: #000;
    }
  }
  .field-wrap {
    padding: 20px;
  }
}
</style>