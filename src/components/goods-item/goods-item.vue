<template>
  <div class="gl-i-wrap">
    <div class="p-img">
      <a target="_blank" :title="glItem.pTitle" @click="openGoodsDetail(glItem.pid)">
        <img width="220" height="220" ref="pImg" :src="getPimg">
      </a>
    </div>
    <div class="p-scroll">
      <div class="ps-wrap">
        <ul class="ps-main">
          <li class="ps-item" v-for="(psItem, index) in glItem.category" :key="index">
            <a
              href="javascript:;"
              :title="psItem.title"
              :class="{'curr': type === index}"
              @mouseover.stop.prevent="changeCategory(index)">
              <img width="25" height="25" :src="psItem.picN9">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="p-price">{{glItem.pPrice | price}}</div>
    <div class="p-name">
      <a target="_blank" :title="glItem.pTitle" @click="openGoodsDetail(glItem.pid)">{{glItem.pName}}</a>
    </div>
    <div class="p-shop">{{glItem.seller}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    glItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      type: 0
    }
  },
  computed: {
    getPimg() {
      return this.glItem.category[this.type].picN7
    }
  },
  methods: {
    changeCategory(index) {
      this.type = index
    },
    openGoodsDetail(productId) {
      window.open(`//${window.location.host}/#/goodsDetail?productId=${productId}`)
    }
  },
  watch: {
    glItem(newVal, oldVal) {
      this.type = 0
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'

.gl-i-wrap
  margin 0 auto 10px
  padding 5px
  width 220px
  background #fff
  transition all .5s
  &:hover
    transform translateY(-3px)
    box-shadow 1px 1px 20px #ffa1b8
  .p-img
    margin-bottom 5px
    a
      display block
  .p-scroll
    margin-bottom 10px
    .ps-wrap
      height 29px
      overflow hidden
      .ps-main
        .ps-item
          float left
          width 34px
          height 29px
          text-align left
          a
            display inline-block
            width 25px
            height 25px
            border 1px solid #ddd
            cursor default
            &.curr
              padding 0
              border-width 2px
              border-color #e4393c
  .p-price
    margin-bottom 8px
    line-height 22px
    height 22px
    font-size $font-size-large-medium
    color $color-price
  .p-name
    margin-bottom 8px
    line-height 20px
    height 40px
    overflow hidden
    font-size $font-size-small
    color $color-text
  .p-shop
    line-height 18px
    height 18px
    margin-bottom 9px
    font-size $font-size-small
    color $color-999
</style>
