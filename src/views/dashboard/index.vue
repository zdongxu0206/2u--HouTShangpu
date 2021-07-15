<template>
  <div>
    <div class="app-container">
      <el-row :gutter="defgutter">
        <el-col :span="defspan">
          <div
            class="out-border"
            @click="openUrl('wallet')"
          >
            <div class="layout-title">{{this.$t("HOME.USEROVERVIEW")}}</div>
            <div style="padding: 40px">
              <el-row>
                <el-col
                  :span="6"
                  class="color-danger overview-item-value"
                >{{ fetchList.amount }}</el-col>
                <el-col
                  :span="6"
                  class="color-danger overview-item-value"
                >{{ fetchList.waitcash }}</el-col>
                <el-col
                  :span="6"
                  class="color-danger overview-item-value"
                >{{ yuge.A2uamount }}</el-col>
                <el-col
                  :span="6"
                  class="color-danger overview-item-value"
                >{{ yuge.A2uwaitcash }}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col
                  :span="6"
                  class="overview-item-title"
                >{{$t("HOME.AMOUNTCNY")}}</el-col>
                <el-col
                  :span="6"
                  class="overview-item-title"
                >{{$t("HOME.CNYBALANCES")}}</el-col>
                <el-col
                  :span="6"
                  class="overview-item-title"
                >{{$t("HOME.A2UTOTAL")}}</el-col>
                <el-col
                  :span="6"
                  class="overview-item-title"
                >{{$t("HOME.A2UCURRENCY")}}</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="total-layout">
        <el-row :gutter="defgutter">
          <el-col :span="defspan/3">
            <div class="total-frame">
              <img
                :src="img_home_order"
                class="total-icon"
              />
              <div class="total-title">{{$t("HOME.ORDERSTODAY")}}</div>
              <div class="total-value"> {{ list.ordercounts || 0 }}</div>
            </div>
          </el-col>
          <el-col :span="defspan/3">
            <div class="total-frame">
              <img
                :src="img_home_today_amount"
                class="total-icon"
              />
              <div class="total-title">{{$t("HOME.TOTALSALES")}}</div>
              <div class="total-value">￥{{ list.ordercount.dateprice || 0 }}</div>
            </div>
          </el-col>
          <el-col :span="defspan/3">
            <div class="total-frame">
              <img
                :src="img_home_yesterday_amount"
                class="total-icon"
              />
              <div class="total-title">{{$t("HOME.THISMONTH")}}</div>
              <div class="total-value">￥{{ list.ordercount.sumprice || 0 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="defgutter">
        <el-col :span="defspan">
          <div
            class="un-handle-layout"
            @click="openUrl('order')"
          >
            <div class="layout-title">{{$t("HOME.PENDINGTRANSACTION")}}</div>
            <div class="un-handle-content">
              <el-row :gutter="defgutter">
                <el-col :span="defspan/3">
                  <div class="un-handle-item">
                    <span class="font-medium">{{$t("HOME.PENDINGPAYMENT")}}</span>
                    <span
                      style="float: right"
                      class="color-danger"
                    >{{ list.orderlist.unpaid || 0 }}</span>
                  </div>
                </el-col>
                <el-col :span="defspan/3">
                  <div class="un-handle-item">
                    <span class="font-medium">{{$t("HOME.COMPLETEDORDER")}}</span>
                    <span
                      style="float: right"
                      class="color-danger"
                    >{{ list.orderlist.delivered || 0 }}</span>
                  </div>
                </el-col>
                <el-col :span="defspan/3">
                  <div class="un-handle-item">
                    <span class="font-medium">{{$t("HOME.BECONFIRMED")}}</span>
                    <span
                      style="float: right"
                      class="color-danger"
                    >{{ list.orderlist.untake || 0 }}</span>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="defgutter">
                <el-col :span="defspan/3">
                  <div class="un-handle-item">
                    <span class="font-medium">{{$t("HOME.FORSHIPMENT")}}</span>
                    <span
                      style="float: right"
                      class="color-danger"
                    >{{ list.orderlist.undelivered || 0 }}</span>
                  </div>
                </el-col>
                <el-col :span="defspan/3">
                  <div class="un-handle-item">
                    <span class="font-medium">{{$t("HOME.RETURNORDERS")}}</span>
                    <span
                      style="float: right"
                      class="color-danger"
                    >{{ list.orderlist.returnorder || 0 }}</span>
                  </div>
                </el-col>
                <el-col :span="defspan/3">
                  <div class="un-handle-item">
                    <span class="font-medium">{{$t("HOME.ABOUTEXPIRE")}}</span>
                    <span
                      style="float: right"
                      class="color-danger"
                    >{{ list.orderlist.returnorder || 0 }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="overview-layout">
        <el-row :gutter="defgutter">
          <el-col :span="defspan">
            <div
              class="out-border"
              @click="openUrl('product')"
            >
              <div class="layout-title">{{$t("HOME.PRODUCTOVERVIEW")}}</div>
              <div style="padding: 40px">
                <el-row>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{ list.goodslist.shelf || 0 }}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{ list.goodslist.unshelf || 0 }}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{ list.goodslist.stocks || 0 }}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{ list.goodslist.goods || 0 }}</el-col>
                </el-row>
                <el-row class="font-medium">
                  <el-col
                    :span="6"
                    class="overview-item-title"
                  >{{$t("HOME.SHELVES")}}</el-col>
                  <el-col
                    :span="6"
                    class="overview-item-title"
                  >{{$t("HOME.HASBEEN")}}</el-col>
                  <el-col
                    :span="6"
                    class="overview-item-title"
                  >{{$t("HOME.OFSTOCK")}}</el-col>
                  <el-col
                    :span="6"
                    class="overview-item-title"
                  >{{$t("HOME.ALLGOODS")}}</el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="statistics-layout">
        <div class="layout-title">{{$t("HOME.STATISTICS")}}</div>
        <el-row>
          <el-col :span="4">
            <div style="padding: 20px">
              <div>
                <div style="color: #909399;font-size: 14px">{{$t("HOME.TOTALNUMBER")}}</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">{{ list.ordercount.mnew || 0 }}</div>
              </div>
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">{{$t("HOME.THISWEEKIEW")}}</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">{{ list.ordercount.datenew || 0 }}</div>
              </div>
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">{{$t("HOME.THISMONTH")}}</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">{{ list.ordercount.sumprice || 0 }}</div>
              </div>
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">{{$t("HOME.TOTALSALES")}}</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">{{ list.ordercount.dateprice || 0 }}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="20">
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
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
                @change="handleDateChange"
                :picker-options="pickerOptions"
              />
              <div>
                <ve-line
                  style="margin-top:150px"
                  :data="chartData"
                  :legend-visible="false"
                  :loading="loading"
                  :data-empty="dataEmpty"
                  :settings="chartSettings"
                />
                <template>
                </template>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { str2Date } from "@/utils/date";
