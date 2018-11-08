<template>
  <div class="c-form" v-if="open">
    <div class="mask">
      <div class="c-form-wrap">
        <div class="cfc-title">
          <h3 class="title">{{title}}</h3>
          <i class="el-icon-close" @click.stop="close"></i>
        </div>
        <div class="cfc-content">
          <div class="area cfc-item">
            <span class="label">所在地区</span>
            <div class="item">
              <el-cascader
                expand-trigger="hover"
                :options="areaOpts"
                v-model="selectedArea"
                size="mini">
              </el-cascader>
            </div>
          </div>
          <div class="name cfc-item">
            <span class="label">收货人</span>
            <div class="item">
              <el-input v-model="name" size="mini"></el-input>
            </div>
          </div>
          <div class="address cfc-item">
            <span class="label">详细地址</span>
            <div class="item">
              <el-input v-model="address" size="mini"></el-input>
            </div>
          </div>
          <div class="phone cfc-item">
            <span class="label">手机号码</span>
            <div class="item">
              <el-input v-model="phone" size="mini"></el-input>
            </div>
          </div>
          <div class="cfc-item">
            <span class="label">设为默认地址</span>
            <div class="item">
              <el-switch
                v-model="isDefault"
                active-color="#fcdade">
              </el-switch>
            </div>
          </div>
          <div class="cfc-item">
            <span class="label">&nbsp;</span>
            <div class="item">
              <a href="javascript:;" class="btn" @click="saveAddress">保存收货人信息</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import area from '../../common/js/area.js'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增收货人信息'
    },
    consigneeForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      areaOpts: area,
      selectedArea: [],
      name: '',
      address: '',
      phone: '',
      isDefault: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    saveAddress() {
      if (this.selectedArea.length && this.name && this.address && this.phone) {
        let address = this.selectedArea.join('-') + '-' + this.address
        let consignee = {
          address,
          name: this.name,
          phone: this.phone,
          isDefault: this.isDefault
        }
        this.$emit('save', consignee)
      } else {
        this.$notify({
          title: '请填写完整的收货人信息',
          message: '',
          type: 'warning'
        })
      }
    },
    _initForm() {
      if (this.consigneeForm.address) {
        let tempAddress = this.consigneeForm.address.split('-')
        this.selectedArea = tempAddress.slice(0, 2)
        this.address = tempAddress[2]
      } else {
        this.selectedArea = []
        this.address = ''
      }
      this.name = this.consigneeForm.name || ''
      this.phone = this.consigneeForm.phone || ''
      this.isDefault = this.consigneeForm.isDefault || false
    }
  },
  watch: {
    consigneeForm() {
      this._initForm()
    }
  },
  created() {
    this._initForm()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'

.c-form
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  .mask
    display flex
    justify-content center
    align-items center
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0, 0, 0, .15)
    z-index 1000
    /.c-form-wrap
      width 500px
      background #fff
      .cfc-title
        position relative
        padding 0 10px
        height 31px
        line-height 31px
        font-size $font-size-medium
        background #f3f3f3
        .el-icon-close
          position absolute
          top 5px
          right 10px
          font-size $font-size-large-medium
          cursor pointer
      .cfc-content
        padding 10px
        font-size 0
        .cfc-item
          margin-bottom 10px
          .label, .item
            display inline-block
            vertical-align middle
          .label
            padding 10px
            width 80px
            font-size $font-size-small
          .item
            width 200px
            .btn
              display inline-block
              padding 0 15px
              height 25px
              line-height 25px
              font-size $font-size-small
              color #fff
              background #e74649
              background-image linear-gradient(to top,#e74649 0,#df3134 100%)
              font-weight 400
              border-radius 3px
              cursor pointer
</style>
