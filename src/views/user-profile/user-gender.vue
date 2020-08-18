<template>
  <div class="user-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/users'
export default {
  data() {
    return {
      columns: ['男', '女'],
      genderNumber: this.value,
    }
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      const genderNum = this.genderNumber
      try {
        await editUserProfile({
          gender: genderNum,
        })
        this.$emit('input', genderNum)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('修改失败，请重试')
      }
    },

    onChange(picker, value, index) {
      this.genderNumber = index
    },
  },
}
</script>

<style lang="less" scoped>
</style>
    
