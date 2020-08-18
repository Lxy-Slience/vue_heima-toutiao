<template>
  <div class="user-photo">
    <img :src="img" class="img" ref="img" />
    <div class="footer">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">确定</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhoto } from '@/api/users'
export default {
  data() {
    return {
      cropper: null,
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      //   autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      //   movable: false,
    })
  },
  methods: {
    onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const { data } = await editUserPhoto(formData)
          console.log(data)
          this.$emit('close')
          this.$emit('edit-photo', data.data.photo)
          this.$toast.success('更新成功')
        } catch (err) {
          this.$toast('更新失败，请重试！')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.user-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 32px;
    }
  }
}
</style>