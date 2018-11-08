<template>
  <div class="cart">
    <logo-header></logo-header>
    <div class="cart-content" v-if="cartList">
      <div class="p-cart" v-show="cartList.length > 0">
        <el-row class="cart-thead">
          <el-col :span="2">
            <el-checkbox class="checkbox" @change="handleCheckAllChange" ref="checkAll" v-model="isCheckAll">全选</el-checkbox>
          </el-col>
          <el-col :span="10">商品</el-col>
          <el-col :span="3">单价</el-col>
          <el-col :span="3" class="ctn">数量</el-col>
          <el-col :span="3">小计</el-col>
          <el-col :span="3">操作</el-col>
        </el-row>
        <ul class="cart-list" v-if="cartList.length > 0">
          <el-row class="cli" v-for="(good, index) in cartList" :key="index">
            <el-col :span="1">
              <el-checkbox class="checkbox cli-cbox" @change="handleCheckedGoodsChange" ref="checkGoods" v-model="checkedState[index]"></el-checkbox>
            </el-col>
            <el-col :span="11">
              <div class="good-item">
                <div class="p-img">
                  <img width="100%" height="100%" :src="getImage(good)">
                </div>
                <div class="name">{{good.name}}</div>
              </div>
            </el-col>
            <el-col :span="3" class="cell">{{good.price | price}}</el-col>
            <el-col :span="3" class="cell gin">
              <el-input-number
              size="mini"
              v-model="goodsnum[index]"
              :min='1'
              :max='100'
              @change="handleNumChange(index)">
              </el-input-number>
            </el-col>
            <el-col :span="3" class="cell">{{good.num * good.price | price}}</el-col>
            <el-col :span="3" class="cell gid">
              <div class="delte" @click.stop="deleteGood(good.pid, index)">删除</div>
            </el-col>
          </el-row>
        </ul>
        <div class="cart-toolbar">
          <div class="options-box">
            <div class="toolbar-right">
              <div class="btn-area">
                <a class="submit-btn" href="javascript:void(0);" @click="toCheckout">去结算<b></b></a>
              </div>
              <div class="price-sum">
                <span class="txt">总价：</span>
                <span class="price"><em>{{getCheckedTotalPrice() | price}}</em></span>
                <b class="price-tips"></b>
              </div>
              <div class="amount-sum">已选择<em>{{getCheckedTotalAmount()}}</em>件商品</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-empty" v-show="cartList.length === 0 ">
        <div class="message">
          <div class="txt">购物车空空的哦~，去看看心仪的商品吧~</div>
        </div>
      </div>
    </div>
    <p-footer></p-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import logoHeader from '../../components/logo-header/logo-header'
import pFooter from '../../components/p-footer/p-footer'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import {ERR_OK} from '../../api/config'

