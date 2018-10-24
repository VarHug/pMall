<template>
  <div class="goods-detail">
    <div class="goods-id">{{productId}}</div>
    <div class="product-intro">
      <div class="preview-wrap">
        <div class="preview">
          <div class="main-img">
            <img width="450" src="//img10.360buyimg.com/n1/s450x450_jfs/t8287/299/1334040710/28963/780fbd17/59b857feN9690dbe6.jpg">
          </div>
          <div class="spec-list"></div>
        </div>
      </div>
      <div class="itemInfo-wrap">
        <div class="sku-name">Apple iPhone 8 Plus (A1864) 64GB 深空灰色 移动联通电信4G手机</div>
        <div class="news">后置双摄，双面玻璃，经典之选，美在智慧，XS系列享受12期白条免息</div>
        <div class="price">
          <span class="dt">价格：</span>
          <span class="p-price">{{5999 | price}}</span>
        </div>
        <div class="num">
          <span class="dt">数量：</span>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="100"></el-input-number>
        </div>
        <div class="goods-buy">
          <a href="javascript:;" class="buy-btn buy-now">立刻购买</a>
          <a href="javascript:;" class="buy-btn buy-cart" @click="addCart">加入购物车</a>
        </div>
      </div>
    </div>
    <transition
      @before-enter="beforeEnter"
      @after-enter='afterEnter'>
      <div class="animation-wrap" v-if="isAnimation">
        <div class="animation-inner">
          <img src="//img10.360buyimg.com/n1/s450x450_jfs/t8287/299/1334040710/28963/780fbd17/59b857feN9690dbe6.jpg">
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {prefix} from '../../common/js/dom.js'

const transform = prefix('transform')
const transition = prefix('transition')

const animationElementWidth = 45
const animationElementHeight = 45

export default {
  data() {
    return {
      productId: '',
      isAnimation: false,
      num: 1
    }
  },
  computed: {

  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    addCart() {
      if (!this.isAnimation) {
        this.isAnimation = true
        // 获取按钮元素
        let dom = event.target
        let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
        let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
        let shopLeft = document.getElementsByClassName('shop')[0].getBoundingClientRect().left
        let shopTop = document.getElementsByClassName('shop')[0].getBoundingClientRect().top
        this.animationOpts = {
          elLeft,
          elTop,
          shopLeft,
          shopTop
        }
        console.log(this.animationOpts)
      }
    },
    beforeEnter(ele) {
      let wrap = ele
      let inner = ele.children[0]
      let offsetLeft = this.animationOpts.shopLeft - this.animationOpts.elLeft + animationElementWidth / 2
      let offsetTop = this.animationOpts.elTop - animationElementHeight / 2
      wrap.style[transform] = `translate3d(0, ${offsetTop}px, 0)`
      inner.style[transform] = `translate3d(${-offsetLeft}px, 0, 0) scale(1.2)`
    },
    afterEnter(ele) {
      let wrap = ele
      let inner = ele.children[0]
      wrap.style[transform] = 'translate3d(0, 0, 0)'
      inner.style[transform] = 'translate3d(0, 0, 0) scale(.2)'
      wrap.style[transition] = 'transform .55s cubic-bezier(.29,.55,.51,1.08)'
      inner.style[transition] = 'transform .55s linear'
      inner.addEventListener('transitionend', () => {
        this._finishAnimation()
      })
    },
    _finishAnimation() {
      this.isAnimation = false
    }
  },
  created() {
    this.productId = this.$route.query.productId
  },
  components: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'

.goods-detail
  background #fff
  /.product-intro
    display flex
    /.preview-wrap
      margin-right 50px
      width 452px
      flex 0 0 452px
      /.preview
        .main-img
          border 1px solid #eee
          margin-bottom 20px
    /.itemInfo-wrap
      flex 1
      .sku-name
        margin-bottom 5px
        padding-top 10px
        line-height 28px
        font-size $font-size-medium-x
        font-weight 700
      .news
        margin-bottom 10px
        color #e4393c
        font-size $font-size-small
      .price
        margin-bottom 10px
        /.dt
          color $color-999
          font-size $font-size-small
        .p-price
          display inline-block
          vertical-align middle
          font-size 24px
          font-weight 700
      .num
        margin-bottom 10px
      .goods-buy
        font-size 0
        .buy-btn
          display inline-block
          height 48px
          text-align center
          line-height 48px
          font-size $font-size-large-medium
          color #fff
          &.buy-now
            margin-right 10px
            width 200px
            height 50px
            line-height 50px
            background #ef2f23
          &.buy-cart
            width 198px
            border 1px solid #ddd
            color $color-333

.animation-wrap
  position fixed
  top 5px
  left 1510px
  width 45px
  height 45px
  z-index 10
  .animation-inner
    img
      display block
      width 100%
      height 100%
      border-radius 50%
</style>
