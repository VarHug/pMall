<template>
  <div class="checkout">
    <logo-header></logo-header>
    <div class="checkout-content">
      <h1 class="c-title">选择收获地址</h1>
      <div class="consignee-container">
        <ul class="consignee-list">
          <li
            class="ali consignee"
            :class="{'checked': checked === index}"
            v-for="(item, index) in consignee"
            :key="index"
            @click="checkConsignee(index)">
            <div class="alic">
              <p class="name">{{item.name}}</p>
              <p class="address">{{item.address}}</p>
              <p class="phone">{{item.phone}}</p>
              <div class="default" v-if="item.isDefault">默认地址</div>
              <div class="operation-section">
                <span class="btn-update" @click.stop="editConsignee(index)">编辑</span>
                <span class="btn-delete" @click.stop="deleteConsignee(index)">删除</span>
              </div>
            </div>
          </li>
          <li class="ali add-consignee" @click.stop="addConsignee">
            <div class="add">
              <i class="el-icon-circle-plus"></i>
              <span class="txt">使用新地址</span>
            </div>
          </li>
        </ul>
      </div>
      <h1 class="c-title">确认商品信息</h1>
      <div class="checked-goods">
        <el-row class="cart-thead">
          <el-col :span="12">商品</el-col>
          <el-col :span="4">单价</el-col>
          <el-col :span="4" class="ctn">数量</el-col>
          <el-col :span="4">小计</el-col>
        </el-row>
        <ul class="cart-list" v-if="checkedList.length > 0">
          <el-row class="cli" v-for="(good, index) in checkedList" :key="index">
            <el-col :span="12">
              <div class="good-item">
                <div class="p-img">
                  <img width="100%" height="100%" :src="getImage(good)">
                </div>
                <div class="name">{{good.name}}</div>
              </div>
            </el-col>
            <el-col :span="4" class="cell">{{good.price | price}}</el-col>
            <el-col :span="4" class="cell">{{good.num}}</el-col>
            <el-col :span="4" class="cell">{{good.num * good.price | price}}</el-col>
          </el-row>
        </ul>
        <div class="cart-toolbar">
          <div class="options-box">
            <div class="toolbar-left">
              <div class="back">
                <i class="el-icon-back"></i>
                <a href="/#/cart" class="backToCart">返回购物车</a>
              </div>
            </div>
            <div class="toolbar-right">
              <div class="btn-area">
                <a class="submit-btn" href="javascript:void(0);" @click="submitOrder">提交订单</a>
              </div>
              <div class="price-sum">
                <span class="txt">总价：</span>
                <span class="price"><em>{{getTotalPrice() | price}}</em></span>
                <b class="price-tips"></b>
              </div>
              <div class="amount-sum">共有<em>{{getTotalNum()}}</em>件商品</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <consignee-form
      :open='isCFormOpen'
      :title="cTitle"
      :consigneeForm='cForm'
      @close='closeCForm'
      @save='updateConsignee'>
    </consignee-form>
    <p-footer></p-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import logoHeader from '../../components/logo-header/logo-header'
import pFooter from '../../components/p-footer/p-footer'
import consigneeForm from '../../components/consignee-form/consignee-form'
import {mapGetters} from 'vuex'
import {ERR_OK} from '../../api/config'

