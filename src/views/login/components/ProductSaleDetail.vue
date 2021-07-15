
<template>
  <div class="box">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="25%"
    >
      <h3 class="jbxx"><span class="shu">|</span> <span class="tixian">基本信息</span> </h3>

      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <!-- 公司名称 -->
            <el-form-item
              :label="$t('SEARCHING.COMPANYNAME')"
              prop="subjectname"
            >
              <el-input
                :placeholder="$t('SEARCHING.COMPANYNAME')"
                v-model="form.subjectname"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              :label="$t('SEARCHING.NAMESTORE')"
              prop="storename"
              style="width:100%"
            >
              <el-input
                :placeholder="$t('SEARCHING.NAMESTORE')"
                v-model="form.storename"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              prop="creditcode"
              :label="$t('QWSTOR.SOCIAL')"
            >
              <el-input
                v-model="form.creditcode"
                style="width:100%"
                :placeholder="$t('QWSTOR.SOCIAL')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              prop="contactname"
              :label="$t('SEARCHING.CONTACTREN')"
            >
              <el-input
                v-model="form.contactname"
                style="width:100%"
                :placeholder="$t('SEARCHING.CONTACTREN')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              :label="$t('SEARCHING.REPRESENTATIVE')"
              prop="legalname"
            >
              <el-input
                v-model="form.legalname"
                :placeholder="$t('SEARCHING.REPRESENTATIVE')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <!-- 注册资本 -->
            <el-form-item
              :label="$t('QWSTOR.ASSETS')"
              prop="regmoney"
            >
              <el-input
                type="number"
                :placeholder="$t('QWSTOR.ASSETS')"
                v-model.number="form.regmoney"
                style="width:80%"
              ></el-input>
              <span style="width:10%;margin-left:10px;font-size:20px;line-height: 1;">{{$t('FORM.WANYUAN')}}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              prop="foundtime"
              :label="$t('QWSTOR.COMPANY')"
            >
              <el-date-picker
                style="width:100%"
                value-format="yyyy-MM-dd"
                v-model="form.foundtime"
                type="date"
                :placeholder="$t('QWSTOR.COMPANY')"
                @change="handleDateChange"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              prop="term"
              :label="$t('QWSTOR.ALLOTED')"
            >
              <el-input
                :placeholder="$t('QWSTOR.ALLOTED')"
                v-model="form.term"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              prop="postcode"
              :label="$t('ORDERLIST.POSTALCODE')"
            >
              <el-input
                :placeholder="$t('ORDERLIST.POSTALCODE')"
                v-model="form.postcode"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              :label="$t('QWSTOR.PROVINCE')"
              prop="provincename"
            >
              <v-distpicker
                :province="form.provincename"
                :city="form.cityname"
                :area="form.regionname"
                @selected="onSelected"
              ></v-distpicker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              :label="$t('ORDERLIST.COMMODITYIMAGES')"
              style="width:100%"
              prop="address"
            >
              <el-input
                v-model="form.address"
                :placeholder="$t('ORDERLIST.COMMODITYIMAGES')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- 图片上传 -->
      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">

            <el-form-item
              :label="$t('SEARCHING.UPLOADBUSINESS')"
              required
            >
              <!-- 主要-->
              <div class="handleP-flex">
                <div
                  v-show="xianshi0"
                  class="picture-img"
                  :class="xianshi0==true ? 'zhezhaocen' : ''"
                  @mouseenter="enter(1)"
                  @mouseleave="leave(1)"
                >
                  <img
                    class="picture-imgs"
                    :src="dialogImageUrl"
                    v-show="xianshi0"
                  >
                  <img
                    v-show="showImgg"
                    @click="addHeadlegx()"
                    class="amplification"
                    src="../../../assets/images/amplification.png"
                  >
                  <img
                    @click="addHeadleg()"
                    v-show="showImgg"
                    class="deletessdasf"
                    src="../../../assets/images/deletessdasf.png"
                  >
                </div>
                <el-upload
                  action="string"
                  :show-file-list="false"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-upload="beforePicUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <el-dialog
                :visible.sync="dialogVisible"
                append-to-body
              >
                <img
                  width="100%"
                  :src="dialogImageUrl"
                >
              </el-dialog>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item
              :label="$t('SEARCHING.UPLOADTHEX')"
              required
            >
              <!-- 主要-->
              <div class="handleP-flex">
                <div
                  class="picture-img"
                  v-show="xianshi1"
                  :class="xianshi1==true ? 'zhezhaocen' : ''"
                  @mouseenter="enter(2)"
                  @mouseleave="leave(2)"
                >
                  <img
                    class="picture-imgs"
                    :src="dialogImageUrls"
                    v-show="xianshi1"
                  >
                  <img
                    @click="addHeadlegxs()"
                    v-show="showImggs"
                    class="amplification"
                    src="../../../assets/images/amplification.png"
                  >
                  <img
                    @click="addHeadlegs()"
                    v-show="showImggs"
                    class="deletessdasf"
                    src="../../../assets/images/deletessdasf.png"
                  >
                </div>
                <el-upload
                  action="string"
                  :show-file-list="false"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-upload="beforePicUploads"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <el-dialog
                append-to-body
                :visible.sync="dialogVisibles"
              >
                <img
                  class="sober"
                  :src="dialogImageUrls"
                >
              </el-dialog>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- 提现账户 -->
      <h3 class="jbxx"><span class="shu">|</span> <span class="tixian">{{$t('SEARCHING.CASHACCOUNT')}}</span> <span class="jinggao">{{$t('SEARCHING.BEMODIFIED')}}</span> </h3>
      <el-row :gutter="2">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.MALLMANAGER')"
            >
              <el-input
                :placeholder="$t('SEARCHING.MALLMANAGER')"
                v-model="form.walletaccounts.accountname"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.OFALIPAY')"
              label-width="30%"
            >
              <el-input
                type="number"
                v-model.number="form.walletaccounts.accountnum"
                :placeholder="$t('SEARCHING.OFALIPAY')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.ACCOUNTTHAT')"
            >
              <el-input
                v-model="form.walletaccounts.accountnote"
                :placeholder="$t('SEARCHING.ACCOUNTTHAT')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <!-- 银行收款人姓名 -->
            <el-form-item
              required
              label-width="30%"
              :label="$t('SEARCHING.BANKPAYEE')"
            >
              <el-input
                :placeholder="$t('SEARCHING.BANKPAYEE')"
                v-model="form.walletaccounts1.accountname"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.BANKCARD')"
            >
              <el-input
                type="number"
                v-model.number="form.walletaccounts1.accountnum"
                :placeholder="$t('SEARCHING.BANKCARD')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <!-- 账户说明 -->
            <el-form-item
              required
              :label="$t('SEARCHING.ACCOUNTTHAT')"
            >
              <el-input
                v-model="form.walletaccounts1.accountnote"
                :placeholder="$t('SEARCHING.ACCOUNTTHAT')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- 联系人信息 -->
      <h3 class="jbxx"><span class="shu">|</span> <span class="tixian">联系人信息</span></h3>
      <el-row :gutter="5">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              label-width="143px"
              required
              :label="$t('SEARCHING.MALLMANAGER')"
            >
              <el-input
                style="width:90%"
                v-model="form.contacts.name"
                :placeholder="$t('SEARCHING.MALLMANAGER')"
              ></el-input>
              <el-button
                style="width:10%"
                type="text"
                @click="sameHeadle()"
              >{{$t('SEARCHING.SKUPRICES')}}</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.CONTACTNUMBER')"
            >
              <el-input
                type="number"
                v-model.number="form.contacts.phone"
                :placeholder="$t('SEARCHING.CONTACTNUMBER')"
              ></el-input>

            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.MAILBOX')"
            >
              <el-input
                v-model="form.contacts.email"
                :placeholder="$t('SEARCHING.MAILBOX')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              label-width="30%"
              required
              :label="$t('SEARCHING.LEADER')"
            >
              <el-input
                v-model="form.contacts1.name"
                :placeholder="$t('SEARCHING.LEADER')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.CONTACTNUMBER')"
            >
              <el-input
                type="number"
                v-model.number="form.contacts1.phone"
                :placeholder="$t('SEARCHING.CONTACTNUMBER')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.MAILBOX')"
            >
              <el-input
                :placeholder="$t('SEARCHING.MAILBOX')"
                v-model="form.contacts1.email"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              label-width="143px"
              required
              :label="$t('SEARCHING.ALTERNATECONTACT')"
            >
              <el-input
                v-model="form.contacts2.name"
                :placeholder="$t('SEARCHING.ALTERNATECONTACT')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.CONTACTNUMBER')"
            >
              <el-input
                type="number"
                v-model.number="form.contacts2.phone"
                :placeholder="$t('SEARCHING.CONTACTNUMBER')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item
              required
              :label="$t('SEARCHING.MAILBOX')"
            >
              <el-input
                v-model="form.contacts2.email"
                :placeholder="$t('SEARCHING.MAILBOX')"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- 介绍人信息 -->
      <h3 class="jbxx"><span class="shu">|</span> <span class="tixian">{{$t('SEARCHING.INFORMATIOXINXI')}}</span></h3>

      <el-row :gutter="5">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item
              :label="$t('SEARCHING.REFERRERNUMBER')"
              style="width:100%"
              prop="introphone"
            >
              <el-input
                :placeholder="$t('SEARCHING.REFERRERNUMBER')"
                v-model="form.introphone"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="22">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-checkbox v-model="checked"></el-checkbox>

              <!-- <el-button
                type="text"
                @click.stop="pageHelade()"
              >{{$t('SEARCHING.READANDAGREE')}}</el-button> -->

              <!-- 暂时协议跳转 -->
              <a
                href="http://mall.2uchat.cn:8900/seller/userAgreement.php"
                target="_blank"
              >{{$t('SEARCHING.READANDAGREE')}}
              </a>

            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item style="width:100%">
        <el-button
          type="primary"
          @click="onSubmit('form')"
        >{{$t('SEARCHING.AGREE')}}</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import { submit } from "@/api/shopsIn";
