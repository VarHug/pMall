<template>
  <div class="p-header-wrap">
    <div class="p-header-container">
      <div class="p-header">
        <div class="logo">
          <img width="100%" src="//img10.360buyimg.com/cms/jfs/t17752/324/262367977/74875/fd9a74db/5a65c544N9fcaf6f7.png!q90.jpg">
        </div>
        <div class="header-right">
          <el-autocomplete
            class="search"
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="请输入商品信息"
            :trigger-on-focus="false"
            @select="handleSelect">
          </el-autocomplete>
          <div class="search-btn" @click="toGoods"><i class="el-icon-search"></i></div>
          <div class="aside">
            <div class="user" @click="login">
              <i class="icon-mine"></i>
              <div class="dropdown du" v-if="user && user.uid">
                <div class="spacer"></div>
                <div class="user-detail">
                  <div class="avatar">
                    <img width="100%" height="100%" :src="user.avatar">
                  </div>
                  <div class="name">欢迎您，<strong>{{user.name}}</strong></div>
                  <div class="exit" @click.stop="logout">退出</div>
                </div>
              </div>
            </div>
            <div class="shop">
              <i class="icon-shop"></i>
              <i class="icon-count">{{getGoodsCount}}</i>
              <div class="dropdown ds">
                <div class="spacer"></div>
                <div class="settleup-content">
                  <div class="smt">
                    <h4 class="title">最新加入的商品</h4>
                  </div>
                  <div class="smc">
                    <ul class="mcart">
                      <li class="mcart-item" v-for="(good, index) in cartList" :key="index">
                        <div class="p-img">
                          <a href=""><img width="50" height="50" :src="good.image"></a>
                        </div>
                        <div class="p-name">
                          <a href="" :title="good.name">{{good.name}}</a>
                        </div>
                        <div class="p-detail">
                          <span class="p-price">{{good.price | price}} × {{good.num}}</span>
                          <br>
                          <span class="delete" @click="deleteGood(good.pid)">删除</span>
                        </div>
                      </li>
                      <div class="mcart-item" v-show="cartList.length === 0">购物车中还没有商品，赶紧选购吧！</div>
                    </ul>
                  </div>
                  <div class="smb">
                    <div class="p-total">
                      共<b>{{getGoodsCount}}</b>件商品 共计<strong>{{getTotalPrice | price}}</strong>
                    </div>
                    <a href="javascript:;" title="去购物车" class="btn-payforgoods" @click="toCart">去购物车</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-container">
      <ul class="nav-list">
        <li class="nav-list-item" :class="{'active': pageId === 0}" @click="changePage(0)">首页</li>
        <li class="nav-list-item" :class="{'active': pageId === 1}" @click="changePage(1)">全部商品</li>
        <li class="nav-list-item" :class="{'active': pageId === 2}" @click="changePage(2)">周边商品</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import {ERR_OK} from '../../api/config'
import {loadCartList} from '../../common/js/cache.js'

