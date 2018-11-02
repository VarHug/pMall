<template>
  <div class="goods-detail" v-if="product">
    <div class="product-intro">
      <div class="preview-wrap">
        <div class="preview">
          <div class="main-img">
            <img width="450" :src="getMainImg">
          </div>
          <div class="spec-list">
            <i class="el-icon-arrow-left" @click="scrollLeft"></i>
            <div class="spec-items">
              <ul class="lh" ref="lh">
                <li class="lh-item"
                  v-for="(item, index) in product.preview"
                  :key="index"
                  :class="{'curr': previewIndex === index}"
                  @mouseover.stop.prevent="changePreview(index)">
                  <img :src="item.small">
                </li>
              </ul>
            </div>
            <i class="el-icon-arrow-right" @click="scrollRight"></i>
          </div>
        </div>
      </div>
      <div class="itemInfo-wrap">
        <div class="sku-name">{{product.pName}}</div>
        <div class="news">{{product.pTitle}}</div>
        <div class="price">
          <span class="dt">价格：</span>
          <span class="p-price">{{product.pPrice | price}}</span>
        </div>
        <div class="num">
          <span class="dt">数量：</span>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="100"></el-input-number>
        </div>
        <div class="goods-buy">
          <a href="javascript:;" class="buy-btn buy-now">立刻购买</a>
          <a href="javascript:;" class="buy-btn buy-cart" @click="addCart(product)">加入购物车</a>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <img v-for="(image, index) in product.detail" :key="index" :src='image'>
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
import {ERR_OK} from '../../api/config.js'
import {mapActions, mapGetters} from 'vuex'

const transform = prefix('transform')
const transition = prefix('transition')
const LH_ITEM_WIDTH = 58
const LH_ITEM_MARGIN = 18
const LH_ITEM_LEN = 5
const animationElementWidth = 45
const animationElementHeight = 45

export default {
  data() {
    return {
      productId: '',
      product: '',
      isAnimation: false,
      num: 1,
      previewIndex: 0,
      scrollPos: [],
      scrollIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'cartList'
    ]),
    getMainImg() {
      return this.product.preview[this.previewIndex].large
    }
  },
  methods: {
    ...mapActions([
      'saveCartList'
    ]),
    changePreview(index) {
      this.previewIndex = index
    },
    scrollLeft() {
      if (this.scrollIndex > 0) {
        this.scrollIndex--
        this.$refs.lh.style[transform] = `translateX(${this.scrollPos[this.scrollIndex]}px)`
      }
    },
    scrollRight() {
      if (this.scrollIndex < this.scrollPos.length - 1) {
        this.scrollIndex++
        this.$refs.lh.style[transform] = `translateX(${this.scrollPos[this.scrollIndex]}px)`
      }
    },
    handleChange(val) {
      console.log(`val is: ${val}`)
      console.log(`num is: ${this.num}`)
    },
    addCart(product) {
      if (!this.isAnimation) {
        // 动画相关
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
        // console.log(this.animationOpts)
        // 产品数据相关
        let goodInfo = {
          pid: product.pid,
          name: product.pName,
          price: product.pPrice,
          image: product.preview[0].small,
          num: this.num
        }
        this.saveCartList(goodInfo)
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
    },
    _getGoodDetail() {
      let param = {
        productId: this.productId
      }
      this.$axios.get('/api/good/detail', {
        params: param
      }).then(res => {
        if (res.data.status === ERR_OK) {
          this.product = res.data.result.list[0]
          this.$nextTick(() => {
            this._setLh()
          })
        }
      })
    },
    // 设置lh滑动相关参数
    _setLh() {
      this.$refs.lh.style.width = (LH_ITEM_WIDTH + LH_ITEM_MARGIN) * this.product.preview.length + 'px'
      let diff = this.product.preview.length - LH_ITEM_LEN
      for (let i = 0; i <= diff; i++) {
        this.scrollPos.push(-i * (LH_ITEM_WIDTH + LH_ITEM_MARGIN))
      }
    }
  },
  created() {
    this.productId = this.$route.query.productId
    this._getGoodDetail()
  },
  mounted() {

  },
  components: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'

.goods-detail
  background #fff
  margin-bottom 20px
  padding 10px
  /.product-intro
    display flex
    margin-bottom 20px
    /.preview-wrap
      margin-right 50px
      width 452px
      flex 0 0 452px
      /.preview
        .main-img
          border 1px solid #eee
          margin-bottom 20px
          img
            vertical-align middle
        .spec-list
          position relative
          .el-icon-arrow-left, .el-icon-arrow-right
            display block
            height 32px
            position absolute
            top 50%
            margin-top -16px
            font-size 30px
            font-weight bold
            color $color-999
            cursor pointer
          .el-icon-arrow-left
            left 0
          .el-icon-arrow-right
            right 0
          .spec-items
            position relative
            margin 0 auto
            width 380px
            height 58px
            overflow hidden
            .lh
              height 58px
              transition all .5s
              .lh-item
                float left
                margin 0 9px
                img
                  width 54px
                  height 54px
                  border 2px solid #fff
                &.curr
                  img
                    border 2px solid #e53e41
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
  /.detail-content
    margin 0 auto
    width 750px
    img
      width 100%
      vertical-align middle

.animation-wrap
  position fixed
  top 2px
  left 1520px
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
