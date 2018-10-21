<template>
  <div class="index">
    <p-header></p-header>
    <div class="main">
      <router-view class="main-container"></router-view>
    </div>
    <p-footer></p-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import pHeader from '../components/p-header/p-header'
import pFooter from '../components/p-footer/p-footer'

export default {
  data() {
    return {

    }
  },
  components: {
    pHeader,
    pFooter
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'

.index
  display flex
  flex-flow column
  min-height 100vh
  .main
    flex 1
    position relative
    /.main-container
      inner()

</style>
