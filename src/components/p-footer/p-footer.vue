<template>
  <div class="p-footer">
    <div class="p-footer-helper">
      <div class="p-footer-helper-mod" v-for="(helperItem, index) in helper" :key="index">
        <div class="p-footer-helper-mod-container">
          <h4 class="p-footer-helper-title">{{helperItem.title | helperTitle}}</h4>
          <ul class="p-footer-helper-list">
            <li class="p-footer-helper-item" v-for="(item, index) in helperItem.item" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="p-footer-info">
      <ul class="p-footer-info-list">
        <li class="p-footer-info-item" v-for="(item, index) in info" :key="index">{{item}}</li>
      </ul>
      <p class="hosthome">©2018 pMall.com 北京农学院手机销售有限公司</p>
    </div>
    <div class="p-footer-copyright">
      <div class="p-footer-copyright-container">
        <span class="p-footer-copyright-item">营业执照：913301065526803648</span>
        <b class="p-footer-copyright-border">|</b>
        <span class="p-footer-copyright-item">网络文化经营许可证：京网文（2018）1013-008号</span>
        <b class="p-footer-copyright-border">|</b>
        <span class="p-footer-copyright-item">增值电信业务经营许可证：京A8-20181021</span>
        <b class="p-footer-copyright-border">|</b>
        <span class="p-footer-copyright-item">安全责任书</span>
        <b class="p-footer-copyright-border">|</b>
        <span class="p-footer-copyright-item">京公网安备 88888888888888号</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      helper: [],
      info: []
    }
  },
  methods: {
    _loadHelper() {
      return [
        {
          title: '新手帮助',
          item: ['常见问题', '自助服务', '联系客服', '意见反馈']
        },
        {
          title: '权益保障',
          item: ['全国包邮', '7天无理由退货', '退货运费补贴', '限时发货']
        },
        {
          title: '支付方式',
          item: ['微信支付', '支付宝', '货到付款']
        },
        {
          title: '售后服务',
          item: ['售后政策', '价格保护', '退款说明', '取消订单']
        }
      ]
    },
    _loadInfo() {
      return ['关于我们', '招聘信息', '联系我们', '商家入驻', '商家后台', '商家社区', '规则中心', '有害信息举报']
    }
  },
  filters: {
    helperTitle(value) {
      return `- ${value} -`
    }
  },
  created() {
    this.$nextTick(() => {
      this.helper = this._loadHelper()
      this.info = this._loadInfo()
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.p-footer
  inner()
  /.p-footer-helper
    font-size 0
    border-bottom 2px solid $color-border
    /.p-footer-helper-mod
      display inline-block
      vertical-align top
      width 25%
      height 100px
      /.p-footer-helper-mod-container
        padding-left 20px
        width 78%
        /.p-footer-helper-title
          font-size $font-size-medium
          margin-left 25px
          margin-bottom 10px
          height 25px
          line-height 25px
          color $color-333
          overflow hidden
        /.p-footer-helper-list
          /.p-footer-helper-item
            display inline-block
            width 80px
            height 20px
            line-height 20px
            font-size $font-size-small
            color $color-999
  /.p-footer-info
    margin-top 10px
    /.p-footer-info-list
      font-size 0
      /.p-footer-info-item
        display inline-block
        vertical-align top
        width 80px
        height 20px
        line-height 20px
        font-size $font-size-small
    /.hosthome
      font-size $font-size-small
      color $color-999
  /.p-footer-copyright
    margin-bottom 8px
    line-height 27px
    /.p-footer-copyright-container
      font-size $font-size-small
      color $color-999
      /.p-footer-copyright-border
        margin 0 5px
        font-weight 400
        color $color-999
</style>
