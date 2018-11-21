<template>
  <div class="goods" v-if="goodsList.length">
    <div class="sort">
      <span class="txt" @click="changeSort">按价格排序<i :class="getSortIcon"></i></span>
    </div>
    <ul class="gl" v-loading="loading" element-loading-text="拼命加载中">
      <li class="gl-item" v-for="(glItem, index) in goodsList" :key="index">
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
      goodsList: [],
      loading: true,
      total: 0,
      pageSizes: [10, 20, 40, 80],
      pageSize: 10,
      currentPage: 1,
      type: 0,
      queryString: '',
      sort: 0
    }
  },
  computed: {
    getSortIcon() {
      if (this.sort === 0) {
        return 'el-icon-sort'
      } else if (this.sort === -1) {
        return 'el-icon-sort-down'
      } else {
        return 'el-icon-sort-up'
      }
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.loading = true
      this._getGoodsList()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.loading = true
      this.$route.query.page = this.currentPage
      this.$route.query.pageSize = this.pageSize
      this._getGoodsList()
    },
    changeSort() {
      if (this.sort === 1) {
        this.sort = -1
      } else {
        this.sort = 1
      }
      this.currentPage = 1
      this.loading = true
      this._getGoodsList()
    },
    _getGoodsList() {
      // 滚动回商品列表起始处
      this._scrollToGl()
      let param = {
        page: this.currentPage,
        pageSize: this.pageSize,
        type: this.type,
        queryString: this.queryString,
        sort: this.sort
      }
      this.$axios.get('/api/good', {
        params: param
      }).then(res => {
        if (res.data.status === ERR_OK) {
          // 设置商品列表
          this.goodsList = res.data.result.list
          // 设置element组件相关信息
          this.total = res.data.result.totalCount
          this.loading = false
        }
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
    this.type = this.$route.query.type ? parseInt(this.$route.query.type) : 0
    this.queryString = this.$route.query.queryString || ''
    this._getGoodsList()
  },
  watch: {
    '$route' (to, from) {
      this.type = to.query.type ? parseInt(to.query.type) : 0
      this.queryString = to.query.queryString || ''
      this.currentPage = 1
      this._getGoodsList()
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
  .sort
    padding 10px 5px 5px
    .txt
      font-size 14px
      cursor pointer
      i
        padding-left 5px
  .gl
    margin-top 10px
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
