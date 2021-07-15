<template>
  <el-card
    class="form-container"
    shadow="never"
  >
    <el-steps
      :active="active"
      finish-status="success"
      align-center
    >
      <el-step :title="$t('SEARCHING.REGISTERED2U')"></el-step>
      <el-step :title="$t('SEARCHING.INDATA')"></el-step>
      <el-step :title="$t('SEARCHING.SUBMITSTATE')"></el-step>
    </el-steps>

    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
    > </product-info-detail>
    <product-sale-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
    >
    </product-sale-detail>
    <product-attr-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
    >
    </product-attr-detail>
  </el-card>
</template>

<script>
import ProductInfoDetail from "./ProductInfoDetail";
import ProductSaleDetail from "./ProductSaleDetail";
import ProductAttrDetail from "./ProductAttrDetail";
export default {
  name: "ProductDetail",
  components: {
    ProductInfoDetail,
    ProductSaleDetail,
    ProductAttrDetail,
  },
  // 页面传参
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: 0,
      productParam: {},
      showStatus: [true, false, false],
    };
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
  },
};
</script>

<style>
</style>
