<template>
  <div class="home">
    <div class="slider">
      <el-carousel trigger="click" height="460px">
        <el-carousel-item v-for="(item, index) in sliderData" :key="index">
          <a :href="item.href" target="blank">
            <img width="100%" height="100%" :src="item.image">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="p-title">
      <div class="side-icon"></div>
      <div class="cate-title-name">官方推荐</div>
    </div>
    <div class="product-box">
      <div class="promo-list-box">
        <ul class="promo-list">
          <li class="promo-list-item">
            <a href="https://item.mi.com/product/10000111.html" target="blank"><img width="100%" height="100%" src="//i1.mifile.cn/a4/xmad_15323220713837_GLBVX.jpg"></a>
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul class="list" v-loading="loading1" element-loading-text="拼命加载中">
          <li class="list-item" v-for="(item, index) in phoneList" :key="index" @click.stop="openGoodsDetail(item.pid)">
            <div class="pic"><img :src="item.image"></div>
            <h3 class="title">{{item.name}}</h3>
            <p class="desc">{{item.desc}}</p>
            <p class="price">{{item.price | price}}</p>
          </li>
        </ul>
      </div>
    </div>
        <div class="p-title">
      <div class="side-icon"></div>
      <div class="cate-title-name">品牌周边</div>
    </div>
    <div class="product-box">
      <div class="promo-list-box">
        <ul class="promo-list">
          <li class="promo-list-item-m">
            <a href="//item.mi.com/product/5500.html" target="blank"><img width="100%" height="100%" src="//i1.mifile.cn/a4/xmad_15232433421155_vCzhJ.jpg"></a>
          </li>
          <li class="promo-list-item-m">
            <a href="https://item.mi.com/product/4348.html" target="blank"><img width="100%" height="100%" src="//i1.mifile.cn/a4/xmad_15123939053142_dFlAw.jpg"></a>
          </li>
        </ul>
      </div>
      <div class="list-box">
        <ul class="list" v-loading="loading2" element-loading-text="拼命加载中">
          <li class="list-item" v-for="(item, index) in otherList" :key="index" @click.stop="openGoodsDetail(item.pid)">
            <div class="pic"><img :src="item.image"></div>
            <h3 class="title">{{item.name}}</h3>
            <p class="desc">{{item.desc}}</p>
            <p class="price">{{item.price | price}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {ERR_OK} from '../../api/config.js'

export default {
  data() {
    return {
      sliderData: [],
      phoneList: [],
      otherList: [],
      loading1: true,
      loading2: true
    }
  },
  methods: {
    openGoodsDetail(productId) {
      this.$router.push(`/goodsDetail?productId=${productId}`)
    },
    _loadSliderData() {
      return [
        {
          href: 'https://item.mi.com/product/10000099.html',
          image: '//i1.mifile.cn/a4/xmad_15390566279642_JIicR.jpg'
        },
        {
          href: 'https://item.mi.com/product/10000117.html',
          image: '//i1.mifile.cn/a4/xmad_15378467692556_lnrbU.jpg'
        },
        {
          href: 'https://item.mi.com/product/6222.html',
          image: '//i1.mifile.cn/a4/xmad_15332803104112_LtKUd.jpg'
        },
        {
          href: 'https://www.mi.com/mibookair-13/?cfrom=search',
          image: '//i1.mifile.cn/a4/xmad_15338982677936_eQTJk.jpg'
        },
        {
          href: 'http://www.mi.com/a/h/7237.html?client_id=180100041086&masid=17409.0453',
          image: '//i1.mifile.cn/a4/xmad_15393231809587_MsJlx.jpg'
        }
      ]
    },
    _getPhoneList() {
      let param = {
        page: 1,
        pageSize: 8,
        type: 1
      }
      this.$axios.get('/api/good', {
        params: param
      }).then(res => {
        console.log(res)
        if (res.data.status === ERR_OK) {
          this.phoneList = this._formatData(res.data.result.list)
          console.log(this.phoneList)
          this.loading1 = false
        }
      })
    },
    _getOtherList() {
      let param = {
        page: 1,
        pageSize: 8,
        type: 2
      }
      this.$axios.get('/api/good', {
        params: param
      }).then(res => {
        if (res.data.status === ERR_OK) {
          this.otherList = this._formatData(res.data.result.list)
          this.loading2 = false
        }
      })
    },
    _formatData(data) {
      let ret = []
      data.forEach(element => {
        let product = {}
        product.name = element.pName
        product.price = element.pPrice
        product.desc = element.pTitle
        product.image = element.category[0].picN7
        product.pid = element.pid
        ret.push(product)
      })
      return ret
    }
  },
  created() {
    this.sliderData = this._loadSliderData()
    this._getPhoneList()
    this._getOtherList()
  },
  components: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.home
  overflow hidden
  .slider
    margin 20px 0
    a
      display block
      width 100%
      height 100%
      font-size 0
      overflow hidden
  .p-title
    margin-bottom 16px
    height 22px
    line-height 22px
    font-size 0
    .side-icon, .cate-title-name
      display inline-block
      vertical-align top
    .side-icon
      margin-right 10px
      width 8px
      height 100%
      background #FFA1B8
    .cate-title-name
      height 22px
      line-height 22px
      font-size 20px
      font-weight 700
      color $color-333
  .product-box
    display flex
    margin-bottom 20px
    .promo-list-box
      flex 0 0 234px
      width 234px
      margin-right 20px
      .promo-list
        margin-bottom -10px
        .promo-list-item
          margin-bottom 10px
          height 610px
          a
            display block
            width 100%
            height 100%
        .promo-list-item-m
          margin-bottom 10px
          height 300px
    .list-box
      .list
        margin-right -2%
        margin-bottom -10px
        font-size 0
        .list-item
          display inline-block
          vertical-align top
          margin-bottom 10px
          width 23%
          height 300px
          margin-right 2%
          background #fff
          transition all .5s
          cursor pointer
          &:hover
            transform translateY(-3px)
            box-shadow 1px 1px 20px #ffa1b8
          .pic
            margin 0 auto
            width 220px
            img
              width 100%
              height 100%
          .title
            margin 0 15px
            text-align center
            line-height 20px
            font-size $font-size-medium
            font-weight 400
            color $color-333
            no-wrap()
          .desc
            margin 0 10px 10px
            line-height 18px
            font-size $font-size-small
            color #b0b0b0
            no-wrap()
          .price
            text-align center
            font-size $font-size-large-x
            color $color-price
</style>