export default {
  data() {
    return {
      checkedState: [],
      isCheckAll: false,
      goodsnum: []
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'cartList',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'saveCartList',
      'initCartList',
      'removeCartList'
    ]),
    ...mapMutations({
      setCheckedList: 'SET_CHECKED_LIST'
    }),
    getImage(good) {
      let regExp = /s54x54/
      return good.image.replace(regExp, 's80x80')
    },
    handleCheckAllChange(val) {
      this.isCheckAll = val
      for (let i = 0; i < this.cartList.length; i++) {
        this.checkedState[i] = val
      }
    },
    handleCheckedGoodsChange(val) {
      for (let i = 0; i < this.cartList.length; i++) {
        if (!this.checkedState[i]) {
          this.isCheckAll = false
          return
        }
      }
      this.isCheckAll = true
    },
    handleNumChange(index) {
      let goodInfo = JSON.parse(JSON.stringify(this.cartList[index]))
      // 新加入的数量
      goodInfo.num = this.goodsnum[index] - this.cartList[index].num
      this.saveCartList(goodInfo)
    },
    deleteGood(pid, index) {
      this.goodsnum.splice(index, 1)
      this.removeCartList(pid)
    },
    getCheckedTotalPrice() {
      let totalPrice = 0
      let checkedState = this.checkedState
      for (let i = 0, len = checkedState.length; i < len; i++) {
        if (checkedState[i]) {
          totalPrice += this.cartList[i].num * this.cartList[i].price
        }
      }
      return totalPrice
    },
    getCheckedTotalAmount() {
      let totalAmount = 0
      let checkedState = this.checkedState
      for (let i = 0, len = checkedState.length; i < len; i++) {
        if (checkedState[i]) {
          totalAmount += this.cartList[i].num
        }
      }
      return totalAmount
    },
    toCheckout() {
      let goodsList = []
      this.checkedState.forEach((state, index) => {
        if (state) {
          goodsList.push(this.cartList[index])
        }
      })
      if (goodsList.length > 0) {
        this.setCheckedList(goodsList)
        this.$router.push('/checkout')
      } else {
        this.$notify({
          title: '您还未选中商品',
          message: '',
          type: 'warning'
        })
      }
    },
    _initGoodsNum(cartlist) {
      for (let i = 0; i < cartlist.length; i++) {
        this.goodsnum[i] = cartlist[i].num
      }
    },
    _initCartList() {
      let param = {
        uid: this.user.uid
      }
      this.$axios.get('/api/user/getCartList', {
        params: param
      }).then(res => {
        if (res.data.status === ERR_OK) {
          this.initCartList(res.data.result.cartList)
          this._initGoodsNum(this.cartList)
        }
      })
    }
  },
  created() {
    if (!this.isLogin) {
      this.$router.push('/home')
    }
    if (!this.cartList.length) {
      this._initCartList()
    } else {
      this._initGoodsNum(this.cartList)
    }
  },
  components: {
    logoHeader,
    pFooter
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.cart
  display flex
  flex-flow column
  min-height 100vh
  .cart-content
    flex 1
    inner()
    margin-bottom 20px
    .p-cart
      .cart-thead
        margin-bottom 10px
        height 32px
        line-height 32px
        background #fcdade
        font-size $font-size-small
        color $color-999
        .ctn
          padding-left 54px
        .checkbox
          font-size $font-size-small
          color $color-999
          &.is-checked
            .el-checkbox__label
              color $color-999
      .cart-list
        border-style solid
        border-width 2px 1px 1px
        border-color #aaa #f1f1f1 #f1f1f1
        margin-bottom 10px
        background #fff
        box-sizing border-box
        .cli
          border 1px solid #c5c5c5
          border-top none
          .cli-cbox
            padding-top 48px
          .good-item
            overflow hidden
            padding 15px 0 10px
            .p-img
              float left
              margin-right 10px
              border 1px solid #eee
              width 80px
              height 80px
            .name
              float left
              padding-top 10px
              width 400px
          .cell
            padding-top 25px
            &.gin
              padding-top 19px
            &.gid
              cursor pointer
      .cart-toolbar
        border 1px solid #c5c5c5
        height 50px
        background #fff
        .options-box
          position relative
          height 50px
          /.toolbar-right
            position absolute
            top -1px
            right 0
            width 650px
            height 52px
            .btn-area
              float right
              .submit-btn
                display block
                position relative
                width 96px
                height 52px
                line-height 52px
                color #fff
                text-align center
                font-size $font-size-large
                background #e54346
                overflow hidden
                b
                  display block
                  position absolute
                  top 0
                  left 0
                  width 96px
                  height 52px
                  overflow hidden
                  background url(//misc.360buyimg.com/user/cart/css/i/cart-submit-btn.png) 0 0 no-repeat
            .price-sum
              float right
              margin 15px 10px 0 10px
              height 36px
              line-height 20px
              .txt
                float left
                width 50px
                text-align right
                color $color-999
                font-size $font-size-small
              .price
                display inline-block
                text-align right
                em
                  font-size $font-size-large
                  color #e4393c
                  font-weight 700
                  font-style normal
              .price-tips
                display inline-block
                vertical-align top
                margin-right 5px
                width 12px
                height 18px
                background url(//misc.360buyimg.com/user/cart/css/i/price-tips.png) 0 0 no-repeat
            .amount-sum
              float right
              margin 15px 0 0
              height 36px
              line-height 20px
              color $color-999
              font-size $font-size-small
              em
                margin 0 3px
                color #e4393c
                font-family verdana
                font-weight 700
                font-style normal
    .cart-empty
      margin-top 50px
      padding 80px 0 120px
      height 98px
      color $color-333
      background #fff
      .message
        height 98px
        padding-left 341px
        background url(//misc.360buyimg.com/user/cart/css/i/no-login-icon.png) 250px 22px no-repeat
        .txt
          padding-top 30px
          font-size $font-size-medium

.checkbox
  padding-left 20px
</style>
