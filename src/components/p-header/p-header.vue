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
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
          <div class="aside">
            <div class="user"><i class="icon-mine"></i></div>
            <div class="shop"><i class="icon-shop"></i></div>
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
export default {
  data() {
    return {
      restaurants: [],
      input: '',
      pageId: 0
    }
  },
  methods: {
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
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    loadAll() {
      return [
        {value: '小米6'},
        {value: 'iPhoneX'}
      ]
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
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
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
    inner()
    position relative
    overflow hidden
    .logo
      position absolute
      top 50%
      transform translateY(-50%)
      display inline-block
      width 144px
      font-size 0
    .header-right
      float right
      .search, .aside
        vertical-align middle
      .search
        width 305px
      .aside
        display inline-block
        font-size 0
        .user, .shop
          display inline-block
          vertical-align top
          padding 15px
          line-height 22px
          font-size $font-size-large-x
          cursor pointer
        .user
          margin 0 10px
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
