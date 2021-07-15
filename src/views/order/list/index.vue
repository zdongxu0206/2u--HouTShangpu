<template> 
  <div class="app-container">
    <el-card
      class="filter-container"
      shadow="never"
    >
      <div>
        <i class="el-icon-search"></i>
        <span>{{$t('SEARCHING.SCREENING')}}</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          {{$t('SEARCHING.QUERYSEARCH')}}
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          {{$t('SEARCHING.RESET')}}
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <!-- 订单id -->
          <el-form-item :label="$t('FORMHEAD.ORDERID')+':'">
            <el-input
              clearable
              v-model="listQuery.orderid"
              class="input-width"
              :placeholder="$t('FORMHEAD.ORDERID')"
            ></el-input>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item :label="$t('FORMHEAD.ORDERSTATUS')+':'">
            <el-select
              filterable
              v-model="listQuery.status"
              class="input-width"
              :placeholder="$t('FORMHEAD.ORDERSTATUS')"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item :label="$t('SEARCHING.CONSIGNEENAME')+':'">
            <el-input
              clearable
              v-model="listQuery.rcvname"
              class="input-width"
              :placeholder="$t('SEARCHING.CONSIGNEENAME')"
            ></el-input>
          </el-form-item>
          <!-- 支付状态 -->
          <el-form-item :label="$t('HOME.STATEOFP')+':'">
            <el-select
              filterable
              v-model="listQuery.paystatus"
              class="input-width"
              :placeholder="$t('HOME.STATEOFP')"
              clearable
              @change="retrieveEvents"
            >
              <el-option
                v-for="item in paystatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 支付币种 -->
          <el-form-item :label="$t('HOME.USD')+':'">
            <el-select
              filterable
              v-model="listQuery.prepaycurrency"
              class="input-width"
              :placeholder="$t('HOME.USD')"
              clearable
            >
              <el-option
                v-for="item in prepaycurrencyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 发货日期 -->
          <el-form-item :label="$t('HOME.DELIVERYDATE')+':'">
            <el-date-picker
              class="input-width"
              v-model="listQuery.deliverytime"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('HOME.DELIVERYDATE')"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 下单日期 -->
          <!-- <el-form-item :label="$t('HOME.OFORDER')+':'">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createtime"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('HOME.OFORDER')"
            >
            </el-date-picker>
          </el-form-item> -->
          <!-- 支付日期 -->
          <el-form-item :label="$t('HOME.PAYMENTTIME')+':'">
            <el-date-picker
              class="input-width"
              v-model="listQuery.paytime"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('HOME.PAYMENTTIME')"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 下单时间 -->
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="listQuery.timehorizon"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card
      class="operate-container"
      shadow="never"
    >
      <i class="el-icon-tickets"></i>
      <span>{{$t('SEARCHING.DATALIST')}}</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        :data="list"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <!-- 订单id -->
        <el-table-column
          :label="$t('FORMHEAD.ORDERID')"
          type="index"
          width="140"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.orderid}}</template>
        </el-table-column>
        <!-- 商品信息 -->
        <el-table-column
          :label="$t('ORDERLIST.COMMODITYINFO')"
          type="index"
          width="500"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-for="(item,ind) in scope.row.prdinfo"
              :key="ind"
              class="flexbuju"
            >
              <img
                style="width:100px;height:100px"
                :src="item.prdimg"
              >
              <div
                v-for="(i ,d) in item.prdattr"
                :key="d"
              >
                {{i.value}}
                <br />
                {{$t('FORM.ABELPRINTER')}} : {{i.key}}
              </div>
              <span>{{$t('FORM.UNITCOST')}} : ￥ {{item.prd2uprice}}</span>
              <span>{{$t('SEARCHING.NUMBER')}} : {{item.prdquantity}}</span>
            </div>

          </template>
        </el-table-column>
        <!-- 用户账号 -->
        <el-table-column
          label="用户信息"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <div class="geshitext">
              <span> 收货人:{{scope.row.rcvname}}</span>
              <br />
              <span>电话:{{scope.row.rcvphone}}</span>
              <br />
              <span>地址:{{scope.row.rcvprovincename}}{{scope.row.rcvcityname}}{{scope.row.rcvaddress}}</span>
            </div>
          </template>
        </el-table-column>

        <!-- 订单总金额 -->
        <el-table-column
          :label="$t('ORDERLIST.ORDERAMOUNT')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">￥{{scope.row.amttotal}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.PAYMENT')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.paytype}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.ORDERSTATUS')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <!-- 提交时间 -->
        <el-table-column
          :label="$t('ORDERLIST.SUBMISSION')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.createtime}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.ACTION')"
          width="300"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <!-- 共有 -->
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >{{$t('ORDERLIST.VIEWORDER')}}</el-button>
            <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status=='00'"
            >{{$t('ORDERLIST.CLOSE')}}</el-button>
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status==10"
            >{{$t('LOCALIZATION.SHIPMENT')}}</el-button>
            <el-button
              size="mini"
              @click="handleDeliveryYu(scope.$index, scope.row)"
              v-show="scope.row.status==10 || scope.row.status=='00'"
            >{{$t('LOCALIZATION.PICKUP')}}</el-button>
            <!-- 物流查询 -->
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status==11 || scope.row.status==41 || scope.row.status==21 || scope.row.status==51"
            >{{$t('SEARCHING.ORDERTRACKING')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status==98 || scope.row.status==99"
            >{{$t('ORDERLIST.DELETETHE')}}</el-button>
            <el-button
              size="mini"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status==31"
            >{{$t('SEARCHING.AFTERSSALE')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        filterable
        size="small"
        v-model="operateType"
        :placeholder="$t('SEARCHING.BATCHOPERATION')"
      >
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >
        {{$t('FORM.CONFIRM')}}
      </el-button>
      <!-- 订单总额  订单总收入 -->
      <div class="numberl">
        <span
          class="dingdanz"
          style="color:#666"
        >{{$t('HOME.ORDEAMOUNT')}} : </span>
        <span style="color:#666"> A2U : <span class="number">￥ {{orderamtsum.A2U}}</span> </span>
        <span style="color:#666"> CNY : <span class="number">￥ {{orderamtsum.CNY}}</span> </span>
        <span style="color:#666"> USD : <span class="number">￥ {{orderamtsum.USD}}</span> </span>
        <span
          class="dingdanz"
          style="margin-left:20px;color:#666"
        > {{$t('HOME.ORDERREVENUE')}} : </span>
        <span style="color:#666"> A2U : <span class="number">￥ {{orderincome.A2U}}</span> </span>
        <span style="color:#666"> CNY : <span class="number">￥ {{orderincome.CNY}}</span> </span>
        <span style="color:#666"> USD : <span class="number">￥ {{orderincome.USD}}</span> </span>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.limit"
        :page-sizes="[20,30,50,100]"
        :current-page.sync="listQuery.start"
        :total="totalCount"
      />
    </div>
    <!-- 订单追踪 -->
    <el-dialog
      :title="$t('ROLLOVERS.HINT')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal='false'
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.AcceptTime"
        >
          {{activity.AcceptStation}}
        </el-timeline-item>
      </el-timeline>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false"> {{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  deleteOrder,
  ordership,
  downOrder,
  ordersum,
  ordercount,
} from "@/api/orderList";
import LogisticsDialog from "@/views/order/list/components/logisticsDialog";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  orderSn: null,
  username: null,
  status: null,
  timehorizon: null,
  orderid: null,
  rcvname: null,
  // 支付状态
  paystatus: null,
  deliverytime: null,
  paytime: null,
  prepaycurrency: null,
};
export default {
  name: "orderList",
  components: { LogisticsDialog },
  data() {
    return {
      activities: [],
      selects: "",
      orderamtsum: {},
      orderincome: {},
      value: Boolean,
      // 物流跟踪谈弹出框
      dialogVisible: false,
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      totalCount: null,
      // 验证框 按钮
      operation: [],
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: [],
      },
      paystatusOptions: [
        {
          label: i18n.t("FORM.ALL"),
          value: "666",
        },
        {
          label: i18n.t("HOME.NONPAYMENT"),
          value: "0",
        },
        {
          label: i18n.t("HOME.HAVEPAID"),
          value: "1",
        },
      ],
      prepaycurrencyOptions: [
        {
          label: i18n.t("FORM.ALL"),
          value: "666",
        },
        {
          label: "CNY",
          value: "CNY",
        },
        {
          label: "A2U",
          value: "A2U",
        },
        {
          label: "USD",
          value: "USD",
        },
        {
          label: "AUD",
          value: "AUD",
        },
      ],
      statusOptions: [
        {
          label: i18n.t("FORM.ALL"),
          value: "666",
        },
        {
          label: i18n.t("FORMHEAD.OBLIGATION"),
          value: "00",
        },
        {
          label: i18n.t("FORMHEAD.HEGOODS"),
          value: 10,
        },
        {
          label: i18n.t("FORMHEAD.SHIPPED"),
          value: 11,
        },
        {
          label: i18n.t("FORMHEAD.BUTAFTER"),
          value: 21,
        },
        {
          label: i18n.t("FORMHEAD.AFTERTHE"),
          value: 31,
        },
        {
          label: i18n.t("FORMHEAD.STOCKS"),
          value: 41,
        },
        {
          label: i18n.t("FORMHEAD.EVALUATION"),
          value: 51,
        },
        {
          label: i18n.t("FORMHEAD.CANCELED"),
          value: 99,
        },
        {
          label: i18n.t("FORMHEAD.CLOSED"),
          value: 98,
        },
      ],
      operateOptions: [
        {
          label: i18n.t("FORM.ALL"),
          value: "666",
        },
        {
          label: i18n.t("ORDERLIST.BATCH"),
          value: 1,
        },
        {
          label: i18n.t("ORDERLIST.CLOSE"),
          value: 2,
        },
        {
          label: i18n.t("ORDERLIST.DELETETHE"),
          value: 3,
        },
      ],
      logisticsDialogVisible: false,
    };
  },
  created() {
    this.getList();
    // 获取订单总额
    this.ordersum();
    // 获取订单总收入
    this.ordercount();
  },
  filters: {
    formatStatus(value) {
      if (value == "00") {
        return i18n.t("FORMHEAD.OBLIGATION");
      } else if (value == 10) {
        return i18n.t("FORMHEAD.HEGOODS");
      } else if (value == 11) {
        return i18n.t("FORMHEAD.SHIPPED");
      } else if (value == 21) {
        return i18n.t("SEARCHING.RECEIVED");
      } else if (value == 31) {
        return i18n.t("FORMHEAD.AFTERTHE");
      } else if (value == 41) {
        return i18n.t("FORMHEAD.STOCKS");
      } else if (value == 51) {
        return i18n.t("FORMHEAD.EVALUATION");
      } else if (value == 99) {
        return i18n.t("FORMHEAD.CANCELED");
      } else if (value == 98) {
        return i18n.t("FORMHEAD.CLOSED");
      } else {
        return i18n.t("ORDERLIST.STATELESS");
      }
    },
  },
  methods: {
    ordersum() {
      let obj = {};
      const storeid = localStorage.getItem("storeid");
      const orderid = this.listQuery.orderid;
      obj["storeid"] = storeid;
      obj["orderid"] = orderid;
      obj["start"] = this.listQuery.pageNum - 1;
      obj["limit"] = this.listQuery.pageSize;
      if (this.listQuery.timehorizon) {
        obj["createtime"] = this.listQuery.timehorizon[0];
        obj["endtime"] = this.listQuery.timehorizon[1];
      }
      obj["rcvname"] = this.listQuery.rcvname;
      obj["deliverytime"] = this.listQuery.deliverytime;
      obj["paytime"] = this.listQuery.paytime;
      if (this.listQuery.status == "666") {
        obj["status"] = null;
      } else {
        obj["status"] = this.listQuery.status;
      }
      if (this.listQuery.paystatus == "666") {
        obj["paystatus"] = null;
      } else {
        obj["paystatus"] = this.listQuery.paystatus;
      }
      if (this.listQuery.prepaycurrency == "666") {
        obj["prepaycurrency"] = null;
      } else {
        obj["prepaycurrency"] = this.listQuery.prepaycurrency;
      }
      ordersum(obj).then((res) => {
        console.log(res);
        this.orderamtsum = res.orderamtsum;
      });
    },
    ordercount() {
      let obj = {};
      const orderid = this.listQuery.orderid;
      obj["storeid"] = localStorage.getItem("storeid");
      obj["orderid"] = orderid;
      obj["start"] = this.listQuery.pageNum - 1;
      obj["limit"] = this.listQuery.pageSize;
      obj["rcvname"] = this.listQuery.rcvname;
      obj["deliverytime"] = this.listQuery.deliverytime;
      obj["paytime"] = this.listQuery.paytime;
      if (this.listQuery.timehorizon) {
        obj["createtime"] = this.listQuery.timehorizon[0];
        obj["endtime"] = this.listQuery.timehorizon[1];
      }
      if (this.listQuery.status == "666") {
        obj["status"] = null;
      } else {
        obj["status"] = this.listQuery.status;
      }
      if (this.listQuery.paystatus == "666") {
        obj["paystatus"] = null;
      } else {
        obj["paystatus"] = this.listQuery.paystatus;
      }
      if (this.listQuery.prepaycurrency == "666") {
        obj["prepaycurrency"] = null;
      } else {
        obj["prepaycurrency"] = this.listQuery.prepaycurrency;
      }
      ordercount(obj).then((res) => {
        console.log(res);
        this.orderincome = res.orderincome;
      });
    },
    // 获取列表
    getList() {
      console.log(this.listQuery.timehorizon);
      this.listLoading = true;
      let obj = {};
      const storeid = localStorage.getItem("storeid");
      const orderid = this.listQuery.orderid;
      obj["storeid"] = storeid;
      obj["orderid"] = orderid;
      obj["start"] = this.listQuery.pageNum - 1;
      obj["limit"] = this.listQuery.pageSize;
      if (this.listQuery.timehorizon) {
        obj["createtime"] = this.listQuery.timehorizon[0];
        obj["endtime"] = this.listQuery.timehorizon[1];
      }

      obj["rcvname"] = this.listQuery.rcvname;
      if (this.listQuery.status == "666") {
        obj["status"] = null;
      } else {
        obj["status"] = this.listQuery.status;
      }
      if (this.listQuery.paystatus == "666") {
        obj["paystatus"] = null;
      } else {
        obj["paystatus"] = this.listQuery.paystatus;
      }
      if (this.listQuery.prepaycurrency == "666") {
        obj["prepaycurrency"] = null;
      } else {
        obj["prepaycurrency"] = this.listQuery.prepaycurrency;
      }
      obj["deliverytime"] = this.listQuery.deliverytime;
      obj["paytime"] = this.listQuery.paytime;

      obj["prepaycurrency"] = this.listQuery.prepaycurrency;

      fetchList(obj).then((response) => {
        this.listLoading = false;
        this.list = response.orderlist;
        this.operation = response.columnData.operation;
        this.totalCount = parseInt(response.totalCount);
        // 获取订单总额
        this.ordersum();
        // 获取订单总收入
        this.ordercount();
      });
    },
    // 检索根据订单状态 查询
    retrieveEvents(val) {
      console.log(val);
      this.selects = val;
    },
    handleClose(done) {
      this.$confirm(i18n.t("ROLLOVERS.SHUTDOWN"))
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 查询搜索
    handleResetSearch() {
      this.getList();

      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      // 刷新页面
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查看此订单
    handleViewOrder(index, row) {
      console.log(row);
      this.$router.push({
        name: "orderDetail",
        query: { orderid: row.orderid },
      });
    },
    // 订单发货
    handleDeliveryOrder(index, row) {
      console.log(row);
      this.$router.push({
        name: "deliverOrderList",
        query: { orderid: row.orderid },
      });
    },
    // 预约取件
    handleDeliveryYu(index, row) {
      this.$router.push({ name: "bookPick", query: { orderid: row.orderid } });
    },
    // 订单追踪
    handleViewLogistics(index, row) {
      console.log(row);
      ordership(row.orderid).then((res) => {
        console.log(res);
        this.activities = res.rs.Traces;
      });
      this.dialogVisible = true;
    },
    // 删除订单，等操作
    handleDeleteOrder(index, row) {
      console.log(row);
      let ids = [];
      ids.push(row.orderid);
      console.log(ids);
      this.deleteOrder(ids);
    },
    // 关闭订单
    handleCloseOrder(index, row) {
      console.log(row);
      const userid = localStorage.getItem("userid");
      let params = {};
      params["userid"] = userid;
      params["orderid"] = row.orderid;
      this.$confirm(i18n.t("ROLLOVERS.CLOSEORDER"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          downOrder(params).then((res) => {
            this.$message({
              type: "success",
              message: i18n.t("ROLLOVERS.SUCCESS"),
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("ROLLOVERS.CLOSEDCANCELLED"),
          });
        });
    },
    // 批量操作
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: i18n.t("ROLLOVERS.OPERATE"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.operateType == 1) {
        //批量发货
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            list.push(this.covertOrder(this.multipleSelection[i]));
          }
        }
        if (list.length == 0) {
          this.$message({
            message: i18n.t("ROLLOVERS.NOSHIPPING"),
            type: "warning",
            duration: 1000,
          });
          return;
        }
        this.$router.push({
          path: "/oms/deliverOrderList",
          query: { list: list },
        });
      } else if (this.operateType == 2) {
        //关闭订单
        this.closeOrder.orderIds = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].orderid);
        }
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType == 3) {
        //删除订单
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].orderid);
        }
        this.deleteOrder(ids);
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },

    // 关闭订单
    // handleCloseOrderConfirm() {
    //   // if (this.closeOrder.content == null || this.closeOrder.content === "") {
    //   //   this.$message({
    //   //     message: "操作备注不能为空",
    //   //     type: "warning",
    //   //     duration: 1000,
    //   //   });
    //   //   return;
    //   // }
    //   const userid = localStorage.getItem("userid");
    //   let params = new URLSearchParams();
    //   params.append("userid", userid);
    //   params.append("orderid", this.closeOrder.orderIds);
    //   params.append("note", this.closeOrder.content);
    //   downOrder(params).then((response) => {
    //     this.closeOrder.orderIds = [];
    //     this.closeOrder.dialogVisible = false;
    //     this.getList();
    //     this.$message({
    //       message: "修改成功",
    //       type: "success",
    //       duration: 1000,
    //     });
    //   });
    // },
    // 删除
    deleteOrder(ids) {
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        const storeid = localStorage.getItem("storeid");
        console.log(storeid, ids);
        deleteOrder(storeid, ids).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    covertOrder(order) {
      let address =
        order.receiverProvince +
        order.receiverCity +
        order.receiverRegion +
        order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        orderSn: order.orderSn,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null,
      };
      return listItem;
    },
  },
};
</script>
<style scoped>
.flexbuju {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}
.input-width {
  width: 203px;
}
.numberl {
  margin: 20px 0;
  display: inline-block;
  margin-left: 150px;
}
.dingdanz {
  font-weight: 12px;
  font-size: 18px;
}
.number {
  color: rgb(251, 97, 97);
}
.geshitext {
  text-align: left;
  margin-left: 10px;
}
</style>


