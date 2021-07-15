<template> 
  <el-card
    class="form-container"
    shadow="never"
  >
    <el-form
      :model="orderSetting"
      ref="orderSettingForm"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item
        :label="$t('SEARCHING.ORDERSEXCEEDED')"
        prop="flashOrderOvertime"
      >
        <el-input
          v-model="orderSetting.flashOrderOvertime"
          class="input-width"
        >
          <template slot="append">{{$t('SEARCHING.MINUTE')}}</template>
        </el-input>
        <span class="note-margin">{{$t('SEARCHING.ISAUTOMATICALLY')}}</span>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.NORMALORDER')"
        prop="normalOrderOvertime"
      >
        <el-input
          v-model="orderSetting.normalOrderOvertime"
          class="input-width"
        >
          <template slot="append">{{$t('SEARCHING.MINUTE')}}</template>
        </el-input>
        <span class="note-margin">{{$t('SEARCHING.ISAUTOMATICALLY')}}</span>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.HIPMENTXCEEDS')"
        prop="confirmOvertime"
      >
        <el-input
          v-model="orderSetting.confirmOvertime"
          class="input-width"
        >
          <template slot="append">{{$t('SEARCHING.DAY')}}</template>
        </el-input>
        <span class="note-margin">{{$t('SEARCHING.AREAUTOMTICALLY')}}</span>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.COMPLETIONOVER')"
        prop="finishOvertime"
      >
        <el-input
          v-model="orderSetting.finishOvertime"
          class="input-width"
        >
          <template slot="append">{{$t('SEARCHING.DAY')}}</template>
        </el-input>
        <span class="note-margin">{{$t('SEARCHING.STARREV')}}</span>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.COMPLETIONOVER')"
        prop="commentOvertime"
      >
        <el-input
          v-model="orderSetting.commentOvertime"
          class="input-width"
        >
          <template slot="append">{{$t('SEARCHING.DAY')}}</template>
        </el-input>
        <span class="note-margin">{{$t('SEARCHING.STARREVIEWS')}}</span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary"
        >{{$t('FORMHEAD.SUBMIT')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import i18n from "element-ui/lib/locale";
const defaultOrderSetting = {
  id: null,
  flashOrderOvertime: 0,
  normalOrderOvertime: 0,
  confirmOvertime: 0,
  finishOvertime: 0,
  commentOvertime: 0,
};
const checkTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("时间不能为空"));
  }
  console.log("checkTime", value);
  let intValue = parseInt(value);
  if (!Number.isInteger(intValue)) {
    return callback(new Error("请输入数字值"));
  }
  callback();
};
export default {
  name: "orderSetting",
  data() {
    return {
      orderSetting: Object.assign({}, defaultOrderSetting),
      rules: {
        flashOrderOvertime: { validator: checkTime, trigger: "blur" },
        normalOrderOvertime: { validator: checkTime, trigger: "blur" },
        confirmOvertime: { validator: checkTime, trigger: "blur" },
        finishOvertime: { validator: checkTime, trigger: "blur" },
        commentOvertime: { validator: checkTime, trigger: "blur" },
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
            confirmButtonText: i18n.t("FORM.CONFIRM"),
            cancelButtonText: i18n.t("FORM.CANCEL"),
            type: "warning",
          }).then(() => {
            updateOrderSetting(1, this.orderSetting).then((response) => {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.SUBMISSION"),
                duration: 1000,
              });
            });
          });
        } else {
          this.$message({
            message: i18n.t("SEARCHING.NOTVALID"),
            type: "warning",
          });
          return false;
        }
      });
    },
    getDetail() {
      getOrderSetting(1).then((response) => {
        this.orderSetting = response.data;
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 50%;
}

.note-margin {
  margin-left: 15px;
}
</style>


