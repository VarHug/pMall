<template>
  <div class="goods" v-if="goods.length">
    <ul class="gl" v-loading="loading" element-loading-text="拼命加载中">
      <li class="gl-item" v-for="(glItem, index) in goods" :key="index">
        <goods-item :glItem='glItem'></goods-item>
      </li>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="sizes, prev, pager, next"
      :total="total"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import {ERR_OK} from '../../api/config.js'
import GoodsItem from '../../components/goods-item/goods-item'

export default {
  data() {
    return {
      temp: [], // mook数据阶段暂时存储所有goods
      goods: [],
      loading: true,
      total: 0,
      pageSizes: [10, 20, 40, 80],
      pageSize: 10,
      currentPage: 1,
      sin: 0, // 起始条目数
      ein: 10 // 结束条目数
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      // while (this.currentPage * this.pageSize > this.total && this.currentPage > 1) {
      //   this.currentPage--
      // }
      this.sin = (this.currentPage - 1) * this.pageSize
      this.ein = this.currentPage * this.pageSize
      this.loading = true
      this._loadGoods()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.sin = (this.currentPage - 1) * this.pageSize
      this.ein = this.currentPage * this.pageSize
      this.loading = true
      this._loadGoods()
    },
    _loadGoods() {
      this.$axios.get('/api/phone').then(res => {
        if (res.data.errno === ERR_OK) {
          this.temp = res.data.data
        }
        this.$axios.get('/api/other').then(res => {
          if (res.data.errno === ERR_OK) {
            this.temp = this.temp.concat(res.data.data)
            this.total = this.temp.length
            this.goods = this.temp.slice(this.sin, this.ein)
            this.loading = false
            this._scrollToGl()
          }
        })
      })
    },
    _scrollToGl() {
      try {
        window.scrollTo({
          top: 117,
          behavior: 'smooth'
        })
      } catch (error) {
        window.scrollTo(0, 117)
      }
    }
  },
  created() {
    this._loadGoods()
  },
  watch: {
    '$route' (to, from) {

    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.goods
  padding-bottom 70px
  overflow hidden
  .gl
    margin-top 20px
    font-size 0
    .gl-item
      display inline-block
      vertical-align top
      width 20%
  .el-pagination
    position absolute
    bottom 20px
    left 50%
    transform translateX(-50%)
</style>
