<template> 
  <div class="app-container">
    <el-card
      class="filter-container"
      shadow="never"
      style="border:0"
    >
      <div style="margin-top: 15px">
        <el-form
          :label-position="labelPosition"
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <div>
            <el-form-item
              :label="$t('ORDERLIST.LOGISTICS')"
              style="display: inline-block;width:35%"
              required
            >
              <el-select
                filterable
                class="input-width"
                :placeholder="$t('ORDERLIST.LOGISTICS')"
                v-model="value"
                clearable
                @change="headmlXuan"
                style="width:350px"
              >
                <el-option
                  v-for="item in listQuery.shipArray"
                  :key="item.kdn_code"
                  :label="item.kdn_name"
                  :value="item.kdn_code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('ORDERLIST.ACTIVEONEY')"
              style="display: inline-block;width:25%"
              required
            >
              <el-select
                v-model="types"
                class="input-width"
                :placeholder="$t('ORDERLIST.ACTIVEONEY')"
                clearable
                @change="headmlXuans"
              >
                <el-option
                  v-for="item in type"
                  :key="item.exptype_code"
                  :label="item.exptype_name"
                  :value="item.exptype_code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              style="display: inline-block;width:23%"
              :label="$t('ORDERLIST.PAYMENT')"
              required
            >
              <el-radio
                v-model="radio"
                label="1"
              >{{$t('ORDERLIST.SPOTPAYMENT')}}</el-radio>
              <el-radio
                v-model="radio"
                label="2"
              >{{$t('ORDERLIST.FREIGHTCOLLECT')}}</el-radio>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              :label="$t('ORDERLIST.APPOINTMENTS')"
              style="display: inline-block;width:35%"
            >
              <el-date-picker
                style="float: right;z-index: 1"
                size="small"
                v-model="orderCountDate"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              style="display: inline-block;width:23%;"
              :label="$t('SEARCHING.NUMBER')"
            >
              <el-input
                :rows="2"
                style="width:200px"
                type='number'
                :placeholder="$t('SEARCHING.NUMBER')"
                v-model="quantity"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('ORDERLIST.NOTES')"
              style="margin-left:25px"
            >
              <el-input
                type="textarea"
                :rows="1.5"
                style="width:200px;"
                :placeholder="$t('ORDERLIST.NOTES')"
                v-model="remark"
              >
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <div>
      <el-form
        :label-position="labelPosition"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="margin-top:20px"
        label-width="80px"
        ref="staffinfoForm"
      >
        <!-- 收件人信息 -->
        <el-card
          class="operate-container"
          style="width:49%;float:left;margin-right:5px"
        >
          <span
            class="xiaconbianku"
            style="display:block"
          > {{$t('ORDERLIST.RECIPIENT')}}</span>

          <el-form-item
            :label="$t('SEARCHING.YOUANAME')"
            label-width="116px"
            required
            style="margin-left:20px;margin-top:20px;display:block"
          >
            <el-input
              style="width:230px"
              v-model="formInline.rcvname"
              :placeholder="$t('SEARCHING.YOUANAME')"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="邮编"
            style="margin-left:100px;margin-top:20px"
          >
            <el-input
              style="width:230px"
              v-model="formInline.rcvpostcode"
              placeholder="请输入收件人邮编"
            ></el-input>
          </el-form-item> -->

          <el-form-item
            :label="$t('SEARCHING.PHONE')"
            label-width="116px"
            style="margin-left:20px;display:block"
            required
          >
            <el-input
              v-model="formInline.rcvphone"
              style="width:230px"
              :placeholder="$t('SEARCHING.PHONE')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('ORDERLIST.AREAID')"
            required
            label-width="100px"
            style="margin-left:35px"
          >
            <v-distpicker
              :province="formInline.rcvprovincename"
              :city="formInline.rcvcityname"
              :area="formInline.rcvregionname"
              @selected="onSelectRegion"
            ></v-distpicker>
          </el-form-item>
          <el-form-item
            :label="$t('ORDERLIST.COMMODITYIMAGES')"
            required
            label-width="100px"
            style="display:block;margin-left:35px;"
          >
            <el-input
              v-model="formInline.rcvaddress"
              style="width:420px"
              type="textarea"
              rows="3"
            >
            </el-input>
          </el-form-item>
        </el-card>
        <!-- 寄件人信息 -->
        <el-card
          class="operate-container"
          style="width:50%;float:left"
        >
          <span
            style="display:block"
            class="xiaconbianku"
          >{{$t('ORDERLIST.SENDER')}}</span>
          <el-form-item
            :label="$t('SEARCHING.YOUANAME')"
            label-width="116px"
            required
            style="margin-left:20px;margin-top:20px;display:block"
          >
            <el-input
              style="width:250px"
              v-model="formInline.name"
              :placeholder="$t('SEARCHING.YOUANAME')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('SEARCHING.PHONE')"
            label-width="116px"
            required
            style="margin-left:20px;display:block"
          >
            <el-input
              v-model="formInline.mobile"
              style="width:250px"
              :placeholder="$t('SEARCHING.PHONE')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('ORDERLIST.AREAID')"
            required
            label-width="100px"
            style="margin-left:35px"
          >
            <v-distpicker
              :province="formInline.province_code"
              :city="formInline.city_name"
              :area="formInline.exp_area_name"
              @selected="onSelectRegions"
            ></v-distpicker>
          </el-form-item>
          <el-form-item
            :label="$t('ORDERLIST.COMMODITYIMAGES')"
            required
            label-width="100px"
            style="display:block;margin-left:35px;"
          >
            <el-input
              v-model="formInline.address"
              style="width:420px"
              type="textarea"
              rows="3"
            >
            </el-input>
          </el-form-item>
        </el-card>
        <el-form-item style="float:right;margin-top:20px;">
          <el-button
            type="primary"
            @click="onSubmit"
          > {{$t('LOCALIZATION.PICKUP')}}</el-button>
          <el-button
            type="primary"
            @click="Qreservation"
          >{{$t('SEARCHING.THERESERVATION')}}</el-button>
          <el-button>{{$t('SEARCHING.CLOSENI')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  loadshipdata,
  initializeList,
  loadshipcompanylist,
  loadlogisticsexptype,
  pickupapporintment,
  cancelpickupappointement,
} from "@/api/orderList";
import i18n from "element-ui/lib/locale";
// 省市区选择器
import VDistpicker from "v-distpicker";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
};
const defaultReturnReason = {
  name: null,
  sort: 0,
  status: 1,
};
const defaultReceiverInfo = {
  // 收货人姓名
  rcvname: null,
  // 邮编
  rcvpostcode: null,
  // 手机号
  rcvphone: null,
  // 省
  rcvprovincename: null,
  // 省编码
  rcvprovincecode: null,
  // 市  rcvcityname
  rcvcityname: null,
  // 市编码
  rcvcitycode: null,
  // 区
  rcvregionname: null,
  // 区编码
  rcvregioncode: null,
  // 详细地址
  rcvaddress: null,

  //             寄件人信息
  name: null,
  // 地址
  address: null,
  // 省
  province_name: null,
  // 省编码
  province_code: null,
  // 市
  city_name: null,
  // 市编码
  city_code: null,
  // 区
  exp_area_name: null,
  // 区编码
  exp_area_code: null,
  // 详细地址
  company: null,
  // 手机
  mobile: null,

  // 物流code(快递鸟)
  shipper_code: null,
};
export default {
  components: { VDistpicker },
  name: "returnReasonList",
  data() {
    return {
      // 初始时间
      orderCountDate: "",
      // 业务类型
      types: "",
      // 数量
      quantity: "",
      // 备注
      remark: "",
      type: [],
      value: "",
      textarea: "",
      listQuery: {},
      labelPosition: "right",
      formInline: Object.assign({}, defaultReceiverInfo),
      formInline: [],
      radio: "1",
      value3: "",
      list: null,
      total: null,
      multipleSelection: [],
      listLoading: true,
      operateType: null,
      operateOptions: [
        {
          label: i18n.t("FORMHEAD.DEL"),
          value: 1,
        },
      ],
      dialogVisible: false,
      operateReasonId: null,
    };
  },
  // 页面挂载
  created() {
    // 获取预约取件支持的快递公司
    loadshipdata(1).then((res) => {
      console.log(res);
      this.listQuery = res;
    });
    // 获取收件,发件人信息
    const orderid = this.$route.query.orderid;
    const storeid = localStorage.getItem("storeid");
    initializeList(storeid, orderid).then((res) => {
      console.log(res);
      this.order = res.receiver;
      this.formInline = res.receiver;
      console.log(this.order.rcvprovincecode);
      this.formInline = {
        // 收件人信息
        rcvname: this.order.rcvname,
        rcvphone: this.order.rcvphone,
        rcvprovincecode: this.order.rcvprovincecode,
        rcvaddress: this.order.rcvaddress,
        rcvprovincename: this.order.rcvprovincename,
        rcvcityname: this.order.rcvcityname,
        rcvregionname: this.order.rcvregionname,
        // 寄件人信息
        name: this.order.name,
        province_name: this.order.province_name,
        province_code: this.order.province_code,
        city_code: this.order.city_code,
        city_name: this.order.city_name,
        exp_area_name: this.order.exp_area_name,
        tel: this.order.tel,
        mobile: this.order.mobile,
        address: this.order.address,
      };
    });
  },
  methods: {
    // 获取省市区的编码 收件人  data为省市区的值 把他们传输出去
    onSelectRegion(data) {
      console.log(data);
      this.formInline.rcvprovincename = data.province.value;
      this.formInline.rcvprovincecode = data.province.code;
      this.formInline.rcvcityname = data.city.value;
      this.formInline.rcvcitycode = data.city.code;
      this.formInline.rcvregionname = data.area.value;
      this.formInline.rcvregioncode = data.area.code;
    },
    // 获取省市区的编码 寄件人  data为省市区的值 把他们传输出去
    onSelectRegions(data) {
      console.log(data);
      this.formInline.province_name = data.province.value;
      this.formInline.city_name = data.city.value;
      this.formInline.exp_area_name = data.area.value;
    },
    // 获取表单输入的被value值
    // /预约取件
    onSubmit() {
      console.log(this.radio);
      console.log(this.types);
      console.log(this.orderCountDate[0]);
      console.log(this.orderCountDate[1]);
      console.log(this.quantity);
      console.log(this.remark);
      this.$refs["staffinfoForm"].validate((valid) => {
        console.log(valid);
        console.log(this.formInline);
        const storeid = localStorage.getItem("storeid");
        const orderid = this.$route.query.orderid;
        // 物流信息对象
        const pickupbean = {};
        // 支付方式
        pickupbean["pay_type"] = this.radio;
        // 物流code(快递鸟)
        pickupbean["shipper_code"] = this.value;
        // 业务类型
        pickupbean["exp_type"] = this.types;
        // 开始时间
        pickupbean["start_date"] = this.orderCountDate[0];
        // 结束时间
        pickupbean["end_date"] = this.orderCountDate[1];
        // 数量
        pickupbean["quantity"] = this.quantity;
        // 备注内容
        pickupbean["remark"] = this.remark;
        // 收件人对象
        const receiver = {};
        // 姓名
        receiver["rcvname"] = this.formInline.rcvname;
        // 手机号
        receiver["rcvphone"] = this.formInline.rcvphone;
        // 详细地址
        receiver["rcvaddress"] = this.formInline.rcvaddress;
        // 省
        receiver["rcvprovincename"] = this.formInline.rcvprovincename;
        // 省编码
        receiver["rcvprovincecode"] = this.formInline.rcvprovincecode;
        // 市
        receiver["rcvcityname"] = this.formInline.rcvcityname;
        // 市编码
        receiver["rcvcitycode"] = this.formInline.rcvcitycode;
        // 区
        receiver["rcvregionname"] = this.formInline.rcvregionname;
        // 区编码
        receiver["rcvregioncode"] = this.formInline.rcvregioncode;
        // 邮编
        receiver["rcvpostcode"] = this.formInline.rcvpostcode;
        console.log(receiver);
        // 寄件人对象
        const sender = {};
        // 地址
        sender["type"] = "2";
        sender["storeid"] = storeid;
        sender["name"] = this.formInline.name;
        sender["mobile"] = this.formInline.mobile;
        sender["address"] = this.formInline.address;
        sender["province_name"] = this.formInline.province_name;
        sender["province_code"] = this.formInline.province_code;
        sender["city_name"] = this.formInline.city_name;
        sender["city_code"] = this.formInline.city_code;
        sender["exp_area_name"] = this.formInline.exp_area_name;
        sender["exp_area_code"] = this.formInline.exp_area_code;
        pickupapporintment(storeid, orderid, pickupbean, receiver, sender).then(
          (res) => {
            console.log(res);
          }
        );
      });
    },
    // 取消预约
    Qreservation() {
      // 获取预约取件之后返回的id
      // 预留 之后调用
      this.$confirm(i18n.t("SEARCHING.CANCELTHERE"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          cancelpickupappointement(this.$route.query.orderid).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.WISSN"),
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("FORMHEAD.CANCELED"),
          });
        });
    },
    // 监听发货物流的下拉菜单
    headmlXuan(code) {
      console.log(this.value);
      // this.types = "";
      console.log(this.types);
      this.formInline.shipper_code = this.value;
      loadlogisticsexptype(this.value).then((res) => {
        // console.log(res);
        this.type = res.expTypeArray;
      });
    },
    // 监听业务类型的code
    headmlXuans(code) {
      console.log(this.types);
    },
  },
};
</script>
<style scoped>
.input-width {
  /* width: 80%; */
}
.xiaconbianku {
  border-bottom: 2px solid rgb(245, 245, 245);
  padding-bottom: 20px;
}
</style>