export default {
  data() {
    return {
      consignee: [],
      isCFormOpen: false,
      updateIndex: 0,
      cTitle: '',
      cForm: {},
      checked: -1
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'checkedList'
    ])
  },
  methods: {
    addConsignee() {
      this.isCFormOpen = true
      this.updateIndex = this.consignee.length
      this.cTitle = '新增收货人信息'
      this.cForm = {}
    },
    editConsignee(index) {
      this.isCFormOpen = true
      this.updateIndex = index
      this.cTitle = '编辑收货人信息'
      this.cForm = this.consignee[index]
    },
    deleteConsignee(index) {
      // 选中地址index自减
      this.checked--
      this.updateIndex = index
      this.consignee.splice(this.updateIndex, 1)
      let param = {
        uid: this.user.uid,
        consigneeList: JSON.stringify(this.consignee)
      }
      this.$axios.get('/api/user/updateConsignee', {
        params: param
      }).then(res => {
      })
    },
    closeCForm() {
      this.isCFormOpen = false
    },
    updateConsignee(value) {
      this.isCFormOpen = false
      if (value.isDefault) {
        // 被设为默认地址则将其他地址的是否默认设置为false
        this.consignee.forEach(item => {
          item.isDefault = false
        })
      }
      this.consignee.splice(this.updateIndex, 1, value)
      let param = {
        uid: this.user.uid,
        consigneeList: JSON.stringify(this.consignee)
      }
      this.$axios.get('/api/user/updateConsignee', {
        params: param
      }).then(res => {
      })
    },
    checkConsignee(index) {
      this.checked = index
    },
    getImage(good) {
      let regExp = /s54x54/
      return good.image.replace(regExp, 's80x80')
    },
    getTotalPrice() {
      let totalPrice = 0
      this.checkedList.forEach(good => {
        totalPrice += good.num * good.price
      })
      return totalPrice
    },
    getTotalNum() {
      let totalNum = 0
      this.checkedList.forEach(good => {
        totalNum += good.num
      })
      return totalNum
    },
    submitOrder() {
      if (this.checked > -1) {
        this.$notify({
          title: '成功',
          message: '订单已提交，但是并不会发货',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '失败',
          message: '您还未选择收获地址',
          type: 'error'
        })
      }
    },
    _getAddress() {
      let param = {
        uid: this.user.uid
      }
      this.$axios.get('/api/user/getConsignee', {
        params: param
      }).then(res => {
        if (res.data.status === ERR_OK) {
          this.consignee = res.data.result.consignee
          this.consignee.forEach((item, index) => {
            if (item.isDefault) {
              this.checked = index
            }
          })
          if (this.checked === -1) {
            this.checked = 0
          }
        }
      })
    }
  },
  created() {
    if (this.checkedList.length === 0) {
      this.$router.push('/cart')
    } else {
      this._getAddress()
    }
  },
  components: {
    logoHeader,
    pFooter,
    consigneeForm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.checkout
  display flex
  flex-flow column
  min-height 100vh
  .checkout-content
    flex 1
    inner()
    margin-top 20px
    margin-bottom 20px
    background #fff
    .c-title
      padding 0 24px
      height 46px
      line-height 46px
      color $color-333
      font-size $font-size-medium
      font-weight 700
    /.consignee-container
      padding 20px 24px 40px
      /.consignee-list
        overflow hidden
        margin-right -24px
        .ali
          float left
          border 1px solid #e5e5e5
          margin 0 24px 24px 0
          width 270px
          height 158px
          box-sizing border-box
          background #fafafa
          cursor pointer
          &.consignee
            position relative
            box-sizing border-box
            overflow hidden
            &.checked
              border 2px solid #ff5777
            .alic
              padding 10px
              p
                margin-bottom 10px
                font-size $font-size-medium
              .default
                position absolute
                top 10px
                right 10px
                font-size $font-size-small-s
              .operation-section
                position absolute
                left 0
                bottom 0
                border-top 1px solid #e1e1e1
                width 100%
                height 28px
                background #fff
                transition all .25s ease
                font-size 0
                transform translate3d(0, 29px, 0)
                span
                  display inline-block
                  width 50%
                  height 28px
                  line-height 28px
                  text-align center
                  font-size $font-size-medium
                  box-sizing border-box
                  &.btn-delete
                    border-left 1px solid #e1e1e1
                  &:hover
                    background #f2f2f2
            &:hover
              .operation-section
                transform translate3d(0, 0, 0)
          &.add-consignee
            text-align center
            line-height 158px
            &:hover
              background #f2f2f2
            .add
              display inline-block
              vertical-align middle
              line-height initial
              .el-icon-circle-plus
                display block
                font-size $font-size-large-x
              .txt
                display block
    /.checked-goods
      padding 20px 24px 40px
      .cart-thead
        margin-bottom 10px
        border-top 1px solid #efefef
        border-bottom 1px solid #efefef
        height 32px
        line-height 32px
        font-size $font-size-small
        color $color-999
      .cart-list
        margin-bottom 10px
        box-sizing border-box
        .cli
          margin-bottom 10px
          background #f8f8f8
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
      /.cart-toolbar
        border-top 1px solid #ddd
        height 50px
        background #fff
        .options-box
          position relative
          height 50px
          /.toolbar-left
            position absolute
            top 0
            left 0
            width 300px
            height 50px
            .back
              height 50px
              line-height 50px
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
</style>
