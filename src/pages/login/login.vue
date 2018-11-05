<template>
  <div class="login">
    <logo-header></logo-header>
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
import logoHeader from '../../components/logo-header/logo-header'
import pFooter from '../../components/p-footer/p-footer'
import {ERR_OK} from '../../api/config.js'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import storage from 'good-storage'

const CART_LIST_KEY = '__cartList__'

export default {
  data() {
    return {
      account: '',
      password: '',
      isFromRouter: true
    }
  },
  computed: {
    ...mapGetters([
      'cartList'
    ]),
    canSub() {
      return this.account && this.password
    }
  },
  methods: {
    ...mapActions([
      'setLogState',
      'setUserInfo',
      'initCartList'
    ]),
    ...mapMutations({
      'setCartList': 'SET_CART_LIST'
    }),
    login() {
      if (this.canSub) {
        let param = {
          uid: this.account,
          pwd: this.password
        }
        this.$axios.get('/api/user', {
          params: param
        }).then(res => {
          if (res.data.status === ERR_OK) {
            this.$notify({
              title: '登录成功',
              message: '',
              type: 'success'
            })
            let user = res.data.result
            this.setLogState(true)
            this.setUserInfo(user)
            if (this.cartList.length > 0) {
              // 如果存在本地购物车则合并
              let param = {
                uid: this.account,
                goodsList: JSON.stringify(this.cartList)
              }
              this.$axios.get('/api/user/concatCartList', {
                params: param
              }).then(res => {
                if (res.data.status === ERR_OK) {
                  // 设置vuex合并后的购物车
                  this.setCartList(res.data.result.cartList)
                  // 清空localstorage购物车
                  storage.set(CART_LIST_KEY, [])
                }
              })
            } else {
              // 不存在本地购物车，则获取数据库中的购物车
              let param = {
                uid: this.account
              }
              this.$axios.get('/api/user/getCartList', {
                params: param
              }).then(res => {
                if (res.data.status === ERR_OK) {
                  this.initCartList(res.data.result.cartList)
                }
              })
            }
            this.isFromRouter ? this.$router.back() : this.$router.push('/home')
          } else {
            this.$notify({
              title: '登录失败',
              message: '您输入的帐号或者密码有误',
              type: 'error'
            })
          }
        })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.fullPath === '/') {
      next(vm => {
        vm.isFromRouter = false
      })
    } else {
      next(vm => {
        vm.isFromRouter = true
      })
    }
  },
  components: {
    logoHeader,
    pFooter
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'

.login
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
