<template> 
  <div class="app-container">
    <el-card
      class="operate-container"
      shadow="never"
    >
      <i class="el-icon-tickets"></i>
      <span>{{$t('SEARCHING.DELIVERYLIST')}}</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="deliverOrderTable"
        style="width: 100%;"
        :data="list"
        border
      >
        <el-table-column
          :label="$t('ORDERLIST.ORDERREF')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.ordersn}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.CONSIGNEE')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.rcvname}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.PHONE')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.rcvphone}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.TRACKINGNUMBER')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.deliverysn}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.SHIPPINGADDRESS')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.rcvaddress}}</template>
        </el-table-column>
        <!-- 快递公司 -->
        <el-table-column
          :label="$t('SEARCHING.COURIERSERVICES')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              :placeholder="$t('SEARCHING.COURIERSERVICES')"
              v-model="scope.row.deliveryname"
              size="small"
              filterable
            >
              <el-option
                v-for="(item,index) in companyOptions"
                :key="index"
                :label="item.codname"
                :value="item.codno"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.TRACKINGNUMBER')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.deliverysn"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          @click="confirm"
          type="primary"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  deliverList,
  loadshipcompanylist,
  deliveryOrder,
} from "@/api/orderList";
import i18n from "element-ui/lib/locale";
export default {
  name: "deliverOrderList",
  data() {
    return {
      list: [],
      companyOptions: null,
    };
  },
  created() {
    // 获取发货列表
    deliverList(this.$route.query.orderid).then((res) => {
      // console.log(res);
      this.list = res.orderlist;
    });
    // 获取快递公司名称
    loadshipcompanylist().then((res) => {
      console.log(res);
      this.companyOptions = res.shipCompanyArray;
    });
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    // 订单发货
    confirm() {
      this.$confirm(i18n.t("SEARCHING.SHIPORNOT"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          console.log(this.list);
          const storeid = localStorage.getItem("storeid");
          const orderid = this.$route.query.orderid;
          const deliverysn = this.list[0].deliverysn;
          const deliveryname = this.list[0].deliveryname;
          const cms_accname = localStorage.getItem("cms_accname");
          let obj = {};
          obj["storeid"] = storeid;
          obj["orderid"] = orderid;
          obj["deliverysn"] = deliverysn;
          obj["deliveryname"] = deliveryname;
          obj["cms_accname"] = cms_accname;
          console.log(obj);
          deliveryOrder(obj).then((response) => {
            this.$router.back();
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.SHIPPINGSUCCESS"),
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("SEARCHING.BEENCANCELLED"),
          });
        });
    },
  },
};
</script>
<style></style>


