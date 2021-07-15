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
      <el-step :title="$t('PRODUCTLIST.COINFORMATION')"></el-step>
      <el-step :title="$t('PRODUCTLIST.INPRODUCTS')"></el-step>
    </el-steps>

    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
    >
    </product-info-detail>
    <product-attr-detail
      style="width:100%"
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    >
    </product-attr-detail>
  </el-card>
</template>
<script>
import ProductInfoDetail from "./ProductInfoDetail";
import ProductAttrDetail from "./ProductAttrDetail";
import ProductRelationDetail from "./ProductRelationDetail";
import { getProduct, createProduct } from "@/api/productadd";
import { getgoodsinfo } from "@/api/productList";
import i18n from "element-ui/lib/locale";
const defaultProductParam = {
  prdbrand: [],
  pricefactory: "",
  storeid: 0,
  freighttmpid: "",
  prdattrcatid: null,
  prdname: "",
  prdimg: "",
  prdsn: "",
  id: "",
  deletesstatus: "0",
  // 价格币种
  currency: "",
  publishstatus: "1",
  newstatus: "0",
  recommandstatus: "0",
  examstatus: "0",
  sort: 0,
  countsale: 0,
  countcollections: 0,
  subname: "",
  descs: "",
  previewstatus: "",
  serviceids: [],
  keywords: "",
  note: "",
  prdalbumvideo: "",
  prdalbumimgs: "",
  deliveryplace: [],
  detailtitle: "",
  detaildesc: "",
  detailhtml: "",
  prdbrandname: "",
  prdcatname: "",
  promotiontype: "",
  skulist: [],
  attrlsit: [],
  catid: "",
  prdcatid: "",
  selPrdCatId: [],
};
export default {
  name: "ProductDetail",
  components: {
    ProductInfoDetail,
    ProductAttrDetail,
    ProductRelationDetail,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prdalbumimgs: [],
      active: 0,
      productParam: Object.assign({}, defaultProductParam),
      showStatus: [true, false],
    };
  },
  created() {
    console.log(this.isEdit);
    if (this.isEdit && this.$route.query.id) {
      console.log(this.isEdit);
      getProduct(this.$route.query.id).then((response) => {
        this.productParam = response.goodsInfo;
        this.productParam["andshows"] = false;
        this.productParam["andshow"] = false;
        if (response.goodsInfo.detailhtml.substr(0, 4) == "http") {
          this.productParam["andshow"] = true;
          var arrlist = response.goodsInfo.detailhtml.split(",");
          console.log(arrlist);
          this.productParam["arrlist"] = arrlist;
        } else {
          this.productParam["andshows"] = true;
        }

        this.productParam.prdattrcatid = parseInt(
          response.goodsInfo.prdattrcatid
        );
        let selPrdCatId = [];
        selPrdCatId.push(response.goodsInfo.prdcatid);
        selPrdCatId.push(response.goodsInfo.catid);
        this.productParam.selPrdCatId = selPrdCatId;
        console.log(this.productParam);
      });
    } else {
      this.productParam["andshows"] = true;
    }
    let prdid = this.$route.query.id;
    if (this.isEdit && this.$route.query.id) {
      getgoodsinfo(prdid).then((res) => {
        console.log(res);
        this.prdalbumimgs = res.goodsInfo.prdalbumimgs;
        localStorage.setItem("albumimg", JSON.stringify(this.prdalbumimgs));
      });
    }
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    // 编辑 添加商品
    finishCommit(isEdit) {
      console.log(isEdit);
      console.log(this.productParam);
      const prdid = this.$route.query.id;
      const storeid = localStorage.getItem("storeid");
      const userid = localStorage.getItem("userid");
      const albumimg = localStorage.getItem("albumimg");
      let obj = {};
      // 商品图  list
      obj["prdimg"] = this.productParam.prdimg;
      // 视频
      obj["prdalbumvideo"] = this.productParam.prdalbumvideo;
      // 推荐
      obj["recommandstatus"] = this.productParam.recommandstatus;
      // 发货地区号
      let areaCode = [];
      if (this.productParam.deliveryplace) {
        this.productParam.deliveryplace.forEach((item) => {
          console.log(item);
          areaCode.push(item);
        });
      }
      areaCode = areaCode.join(",");
      obj["deliveryplace"] = areaCode;
      // 服务保证
      // obj["serviceids"] = JSON.parse(
      //   JSON.stringify(this.productParam.serviceids)
      // );
      // 详细页标题
      obj["detailtitle"] = this.productParam.detailtitle;
      // 详细页描述
      // obj["detaildesc"] = this.productParam.detaildesc;
      // 商品备注
      obj["note"] = this.productParam.note;
      obj["detailhtml"] = this.productParam.detailhtml;
      obj["stocklist"] = this.productParam.skulist;
      obj["userid"] = userid;
      obj["storeid"] = storeid;
      // 币种
      obj["currency"] = this.productParam.currency;
      // 品牌id
      obj["prdbrand"] = this.productParam.prdbrand[2];
      // 商品介绍
      obj["descs"] = this.productParam.descs;
      // 排序
      obj["sort"] = this.productParam.sort;
      // 商品名字
      obj["prdname"] = this.productParam.prdname;

      // 商品分类二级id
      obj["catid"] = this.productParam.selPrdCatId[1];

      // 商品分类一级id
      obj["prdcatid"] = this.productParam.selPrdCatId[0];

      // 商品属性分类id
      obj["prdattrcatid"] = this.productParam.prdattrcatid;
      // 商品货号
      obj["prdsn"] = this.productParam.prdsn;
      // 是否上架
      obj["publishstatus"] = this.productParam.publishstatus;
      // 是否为新品
      obj["newstatus"] = this.productParam.newstatus;
      // 促销价格
      // obj["pricepromotion"] = this.productParam.skulist[0].price;
      // 副标题
      obj["subname"] = this.productParam.subname;
      // 关键词
      obj["keywords"] = this.productParam.keywords;
      // 商品类型名称
      obj["prdcatname"] = this.productParam.prdcatname;
      // 商品品牌名称
      obj["prdbrandname"] = this.productParam.prdbrandname;
      obj["freighttmpid"] = this.productParam.freighttmpid;
      console.log(obj);
      this.$confirm(i18n.t("SEARCHING.SUBMITTHE"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        if (prdid) {
          // 编辑 修改
          console.log("编辑");
          obj["prdid"] = prdid;
          let value = [];
          if (albumimg) {
            JSON.parse(albumimg).forEach((item, index) => {
              value.push({
                url: item.url,
                albumid: String(this.prdalbumimgs[index].albumid),
              });
            });
          }
          obj["albumimg"] = value;
          console.log(obj);
          // 编辑商品
          createProduct(obj).then((response) => {
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.SUBMISSION"),
              duration: 1000,
            });
            this.$router.push({ path: "/commodity/list" });
          });
        } else {
          // 商品相册图
          if (albumimg) {
            obj["albumimg"] = JSON.parse(albumimg);
          }
          console.log(obj);
          // 添加商品
          createProduct(obj).then((response) => {
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.SUBMISSION"),
              duration: 1000,
            });
            this.$router.push({ path: "/commodity/list" });
          });
        }
      });
    },
  },
};
</script>
<style>
.form-container {
  width: 1000px;
  margin: 0 auto;
}
</style>


