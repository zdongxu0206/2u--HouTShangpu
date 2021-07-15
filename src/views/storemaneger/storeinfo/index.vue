<template>
  <div class="box">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
      style="margin-left:40px;margin-top:30px"
    >
      <!-- 店铺logo -->
      <el-form-item
        :label="$t('QWSTOR.DAINPOGO')"
        prop="store.storelogo"
      >
        <div class="shanchaun"> {{$t('FORM.UPLOADPICTURES')}}
          <input
            class="up-ipt"
            ref="modelInput"
            type="file"
            @change="uploadTeach($event)"
            accept="image/jpeg,image/png,image/jpg"
          />
          <img :src="form.store.storelogo">
        </div>
      </el-form-item>
      <!-- 店铺名称 -->
      <el-form-item
        :label="$t('QWSTOR.NAME')"
        prop="store.storename"
        style="width:40%"
      >
        <el-input
          v-model="form.store.storename"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 法人姓名 -->
      <el-form-item
        :label="$t('QWSTOR.LEGAL')"
        style="width:40%"
        prop="auth.legalname"
      >
        <el-input
          v-model="form.auth.legalname"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 公司成立时间 -->
      <el-form-item
        prop="auth.foundtime"
        :label="$t('QWSTOR.COMPANY')"
        style="width:40%"
      >
        <el-input
          v-model="form.auth.foundtime"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 统一社会信用代码 -->
      <el-form-item
        prop="auth.creditcode"
        :label="$t('QWSTOR.SOCIAL')"
        style="width:40%"
      >
        <el-input
          v-model="form.auth.creditcode"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 注册资本 -->
      <el-form-item
        :label="$t('QWSTOR.ASSETS')"
        style="width:40%"
        prop="auth.regmoney"
      >
        <el-input
          v-model="form.auth.regmoney"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 营业期限 -->
      <el-form-item
        :label="$t('QWSTOR.ALLOTED')"
        style="width:40%"
        prop="auth.term"
      >
        <el-input
          v-model="form.auth.term"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 商铺手机号 -->
      <el-form-item
        :label="$t('QWSTOR.MOBILE')"
        style="width:40%"
        prop="store.contactphone"
      >
        <el-input
          v-model="form.store.contactphone"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 商铺类别 -->
      <el-form-item
        :label="$t('QWSTOR.CATEGORY')"
        style="width:40%"
        prop="store.prdbrand"
      >
        <el-select
          v-model="form.store.prdbrand"
          :placeholder="$t('QWSTOR.CATEGORY')"
        >
          <el-option
            v-for="item in form.brandlist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 国家 -->
      <el-form-item
        :label="$t('QWSTOR.NATIONALITY')"
        style="width:40%"
        prop="auth.countryname"
      >
        <el-input
          v-model="form.auth.countryname"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <!-- 省市区 -->
      <el-form-item
        :label="$t('QWSTOR.PROVINCE')"
        style="width:40%"
        prop="auth.regionname"
      >
        <v-distpicker
          :province="form.auth.provincename"
          :city="form.auth.cityname"
          :area="form.auth.regionname"
          style="display:block;width:350px"
          @selected="onSelected"
        ></v-distpicker>
      </el-form-item>
      <!-- 地址 -->
      <el-form-item
        :label="$t('QWSTOR.ADDRESS')"
        style="width:40%"
        prop="auth.address"
      >
        <el-input
          v-model="form.auth.address"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 公司邮箱 -->
      <el-form-item
        :label="$t('QWSTOR.COMPANYS')"
        style="width:40%"
        prop="auth.email"
      >
        <el-input
          v-model="form.auth.email"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 邮编 -->
      <el-form-item
        :label="$t('QWSTOR.POSTCODE')"
        style="width:40%"
        prop="auth.postcode"
      >
        <el-input
          v-model="form.auth.postcode"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 介绍人2u号 -->
      <el-form-item
        :label="$t('GOODSCATEGORY.REFERRERN')"
        style="width:40%"
        prop="store.introuserid"
      >
        <el-input
          v-model="form.store.introuserid"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 联系人名字 -->
      <el-form-item
        :label="$t('QWSTOR.CONTACTNAME')"
        style="width:40%"
        prop="store.contactname"
      >
        <el-input
          v-model="form.store.contactname"
          style="width:350px"
        ></el-input>
      </el-form-item>
      <!-- 联系人手机号 -->
      <el-form-item
        :label="$t('QWSTOR.CONTACTPHONE')"
        style="width:40%"
        prop="store.contactphone"
      >
        <el-input
          v-model="form.store.contactphone"
          style="width:350px"
        ></el-input>
      </el-form-item>

      <el-form-item style="width:40%">
        <el-button
          type="primary"
          @click="onSubmit('form')"
        >{{$t('SEARCHING.AMEND')}}</el-button>
        <el-button>{{$t('FORM.CANCEL')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { inputfile } from "@/api/uploadingImg";
import VDistpicker from "v-distpicker";
import { shoplist, shopdetails, getbrandlist } from "@/api/storemanegerMessage";
import i18n from "element-ui/lib/locale";
export default {
  name: "storeinfo",
  components: { VDistpicker },
  data() {
    return {
      form: {
        // 店铺详情地址
        auth: {
          //  国家
          countryname: "",
          //  省份
          provincename: "",
          // 省份编码
          provincecode: "",
          //  城市
          cityname: "",
          // 城市码
          citycode: "",
          // 区
          regionname: "",
          // 区域码
          regioncode: "",
          //  地址
          address: "",
          // 公司邮箱
          email: "",
          // 邮政编码
          postcode: "",
          // 和法人姓名
          legalname: "",
          // 公司成立时间
          foundtime: "",
          //  统一社会信用代码
          creditcode: "",
          // 注册资本
          regmoney: "",
          // 营业期限
          term: "",
          // 营业执照
          subjectlogo: "",
          // 品牌logo
          logo: "",
          // 商铺认证资料id
          authid: "",
        },
        // 店铺信息  名字 手机号 logo
        store: {
          // 店铺名称
          storename: "",
          // 店铺logo
          storelogo: "",
          // 联系人id
          introuserid: "",
          // 店铺联系人名字
          contactname: "",
          // 店铺联系人手机号
          contactphone: "",
          prdbrand: null,
        },
        brandlist: [],
      },
      rules: {
        "store.storelogo": [
          { required: true, message: "请上传店铺logo", trigger: "blur" },
        ],
        "store.storename": [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
        ],
        "auth.legalname": [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
        ],
        "auth.foundtime": [
          { required: true, message: "请输入公司成立时间", trigger: "blur" },
        ],
        "auth.creditcode": [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
          { min: 18, max: 18, message: "长度为 18 个字符", trigger: "blur" },
        ],
        "auth.regmoney": [
          { required: true, message: "请输入注册资本", trigger: "blur" },
        ],
        "auth.term": [
          { required: true, message: "请输入营业期限", trigger: "blur" },
        ],
        "store.contactphone": [
          { required: true, message: "请输入商铺手机号", trigger: "blur" },
        ],
        "store.prdbrand": [
          { required: true, message: "请选择商铺类别", trigger: "blur" },
        ],
        "auth.countryname": [
          { required: true, message: "请输入国家", trigger: "blur" },
        ],
        "auth.regionname": [
          { required: true, message: "请选择省市区", trigger: "blur" },
        ],
        "auth.address": [
          { required: true, message: "请输入地址", trigger: "blur" },
        ],
        "auth.email": [
          { required: true, message: "请输入公司邮箱", trigger: "blur" },
        ],
        "auth.postcode": [
          { required: true, message: "请输入邮编", trigger: "blur" },
        ],
        "store.introuserid": [
          { required: true, message: "请输入介绍人2u号", trigger: "blur" },
        ],
        "store.contactname": [
          { required: true, message: "请输入联系人名字", trigger: "blur" },
        ],
        "store.contactphone": [
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.shoplisT();
    getbrandlist().then((res) => {
      this.form.brandlist = res.brandlist;
    });
  },
  methods: {
    // 上传图片
    uploadTeach(event) {
      console.log(event);
      var file = event.target.files[0];
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
        let formData = new FormData();
        formData.append("file", file);
        inputfile(formData).then((res) => {
          this.form.store.storelogo = res.picture;
        });
      }
      return extension || isLt50M;
    },
    onSelected(val) {
      console.log(val);
      this.form.auth.provincename = val.province.value;
      this.form.auth.provincecode = val.province.code;
      this.form.auth.cityname = val.city.value;
      this.form.auth.citycode = val.city.code;
      this.form.auth.regionname = val.area.value;
      this.form.auth.regioncode = val.area.code;
    },
    // 修改信息
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const storeid = localStorage.getItem("storeid");
          let obj = {};
          obj["storeid"] = storeid;
          obj["authid"] = this.form.auth.authid;
          obj["storename"] = this.form.store.storename;
          obj["storelogo"] = this.form.store.storelogo;
          obj["storelogo"] = this.form.store.storelogo;
          obj["legalname"] = this.form.auth.legalname;
          obj["contactphone"] = this.form.store.contactphone;
          obj["prdbrand"] = this.form.store.prdbrand;
          obj["creditcode"] = this.form.auth.creditcode;
          obj["regmoney"] = this.form.auth.regmoney;
          obj["term"] = this.form.auth.term;
          obj["countryname"] = this.form.auth.countryname;
          obj["provincename"] = this.form.auth.provincename;
          obj["provincecode"] = this.form.auth.provincecode;
          obj["cityname"] = this.form.auth.cityname;
          obj["citycode"] = this.form.auth.citycode;
          obj["regionname"] = this.form.auth.regionname;
          obj["regioncode"] = this.form.auth.regioncode;
          obj["address"] = this.form.auth.address;
          obj["email"] = this.form.auth.email;
          obj["postcode"] = this.form.auth.postcode;
          obj["legalname"] = this.form.auth.legalname;
          obj["foundtime"] = this.form.auth.foundtime;
          obj["introuserid"] = this.form.store.introuserid;
          obj["contactname"] = this.form.store.contactname;
          obj["contactphone"] = this.form.store.contactphone;
          this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
            confirmButtonText: i18n.t("FORM.CONFIRM"),
            cancelButtonText: i18n.t("FORM.CANCEL"),
            type: "warning",
          })
            .then(() => {
              shopdetails(obj).then((res) => {
                this.$message({
                  type: "success",
                  message: i18n.t("SEARCHING.SUCCESSFULLY"),
                });
                this.shoplisT();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: i18n.t("ROLLOVERS.XIUGAI"),
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    shoplisT() {
      const storeid = localStorage.getItem("storeid");
      shoplist(storeid).then((res) => {
        console.log(res);
        this.form.auth = res.auth;
        this.form.auth.foundtime = res.auth.foundtime.slice(0, 10);
        this.form.store = res.store;
        this.form.store.prdbrand = parseInt(res.store.prdbrand);
      });
    },
  },
};
</script>

<style  scoped>
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
.shanchaun {
  position: relative;
  width: 102px;
  height: 102px;
  border: 1px dashed #999;
  line-height: 100px;
  text-align: center;
  color: red;
}
.shanchaun > img {
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  width: 98px;
  height: 98px;
}
.up-ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>

