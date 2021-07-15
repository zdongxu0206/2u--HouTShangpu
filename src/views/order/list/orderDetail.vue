<template> 
  <div class="detail-container">
    <div>
      <el-steps
        :active="formatStepStatus(order.status)"
        finish-status="success"
        align-center
      >
        <el-step
          :title="$t('ORDERLIST.SUBMITORDER')"
          :description="(order.createTime)"
        ></el-step>
        <el-step
          :title="$t('ORDERLIST.THEORDER')"
          :description="(order.paymentTime)"
        ></el-step>
        <el-step
          :title="$t('ORDERLIST.PLATFORMFOR')"
          :description="(order.deliveryTime)"
        ></el-step>
        <el-step
          :title="$t('ORDERLIST.CONFIRMRECEIPT')"
          :description="(order.receiveTime)"
        ></el-step>
        <el-step
          :title="$t('ORDERLIST.COMPLETEEVALUATION')"
          :description="(order.commentTime)"
        ></el-step>
      </el-steps>
    </div>
    <el-card
      shadow="never"
      style="margin-top: 15px"
    >
      <div class="operate-container">
        <i
          class="el-icon-warning color-danger"
          style="margin-left: 20px"
        ></i>
        <span class="color-danger">{{$t('ORDERLIST.COMMODITYIMAGESS')}}：{{order.status | formatStatus}}</span>
        <div
          class="operate-button-container"
          v-show="order.status=='00'"
        >
          <!-- <el-button size="mini">{{$t('ORDERLIST.CURRENTORDER')}}</el-button> -->
          <el-button
            size="mini"
            @click="showCloseOrderDialog()"
          >{{$t('ORDERLIST.CLOSE')}}</el-button>
          <el-button
            size="mini"
            @click="showMarkOrderDialog()"
          >{{$t('ORDERLIST.NOTETHEORDER')}}</el-button>
        </div>
        <div
          class="operate-button-container"
          v-show="order.status==10 || order.status==99"
        >
          <el-button
            size="mini"
            @click="showUpdateReceiverDialog()"
          >{{$t('SEARCHING.CONSIGNEEINFOR')}}</el-button>
          <!-- <el-button
            size="mini"
            @click="showMessageDialog"
          >{{$t('SEARCHING.STATIONESSAGE')}}</el-button> -->
          <el-button
            size="mini"
            @click="cancelHedel()"
          >{{$t('WITHDRA.CANCELLATION')}}</el-button>
          <el-button
            size="mini"
            @click="showMarkOrderDialog()"
          >{{$t('ORDERLIST.NOTETHEORDER')}}</el-button>
        </div>
        <div
          class="operate-button-container"
          v-show="order.status==41 || order.status==11 || order.status==21 || order.status==99"
        >
          <el-button
            size="mini"
            @click="showLogisticsDialog()"
          >{{$t('SEARCHING.ORDERTRACKING')}}</el-button>
          <!-- <el-button
            size="mini"
            @click="showMessageDialog"
          >{{$t('SEARCHING.STATIONESSAGE')}}</el-button> -->
          <el-button
            size="mini"
            @click="showMarkOrderDialog()"
          >{{$t('ORDERLIST.NOTETHEORDER')}}</el-button>
        </div>
        <div
          class="operate-button-container"
          v-show="order.status==98 || order.status==51 || order.status==31"
        >
          <el-button
            size="mini"
            @click="handleDeleteOrder()"
          >{{$t('ORDERLIST.DELETETHE')}}</el-button>
          <el-button
            size="mini"
            @click="showMarkOrderDialog()"
          >{{$t('ORDERLIST.NOTETHEORDER')}}</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon
          icon-class="marker"
          style="color: #606266"
        ></svg-icon>
        <span class="font-small">{{$t('ORDERLIST.BASIC')}}</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.ORDERREF')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.INVOICENUMBER')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('FORMHEAD.ORDERID')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.PAYMENT')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.ORDERSOURCE')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.ORDERTYPE')}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.ordersn}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{$t('ORDERLIST.NOTYET')}}</el-col>
          <!-- 用户账号 -->
          <el-col
            :span="4"
            class="table-cell"
          >{{order.orderid}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.paytype}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{$t('ORDERLIST.NOTYET')}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.ordertype}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('SEARCHING.ISTRIBUTION')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.TRACKINGNUMBER')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.AUTOMATICALLY')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.ORDERSGET')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.ORDERSCAN')}}</el-col>
          <el-col
            :span="4"
            class="table-cell-title"
          >{{$t('ORDERLIST.EVENTS')}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.deliveryname | formatNull}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.deliverysn | formatNull}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.autoConfirmDay}} {{$t('SEARCHING.DAY')}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.integration}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >{{order.growth}}</el-col>
          <el-col
            :span="4"
            class="table-cell"
          >
            <el-popover
              placement="top-start"
              :title="$t('ORDERLIST.EVENTS')"
              width="200"
              trigger="hover"
              :content="order.promotionInfo"
            >
              <span slot="reference">{{order.promotionInfo | formatLongText}}</span>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon
          icon-class="marker"
          style="color: #606266"
        ></svg-icon>
        <span class="font-small">{{$t('ORDERLIST.CONSIGNEEIN')}}</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.CONSIGNEE')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('SEARCHING.PHONE')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.POSTALCODE')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('SEARCHING.SHIPPINGADDRESS')}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell"
          >{{order.rcvname}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >{{order.rcvphone}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >{{order.rcvpostcode}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >{{order.rcvcityname+order.rcvregionname+order.rcvaddress}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon
          icon-class="marker"
          style="color: #606266"
        ></svg-icon>
        <span class="font-small">{{$t('ORDERLIST.COMMODITYINFO')}}</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderItem"
        style="width: 100%;margin-top: 20px"
        border
      >
        <el-table-column
          :label="$t('PRODUCTLIST.COMMODITYIMAGES')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.prdimg"
              style="height: 80px"
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.PRODUCTNAME')"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{scope.row.prdbrand}}</p>
            <p>{{$t('PRODUCTLIST.BRAND')}}：{{scope.row.prdname}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.ARTNO')"
          width="130"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{$t('SEARCHING.PRICE')}}：￥{{scope.row.prdprice}}</p>
            <p>{{$t('PRODUCTLIST.ARTNO')}}：{{scope.row.prdsn}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.PROPERTY')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{$t('SEARCHING.COLOR')}}：{{JSON.parse(scope.row.prdattr)['color']}}</p>
            <p>{{$t('SEARCHING.CAPACITY')}}：{{JSON.parse(scope.row.prdattr)['cpu']}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.NUMBER')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.prdquantity}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.SUBTOTAL')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            ￥{{scope.row.prdprice*scope.row.prdquantity}}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        {{$t('ORDERLIST.ADDUPTO')}}：<span class="color-danger">￥{{order.amttotal}}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon
          icon-class="marker"
          style="color: #606266"
        ></svg-icon>
        <span class="font-small"> {{$t('ORDERLIST.TUITION')}}</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.TOGETHER')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('TEMPLATEFREIGHT.FREIGHT')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.COUPON')}}</el-col>

        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.amttotal}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.freightAmount}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.amtcoupon}}</el-col>

        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.ACTIVITY')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.DISCOUNT')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.BIGDECIMAL')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.PAYABLE')}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.amtdiscount}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.discountAmount}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >
            <span class="color-danger">￥{{order.amttotal}}</span>
          </el-col>
          <el-col
            :span="6"
            class="table-cell"
          >
            <span class="color-danger">￥{{order.amttotal-order.amtdiscount}}</span>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon
          icon-class="marker"
          style="color: #606266"
        ></svg-icon>
        <span class="font-small">{{$t('ORDERLIST.OPERATOR')}}</span>
      </div>
      <el-table
        style="margin-top: 20px;width: 100%"
        ref="orderHistoryTable"
        :data="order.orderStepList"
        border
      >
        <el-table-column
          :label="$t('ORDERLIST.MANIPULATOR')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.opername}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.OPERATIONTIME')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            {{(scope.row.opertime)}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.ORDERSTATUS')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.orderstatus | formatStatuss}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.NOTES')"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.note}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="$t('SEARCHING.CONSIGNEEINFOR')"
      :visible.sync="receiverDialogVisible"
      width="40%"
    >
      <el-form
        :model="receiverInfo"
        ref="receiverInfoForm"
        label-width="150px"
      >
        <el-form-item :label="$t('SEARCHING.CONSIGNENAME')">
          <el-input
            v-model="receiverInfo.rcvname"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('SEARCHING.PHONE')">
          <el-input
            v-model="receiverInfo.rcvphone"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('ORDERLIST.POSTALCODE')">
          <el-input
            v-model="receiverInfo.rcvprovincecode"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('ORDERLIST.AREAID')">
          <v-distpicker
            :province="receiverInfo.rcvprovincename"
            :city="receiverInfo.rcvcityname"
            :area="receiverInfo.rcvregionname"
            @selected="onSelectRegion"
          ></v-distpicker>
        </el-form-item>
        <el-form-item :label="$t('ORDERLIST.COMMODITYIMAGES')">
          <el-input
            v-model="receiverInfo.rcvaddress"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="receiverDialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleUpdateReceiverInfo"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('SEARCHING.FINFORMATION')"
      :visible.sync="moneyDialogVisible"
      width="40%"
    >
      <div class="table-layout">
        <el-row>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.TOGETHER')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('TEMPLATEFREIGHT.FREIGHT')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.COUPON')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('SEARCHING.POINTSDUCTION')}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.totalAmount}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >
            <el-input
              v-model.number="moneyInfo.freightAmount"
              size="mini"
            ><template slot="prepend">￥</template></el-input>
          </el-col>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.couponAmount}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.integrationAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.ACTIVITY')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.DISCOUNT')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.BIGDECIMAL')}}</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
          >{{$t('ORDERLIST.PAYABLE')}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell"
          >￥{{order.promotionAmount}}</el-col>
          <el-col
            :span="6"
            class="table-cell"
          >
            <el-input
              v-model.number="moneyInfo.discountAmount"
              size="mini"
            ><template slot="prepend">￥</template></el-input>
          </el-col>
          <el-col
            :span="6"
            class="table-cell"
          >
            <span class="color-danger">￥{{order.totalAmount+moneyInfo.freightAmount}}</span>
          </el-col>
          <el-col
            :span="6"
            class="table-cell"
          >
            <span class="color-danger">￥{{order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="moneyDialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleUpdateMoneyInfo"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('SEARCHING.STATIONESSAGE')"
      :visible.sync="messageDialogVisible"
      width="40%"
    >
      <el-form
        :model="message"
        ref="receiverInfoForm"
        label-width="150px"
      >
        <el-form-item :label="$t('SEARCHING.HEADLINES')">
          <el-input
            v-model="message.title"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('SEARCHING.CONTENT')">
          <el-input
            v-model="message.content"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="messageDialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleSendMessage"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('ORDERLIST.CLOSE')"
      :visible.sync="closeDialogVisible"
      width="40%"
    >
      <el-form
        :model="closeInfo"
        label-width="150px"
      >
        <el-form-item :label="$t('ORDERLIST.OPERATIONNOTE')">
          <el-input
            v-model="closeInfo.note"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeDialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleCloseOrder"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="备注订单"
      :visible.sync="markOrderDialogVisible"
      width="40%"
    >
      <el-form
        :model="markInfo"
        label-width="150px"
      >
        <el-form-item :label="$t('ORDERLIST.OPERATIONNOTE')">
          <el-input
            v-model="markInfo.note"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="markOrderDialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleMarkOrder"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import LogisticsDialog from "@/views/order/list/components/logisticsDialog";
import VDistpicker from "v-distpicker";
import i18n from "element-ui/lib/locale";
import {
  getOrderDetail,
  deleteOrder,
  updateReceiverInfo,
  updateOrderRemark,
  downOrder,
  cancelOrder,
} from "@/api/orderList";
const defaultReceiverInfo = {
  orderid: null,
  rcvname: null,
  rcvphone: null,
  rcvprovincecode: null,
  rcvaddress: null,
  rcvprovincename: null,
  // 省
  rcvcityname: null,
  rcvregionname: null,
  // status:null
};
export default {
  name: "orderDetail",
  components: { VDistpicker, LogisticsDialog },
  data() {
    return {
      id: null,
      order: {},
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: {
        orderid: null,
        freightAmount: 0,
        discountAmount: 0,
        status: null,
      },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      logisticsDialogVisible: false,
    };
  },
  created() {
    this.id = this.list = this.$route.query.orderid;
    console.log(this.id);
    getOrderDetail(this.id).then((response) => {
      console.log(response.orderInfo);
      this.order = response.orderInfo;
    });
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return i18n.t("ORDERLIST.NOTYET");
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return i18n.t("ORDERLIST.NOTYET");
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
    },
    formatSourceType(value) {
      if (value == 1) {
        return i18n.t("SEARCHING.APPINDENT");
      } else {
        return i18n.t("SEARCHING.PCINDENT");
      }
    },
    formatAddress(order) {
      let str = order.orderItem;
      if (order.rcvcityname != null) {
        str += "  " + order.rcvcityname;
      }
      str += "  " + order.rcvregionname;
      str += "  " + order.rcvaddress;
      return str;
    },
    // 把商品属性结构出来
    formatAddresss(order) {
      console.log(order);
      let obj = order.orderItem.prdattr;
    },
    // 操作信息判断
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
    // 判断备注的订单状态
    formatStatuss(value) {
      if (value == 0) {
        return i18n.t("FORM.INVALID");
      } else {
        return i18n.t("FORM.VALID");
      }
    },
  },
  methods: {
    onSelectRegion(data) {
      this.receiverInfo.rcvprovincename = data.province.value;
      this.receiverInfo.rcvcityname = data.city.value;
      this.receiverInfo.rcvregionname = data.area.value;
    },
    formatStepStatus(value) {
      if (value == 10) {
        //待发货
        return 2;
      } else if (value == 11) {
        //已发货
        return 3;
      } else if (value == 21) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    // 修改收货人信息
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderid: this.order.id,
        rcvname: this.order.rcvname,
        rcvphone: this.order.rcvphone,
        rcvprovincecode: this.order.rcvprovincecode,
        rcvaddress: this.order.rcvaddress,
        rcvprovincename: this.order.rcvprovincename,
        rcvcityname: this.order.rcvcityname,
        rcvregionname: this.order.rcvregionname,
        status: this.order.status,
      };
    },
    // 取消订单
    cancelHedel() {
      console.log("cascs");
      let obj = {};
      obj["orderid"] = this.$route.query.orderid;
      obj["storeid"] = localStorage.getItem("storeid");
      this.$confirm(i18n.t("WITHDRA.CANCELLATION") + "?", {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          cancelOrder(obj).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.OPERATESUC"),
            });
            this.$router.push({ path: "/order/list" });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("SEARCHING.CANCELLEDOP"),
          });
        });
    },
    // 修改收货人信息
    handleUpdateReceiverInfo() {
      this.$confirm(i18n.t("SEARCHING.MODIFYREC"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        console.log(this.receiverInfo);
        const orderid = this.$route.query.orderid;
        this.receiverInfo["orderid"] = orderid;
        updateReceiverInfo(this.receiverInfo).then((response) => {
          this.receiverDialogVisible = false;
          this.$message({
            type: "success",
            message: i18n.t("SEARCHING.SUCCESSFULLY"),
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderid = this.order.id;
      this.moneyInfo.freightAmount = this.order.freightAmount;
      this.moneyInfo.discountAmount = this.order.discountAmount;
      this.moneyInfo.status = this.order.status;
    },
    // 修改费用信息
    handleUpdateMoneyInfo() {
      this.$confirm(i18n.t("SEARCHING.MODIFYFEE"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        updateMoneyInfo(this.moneyInfo).then((response) => {
          this.moneyDialogVisible = false;
          this.$message({
            type: "success",
            message: i18n.t("SEARCHING.SUCCESSFULLY"),
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
    },
    handleSendMessage() {
      this.messageDialogVisible = false;
      this.$message({
        type: "success",
        message: i18n.t("SEARCHING.SENDSUCCESSFULLY"),
      });
    },
    // 关闭订单
    showCloseOrderDialog() {
      this.closeInfo.id = this.id;
      let obj = {};
      obj["userid"] = localStorage.getItem("userid");
      obj["orderid"] = this.$route.query.orderid;
      this.$confirm(i18n.t("ROLLOVERS.CLOSEORDER"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          downOrder(obj).then((res) => {
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.CLOSEDSUCCES"),
            });
            this.$router.push({ path: "/order/list" });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("SEARCHING.CANCELLEDOP"),
          });
        });
    },
    // 关闭订单
    handleCloseOrder() {
      this.$confirm(i18n.t("SEARCHING.ORNOTTO"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.closeInfo.id]);
        params.append("note", this.closeInfo.note);
        closeOrder(params).then((response) => {
          this.closeDialogVisible = false;
          this.$message({
            type: "success",
            message: i18n.t("SEARCHING.CLOSEDSUCCE"),
          });
          this.$router.back();
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    // 备注订单
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.closeOrder.note = null;
    },
    // 备注订单
    handleMarkOrder() {
      this.$confirm(i18n.t("SEARCHING.NOTETHEO"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        const orderid = this.$route.query.orderid;
        // 备注
        const ordernote = this.markInfo.note;
        let obj = {};
        obj["orderid"] = orderid;
        obj["ordernote"] = ordernote;
        updateOrderRemark(obj).then((response) => {
          this.markOrderDialogVisible = false;
          this.$message({
            type: "success",
            message: i18n.t("SEARCHING.ORDERREMARKS"),
          });
          this.$router.back();
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    // 删除订单
    handleDeleteOrder() {
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        let storeid = localStorage.getItem("storeid");
        deleteOrder(storeid, [this.id]).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.$router.back();
        });
      });
    },
    showLogisticsDialog() {
      this.logisticsDialogVisible = true;
    },
  },
};
</script>
<style scoped>
.detail-container {
  width: 95%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


