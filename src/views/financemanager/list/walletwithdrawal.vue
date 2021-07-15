<template>
  <div
    class="app-container-left"
    style="margin-top: 15px"
  >
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="200px"
      class="demo-dynamic"
      style="overflow:hidden"
    >
      <div style="float:left;margin-left:50px;">
        <el-form-item
          :label="$t('WITHDRA.ACCOUNT')"
          required
        >
          <el-select
            v-model="num"
            :placeholder="$t('WITHDRA.ACCOUNT')"
            @change="headmlXuan"
          >
            <el-option
              v-for="item in money"
              :key="item.id"
              :label="item.ind"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('SEARCHING.ACCOUNTTITLE')"
          required
        >
          <el-input
            v-show="show"
            :placeholder="$t('SEARCHING.ACCOUNTTITLE')"
            v-model="dynamicValidateForm.accountname"
            style="width:200px"
          ></el-input>
          <el-select
            v-model="value"
            v-show="!show"
            :placeholder="$t('SEARCHING.BENEFICIARYACCOUNT')"
            @change="shuzihanshu"
          >
            <el-option
              :key="options.accounttype"
              :label="options.accountname"
              :value="options.accountnum"
            >

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('WITHDRA.WITHDRAWALM')"
          required
        >
          <el-input
            :placeholder="$t('WITHDRA.WITHDRAWALM')"
            v-model="txMoney"
            style="width:200px"
            @change="onChange()"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SEARCHING.WITHDRAWALNOTE')"
          required
        >
          <el-input
            :placeholder="$t('SEARCHING.WITHDRAWALNOTE')"
            v-model="dynamicValidateForm.remark"
            style="width:200px"
          ></el-input>
        </el-form-item>

      </div>
      <div style="float:left">
        <el-form-item
          :label="$t('WITHDRA.WITHDRAWAL')"
          required
        >
          <el-select
            v-model="bizhong"
            @change="headmlXuans"
            :placeholder="$t('WITHDRA.WITHDRAWAL')"
          >
            <el-option :value="currency.cny"></el-option>
            <el-option :value="currency.usd"></el-option>
            <el-option :value="currency.aud"></el-option>
            <el-option
              v-show="!show"
              v-if="ssk"
              :value="currency.a2u"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="email"
          :label="$t('SEARCHING.BECREDITED')"
        >
          <el-input
            v-model="skzh"
            :disabled="!show"
            style="width:200px"
            :placeholder="$t('SEARCHING.BECREDITED')"
            @change="skZhang"
          ></el-input>
        </el-form-item>
        <!-- 可提余额 -->
        <el-form-item :label="$t('SEARCHING.CARRYBALANCES')">
          <el-input
            :placeholder="amount"
            v-show="yincang"
            :disabled="yincang"
            style="width:200px"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('dynamicValidateForm')"
          >{{$t('FORMHEAD.SUBMIT')}}</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">{{$t('FORM.CANCEL')}}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getWalletList,
  getStoreidAccount,
  submitCash,
  cancelOrder,
} from "@/api/financemanagerList";
import i18n from "element-ui/lib/locale";
export default {
  name: "walletwithdrawal",
  data() {
    return {
      dynamicValidateForm: {
        // 钱包id
        walletid: "",
        //收款账户  1595165161
        account: "",
        // 提现备注
        remark: "",
        // 当账户类型为银行卡的时候 应该是
        accountname: "",
        // 账户类型
        accounttype: "",
        // 提现币种A2U/CNY
        amtcurrency: "",
        // 钱包类型 ALIPAY/BANK
        wallettype: "",
        // 总余额
        amount: "",
      },
      amount: "0.0",
      // 各个币种之间的余额
      yuer: [],
      place: i18n.t("SEARCHING.PLEASECHOOSE"),
      //提现币种
      bizhong: "",
      // 可提余额的显示隐藏
      yincang: false,
      // 点击选中账户名字的时候把对应的收款账户改变掉
      skzh: "",
      // 提现金额
      txMoney: "",
      ssk: true,
      show: true,
      value: "",
      num: "",
      money: [
        {
          id: "BANK",
          ind: i18n.t("SEARCHING.REDLINING"),
        },
        {
          id: "ALIPAY",
          ind: i18n.t("WITHDRA.ALIPAY"),
        },
      ],
      currenc: "",
      currency: {
        cny: "CNY",
        usd: "USD",
        aud: "AUD",
        a2u: "A2U",
      },
      options: [],
    };
  },
  created() {
    // 查询商铺各个币种余额
    const storeid = localStorage.getItem("storeid");
    getWalletList(storeid).then((res) => {
      console.log(res);
      this.yuer = res.wallet;
    });
  },
  methods: {
    // 提交提现
    submitForm() {
      this.$confirm(i18n.t("SEARCHING.WITHDRAWINGTHIS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          // 申请提现
          const storeid = localStorage.getItem("storeid");
          this.dynamicValidateForm["storeid"] = storeid;
          this.dynamicValidateForm["amtcash"] = this.txMoney;
          console.log(this.dynamicValidateForm);
          submitCash(this.dynamicValidateForm).then((res) => {
            if (res.returncode == "0") {
              this.$message({
                type: "success",
                message: i18n.t("SEARCHING.ITHDRAWAL"),
              });
              this.$router.push({ path: "/financemanager/list" });
            }
            if (res.returncode == "-1") {
              this.$message({
                type: "error",
                message: i18n.t("SEARCHING.SORRYHAVE"),
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("SEARCHING.HASBEEN"),
          });
        });
    },
    // 取消提现订单
    resetForm(formName) {
      const storeid = localStorage.getItem("storeid");
      cancelOrder().then((res) => {
        console.log(res);
      });
      this.$refs[formName].resetFields();
    },
    // 监听选中名字的时候银行账户显示出来
    shuzihanshu() {
      console.log(this.value);
      this.skzh = this.value;
    },
    // 监听是收款账户的改变
    skZhang() {
      console.log("qqq");
      this.dynamicValidateForm.account = this.skzh;
    },
    // 监听选中支付宝或者是银行卡的时候的变化
    headmlXuan() {
      console.log(this.num);
      this.dynamicValidateForm.wallettype = this.num;
      this.dynamicValidateForm.accounttype = this.num;
      if (this.num == "BANK") {
        this.dynamicValidateForm.accountname = "";
        this.show = true;
        this.ssk = false;
        this.bizhong = "";
        this.skzh = "";
        this.yincang = false;
        this.dynamicValidateForm.account = this.amount;
        const accounttype = this.num;
        const storeid = localStorage.getItem("storeid");
      } else {
        this.show = false;
        this.bizhong = "";
        this.skzh = "";
        this.ssk = true;
        this.yincang = false;
        const accounttype = this.num;
        const storeid = localStorage.getItem("storeid");
        getStoreidAccount(accounttype, storeid).then((res) => {
          if (res.returncode == 0) {
            this.value = "";
            this.options = res.accountInfo;
            this.dynamicValidateForm.accountname = res.accountInfo.accountname;
            this.dynamicValidateForm.account = res.accountInfo.accountnum;
          } else {
            this.value = i18n.t("SEARCHING.NOCOLLECTION");
          }
        });
      }
    },
    // 监听提现金额是否大于可提现金额
    onChange() {
      console.log(this.bizhong);
      if (this.txMoney > this.amount && this.yincang == true) {
        this.txMoney = "";
        this.$message({
          showClose: true,
          message: i18n.t("SEARCHING.BALANCE"),
          type: "warning",
        });
      }
    },
    // 选中体现币种时显示各个币种所显示的余额
    headmlXuans(value) {
      this.yincang = true;
      this.dynamicValidateForm.amtcurrency = this.bizhong;
      switch (this.bizhong) {
        case "CNY":
          this.yuer.forEach((item) => {
            console.log(item.wallettype);
            if (item.wallettype == "CNY") {
              console.log(item);
              this.amount = item.amount;
              this.dynamicValidateForm.walletid = item.walletid;
              this.dynamicValidateForm.amount = item.amount;
            }
          });
          break;
        case "USD":
          this.yuer.forEach((item) => {
            if (item.wallettype == "USD") {
              this.amount = item.amount;
              this.dynamicValidateForm.walletid = item.walletid;
              this.dynamicValidateForm.amount = item.amount;
            }
          });
          break;
        case "AUD":
          this.yuer.forEach((item) => {
            if (item.wallettype == "AUD") {
              this.amount = item.amount;
              this.dynamicValidateForm.walletid = item.walletid;
              this.dynamicValidateForm.amount = item.amount;
            }
          });
          break;
        case "A2U":
          this.yuer.forEach((item) => {
            console.log(item);
            if (item.wallettype == "A2U") {
              this.amount = item.amount;
              console.log("svasv");
              this.dynamicValidateForm.walletid = item.walletid;
              this.dynamicValidateForm.amount = item.amount;
            }
          });
          break;
      }
    },
  },
};
</script>

<style>
</style>
