<template>
  <div class="app-container">
    <!-- 头部 -->
    <div class="header">
      <!-- 上 -->
      <div class="header-top">
        <img
          class="left-arrows"
          src="../../../assets/images/left-j.png"
        >
        <div class="ipt">
          <img src="../../../assets/images/sercer.png">
          <p class="susp">{{$t('SEARCHING.SEARCHGOOD')}}</p>
        </div>
        <img
          class="trolley"
          src="../../../assets/images/shop.png"
        >
      </div>
      <!-- 中 -->
      <div class="header-middle">
        <img
          class="acats"
          :src="shopdetail.storelogo"
        >
        <div class="middle-name">
          <p class="m-shang">{{shopdetail.storename}}</p>
          <div class="m-zhong">
            <div class="score">
              <img
                v-for="item in shopdetail.stars"
                :key="item"
                src="../../../assets/images/xing.png"
              >
            </div>
            <p class="xiaoli">{{$t('PRODUCTLIST.SALES')}}<span>{{shopdetail.countsale}}</span></p>
          </div>
        </div>
        <div class="shouca"><img src="../../../assets/images/collect.png"> <span>{{$t('STOREDE.ENSHRINE')}}</span></div>
      </div>
      <!-- 下 nav -->
      <div class="header-bottom">
        <ul class="nav-list">
          <li>
            <span style="color:#4CB7A5">{{$t('PRODUCTLIST.RECOMMEND')}}</span>
          </li>
          <li>
            <span>{{$t('STOREDE.SELLER')}}</span>
          </li>
          <li>
            <span>{{$t('STOREDE.ACTIVITY')}}</span>
          </li>
          <li>
            <span>{{$t('STOREDE.UPDATE')}}</span>
          </li>
        </ul>
        <img
          class="foldicImg"
          src="../../../assets/images/foldic.png"
        >
      </div>
    </div>
    <!-- 轮播图 -->
    <div
      class="swiper across"
      @click="swiperHeadld"
      :class="swiper ? 'active' : 'across'"
    >
      <el-carousel
        :interval="5000"
        arrow="never"
        height="356px"
        indicator-position="none"
      >
        <el-carousel-item
          v-for="item in Banners"
          :key="item.id"
        >
          <img
            :src="item.bannerimg"
            style="width:100%;height:100%"
          >
        </el-carousel-item>
      </el-carousel>
      <!-- 右侧显示修改操作 -->
      <div
        class="swiper-show"
        v-show="swiper"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item
            :label="$t('SEARCHING.ADDIMAGE')"
            required
            style="margin:0"
          >
            <p style="font-size:12px;color:#999">{{$t('SEARCHING.ADDUPSTO')}}</p>
          </el-form-item>
          <div class="banner-img">
            <ul class="banner-img-list">
              <li
                @click="bannliHeadle(item)"
                v-for="item in Banners"
                :key="item.id"
              >
                <!-- 点击图片上传 -->
                <div class="up-load">
                  <input
                    v-show="!item.img"
                    class="up-ipt"
                    ref="modelInput"
                    type="file"
                    @change="uploadTeach($event)"
                    accept="image/jpeg,image/png,image/jpg"
                  />
                  <img
                    class="up-img"
                    :src="item.bannerimg"
                  >
                </div>
              </li>
              <li>
                <div
                  class="up-load"
                  @click="addHeadleg('')"
                >
                  <span class="add-upload">{{$t('SEARCHING.ADDIMAGE')}}</span>
                  <input
                    class="up-ipt"
                    ref="modelInput"
                    type="file"
                    style="display:none"
                    @change="uploadTeach($event)"
                    accept="image/jpeg,image/png,image/jpg"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div
            class="up-xqtu"
            v-show="xianshicl"
          >
            <div class="up-xqtu-box">
              <div class="up-load">

                <span class="addouup">{{bannerisup==false ? $t('SEARCHING.ALTERPICTURE') : $t('SEARCHING.ADDIMAGE')}}</span>
                <input
                  class="up-ipt"
                  ref="modelInput"
                  type="file"
                  @change="uploadTeach($event)"
                  accept="image/jpeg,image/png,image/jpg"
                />
              </div>
              <img
                class="xiugail"
                v-show="baimgs"
                :src="StoreImage ? StoreImage: baimg"
              >
              <img
                class="caddbaimgs"
                v-show="addbaimgs"
                :src="StoreImage"
              >
            </div>
            <!-- 跳转类型 -->
            <el-form-item
              :label="$t('STOREDE.JUMP')"
              required
            >
              <el-select
                v-model="form.objurl"
                :placeholder="$t('STOREDE.JUMP')"
                @change="changeHendle"
              >
                <el-option
                  v-for="item in linkslist"
                  :key="item.objid"
                  :label="item.objname"
                  :value="item.objurl"
                ></el-option>
              </el-select>
              <!-- 第二层选择器 -->
              <el-input
                v-show="selsecloqw"
                :placeholder="$t('SEARCHING.NTERCONTENT')"
                v-model="form.objurl"
                :disabled="true"
              >
              </el-input>
              <el-select
                @change="sacasasvsavl"
                v-show="selseclo"
                v-model="form.id"
                :placeholder="$t('SEARCHING.PRODUCTNAME')"
              >
                <el-option
                  v-for="item in goodslist"
                  :key="item.id"
                  :label="item.prdname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-button
            v-show="xianshicl"
            @click=bannerHendle()
            size="mini"
            type="primary"
            style="padding:12px 20px;margin-left:250px;margin-top:30px"
          >{{$t('SEARCHING.AFSFIRM')}}</el-button>
        </el-form>
      </div>
    </div>
    <!-- 热卖榜 -->
    <div
      class="sale across"
      @click="saleHeadld"
      :class="sale ? 'active' : 'across'"
    >
      <div class="sale-top">
        <span class="rmbang">{{$t('STOREDE.SELLING')}}</span>
        <p class="paiahng">
          <span
            class="sisters"
            style="margin-right:22px"
          >{{$t('STOREDE.PRODUCTS')}}</span>
          <span>{{$t('STOREDE.COLLECTION')}}</span>
        </p>
      </div>
      <ul class="sale-list">
        <li
          v-for="item in Hots"
          :key="item.prdid"
        >
          <img :src="item.data">
          <p class="sale-name">{{item.prdname}}</p>
          <p class="sale-volume">{{item.countsale || 0}} {{$t('PRODUCTLIST.SALES')}}</p>
        </li>
      </ul>
      <!-- 右侧显示修改操作 -->
      <div
        class="sale-show"
        v-show="sale"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
        >
          <el-form-item
            :label="$t('STOREDE.CONFIGURATION')"
            required
            style="margin:0"
          >
            <p style="font-size:12px;color:#999">{{$t('SEARCHING.ADDUPSTO')}}</p>
          </el-form-item>
          <div class="sale-img">
            <ul
              class="sale-img-list"
              style="list-style:none"
            >
              <li
                @click="bannliHeadles(item)"
                v-for="item in Hots"
                :key="item.id"
              >
                <img
                  class="shup-img"
                  :src="item.data"
                >
              </li>
              <li>
                <div
                  class="up-load"
                  @click="addHeadlegs('')"
                >
                  <span class="add-upload">{{$t('SEARCHING.ADDIMAGE')}}</span>
                  <input
                    class="up-ipt"
                    ref="modelInput"
                    type="file"
                    style="display:none"
                    @change="uploadTeach($event)"
                    accept="image/jpeg,image/png,image/jpg"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div
            class="up-xqtu"
            v-show="xianshicls"
          >
            <div class="up-xqtu-box">
              <div class="up-load">

                <span class="addouup">{{sellingup == false ? $t('SEARCHING.ALTERPICTURE') : $t('SEARCHING.ADDIMAGE')}}</span>
                <input
                  class="up-ipt"
                  ref="modelInput"
                  type="file"
                  @change="uploadTeach($event)"
                  accept="image/jpeg,image/png,image/jpg"
                />
              </div>
              <img
                class="xiugail"
                v-show="baimgss"
                :src="StoreImage ? StoreImage: baimgx"
              >
              <img
                class="caddbaimgs"
                v-show="addbaimgs"
                :src="StoreImage"
              >
            </div>
            <el-form-item
              :label="$t('STOREDE.JUMP')"
              required
              label-width="90px"
            >
              <el-select
                v-model="form.id"
                @change="sacasasvsavl"
                :placeholder="$t('SEARCHING.PRODUCTNAME')"
              >
                <el-option
                  v-for="(item,index) in goodslist"
                  :key="index"
                  :label="item.prdname"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-input
                style="margin-top:10px"
                :placeholder="$t('SEARCHING.ENTERYOURRAN')"
                v-model="sort"
              >
              </el-input> -->
              <!-- <el-radio-group v-model="status">
                <el-radio label="1">{{$t('FORM.VALID')}}</el-radio>
                <el-radio label="0">{{$t('FORM.INVALID')}}</el-radio>
              </el-radio-group> -->
            </el-form-item>
          </div>
          <el-button
            v-show="xianshicls"
            @click=bannerHendles()
            size="mini"
            type="primary"
            style="padding:12px 20px;margin-left:250px;margin-top:30px"
          >{{$t('SEARCHING.AFSFIRM')}}</el-button>
        </el-form>
      </div>
    </div>
    <!-- 限时特惠
    <div
      class="flashSales across"
      @click="flashSalesHeadld"
      :class="flashSales ? 'active' : 'across'"
    > -->
    <!-- <div class="flashSales-top">
        <img src="../../../assets/images/tehui-left.png">
        <div class="flashSales-headline">
          <p class="flashSales-text">限时特惠</p>
          <div class="countDown">
            08:12:32
          </div>
        </div>
        <img src="../../../assets/images/tehui-right.png">
      </div>
      <ul class="flashSales-list">
        <li
          v-for="item in remai"
          :key="item.id"
        >
          <img :src="item.img">
          <p class="flashSales-name">{{item.name}}</p>
          <p class="flashSales-original">￥{{item.original}}</p>
          <p class="flashSales-ruling">￥{{item.ruling}}</p>
        </li>
      </ul> -->
    <!-- 右侧显示修改操作 -->
    <!-- <div
        class="flashSales-show"
        v-show="flashSales"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item
            label="活动名称"
            required
            style="margin:0"
          >
            <el-input
              style="width:182px;margin:0"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.states">
              <el-radio label="0">默认</el-radio>
              <el-radio label="1">白色</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div> -->
    <!-- </div> -->
    <!-- 最近上新 -->
    <div
      class="RecentlyNew across"
      @click="RecentlyNewHeadld"
      :class="RecentlyNew ? 'active' : 'across'"
    >
      <p class="RecentlyNew-header">{{$t('STOREDE.NEW')}}</p>
      <ul class="RecentlyNew-list">
        <li
          v-for="item in News"
          :key="item.prdid"
        >
          <img :src="item.data">
          <p class="RecentlyNew-name">{{item.prdname}}</p>
          <div class="RecentlyNew-money">
            <span>￥{{item.minprice}} /</span>
            <p>
              <img src="../../../assets/images/u2muney.png">
              <i> {{item.minpricea2u}}</i>
            </p>
          </div>
        </li>
      </ul>
      <!-- 右侧显示修改操作 -->
      <div
        class="RecentlyNew-show"
        v-show="RecentlyNew"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="130px"
        >
          <el-form-item
            :label="$t('STOREDE.CONFIGURATION')"
            required
            style="margin:0"
          >
            <p style="font-size:12px;color:#999">{{$t('SEARCHING.ADDUPSTO')}}</p>
          </el-form-item>
          <div class="sale-img">
            <ul
              class="sale-img-list"
              style="list-style:none"
            >
              <li
                @click="bannliHeadlex(item)"
                v-for="item in News"
                :key="item.prdid"
              >
                <img
                  class="shup-img"
                  :src="item.data"
                >
              </li>
              <li>
                <div
                  class="up-load"
                  @click="addHeadlegx('')"
                >
                  <span class="add-upload">{{$t('SEARCHING.ADDIMAGE')}}</span>
                  <input
                    class="up-ipt"
                    ref="modelInput"
                    type="file"
                    style="display:none"
                    @change="uploadTeach($event)"
                    accept="image/jpeg,image/png,image/jpg"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div
            class="up-xqtu"
            v-show="xianshiclx"
          >
            <div class="up-xqtu-box">
              <div class="up-load">
                <span class="addouup">{{recentlyup==false ?  $t('SEARCHING.ALTERPICTURE') : $t('SEARCHING.ADDIMAGE')}}</span>
                <input
                  class="up-ipt"
                  ref="modelInput"
                  type="file"
                  @change="uploadTeach($event)"
                  accept="image/jpeg,image/png,image/jpg"
                />
              </div>
              <img
                class="xiugail"
                v-show="baimgzx"
                :src="StoreImage ? StoreImage: baimgxx"
              >
              <img
                class="caddbaimgs"
                v-show="addbaimgs"
                :src="StoreImage"
              >
            </div>
            <el-form-item
              :label="$t('STOREDE.JUMP')"
              required
              label-width="90px"
            >
              <el-select
                v-model="form.id"
                @change="sacasasvsavl"
                :placeholder="$t('SEARCHING.PRODUCTNAME')"
              >
                <el-option
                  v-for="item in goodslist"
                  :key="item.id"
                  :label="item.prdname"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-input
                style="margin-top:10px"
                :placeholder="$t('SEARCHING.ENTERYOURRAN')"
                v-model="sort"
              >
              </el-input> -->
              <!-- <el-radio-group v-model="status">
                <el-radio label="1">{{$t('FORM.VALID')}}</el-radio>
                <el-radio label="0">{{$t('FORM.INVALID')}}</el-radio>
              </el-radio-group> -->
            </el-form-item>
          </div>
          <el-button
            v-show="xianshiclx"
            @click=RecentlyNewHendle()
            size="mini"
            type="primary"
            style="padding:12px 20px;margin-left:250px;margin-top:30px"
          >确认</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { inputfile } from "@/api/uploadingImg";
