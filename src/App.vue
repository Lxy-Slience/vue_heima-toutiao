<template>
  <div id="app">
    <!-- 路由的出口 -->
    <i class="iconfont icon-dianzan"></i>
    <van-button type="primary">主要按钮</van-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
</style>
