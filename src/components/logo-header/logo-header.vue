<template>
  <div class="logo-wrap">
    <div class="logo">
      <div class="img-wrapper" @click="toHome">
        <img width="100%" src="//img10.360buyimg.com/cms/jfs/t17752/324/262367977/74875/fd9a74db/5a65c544N9fcaf6f7.png!q90.jpg">
      </div>
      <span class="login-logo-tip">依《网络安全法》相关要求，即日会员登陆需绑定手机。为保障您的账户安全及正常使用，如您尚未绑定，请尽快完成绑定，感谢您的理解和支持!</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    toHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'

.logo-wrap
  padding 20px 0
  background #fff
  .logo
    inner()
    font-size 0
    .img-wrapper
      display inline-block
      vertical-align middle
      margin-right 20px
      width 220px
      cursor pointer
    .login-logo-tip
      display inline-block
      vertical-align middle
      padding 0 15px
      line-height 28px
      height 28px
      font-size 11px
      background #ffefef
      border 1px solid #ffc0cc
</style>
