<template>
  <div
    class="detail-container"
    style="width:80%;margin:auto"
  >
    <el-card shadow="never">
      <span class="font-title-medium">{{$t('RETURNAPP.THEGOODS')}}</span>
      <el-table
        border
        :data="portList"
      >
        <el-table-column
          :label="$t('PRODUCTLIST.COMMODITYIMAGES')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <img
              style="height:100px;width:100px"
              :src="scope.row.prdpic"
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.PRODUCTNAME')"
          align="center"
        >
          <template slot-scope="scope">
            <span class="font-small">{{scope.row.prdname}}</span><br>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.ARTNO')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span class="font-small">{{$t('SEARCHING.PRICE')}}：￥{{scope.row.prdprice}}</span><br>
            <span class="font-small">{{$t('PRODUCTLIST.ARTNO')}}：NO.{{scope.row.prdsn}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.ARTNO')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span class="font-small">{{$t('SEARCHING.PROPERTY')}}：{{scope.row.prdattr[0].value}}</span><br>
            <span class="font-small">{{$t('SEARCHING.ATTRIBUTETEGORY')}}：{{scope.row.prdattr[0].key}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.NUMBER')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.prdcount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.SUBTOTAL')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">￥{{scope.row.prdcount*scope.row.prdprice}}</template>
        </el-table-column>
      </el-table>

      <div style="float:right;margin-top:15px;margin-bottom:15px">
        <span class="font-title-medium">{{$t('ORDERLIST.ADDUPTO')}}：</span>
        <span class="font-title-medium color-danger">￥{{productList.prdamt}}</span>
      </div>
    </el-card>
    <el-card
      shadow="never"
      class="standard-margin"
      display="overflow:hidden"
    >
      <span class="font-title-medium">{{$t('RETURNAPP.SERVICEORDER')}}</span>
      <div class="form-container-border">
        <el-row>
          <el-col
            :span="6"
            class="form-border form-left-bg font-small"
          >{{$t('RETURNAPP.SERVICE')}}</el-col>
          <el-col
            class="form-border font-small"
            style="height:39px"
            :span="18"
          >{{productList.returnid}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('RETURNAPP.APPLICATION')}}</el-col>
          <el-col
            class="form-border font-small"
            :span="18"
          >{{productList.status | formatStatus}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="form-border form-left-bg font-small"
            style="height:50px;line-height:30px"
          >{{$t('ORDERLIST.ORDERREF')}}
          </el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height:50px"
          >
            {{productList.ordersn}}

          </el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('FORMHEAD.APPLICATIONTIME')}}</el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height:39px"
          >{{productList.createtime}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('RETURNAPP.ACCOUNT')}}</el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height:39px"
          >{{productList.username}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('SEARCHING.LINKMAN')}}</el-col>
          <el-col
            class="form-border font-small "
            style="height:40px"
            :span="18"
          >{{productList.rcvname}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('SEARCHING.CONTACTNUMBER')}}</el-col>
          <el-col
            style="height:40px"
            class="form-border font-small"
            :span="18"
          >{{productList.rcvphone}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('SEARCHING.FORRETURN')}}</el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height:39px"
          >{{productList.returnreason}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
          >{{$t('RETURNAPP.DESCRIPTION')}}</el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height:39px"
          >{{productList.returndesc}}</el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
            style="height:100px;line-height:80px"
          >{{$t('RETURNAPP.PICTURES')}}
          </el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height:100px"
          >
            <img
              style="width:80px;height:80px"
              :src="productList.returnproofimg"
            >
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col
          class="form-border form-left-bg font-small"
          :span="6"
        >{{$t('ORDERLIST.ORDERAMOUNT')}}</el-col>
        <el-col
          class="form-border font-small"
          :span="18"
        >￥{{productList.returnamt}}</el-col>
      </el-row>
      <el-row>
        <el-col
          class="form-border form-left-bg font-small"
          :span="6"
          style="height:52px;line-height:32px"
        >{{$t('RETURNAPP.AMOUNT')}}
        </el-col>
        <el-col
          class="form-border font-small"
          style="height:52px;line-height:32px"
          :span="18"
        >
          ￥{{productList.returnamt}}
        </el-col>
      </el-row>
      <!-- 修改收货地址 -->
      <el-dialog
        :title="$t('SEARCHING.THEADDRESS')"
        :visible.sync="dialogFormVisible"
        style="width:80%;margin:0 auto"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item
            :label="$t('SEARCHING.CONDUCTOR')"
            :label-width="formLabelWidth"
            prop="handleuser"
          >
            <el-input
              v-model="form.handleuser"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('ORDERLIST.NOTES')"
            :label-width="formLabelWidth"
            prop="handlenote"
          >
            <el-input
              v-model="form.handlenote"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('SEARCHING.CONSIGNEENAME')"
            :label-width="formLabelWidth"
            prop="rcvname"
          >
            <el-input
              v-model="form.rcvname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('SEARCHING.MOBILEPHONE')"
            :label-width="formLabelWidth"
            prop="rcvphone"
          >
            <el-input
              v-model="form.rcvphone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('ORDERLIST.POSTALCODE')"
            :label-width="formLabelWidth"
            prop="rcvpostcode"
          >
            <el-input
              v-model="form.rcvpostcode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 省市区 -->
          <el-form-item
            :label="$t('QWSTOR.PROVINCE')"
            :label-width="formLabelWidth"
            prop="rcvprovincename"
          >
            <v-distpicker
              :province="form.rcvprovincename"
              :city="form.rcvcityname"
              :area="form.rcvregionname"
              @selected="onSelected"
            ></v-distpicker>
          </el-form-item>

          <el-form-item
            :label="$t('SEARCHING.DETAILEDADDRESS')"
            :label-width="formLabelWidth"
            prop="rcvaddress"
          >
            <el-input
              v-model="form.rcvaddress"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="upaddress('ruleForm')"
          >{{$t('FORM.CONFIRM')}}</el-button>
        </div>
      </el-dialog>
      <div class="btn">
        <el-button
          type="primary"
          size="small"
          @click="handleUpdateStatus()"
          v-if="productList.status==1 && productList.returntype==1 || productList.status==2 && productList.returntype==2"
        >{{$t('SEARCHING.CONFIRMEDRETURN')}}</el-button>
        <el-button
          type="danger"
          size="small"
          v-if="productList.status!=3"
          @click="handleUpdate()"
        >{{$t('SEARCHING.REFUSE')}}</el-button>
        <el-button
          type="danger"
          size="small"
          @click="handleConsent()"
          v-if="productList.status==1 && productList.returntype==2"
        >{{$t('SEARCHING.AGREEMENTS')}}</el-button>
      </div>

    </el-card>
  </div>
</template>
<script>
import {
  returnOrderInfo,
  updateApplyStatu,
  updadeReturnOrder,
  refuseOrder,
} from "@/api/orderReason";
// 省市区选择器
import VDistpicker from "v-distpicker";
// 退货原因详情
import i18n from "element-ui/lib/locale";

const defaultOrderReturnApply = {
  id: null,
  orderId: null,
  companyAddressId: null,
  productId: null,
  orderSn: null,
  createtime: null,
  memberUsername: null,
  returnAmount: null,
  returnName: null,
  returnPhone: null,
  status: null,
  handleTime: null,
  productPic: null,
  productName: null,
  productBrand: null,
  productAttr: null,
  productCount: null,
  productPrice: null,
  productRealPrice: null,
  reason: null,
  description: null,
  proofPics: null,
  handleNote: null,
  handleMan: null,
  receiveMan: null,
  receiveTime: null,
  receiveNote: null,
};
export default {
  components: { VDistpicker },
  name: "returnApplyDetail",
  data() {
    return {
      form: {
        handlenote: null,
        handleuser: null,
        rcvname: null,
        rcvphone: null,
        rcvpostcode: null,
        rcvprovincecode: null,
        rcvprovincename: null,
        rcvcitycode: null,
        rcvcityname: null,
        rcvregionname: null,
        rcvregioncode: null,
        rcvaddress: null,
        returnid: null,
      },
      portList: [],
      id: null,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      productList: Object.assign({}, defaultOrderReturnApply),
      productList: {},
      proofPics: null,
      companyAddressList: null,
      rules: {
        handlenote: [
          {
            required: true,
            message: i18n.t("SEARCHING.ENTERREMARKS"),
            trigger: "blur",
          },
        ],
        handleuser: [
          {
            required: true,
            message: i18n.t("SEARCHING.PLEASEENTERNAME"),
            trigger: "blur",
          },
        ],
        rcvname: [
          {
            required: true,
            message: i18n.t("SEARCHING.PCONSIGNEENAME"),
            trigger: "blur",
          },
        ],
        rcvphone: [
          {
            required: true,
            message: i18n.t("SEARCHING.YOURCONTACT"),
            trigger: "blur",
          },
        ],
        rcvpostcode: [
          {
            required: true,
            message: i18n.t("SEARCHING.PLEASEENTER"),
            trigger: "blur",
          },
        ],
        rcvprovincename: [
          {
            required: true,
            message: i18n.t("SEARCHING.ENTERPROVINCE"),
            trigger: "blur",
          },
        ],
        rcvaddress: [
          {
            required: true,
            message: i18n.t("SEARCHING.PLEASEENTERADDD"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.id = this.$route.params.returnid;
    this.getDetail();
  },
  filters: {
    formatStatus(status) {
      if (status == 0) {
        return i18n.t("SEARCHING.PENDINGA");
      } else if (status == 1) {
        return i18n.t("SEARCHING.PENDINGA");
      } else if (status == 2) {
        return i18n.t("FORMHEAD.STOCKS");
      } else {
        return i18n.t("SEARCHING.DENIED");
      }
    },
  },
  methods: {
    getDetail() {
      returnOrderInfo(this.$route.params.returnid).then((response) => {
        console.log(response);
        this.productList = response.orderInfo;
        // this.productList.prdattr = JSON.parse(this.productList.prdattr);
        let obj = {};
        obj["prdpic"] = response.orderInfo.prdpic;
        obj["prdname"] = response.orderInfo.prdname;
        obj["prdprice"] = response.orderInfo.prdprice;
        obj["prdsn"] = response.orderInfo.prdsn;
        obj["prdattr"] = response.orderInfo.prdattr;
        obj["prdcount"] = response.orderInfo.prdcount;
        this.portList.push(obj);
        console.log(this.portList);
      });
    },
    // 省市区
    onSelected(val) {
      console.log(val);
      this.form.rcvprovincename = val.province.value;
      this.form.rcvprovincecode = val.province.code;
      this.form.rcvcityname = val.city.value;
      this.form.rcvcitycode = val.city.code;
      this.form.rcvregionname = val.area.value;
      this.form.rcvregioncode = val.area.code;
    },
    // 确认退货
    handleUpdateStatus() {
      console.log(this.updateStatusParam);
      this.$confirm(i18n.t("SEARCHING.WANTTODO"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        updateApplyStatu(this.id).then((response) => {
          console.log(response);
          this.$message({
            type: "success",
            message: i18n.t("SEARCHING.OPERATESUC"),
            duration: 1000,
          });
          this.$router.back();
        });
      });
    },
    // 拒绝
    handleUpdate() {
      // return/refuseOrder
      // returnid
      refuseOrder(this.$route.params.returnid).then((res) => {
        console.log(res);
        this.$router.push({
          name: "apply",
        });
      });
    },
    // 同意
    handleConsent() {
      // updadeReturnOrder
      this.dialogFormVisible = true;
    },
    // 点击修改收货地址
    upaddress(formName) {
      this.form.returnid = this.id;
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updadeReturnOrder(this.form).then((res) => {
            console.log(res);
            this.$message({
              message: i18n.t("SEARCHING.SUCCESSFULLY"),
              type: "success",
            });
            this.dialogFormVisible = false;
            this.$router.push({
              name: "returnApplyDetail",
              params: { returnid: this.id },
            });
          });
        } else {
          this.$message({
            message: i18n.t("SEARCHING.ISSOME"),
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.standard-margin {
  margin-top: 15px;
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}

.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 15px;
}

.form-left-bg {
  background: #f2f6fc;
}
.btn {
  margin: 20px auto;
  margin-left: 400px;
}
</style>


