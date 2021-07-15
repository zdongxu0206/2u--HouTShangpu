<template>
  <div class="login-container">
    <div class="login-cont">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{$t('SEARCHING.TO2UMALL')}}</h3>
        </div>
        <el-form-item
          prop="username"
          class="dade"
        >
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            class="inp"
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('SEARCHING.PLEASEINPUT')"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item
          prop="password"
          class="dade"
        >
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            class="inp"
            style="color:#fff"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('SEARCHING.YOURPIN')"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button
          type="primary"
          class="btn-login"
          @click.native.prevent="handleLogin"
        >{{$t('LOCALIZATION.LOGIN')}}
        </el-button>
        <el-button
          type="primary"
          plain
          class="btn-register"
          @click="centerDialogVisible = true"
        >{{$t('SEARCHING.CERTIFICATION')}}</el-button>
      </el-form>
      <div>
        <!-- 弹出层 -->
        <!-- :close-on-click-modal="false" 点击空白处不消失 -->
        <el-dialog
          :title="$t('SEARCHING.USERREGISTRATION')"
          :visible.sync="centerDialogVisible"
          width="80%"
          :close-on-click-modal="false"
          left
        >
          <product-detail :is-edit='true'></product-detail>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetail from "./components/ProductDetail";
import { login } from "@/api/user";

export default {
  name: "Login",
  components: { ProductDetail },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码必须大于三位，请检查后重新输入"));
      } else {
        callback();
      }
    };
    return {
      // 弹出层默认隐藏
      centerDialogVisible: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入帐号（手机号）" },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },

  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    handleLogin() {
      localStorage.removeItem("userBean");
      // 登录验证
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 异步
          const { username } = this.loginForm;
          const { password } = this.loginForm;
          const params = { username, password };
          this.$store
            .dispatch("user/login", params)
            .then((res) => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch((res) => {
              console.log("aa");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scope>
body {
  margin: 0 auto;
}

.login-container {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
}

.login-cont {
  position: absolute;
  top: 30%;
  left: 35%;
  width: 400px;
}

.title {
  text-align: center;
  font-size: 22px;
  color: #fff;
}

.dade {
  position: relative;
  margin: 0 auto;
  // border: 1px solid #666;
  border-radius: 5px;
  margin-bottom: 20px;
  // padding: 5px 10px 5px 10px;
}

.svg-container {
  position: absolute;
  z-index: 2;
  color: #fff;
}

.show-pwd {
  position: absolute;
  right: 25px;
  top: 2px;
  color: #fff;
  font-size: 18px;
}

// 可以操作整体的样式
// .el-input__inner {
//   color: #fff;
//   background: transparent;
//   border: 1px solid #fff !important;
// }
// .inp {
//   color: #fff;
//   background: #2d3a4b !important;
//   border: 1px solid #fff !important;
// }

.inp {
  // background: transparent;
  width: 94%;
  color: #fff;
  text-indent: 20px;
  outline: none;
  background-color: #2d3a4b !important;
  border: 0;
  border-radius: 0;
  background-image: none;
}

.welco {
  color: #fff;
}

.el-form-item__error {
  left: 20px;
}

.btn-login {
  width: 46%;
  margin-bottom: 30px;
  margin-left: 20px;
}

.btn-register {
  width: 46%;
}
</style>