import img_home_order from "@/assets/images/home_order.png";
import img_home_today_amount from "@/assets/images/home_today_amount.png";
import img_home_yesterday_amount from "@/assets/images/home_yesterday_amount.png";
import { fetchList, loadordercount, usera2ubalance } from "@/api/home";
import i18n from "element-ui/lib/locale";

export default {
  name: "home",
  data() {
    return {
      yuge: {},
      fetchList: {},
      list: {
        ordercount: {
          dateprice: 0,
        },
        orderlist: {
          unpaid: 0,
        },
        goodslist: {
          shelf: 0,
        },
      },
      DATA_FROM_BACKEND: {
        columns: ["日期", "订单数量"],
        rows: [],
      },
      // 最近一周 最近一月
      pickerOptions: {
        shortcuts: [
          {
            text: i18n.t("SEARCHING.LATESTWEEK"),
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.getFullYear();
              start.getMonth();
              start.getDate();
              end.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [end, start]);
            },
          },
          {
            text: i18n.t("SEARCHING.RECENTMONTH"),
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.getFullYear();
              start.getMonth();
              start.getDate();
              end.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [end, start]);
            },
          },
        ],
      },
      // 初始时间
      orderCountDate: "",
      chartSettings: {
        // 横轴数据模型
        xAxisType: "time",
        // 是否展示为面积图
        area: true,
        // 指标所在的轴
        axisSite: { right: ["orderAmount"] },
        // 设置指标的别名，同时作用于提示框和图例
        labelMap: { days: "订单数量" },
        showLine: ["订单数量"],
      },
      chartData: {
        columns: ["日期", "订单数量"],
        rows: [],
      },
      loading: false,
      dataEmpty: false,
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount,
      defgutter: 20,
      defspan: 24,
    };
  },

  created() {
    this.initOrderCountDate();
    this.getData();
    this.gethomecount();
    this.usera2ubalance();
  },
  methods: {
    // 获取a2u总金额
    usera2ubalance() {
      let storeid = localStorage.getItem("storeid");
      let userid = localStorage.getItem("userid");
      usera2ubalance(storeid, userid).then((res) => {
        console.log(res);
        this.yuge = res;
      });
    },
    // 获取首页数据
    gethomecount() {
      const storeid = localStorage.getItem("storeid");
      fetchList(storeid).then((res) => {
        console.log(res);
        this.fetchList = res;
      });
    },
    // 选择时间时获取数据
    handleDateChange() {
      this.getData();
    },
    initOrderCountDate() {
      let start = new Date();
      start.getFullYear();
      start.getMonth();
      start.getDate();
      const end = new Date(); //当前时间
      end.setTime(start.getTime() - 1000 * 60 * 60 * 24 * 7);
      // 目前时间
      this.orderCountDate = [end, start];
      if (this.orderCountDate[0]) {
        const storeid = localStorage.getItem("storeid");
        let obj = {};
        obj["storeid"] = storeid;
        obj["starttime"] = this.orderCountDate[0];
        obj["endtime"] = this.orderCountDate[1];
        loadordercount(obj).then((res) => {
          console.log(res);
          this.chartData.rows = res.orderlist;
          this.chartData.rows.forEach((item) => {
            console.log(item);
            this.chartData.rows.push({
              日期: item.createtime,
              订单数量: item.ordercount,
            });
          });
        });
      }
    },
    getData() {
      if (this.orderCountDate[0]) {
        const storeid = localStorage.getItem("storeid");
        let obj = {};
        obj["storeid"] = storeid;
        obj["starttime"] = this.orderCountDate[0];
        obj["endtime"] = this.orderCountDate[1];
        loadordercount(obj).then((res) => {
          console.log(res);
          this.chartData.rows = res.orderlist;
          this.chartData.rows.forEach((item) => {
            console.log(item);
            this.chartData.rows.push({
              日期: item.createtime,
              订单数量: item.ordercount,
            });
          });
        });
      }
    },
    openUrl(flag) {
      if (flag == "product") {
        this.$router.push({ path: "commodity/list" });
      } else if (flag == "order") {
        this.$router.push({ path: "order/list" });
      } else if (flag == "wallet") {
        this.$router.push({ path: "financemanager/list" });
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  width: 70%;
  margin: 0 auto;
}

.total-layout {
  margin-top: 20px;
  cursor: pointer;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
  cursor: pointer;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.mine-layout {
  position: absolute;
  right: 140px;
  top: 60px;
  width: 250px;
  height: 235px;
}

.address-content {
  padding: 20px;
  font-size: 18px;
}
</style>