export default {
  data() {
    return {
      restaurants: [],
      input: '',
      pageId: 0,
      searchString: ''
    }
  },
  computed: {
    getGoodsCount() {
      let num = 0
      this.cartList.forEach(good => {
        num += good.num
      })
      return num
    },
    getTotalPrice() {
      let totalPrice = 0
      this.cartList.forEach(good => {
        totalPrice += good.num * good.price
      })
      return totalPrice
    },
    ...mapGetters([
      'isLogin',
      'cartList',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'removeCartList',
      'initCartList',
      'setLogState',
      'setUserInfo'
    ]),
    changePage(pageId) {
      this.pageId = pageId
      switch (pageId) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/goods')
          break
        case 2:
          this.$router.push('/goods?type=2')
          break
        default:
          break
      }
    },
    querySearch(queryString, cb) {
      this.searchString = queryString
      this._loadSearch(queryString).then(res => {
        let restaurants = this.formatRestaurants(res.list)
        cb(restaurants)
      })
    },
    // 点击输入建议
    handleSelect(item) {
      this.$router.push(`/goodsDetail?productId=${item.pid}`)
    },
    // 搜索指定商品
    toGoods() {
      this.pageId = 1
      this.$router.push(`/goods?queryString=${this.searchString}`)
    },
    // 登录
    login() {
      if (!this.isLogin) {
        this.$router.push('/login')
      }
    },
    logout() {
      // 设置登录状态为登出
      this.setLogState(false)
      // 设置用户信息为空
      this.setUserInfo({})
      // 设置购物车为空
      this.initCartList([])
    },
    toCart() {
      if (this.isLogin) {
        // 登录，则去购物车页面
        this.$router.push('/cart')
      } else {
        // 未登录，去登录页面
        this.$notify({
          title: '请先登录',
          message: '',
          type: 'warning'
        })
        this.$router.push('/login')
      }
    },
    deleteGood(pid) {
      this.removeCartList(pid)
    },
    _loadSearch(queryString) {
      return new Promise((resolve, reject) => {
        let param = {
          page: 1,
          pageSize: 7,
          queryString
        }
        this.$axios.get('/api/good', {
          params: param
        }).then(res => {
          if (res.data.status === ERR_OK) {
            resolve(res.data.result)
          } else {
            reject(res.data.msg)
          }
        })
      })
    },
    formatRestaurants(list) {
      let ret = []
      list.forEach(item => {
        let restaurant = {}
        restaurant.value = item.pName
        restaurant.pid = item.pid
        ret.push(restaurant)
      })
      return ret
    },
    _initPageId() {
      switch (this.$route.fullPath) {
        case '/home':
          this.pageId = 0
          break
        case '/goods':
          this.pageId = 1
          break
        case '/goods?type=2':
          this.pageId = 2
          break
        default:
          break
      }
    },
    _initCartList() {
      if (this.isLogin) {
        // 登录，从数据库获取数据并提交vuex管理
        let param = {
          uid: this.user.uid
        }
        this.$axios.get('/api/user/getCartList', {
          params: param
        }).then(res => {
          if (res.data.status === ERR_OK) {
            this.initCartList(res.data.result.cartList)
          }
        })
      } else {
        this.initCartList(loadCartList())
      }
    }
  },
  created() {
    this._initCartList()
  },
  mounted() {
    this._initPageId()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.p-header-container
  background rgb(252, 218, 222)
  /.p-header
    position relative
    inner()
    clearfix()
    .logo
      position absolute
      top 50%
      transform translateY(-50%)
      display inline-block
      width 144px
      font-size 0
    .header-right
      position relative
      float right
      .search, .aside
        vertical-align middle
      .search
        width 305px
      .search-btn
        position absolute
        top 9px
        left 250px
        border-left 1px solid #dcdfe6
        width 50px
        height 38px
        text-align center
        line-height 38px
        font-size 20px
        background #fff
        cursor pointer
      .aside
        display inline-block
        font-size 0
        .user, .shop
          display inline-block
          vertical-align top
          position relative
          padding 15px
          line-height 22px
          font-size $font-size-large-x
          /.dropdown
            display none
            width 308px
            position absolute
            top 100%
            right -1px
            z-index 10
            background #fff
            border 1px solid #ddd
            box-shadow 0 0 5px rgba(0,0,0,.2)
            .spacer
              position absolute
              top -6px
              right 0
              width 52px
              height 12px
              background #fff
          &:hover
            background #fff
            box-shadow 0 0 5px rgba(0,0,0,.2)
            .dropdown
              display block
        .user
          margin 0 10px
          .du
            box-sizing border-box
            padding 10px 15px
            .user-detail
              overflow hidden
              .avatar
                float left
                margin-right 10px
                width 75px
                height 75px
                img
                  border-radius 50%
              .name
                float left
                font-size $font-size-medium-x
              .exit
                float right
                font-size $font-size-small
                cursor pointer
                extend-click()
        .shop
          .icon-count
            display inline-block
            width 16px
            height 16px
            position absolute
            top 15px
            right 0
            z-index 100
            text-align center
            line-height 16px
            font-size $font-size-small-s
            color #fff
            background #da1026
            border-radius 50%
          .ds
            .settleup-content
              font-size $font-size-small
              .smt
                height 25px
                padding 6px 8px
                line-height 25px
              .smc
                height auto!important
                max-height 344px
                overflow-y auto
                .mcart
                  .mcart-item
                    padding 8px 10px
                    border-top 1px dotted #cccccc
                    line-height 17px
                    overflow hidden
                    .p-img
                      float left
                      width 50px
                      height 50px
                      border 1px solid #ddd
                      padding 0
                      margin-right 10px
                      font-size 0
                    .p-name
                      float left
                      width 120px
                      height 52px
                      overflow hidden
                    .p-detail
                      float right
                      text-align right
                      .p-price
                        font-weight 700
                      .delete
                        cursor pointer
              .smb
                padding 8px
                background #f5f5f5
                overflow hidden
                .p-total
                  float left
                  line-height 29px
                .btn-payforgoods
                  float right
                  height 29px
                  line-height 29px
                  padding 0 10px
                  text-align center
                  color #fff
                  font-weight 700
                  background #E4393C
                  border-radius 3px
.nav-container
  padding 10px 0
  border-bottom 2px solid $color-border
  background #fff
  /.nav-list
    inner()
    font-size 0
    /.nav-list-item
      display inline-block
      vertical-align top
      margin-right 15px
      height 40px
      line-height 40px
      font-size $font-size-medium
      cursor pointer
      &.active
        color #FF0077
        font-weight 400
</style>
