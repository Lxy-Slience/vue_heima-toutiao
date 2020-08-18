<template>
  <div class="user-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { editUserProfile } from '@/api/users'
export default {
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    }
  },
  props: {
    value: {
      type: String,
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
      const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await editUserProfile({
          birthday: currentDate,
        })
        this.$emit('input', currentDate)
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
</style>