import { fetchList } from "@/api/productList";
import {
  getgoodslist,
  gethomepagelist,
  getshowcaselist,
  loadlinks,
  getbanner,
  submitInfoHomes,
  loadshopdetail,
} from "@/api/decorate";
import i18n from "element-ui/lib/locale";
export default {
  name: "storefitup",
  data() {
    return {
      selsecloqw: false,
      shopdetail: {},
      // 轮播图数据
      Banners: [],
      // 热卖榜
      Hots: [],
      // 收藏数组
      collectionlist: [],
      // 最近上新
      News: [],
      // 接收banner背景图数组
      teachList: [],
      // 跳转类型数组
      linkslist: [],
      // 所有商品
      goodslist: [],
      // 橱窗类型
      caselist: [],
      // 排序
      sort: "",
      // 有没有效
      status: "1",
      objcodno: "",
      selseclo: false,
      bannerli: false,
      swiper: false,
      sale: false,
      flashSales: false,
      RecentlyNew: false,
      baimg: "",
      baimgx: "",
      baimgxx: "",
      objids: "",
      remaiid: "",
      // 添加的时候的id只有添加的时候用得到
      objidx: "",
      objurl: "",
      baimgs: false,
      baimgss: false,
      baimgzx: false,
      addbaimgs: false,
      xianshicl: false,
      xianshicls: false,
      xianshiclx: false,
      imageUrl: "",
      // 修改添加banner图的标识
      bannerisup: true,
      // 修改添加热卖榜的标识
      sellingup: true,
      // 修改添加最近上新的标识
      recentlyup: true,
      // 存放上传过来的图片
      StoreImage: "",
      // 接收objparam
      objparam: {},
      objparams: {},
      form: {
        // 跳转类型绑定数据
        objurl: "",
        // 所有商品绑定
        id: "",
        name: "",
        states: 0,
      },
    };
  },
  created() {
    // // 获取商品列表  如果没有商品  提示让去添加商品
    this.fetchList();
    this.getgoodsList();
    this.gethomepageList();
    this.getshowcaseList();
    this.loadLinks();
    this.loadshopdetail();
  },
  methods: {
    // 获取商品列表  如果没有商品  提示让去添加商品
    fetchList() {
      let obj = {};
      obj["storeid"] = localStorage.getItem("storeid");
      fetchList(obj).then((res) => {
        console.log(res);
        if (res.goodslist.length == 0) {
          this.$alert("目前暂无商品请先去添加商品", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$router.push({ name: "add" });
            },
          });
        }
      });
    },
    // 获取头部信息
    loadshopdetail() {
      let storeid = localStorage.getItem("storeid");
      loadshopdetail(storeid).then((res) => {
        console.log(res);
        this.shopdetail = res.shopdetail;
      });
    },
    // 商品的信息  图片
    sacasasvsavl(value) {
      console.log(value);
      this.getgoodsList();
      this.goodslist.forEach((item) => {
        console.log(item);
        if (value == item.id) {
          console.log(item.prdimg);
          this.StoreImage = item.prdimg;
        }
      });
    },
    // 获取店铺下的商品
    getgoodsList() {
      const storeid = localStorage.getItem("storeid");
      getgoodslist(storeid).then((res) => {
        console.log(res);
        // 获取商品id
        this.goodslist = res.goodslist;
      });
    },
    // 店铺首页 获取所有的数据
    gethomepageList() {
      const storeid = localStorage.getItem("storeid");
      gethomepagelist(storeid).then((res) => {
        console.log(res.Hots, "店铺首页");
        // 轮播图
        this.Banners = res.Banners;
        // 热卖榜
        this.Hots = res.Hots;
        // 收藏数组
        this.collectionlist = res.collectionlist;
        // 最近上新
        this.News = res.News;
        // console.log(this.Banners);
      });
    },
    // 店铺橱窗类型
    getshowcaseList() {
      const storeid = localStorage.getItem("storeid");
      getshowcaselist(storeid).then((res) => {
        console.log(res);
        this.caselist = res.caselist;
      });
    },
    // 获取跳转路径列表
    loadLinks() {
      loadlinks().then((res) => {
        console.log(res);
        this.linkslist = res.linkslist;
        this.linkslist = [];
        res.linkslist.forEach((item) => {
          console.log(item);
          if (item.objcodno == "GOODDETAIL") {
            this.linkslist.push(item);
          }
        });
        this.objurl = "/GoodsDetailSpecid";
        this.objcodno = "GOODDETAIL";
      });
    },
    // 编辑添加banner图
    bannerHendle() {
      let obj = {};
      const storeid = localStorage.getItem("storeid");
      obj["storeid"] = storeid;
      obj["objurl"] = this.form.objurl;
      let objparams = {};
      objparams["prdid"] = this.form.id;
      obj["objparam"] = JSON.stringify(objparams);
      console.log(objparams);
      if (this.bannerisup == false) {
        this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            // 修改
            // 商品id
            obj["id"] = this.objids;
            if (this.StoreImage) {
              obj["bannerimg"] = this.StoreImage;
            } else {
              obj["bannerimg"] = this.baimg;
            }
            console.log(obj, "修改");
            getbanner(obj).then((res) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.SUCCESSFULLY"),
              });
              this.gethomepageList();
              this.$forceUpdate();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("ROLLOVERS.XIUGAI"),
            });
          });
      } else {
        this.$confirm(i18n.t("ROLLOVERS.ADDS"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            obj["bannerimg"] = this.StoreImage;
            console.log(obj, "添加");
            // 添加
            getbanner(obj).then((res) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.ADDED"),
              });
              this.gethomepageList();
              this.$forceUpdate();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("ROLLOVERS.XIUGAI"),
            });
          });
      }
    },
    // 编辑添加 热卖榜信息
    bannerHendles() {
      const storeid = localStorage.getItem("storeid");
      const userid = localStorage.getItem("userid");
      let obj = {};
      let objparams = {};
      objparams["prdid"] = this.form.id;
      obj["objparam"] = JSON.stringify(objparams);
      obj["storeid"] = storeid;
      obj["userid"] = userid;
      obj["objcodno"] = "GOODDETAIL";
      obj["objurl"] = "/GoodsDetailSpecid";
      obj["casetype"] = this.caselist[1].casetype;
      obj["caseid"] = this.caselist[1].id;
      obj["status"] = "1";
      console.log(obj);
      if (this.sellingup == false) {
        this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            // 商品id
            obj["id"] = this.remaiid;
            if (this.StoreImage) {
              obj["data"] = this.StoreImage;
            } else {
              obj["data"] = this.baimgx;
            }
            console.log(obj, "修改");
            // 调修改接口
            submitInfoHomes(obj).then((res) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.SUCCESSFULLY"),
              });
              this.gethomepageList();
              this.$forceUpdate();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("ROLLOVERS.XIUGAI"),
            });
          });
      } else {
        this.$confirm(i18n.t("ROLLOVERS.ADDS"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            obj["data"] = this.StoreImage;
            console.log(obj, "添加");
            // 调修改接口
            submitInfoHomes(obj).then((res) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.ADDED"),
              });
              this.gethomepageList();
              this.$forceUpdate();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("FORMHEAD.CANCELED"),
            });
          });
      }
    },
    // 编辑添加 最近上新
    RecentlyNewHendle() {
      const storeid = localStorage.getItem("storeid");
      const userid = localStorage.getItem("userid");
      let obj = {};
      obj["storeid"] = storeid;
      obj["userid"] = userid;
      obj["objcodno"] = "GOODDETAIL";
      obj["objurl"] = "/GoodsDetailSpecid";
      let objparams = {};
      objparams["prdid"] = this.form.id;
      obj["objparam"] = JSON.stringify(objparams);
      obj["casetype"] = this.caselist[2].casetype;
      obj["caseid"] = this.caselist[2].id;
      obj["sort"] = this.sort;
      obj["status"] = this.status;
      console.log(obj);
      if (this.recentlyup == false) {
        console.log("true", "修改");
        this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            // 商品id
            obj["id"] = this.objidx;
            if (this.StoreImage) {
              obj["data"] = this.StoreImage;
            } else {
              obj["data"] = this.baimgx;
            }
            // 调修改接口
            submitInfoHomes(obj).then((res) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.SUCCESSFULLY"),
              });
              this.gethomepageList();
              this.$forceUpdate();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("ROLLOVERS.XIUGAI"),
            });
          });
      } else {
        console.log("false", "添加");
        this.$confirm(i18n.t("ROLLOVERS.ADDS"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            obj["data"] = this.StoreImage;
            console.log(obj);
            // 调修改接口
            submitInfoHomes(obj).then((res) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.ADDED"),
              });
              this.gethomepageList();
              this.$forceUpdate();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("FORMHEAD.CANCELED"),
            });
          });
      }
    },
    // 点击选中改变banner图 编辑操作预备
    bannliHeadle(item) {
      console.log(item);
      // 编辑显示
      this.selseclo = true;
      this.StoreImage = "";
      this.xianshicl = true;
      this.bannerisup = false;
      this.baimg = item.bannerimg;
      this.baimgs = true;
      this.objids = item.id;
      this.addbaimgs = false;
      this.form.objurl = item.objurl;
      this.form.id = JSON.parse(item.objparam).prdid;
    },
    // 点击选中改变热卖图 编辑操作预备
    bannliHeadles(item) {
      console.log(item);
      this.StoreImage = "";
      this.xianshicls = true;
      this.sellingup = false;
      this.baimgx = item.data;
      this.baimgss = true;
      this.objids = item.id;
      this.addbaimgs = false;
      this.objurl = item.objurl;
      this.remaiid = item.id;
      this.form.id = JSON.parse(item.objparam).prdid;
      this.status = item.status;
    },
    // 最近上新   编辑操作预备
    bannliHeadlex(item) {
      console.log(item);
      this.StoreImage = "";
      this.xianshiclx = true;
      this.recentlyup = false;
      this.baimgxx = item.data;
      this.baimgzx = true;
      this.objidx = item.id;
      this.objurl = item.objurl;
      this.addbaimgs = false;
      this.form.id = JSON.parse(item.objparam).prdid;
      this.sort = item.sort;
      this.status = item.status;
    },
    // 点击添加banner图
    addHeadleg() {
      console.log("ascas");
      this.StoreImage = "";
      this.bannerisup = true;
      this.form.id = "";
      this.xianshicl = true;
      this.baimgs = true;
      this.selseclo = false;
      this.baimg = "";
      this.form.objurl = "";
    },
    // 点击添加热卖图
    addHeadlegs() {
      console.log("点击添加热卖图");
      this.StoreImage = "";
      this.sellingup = true;
      this.xianshicls = true;
      this.form.id = "";
      this.baimgx = "";
      this.objids = "";
      this.objurl = "";
      this.remaiid = "";
      this.baimgss = true;
    },
    // 点击添加最近上新图
    addHeadlegx() {
      this.StoreImage = "";
      this.xianshiclx = true;
      this.recentlyup = true;
      this.baimgxx = "";
      this.objidx = "";
      this.objurl = "";
      this.form.id = "";
      this.baimgzx = true;
    },
    // 点击轮播图右侧显示修改
    swiperHeadld() {
      this.swiper = true;
      this.sale = false;
      this.flashSales = false;
      this.RecentlyNew = false;
    },
    // 点击热卖榜右侧显示修改
    saleHeadld() {
      this.sale = true;
      this.swiper = false;
      this.flashSales = false;
      this.RecentlyNew = false;
    },
    // 限时特惠
    flashSalesHeadld() {
      this.flashSales = true;
      this.swiper = false;
      this.sale = false;
      this.RecentlyNew = false;
    },
    // 最近上新
    RecentlyNewHeadld() {
      this.RecentlyNew = true;
      this.flashSales = false;
      this.swiper = false;
      this.sale = false;
    },
    //  跳转类型
    changeHendle(item) {
      console.log(item);
      this.selseclo = true;
    },
    // 上传图片
    uploadTeach(event) {
      console.log(event);
      console.log("ascas");
      let modelName = event.target.files[0].name;
      let limiteFileType = ["png", "jpeg", "jpg"];
      if (
        !limiteFileType.includes(
          modelName.split(".")[modelName.split(".").length - 1].toLowerCase()
        )
      ) {
        this.$message.warning("文件格式错误！");
        return;
      }
      this.teachList.push(modelName);
      this.teachName = modelName;
      this.teach = event.target.files[0];
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      inputfile(formData).then((res) => {
        console.log(res);
        this.StoreImage = res.picture;
        this.addbaimgs = true;
      });
    },
  },
};
</script>
<style scoped>
body,
html {
  color: #333;
  width: 100%;
  background-color: #f3f3f3;
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
}
img {
  display: block;
}
.app-container {
  margin: 0;
  margin: 50px 0 0 100px;
  width: 375px;
}
/* 头部 */
.header {
  width: 375px;
  background-color: #5b5b5b;
}
/* 划过每个范围区域出现边框 */
.across {
  border: 2px solid transparent;
  box-sizing: border-box;
}
.across:hover {
  box-sizing: border-box;
  border: 2px solid #409eff;
  border-right: 2px dashed #409eff;
  border-left: 2px dashed #409eff;
}
/* 点击每个范围区域出现边框 */
.border-1 {
  border: 2px solid #409eff;
}
/* 点击边框常亮 */
.across.active {
  border: 2px dashed #409eff;
}
/* 头部输入框部分 */
.header > .header-top {
  display: flex;
}
.header > .header-top > .ipt {
  display: flex;
  align-items: center;
  width: 279px;
  height: 32px;
  background-color: white;
  margin-top: 24px;
  border-radius: 8px;
}
.header > .header-top > .ipt > img {
  width: 15px;
  height: 15px;
  margin-left: 20px;
}
.header > .header-top > .ipt > .susp {
  font-size: 13px;
  color: #96a0b1;
  margin-left: 13px;
}
.header > .header-top > .left-arrows {
  width: 12px;
  height: 19px;
  margin: 31px 13px 0 13px;
}
.header > .header-top > .trolley {
  width: 30px;
  height: 30px;
  margin: 25px 13px 0 14px;
}
/* 头部店铺信息部分 */
.header > .header-middle {
  display: flex;
  margin-top: 9px;
}
.header > .header-middle > .acats {
  width: 37px;
  height: 37px;
  margin: 0 8px 0 13px;
}
.header > .header-middle > .middle-name > .m-shang {
  font-size: 16px;
  line-height: 23px;
  color: #ffffff;
}
.header > .header-middle > .middle-name > .m-zhong {
  display: flex;
  align-items: center;
}
.header > .header-middle > .middle-name > .m-zhong > .xiaoli {
  font-size: 10px;
  color: #ffffff;
  margin-left: 7px;
}
.header > .header-middle > .middle-name > .m-zhong > .xiaoli > span {
  margin-left: 4px;
}
.header > .header-middle > .middle-name > .m-zhong > .score {
  display: flex;
  width: 64px;
  height: 13px;
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 7px;
  align-items: center;
  /* justify-content: space-around; */
}
.header > .header-middle > .middle-name > .m-zhong > .score > img {
  width: 9px;
  height: 9px;
}
.header > .header-middle > .shouca {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 13px;
  width: 56px;
  height: 26px;
  border-radius: 12px;
  background: linear-gradient(284deg, #ff6951 0%, #ff3c3b 100%);
}
.header > .header-middle > .shouca > img {
  width: 14px;
  height: 14px;
  display: block;
  margin-left: 7px;
}
.header > .header-middle > .shouca > span {
  font-size: 11px;
  color: #fff;
  margin-left: 3px;
}
/* 头部导航栏部分 */
.header > .header-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 0 8px 0;
}
.header > .header-bottom > .nav-list {
  display: flex;
  list-style: none;
  margin-left: 23px;
}
.header > .header-bottom > .nav-list > li {
  margin-right: 45px;
}
.header > .header-bottom > .nav-list > li > span {
  font-size: 15px;
  color: #fff;
}
.header > .header-bottom > .foldicImg {
  width: 14px;
  height: 14px;
  margin-right: 14px;
}
/* swiper轮播图 */
.swiper {
  position: relative;
  width: 375px;
  height: 360px;
  margin-top: 5px;
  /* background-color: #ff3c3b; */
}
/* 右边修改 */
.swiper-show {
  position: absolute;
  padding: 20px;
  z-index: 2;
  top: 0;
  left: 400px;
  background-color: #f3f3f3;
  width: 380px;
}
.swiper-show::before {
  content: "";
  display: block;
  transform: rotate(45deg);
  position: absolute;
  z-index: 1;
  top: 30px;
  left: -6px;
  width: 12px;
  height: 12px;
  background-color: #f3f3f3;
}
.swiper-show .banner-img {
  overflow: hidden;
}
.swiper-show .banner-img > .banner-img-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.swiper-show .banner-img > .banner-img-list > li {
  list-style: none;
  border: 1px solid transparent;
  margin-right: 10px;
  margin-top: 2px;
}

