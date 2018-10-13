<template>
  <div class="index">
    <p-header></p-header>
    我是index首页
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import pHeader from '../components/p-header/p-header'

export default {
  data() {
    return {

    }
  },
  components: {
    pHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
