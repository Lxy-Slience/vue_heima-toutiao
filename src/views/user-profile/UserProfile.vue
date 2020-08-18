<template>
  <div class="user-profile">
    <!-- 头部标题 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 个人信息 -->
    <!-- 上传头像文件夹 -->
    <input type="file" hidden ref="file" @change="OnAvatarChange" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image fit="cover" round :src="user.photo">
        <template v-slot:error>加载失败</template>
      </van-image>
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0? '男':'女'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true"></van-cell>

    <!-- 修改昵称弹层 -->
    <van-popup v-model="isUpdateNameShow" position="bottom" :style="{ height: '100%' }">
      <user-nickname @close="isUpdateNameShow=false" v-model="user.name" v-if="isUpdateNameShow"></user-nickname>
    </van-popup>
    <!-- 修改性别弹层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <user-gender
        @close="isUpdateGenderShow = false"
        v-if="isUpdateGenderShow"
        v-model="user.gender"
      ></user-gender>
    </van-popup>
    <!-- 修改生日弹层 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <user-birthday
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
        v-if="isUpdateBirthdayShow"
      ></user-birthday>
    </van-popup>
    <!-- 修改头像弹层 -->
    <van-popup v-model="isUpdateAvatarShow" position="bottom" :style="{ height: '100%' }">
      <user-photo
        :img="img"
        @close="isUpdateAvatarShow = false"
        @edit-photo="user.photo = $event"
        v-if="isUpdateAvatarShow"
      ></user-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/users'
import userNickname from './user-nickname'
import userGender from './user-gender'
import userBirthday from './user-birthday'
import userPhoto from './user-photo'
export default {
  data() {
    return {
      user: {}, // 个人信息数据对象
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdateAvatarShow: false,
      img: null,
    }
  },
  components: { userNickname, userGender, userBirthday, userPhoto },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data: res } = await getUserProfile()
        this.user = res.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    // 头像选择改变时候触发
    OnAvatarChange() {
      const file = this.$refs.file.files[0]
      const res = window.URL.createObjectURL(file)
      this.img = res
      this.isUpdateAvatarShow = true
      // 解决选择同一张头像，弹出层不弹出的问题
      this.$refs.file.value = ''
    },
  },
}
</script>

<style lang="less" scoped>
.user-profile {
  /deep/.van-image__img {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>