<template>
  <div class="login">
    <div class="logo-wrap">
      <div class="logo">
        <div class="img-wrapper">
          <img width="100%" src="//img10.360buyimg.com/cms/jfs/t17752/324/262367977/74875/fd9a74db/5a65c544N9fcaf6f7.png!q90.jpg">
        </div>
        <span class="login-logo-tip">依《网络安全法》相关要求，即日会员登陆需绑定手机。为保障您的账户安全及正常使用，如您尚未绑定，请尽快完成绑定，感谢您的理解和支持!</span>
      </div>
    </div>
    <div class="content">
      <div class="lg-content">
        <div class="lg-form">
          <el-input v-model="account" placeholder="用户名/邮箱/手机号"></el-input>
          <el-input v-model="password" placeholder="密码" :type="'password'"></el-input>
          <a href="javascript:;" class="submit" :class="{'disabled': !canSub}" @click="login">登录</a>
        </div>
      </div>
    </div>
    <p-footer></p-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import pFooter from '../../components/p-footer/p-footer'

export default {
  data() {
    return {
      account: '',
      password: ''
    }
  },
  computed: {
    canSub() {
      return this.account && this.password
    }
  },
  methods: {
    login() {
      if (this.canSub) {
        console.log('submit account')
      }
    }
  },
  components: {
    pFooter
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.login
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
      .login-logo-tip
        display inline-block
        vertical-align middle
        padding 0 15px
        line-height 28px
        height 28px
        font-size 11px
        background #ffefef
        border 1px solid #ffc0cc
  .content
    position relative
    margin-bottom 20px
    height 600px
    background url('../../common/images/upload_541i9di2b3icf9j13f24e0bg7b1i6_1920x600.png') no-repeat center center
    /.lg-content
      position absolute
      top 80px
      left 62.5%
      padding 30px 44px
      width 365px
      background #ffeceb
      opacity .9
      .lg-form
        .el-input
          margin-bottom 10px
        .submit
          display block
          margin-top 10px
          height 40px
          text-align center
          line-height 40px
          color #fff
          background #ff5777
          border-radius 2px
          &.disabled
            cursor not-allowed
</style>