import { inputfile } from "@/api/uploadingImg";
import i18n from "element-ui/lib/locale";

export default {
  name: "add",
  components: { VDistpicker },
  data() {
    return {
      // 图片上传时显示
      dialogImageUrl: "",
      dialogImageUrls: "",
      dialogVisible: false,
      dialogVisibles: false,
      // 是否显示
      disabled: false,
      checked: true,
      // 图片
      StoreImage: "",
      xianshi0: false,
      xianshi1: false,
      showImggs: false,
      teachList: [],
      showImg: false,
      showImgs: false,
      showImgg: false,
      // 商铺类别绑定value
      value: "",

      // 表单验证
      rules: {
        subjectname: [
          {
            required: true,
            message: i18n.t("FORM.COMPANYSNAME"),
            trigger: "blur",
          },
        ],
        storename: [
          {
            required: true,
            message: i18n.t("FORM.CHINESENAMEF"),
            trigger: "blur",
          },
        ],
        creditcode: [
          {
            required: true,
            message: i18n.t("FORM.UNIFORMSOCIAL"),
            trigger: "blur",
          },
        ],
        contactname: [
          {
            required: true,
            message: i18n.t("FORM.ENTERTHETORE"),
            trigger: "blur",
          },
        ],
        legalname: [
          {
            required: true,
            message: i18n.t("FORM.ENTERLEGALR"),
            trigger: "blur",
          },
        ],
        regmoney: [
          {
            required: true,
            message: i18n.t("FORM.REGISTERECAPITAL"),
            trigger: "blur",
          },
        ],
        foundtime: [
          {
            required: true,
            message: i18n.t("FORM.ENTETHEDATE"),
            trigger: "blur",
          },
        ],
        term: [
          {
            required: true,
            message: i18n.t("FORM.OFBUSINESS"),
            trigger: "blur",
          },
        ],
        postcode: [
          {
            required: true,
            message: i18n.t("FORM.YOURIPCODE"),
            trigger: "blur",
          },
        ],
        provincename: [
          {
            required: true,
            message: i18n.t("FORM.ECTHEPROVINC"),
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: i18n.t("FORM.ENTERTHEDETA"),
            trigger: "blur",
          },
        ],
        introphone: [
          {
            required: true,
            message: i18n.t("FORM.MALLMANAGE"),
            trigger: "blur",
          },
        ],
      },

      form: {
        // 介绍人手机号
        introphone: "",
        // 公司名称
        subjectname: "",
        // 店铺名称
        storename: "",
        // 店铺标识
        storelogo: "",
        // 商品标识
        prdbrand: "",
        // 关键字
        keywords: "",
        // 店铺联系人
        contactname: "",
        // 介绍人2u账户id
        intro2uaccid: "",
        //  统一社会信用代码
        creditcode: "",
        //  法人
        legalname: "",
        // 注册资本
        regmoney: "",
        // 成立时间
        foundtime: "",
        // 是否长期
        islongterm: "",
        // 营业期限
        term: "",
        // 国家编码
        countrycode: "",
        // 国家名称
        countryname: "",
        // 邮政编码
        postcode: "",
        // 详细地址
        address: "",
        // 省编码
        provincecode: "",
        // 省名称
        provincename: "",
        // 城市编码
        citycode: "",
        // 城市名称
        cityname: "",
        // 区域编码
        regioncode: "",
        // 区域名称
        regionname: "",
        // 上传营业执照
        subjectlogo: "",

        // 商店联系人资料数组 支付宝
        contacts: {
          // 联系人名称
          name: "",
          // 联系方式
          phone: "",
          // 邮箱
          email: "",
        },
        contacts1: {
          // 联系人名称
          name: "",
          // 联系方式
          phone: "",
          // 邮箱
          email: "",
        },
        contacts2: {
          // 联系人名称
          name: "",
          // 联系方式
          phone: "",
          // 邮箱
          email: "",
        },
        // 商店钱包账户资料数组
        walletaccounts: {
          // 账户类型
          accountname: "",
          // 账户姓名
          accounttype: "ALIPAY",
          // 账号
          accountnum: "",
          // 账户说明
          accountnote: "",
        },
        // 商店钱包账户资料数组
        walletaccounts1: {
          // 账户类型
          accountname: "",
          // 账户姓名
          accounttype: "BANK",
          // 账号
          accountnum: "",
          // 账户说明
          accountnote: "",
        },
      },
    };
  },
  created() {
    // this.shoplisT();
    // getbrandlist().then((res) => {
    //   this.form.brandlist = res.brandlist;
    // });
  },
  methods: {
    // 协议跳转
    pageHelade() {
      console.log("wwwww");
      window.open("http://mall.2uchat.cn:8900/" + "seller/userAgreement.php");
    },
    // 联系人下同
    sameHeadle() {
      this.form.contacts2.name = this.form.contacts1.name = this.form.contacts.name;
      this.form.contacts2.email = this.form.contacts1.email = this.form.contacts.email;
      this.form.contacts2.phone = this.form.contacts1.phone = this.form.contacts.phone;
    },

    handleDateChange() {
      console.log(this.form.foundtime);
    },
    xianshi1() {
      console.log("1");
    },
    xianshi2() {
      console.log("2");
    },
    // 移入
    enter(vla) {
      if (vla == 1) {
        this.showImgg = true;
      } else {
        this.showImggs = true;
      }
    },
    leave(vla) {
      this.showImgg = false;
      this.showImggs = false;
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    onSelected(val) {
      console.log(val);
      this.form.provincename = val.province.value;
      this.form.provincecode = val.province.code;
      this.form.cityname = val.city.value;
      this.form.citycode = val.city.code;
      this.form.regionname = val.area.value;
      this.form.regioncode = val.area.code;
    },
    // 放大 营业执照
    addHeadlegx() {
      console.log("放大 营业执照");
      this.showImgg = true;
      this.dialogVisible = true;
    },
    // 方大 店铺logo
    addHeadlegxs() {
      console.log("方大 店铺logo");
      this.showImgg = true;
      this.dialogVisibles = true;
    },
    // 删除营业执照
    addHeadleg() {
      console.log("删除营业执照");
      this.showImggs = true;
      this.StoreImage = "";
      this.xianshi0 = false;
    },
    //  删除 店铺logo
    addHeadlegs() {
      console.log("删除 店铺logo");
      this.showImggs = true;
      this.StoreImages = "";
      this.xianshi1 = false;
    },
    // element ui 封装的上传图片
    beforePicUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "bpm" ||
        testmsg === "BPM";
      const isLt50M = file.size / 1024 / 1024 < 10;
      if (!extension) {
        this.$message({
          message: "上传图片只能是jpg / png / bpm格式!",
          type: "error",
        });
        return false; //必须加上return false; 才能阻止
      } else if (!isLt50M) {
        this.$message({
          message: "上传文件大小不能超过 10MB! 建议上传图片大小300*300像素",
          type: "error",
        });
        return false;
      } else {
        let obj = new FormData();
        obj.append("file", file);
        inputfile(obj).then((res) => {
          this.dialogImageUrl = res.picture;
          this.xianshi0 = true;
        });
      }
      return extension || isLt50M;
    },
    beforePicUploads(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "bpm" ||
        testmsg === "BPM";
      const isLt50M = file.size / 1024 / 1024 < 10;
      if (!extension) {
        this.$message({
          message: "上传图片只能是jpg / png / bpm格式!",
          type: "error",
        });
        return false; //必须加上return false; 才能阻止
      } else if (!isLt50M) {
        this.$message({
          message: "上传文件大小不能超过 10MB! 建议上传图片大小300*300像素",
          type: "error",
        });
        return false;
      } else {
        let obj = new FormData();
        obj.append("file", file);
        inputfile(obj).then((res) => {
          this.dialogImageUrls = res.picture;
          this.xianshi1 = true;
        });
      }
      return extension || isLt50M;
    },
    // 店铺入驻信息
    onSubmit(formName) {
      // this.$refs[formName].validate((valid) => {
      //   this.$emit("nextStep");
      // }),
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = {};
          form["storename"] = this.form.storename;
          // 注册资本
          form["regmoney"] = this.form.regmoney;
          form["postcode"] = this.form.postcode;
          form["address"] = this.form.address;
          form["storelogo"] = this.dialogImageUrls;
          // form["keywords"] = this.form.keywords;
          form["contactname"] = this.form.contactname;
          // 获取登录 注册的手机号
          const contactphone = localStorage.getItem("contactphone");
          form["contactphone"] = contactphone;
          form["intro2uaccid"] = this.form.intro2uaccid;
          form["introphone"] = this.form.introphone;
          form["introuserid"] = this.form.introuserid;
          form["subjectname"] = this.form.subjectname;
          form["creditcode"] = this.form.creditcode;
          form["legalname"] = this.form.legalname;
          form["foundtime"] = this.form.foundtime;
          // form["islongterm"] = this.form.islongterm;
          form["term"] = this.form.term;
          form["email"] = this.form.email;
          // form["countrycode"] = this.form.countrycode;
          // form["countryname"] = this.form.countryname;
          form["provincecode"] = this.form.provincecode;
          form["provincename"] = this.form.provincename;
          form["citycode"] = this.form.citycode;
          form["cityname"] = this.form.cityname;
          form["regioncode"] = this.form.regioncode;
          form["regionname"] = this.form.regionname;
          form["subjectlogo"] = this.dialogImageUrl;
          let walletaccounts = [];
          if (
            this.form.walletaccounts.accountname != "" ||
            this.form.walletaccounts.accountnote != "" ||
            this.form.walletaccounts.accountnum != ""
          ) {
            walletaccounts.push(this.form.walletaccounts);
          }
          if (
            this.form.walletaccounts1.accountname != "" ||
            this.form.walletaccounts1.accountnote != "" ||
            this.form.walletaccounts1.accountnum != ""
          ) {
            walletaccounts.push(this.form.walletaccounts1);
          }
          console.log(walletaccounts);
          let contacts = [];
          if (
            this.form.contacts.email != "" ||
            this.form.contacts.name != "" ||
            this.form.contacts.phone != ""
          ) {
            contacts.push(this.form.contacts);
          }
          if (
            this.form.contacts1.email != "" ||
            this.form.contacts1.name != "" ||
            this.form.contacts1.phone != ""
          ) {
            contacts.push(this.form.contacts1);
          }
          if (
            this.form.contacts2.email != "" ||
            this.form.contacts2.name != "" ||
            this.form.contacts2.phone != ""
          ) {
            contacts.push(this.form.contacts2);
          }
          form["walletaccounts"] = walletaccounts;
          form["contacts"] = contacts;
          // 添加商铺
          const userid = localStorage.getItem("userid");
          form["userid"] = userid;
          const userBean = localStorage.getItem("userBean");
          form["userBean"] = JSON.parse(userBean);
          console.log(form);
          // 协议跳转 判断是否选中
          if (this.checked == true) {
            this.$confirm(i18n.t("SEARCHING.TOCOMMIT"), {
              confirmButtonText: i18n.t("FORM.CONFIRM"),
              cancelButtonText: i18n.t("FORM.CANCEL"),
              type: "warning",
            })
              .then(() => {
                submit(form).then((res) => {
                  console.log(res);
                  // 跳转到提交状态
                  if (res.returncode == 0) {
                    this.$emit("nextStep");
                    this.$message({
                      type: "success",
                      message: i18n.t("SEARCHING.SUBMISSION"),
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: i18n.t("SEARCHING.CANCELLEDOP"),
                });
              });
          } else {
            this.$message({
              message: i18n.t("SEARCHING.AGREEMENT"),
              type: "warning",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style  scoped>
.v-modal {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.jbxx {
  margin-left: 20px;
}
.jbxx > .shu {
  font-size: 25px;
  margin-right: 5px;
}
.jbxx > .tixian {
  color: #333;
}
.jbxx > .jinggao {
  color: red;
}
.avatar-uploader .el-upload {
  border: 10px dashed #c12020;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: rgb(230, 230, 230);
  border: 2px dashed rgb(230, 230, 230);
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.up-load {
  position: relative;
  width: 140px;
  height: 140px;
  border: 1px dashed #666;
  top: 0;
  left: 0;
  overflow: hidden;
}
.up-load::before {
  content: "+";
  font-size: 40px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -15px;
}
.up-ipt {
  background-color: #409eff;
  display: block;
  width: 140px;
  height: 140px;
  position: absolute;
  opacity: 0;
}
.receiveImg {
  position: absolute;
  width: 140px;
  height: 140px;
  top: 0;
  left: 0;
}
.handleP-flex {
  display: flex;
  position: relative;
}
.picture-img {
  position: relative;
  display: block;
  overflow: hidden;
  width: 147px;
  height: 147px;
  margin-right: 20px;
}
.picture-imgs {
  position: relative;
  display: block;
  width: 147px;
  height: 147px;
  border: 1px solid #999;
}
/* 遮罩层 */
/* .zhezhaocen {
  position: absolute;
  z-index: 5;
  background-color: rgb(142, 134, 134);
} */
.amplification {
  position: absolute;
  z-index: 6;
  left: 30px;
  top: 50%;
  margin-top: -15px;
  width: 30px;
  height: 30px;
}
.deletessdasf {
  position: absolute;
  z-index: 6;
  left: 80px;
  top: 50%;
  margin-top: -15px;
  width: 30px;
  height: 30px;
}
.sober {
  display: block;
  width: 500px;
  height: 500px;
}
</style>