.swiper-show .banner-img > .banner-img-list > li:nth-of-type(4n) {
  margin-right: 0;
}
.swiper-show .banner-img > .banner-img-list > li > img {
  width: 74px;
  height: 80px;
}
/* 上传图片的格式 */
.up-load {
  width: 74px;
  height: 80px;
  border: 1px dashed #666;
  position: relative;
}
.up-load > .add-upload {
  position: absolute;
  top: 50%;
  margin-top: -8px;
  left: 5px;
  color: #ff004c;
}
.up-load::before {
  content: "+";
  display: block;
  position: absolute;
  color: #999;
  top: 17px;
  left: 50%;
  margin-left: -12px;
  font-size: 40px;
}
.up-ipt {
  position: absolute;
  top: -2px;
  left: -2px;
  z-index: 1;
  display: block;
  width: 78px;
  height: 82px;
  opacity: 0;
  line-height: 900px;
  overflow: hidden;
}
.up-img {
  width: 74px;
  height: 80px;
  position: absolute;
  z-index: 20;
  border: 1px solid transparent;
  top: -1px;
  left: -1px;
}
.up-img:hover {
  border: 1px solid #999;
}

/* 更换图片 */
.up-xqtu {
  margin-top: 20px;
  border: 1px dashed #666;
  padding: 20px;
  display: flex;
  background-color: #ffffff;
}
.up-xqtu-box {
  position: relative;
  width: 80px;
  height: 80px;
  padding: 2px;
  border: 1px solid #666;
}
.up-xqtu-box > .up-load {
  border: 0;
}
.up-xqtu-box > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 78px;
  height: 78px;
  /* border: 1px solid #666; */
  padding: 2px;
}
.addouup {
  position: absolute;
  z-index: 30;
  color: #fff;
  font-size: 12px;
  line-height: 25px;
  bottom: 3px;
  left: 50%;
  margin-left: -24px;
}
/* 修改图片 */
.up-xqtu-box::before {
  content: "";
  display: block;
  width: 79px;
  position: absolute;
  z-index: 1;
  height: 25px;
  background-color: rgb(0, 0, 0, 0.5);
  bottom: 0px;
  left: 0px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  color: #fff;
}
.caddbaimgs {
  position: absolute;
}
/* 热卖榜 */
.sale {
  background-color: #f2f2f2;
  position: relative;
  box-sizing: border-box;
  width: 375px;
}
.sale > .sale-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 0 10px 13px;
  background-color: #fff;
  margin-bottom: 15px;
}
.sale > .sale-top > .rmbang {
  font-size: 15px;
  color: #333;
  line-height: 1;
}
.sale > .sale-top > .paiahng {
  font-size: 13px;
  color: #a3a3ab;
  line-height: 1;
  margin-right: 13px;
}
.sale > .sale-top > .paiahng > .sisters {
  position: relative;
  color: #333;
}
.sale > .sale-top > .paiahng > .sisters::before {
  content: "";
  display: block;
  position: absolute;
  width: 25px;
  left: 50%;
  bottom: -4px;
  margin-left: -12.5px;
  height: 2px;
  background-color: #4cb7a5;
}
/* 下方图片设置 */
.sale > .sale-list {
  display: flex;
  list-style: none;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 15px;
}
.sale > .sale-list > li {
  width: 111px;
  background-color: #fff;
  margin-right: 5px;
}
.sale > .sale-list > li > img {
  display: block;
  width: 111px;
  height: 104px;
}
.sale > .sale-list > li > .sale-name {
  margin: 5px 0 9px 9px;
  font-size: 12px;
  color: #333;
  width: 93px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sale > .sale-list > li > .sale-volume {
  font-size: 11px;
  margin-left: 9px;
  color: #a3a3ab;
  margin-bottom: 15px;
}
/* 热卖榜右边操作修改 */
.sale > .sale-show {
  position: absolute;
  padding: 20px;
  z-index: 2;
  top: 0;
  left: 400px;
  background-color: #f3f3f3;
  width: 380px;
}
.sale > .sale-show::before {
  content: "";
  display: block;
  transform: rotate(45deg);
  position: absolute;
  z-index: 1;
  top: 30px;
  left: -6px;
  width: 12px;
  height: 12px;
  background-color: #f3f3f3;
}
.sale > .sale-show > .sale-img {
  overflow: hidden;
}
.sale-img-list {
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sale-img-list > li {
  position: relative;
  list-style: none;
  border: 1px solid transparent;
  /* margin-right: 5px; */
  margin-top: 2px;
}
.shup-img {
  width: 74px;
  height: 80px;
  border: 1px dashed #666;
}
/* 限时特惠 */
.flashSales {
  position: relative;
  background-color: #f2f2f2;
}
.flashSales > .flashSales-top {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 15px 0;
}
.flashSales > .flashSales-top > img {
  display: block;
  width: 25px;
  height: 8px;
}
.flashSales > .flashSales-top > .flashSales-headline {
  display: flex;
}
.flashSales > .flashSales-top > .flashSales-headline > .flashSales-text {
  color: #333333;
  font-size: 15px;
  margin: 0 8px 0 14px;
}
/* 倒计时 */
.flashSales > .flashSales-top > .flashSales-headline > .countDown {
  font-size: 15px;
  color: #4cb7a5;
  margin-right: 14px;
}
/* 下方商品信息 */
.flashSales > .flashSales-list {
  display: flex;
  width: 375px;
  justify-content: space-around;
  flex-wrap: wrap;
  list-style: none;
  padding: 15px 0;
}
.flashSales > .flashSales-list > li {
  width: 111px;
  background-color: #fff;
}
.flashSales > .flashSales-list > li > img {
  width: 106px;
  height: 94px;
}
.flashSales > .flashSales-list > li > .flashSales-name {
  margin: 5px 0 9px 9px;
  font-size: 12px;
  color: #333;
  width: 93px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flashSales > .flashSales-list > li > .flashSales-original {
  width: 61px;
  height: 14px;
  margin: 0 auto;
  font-size: 11px;
  text-align: center;
  text-decoration: line-through;
  margin-top: 12px;
  color: #ffffff;
  background: url("../../../assets/images/jianbian.png") no-repeat 0 0;
  background-size: 100%, 100%;
}
.flashSales > .flashSales-list > li > .flashSales-ruling {
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  color: #4cb7a5;
}
/* 限时特惠右方设置 */
.flashSales > .flashSales-show {
  position: absolute;
  padding: 20px;
  z-index: 2;
  top: 0;
  left: 400px;
  background-color: #f3f3f3;
  width: 380px;
  height: 113px;
}
.flashSales > .flashSales-show::before {
  content: "";
  display: block;
  transform: rotate(45deg);
  position: absolute;
  z-index: 1;
  top: 30px;
  left: -6px;
  width: 12px;
  height: 12px;
  background-color: #f3f3f3;
}
/* 最近上新 */
.RecentlyNew {
  background-color: #fff;
  position: relative;
  margin-bottom: 400px;
}
.RecentlyNew > .RecentlyNew-header {
  font-size: 15px;
  line-height: 1;
  padding: 15px 0 15px 13px;
  color: #333333;
}
.RecentlyNew > .RecentlyNew-list {
  /* background-color: aqua; */
  display: flex;
  flex-wrap: wrap;
  width: 375px;
  /* justify-content: space-around; */
  list-style: none;
}
.RecentlyNew > .RecentlyNew-list > li {
  width: 172px;
}
.RecentlyNew > .RecentlyNew-list > li:nth-of-type(2n-1) {
  margin-left: 13px;
  margin-right: 6px;
}
.RecentlyNew > .RecentlyNew-list > li > img {
  width: 172px;
  height: 169px;
}
.RecentlyNew > .RecentlyNew-list > li > .RecentlyNew-name {
  font-size: 13px;
  margin: 10px 0;
  color: #333;
  width: 156px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.RecentlyNew > .RecentlyNew-list > li > .RecentlyNew-money {
  display: flex;
}
.RecentlyNew > .RecentlyNew-list > li > .RecentlyNew-money > span {
  font-size: 15px;
  color: #333333;
}
.RecentlyNew > .RecentlyNew-list > li > .RecentlyNew-money > p {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.RecentlyNew > .RecentlyNew-list > li > .RecentlyNew-money > p > i {
  font-size: 15px;
  font-style: normal;
}
.RecentlyNew > .RecentlyNew-list > li > .RecentlyNew-money > p > img {
  width: 12px;
  height: 11px;
}
/* 最近上新右方设置 */
.RecentlyNew > .RecentlyNew-show {
  position: absolute;
  padding: 20px;
  z-index: 2;
  top: 0;
  left: 400px;
  background-color: #f3f3f3;
  width: 380px;
}
.RecentlyNew > .RecentlyNew-show::before {
  content: "";
  display: block;
  transform: rotate(45deg);
  position: absolute;
  z-index: 1;
  top: 30px;
  left: -6px;
  width: 12px;
  height: 12px;
  background-color: #f3f3f3;
}
</style>
