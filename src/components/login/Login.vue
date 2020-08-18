<template>
  <div>
    <!-- 登录标签 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="userFormRef">
      <!-- 手机号输入框 -->
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        class="mobile-field"
        v-model="userInfo.mobile"
        :rules="userFormRules.mobile"
        maxlength="11"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="userInfo.code"
        :rules="userFormRules.code"
        maxlength="6"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 获取验证码按钮 -->
        <template #button>
          <van-count-down
            :time="1000*60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow=false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            class="get-btn"
            round
            native-type="button"
            @click="onSendSms"
          >获取验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入 login 登录请求
import { login, sendSms } from '@/api/users'

export default {
  name: 'LoginIndex',
  data() {
    return {
      userInfo: {
        mobile: '13911111111',
        code: '246810',
      },
      // 表单验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'onBlur' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确的手机号' },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'onBlur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' },
        ],
      },
      //   发送验证码倒计时
      isCountDownShow: false,
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 点击登录按钮 表单提交
    async onSubmit() {
      // 加载提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0,
      })
      // 发起登录请求并捕获错误
      try {
        const { data: res } = await login(this.userInfo)
        console.log(res)
        this.$toast.success({ message: '登录成功' })
        this.$store.commit('setUser', res.data)
        this.$router.push('/home')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail({ message: '手机号或验证码错误！' })
        } else {
          this.$toast.fail({ message: '登录失败，请稍后重试！' })
        }
      }
    },
    // 获取验证码
    async onSendSms() {
      // 校验手机号
      try {
        this.$refs.userFormRef.validate('mobile')
      } catch (err) {
        return
      }
      this.isCountDownShow = true
      // 获取验证码请求
      try {
        await sendSms(this.userInfo.mobile)
        this.$toast('发送验证码')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送频繁，请一分钟后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 53px 33px;
  .van-button--block {
    background-color: #6db4fb;
    border-radius: 10px;
    border: 0;
  }
}
i {
  margin-right: 30px;
}
.get-btn {
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #ededed;
  font-size: 22px;
}
</style>