<template>
  <el-card
    class="form-container"
    shadow="never"
  >
    <!-- 否 -->
    <el-form
      :rules="rules"
      :label-position="labelPosition"
      class="elss"
      ref="loginForm"
      :model="form"
      label-width="300px"
      style="margin-top:50px;height:450px;"
    >
      <el-form-item
        class="el-form-item"
        :label="$t('SEARCHING.HAVE2U')"
      >
        <el-radio-group
          v-model="form.starts"
          @change="isFor"
        >
          <el-radio :label="0">{{$t('SEARCHING.NO')}}</el-radio>
          <el-radio :label="1">{{$t('SEARCHING.YES')}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        class="el-form-item"
        :label="$t('SEARCHING.PHONE')"
        required
      >
        <el-select
          borderx
          v-model="form.areaVal"
          :placeholder="$t('SEARCHING.PHONE')"
          style="width:120px"
        >
          <el-option
            v-for="(item,index) in areaCode"
            :key="index"
            :label="item.areacode+item.name_ch"
            :value="item.areacode"
          ></el-option>

        </el-select>
        <el-input
          style="width:300px;margin-left:10px"
          v-model="form.username"
          :placeholder="$t('SEARCHING.DIGITCELL')"
        ></el-input>
      </el-form-item>

      <el-form-item
        class="el-form-item"
        :label="$t('SEARCHING.IDENTIFYING')"
        v-show="show"
        style="margin-bottom:0"
        required
      >
        <el-input
          style="width:300px;color:#666"
          v-model="form.phoneRandcode"
          :placeholder="$t('SEARCHING.IDENTIFYING')"
          @input="changeHeld"
        ></el-input>
        <el-button
          style="margin-left:20px;border:1px soild #333"
          @click="sendCode"
          :disabled="disabled"
        >{{valiBtn}}</el-button>

      </el-form-item>
      <div
        style="text-align:center;color:red"
        v-show="yanzhen"
      >{{text}}</div>
      <el-form-item
        class="el-form-item"
        :label="$t('SEARCHING.PASSWORD')"
        required
        style="margin-bottom:0;margin-top:20px"
      >
        <el-input
          type="password"
          style="width:300px;color:#666;"
          v-model="form.password"
          :placeholder="$t('SEARCHING.PASSWORD')"
        ></el-input>
        <!-- <el-button
          v-show="shows"
          type="primary"
          style="margin-left:20px;"
          @click="clickQianw('loginForm')"
        >{{$t('SEARCHING.MODIFYTHE')}}</el-button> -->
      </el-form-item>

      <div
        style="margin-left:300px;margin-bottom:20px"
        v-show="show"
      >{{$t('SEARCHING.MERCHANTACCOUNT')}}</div>
      <el-form-item
        class="el-form-item"
        :label="$t('SEARCHING.MAILBOX')"
        v-show="show"
        required
      >
        <el-input
          required
          style="width:300px;color:#666;"
          v-model="form.name"
          :placeholder="$t('SEARCHING.MAILBOX')"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="el-form-item"
        :label="$t('SEARCHING.NICKNAME')"
        required
        v-show="show"
      >
        <el-input
          style="width:300px;color:#666;"
          v-model="form.nickname"
          :placeholder="$t('SEARCHING.NICKNAME')"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="text-align: center"
        label-width="-100px"
      >
        <!-- 注册2u号 -->
        <el-button
          v-show="show"
          type="primary"
          size="medium"
          @click="handleNext('loginForm')"
        >{{$t('SEARCHING.REGISTERED2U')}}</el-button>
        <!-- 校验2u号 -->
        <el-button
          style="margin-top:20px;margin-left:-2px"
          v-show="!show"
          type="primary"
          size="medium"
          @click="handleNexts('loginForm')"
        >{{$t('SEARCHING.NUMBER2U')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  countryCodes,
  getcode,
  checkout2u,
  create2uaccount,
  checkRandcode,
} from "@/api/shopsIn";
import i18n from "element-ui/lib/locale";
export default {
  name: "ProductInfoDetail",
  data() {
    // 验证手机号是否合格
    var checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!value) {
        return callback(new Error("请填写手机号码！"));
      } else if (!reg.test(value)) {
        return callback(new Error("请填写正确的手机号码！"));
      } else {
        callback();
      }
    };
    return {
      // 验证输入的验证码是否正确
      yanzhen: false,
      text: "",
      // 当审核拒绝的情况下
      shows: false,
      valiBtn: i18n.t("SEARCHING.CAPTCHA"),
      // 显示 禁用
      disabled: false,

      // 弹出层默认隐藏
      centerDialogVisible: false,
      // 显示，隐藏
      show: true,
      // 表单的对齐方式
      labelPosition: "right",
      form: {
        // 手机号
        username: "",
        // 区号双向绑定
        areaVal: "86",
        // 验码绑定
        phoneRandcode: "",
        // 密码
        password: "",
        // 昵称
        nickname: "",
        user: "",
        region: "",
        name: "",
        // 验证是否有2u号
        starts: 0,
      },
      // 验证必填项
      // rules: {
      //   phone: [
      //     { required: true, validator: checkPhone, trigger: "blur" },
      //     { min: 11, max: 11, message: "长度是11个字符", trigger: "blur" },
      //   ],
      //   code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      // },
      // 国家区号
      areaCode: [],
      active: 0,
    };
  },
  created() {
    this.countryCode();
  },
  methods: {
    // 获取国家区号
    countryCode() {
      countryCodes().then((res) => {
        console.log(res);
        this.areaCode = res.arealist;
      });
    },
    //验证码倒数300秒
    tackBtn() {
      let time = 300;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.valiBtn = i18n.t("SEARCHING.CAPTCHA");
          this.disabled = false;
        } else {
          this.disabled = true;
          this.valiBtn = time + i18n.t("SEARCHING.SECONDS");
          time--;
        }
      }, 1000);
    },
    // 获取验证码
    sendCode() {
      console.log(this.form.username, this.form.areaVal);
      this.$confirm(i18n.t("SEARCHING.CAPTCHA"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          if (this.form.username.length == "11") {
            getcode(this.form.username, this.form.areaVal).then((res) => {
              if (res.returncode == "0") {
                this.$message({
                  type: "success",
                  message: i18n.t("SEARCHING.SENTSUCCESS"),
                });
                this.tackBtn();
              } else {
                this.$message.error(i18n.t("SEARCHING.ISWRONG"));
              }
            });
          } else {
            this.$message.error(i18n.t("SEARCHING.ISWRONG"));
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 验证是否有2u账号
    isFor(val) {
      if (val == 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    // 注册2u号 注册成功跳转到
    handleNext(formName) {
      // // 测试
      // this.$emit("nextStep");
      localStorage.setItem("contactphone", this.form.contactphone);
      console.log(this.form);
      let obj = {};
      obj["nickname"] = this.form.nickname;
      obj["password"] = this.form.password;
      obj["areacode"] = this.form.areaVal;
      obj["phone"] = this.form.username;
      // 验证码
      obj["phoneRandcode"] = this.form.phoneRandcode;
      console.log(this.form);
      create2uaccount(obj).then((res) => {
        if (res.returncode == "0") {
          this.$refs[formName].validate((valid) => {
            if (res.returncode == "0") {
              // 注册成功 刷新页面
              location.reload(true);
            } else {
              this.$message({
                message: i18n.t("SEARCHING.FAILED"),
                type: "error",
                duration: 1000,
              });
              return false;
            }
          });
        } else if (res.returncode == "-1") {
          this.$message({
            message: i18n.t("SEARCHING.HASA2U"),
            type: "warning",
          });
        }
      });
    },
    // 校验2u号 验证成功跳转到第二页
    handleNexts(formName) {
      console.log(this.form);
      console.log(this.form.areaVal);
      // this.$emit("nextStep");
      localStorage.setItem("contactphone", this.form.username);
      let obj = {};
      obj["username"] = this.form.username;
      obj["password"] = this.form.password;
      obj["areacode"] = this.form.areaVal;
      this.$refs[formName].validate((valid) => {
        checkout2u(obj).then((res) => {
          console.log(res);
          if (res.returncode == 0) {
            res.userBean["username"] = this.form.username;
            res.userBean["password"] = this.form.password;
            res.userBean["areacode"] = this.form.areaVal;
            localStorage.setItem("userid", res.userBean.userId);
            localStorage.setItem("userBean", JSON.stringify(res.userBean));
            this.$emit("nextStep");
          } else if (res.returncode == "-1") {
            this.$message({
              message: i18n.t("SEARCHING.NOTEXIST"),
              type: "error",
              duration: 1000,
            });
          } else if (res.returncode == 1) {
            this.$message({
              message: i18n.t("SEARCHING.REGISTEREDWITH"),
              type: "warning",
              duration: 3000,
            });
            this.shows = true;
            return false;
          }
        });
      });
    },
    // 当审核的状态为拒绝审核跳转到重新填写入驻资料去
    // clickQianw(formName) {
    //   console.log(22);
    //   // 跳转到提交状态
    //   this.$refs[formName].validate((valid) => {
    //     this.$emit("nextStep");
    //   });
    // },
    // 校验验证码
    changeHeld() {
      console.log(this.form);
      console.log(this.form.code.length);
      if (this.form.code.length >= 6) {
        checkRandcode(this.form.username, this.form.code).then((res) => {
          console.log(res);
          // if判断 返回的结果是否正确 正确的话调用验证码倒计时300秒
          if (res.bean.data == "0") {
            this.yanzhen = true;
            this.text = i18n.t("SEARCHING.ENTERAGAIN");
          } else if (res.bean.data == "1") {
            this.yanzhen = false;
          }
        });
      }
    },
  },
};
</script>

<style>
.divIdentifyingCode {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  width: 102px; /*设置图片显示的宽*/
  height: 40px; /*图片显示的高*/
  background: #e2e2e2;
  margin: 0;
}
input {
  border: 1px solid #666 in !important;
}
.el-input__inner {
  background: 1;
  border: 1px solid #666 !important;
}
</style>
