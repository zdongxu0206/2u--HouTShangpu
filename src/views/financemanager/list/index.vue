<template>
  <div style="margin-top: 15px">
    <el-card>
      <div>
        <i class="el-icon-search"></i>
        <span>{{$t('SEARCHING.SCREENING')}}</span>
        <el-button
          style="float:right;margin-right: 60px"
          type="primary"
          size="small"
          @click="inquireHeadle()"
        > {{$t('SEARCHING.QUERYSEARCH')}}</el-button>
        <el-button
          style="float:right;margin-right: 30px"
          type="primary"
          size="small"
          @click="handleApply()"
        >{{$t('LOCALIZATION.WITHDRAWALFOR')}}</el-button>
      </div>
      <div>
        <el-form
          :inline="true"
          :data="form"
          size="small"
          label-width="140px"
        >
          <el-form-item :label="$t('FORMHEAD.ORDERSTATUS')">
            <el-select
              v-model="form.orderstatus"
              clearable
              style="width:220px;"
              :placeholder="$t('FORMHEAD.ORDERSTATUS')"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('WITHDRA.WITHDRAWAL')">
            <el-select
              v-model="form.amtcurrency"
              clearable
              style="width:220px;"
              :placeholder="$t('WITHDRA.WITHDRAWAL')"
            >
              <el-option
                v-for="item in currency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('WITHDRA.ACCOUNT')">
            <el-select
              v-model="form.accounttype"
              clearable
              style="width:220px;"
              :placeholder="$t('WITHDRA.ACCOUNT')"
            >
              <el-option
                v-for="item in genre"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('WITHDRA.BENEFICIARY')">
            <template>
              <el-input
                clearable
                v-model="form.account"
                :placeholder="$t('WITHDRA.BENEFICIARY')"
                style="width:220px;"
              ></el-input>
            </template>
          </el-form-item>
          <el-form-item :label="$t('WITHDRA.BENEFICIARYX')">
            <el-input
              :placeholder="$t('WITHDRA.BENEFICIARYX')"
              clearable
              v-model="form.accountname"
              style="width:220px;"
            ></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>

    <template>
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        v-loading="listLoading"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;margin-top:20px"
      >
        <el-table-column
          :label="$t('WITHDRA.TRANSACTION')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.orderid}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.NOTECASEID')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.walletid}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('QWSTOR.NAME')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.storename}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.ACCOUNTID')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.account}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.ACCOUNT')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.accounttype}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.BENEFICIARYX')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.accountname}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.CURRENCY')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.amtcurrency}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.WITHDRAWALM')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.amtcash}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.AMOUNT')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.amttotal}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.WITHDRAWALYE')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.amtwallet}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.ORDERSTATUS')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.CREATIONTIME')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.createtime}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.UPDATED')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.modifytime}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('ORDERLIST.NOTES')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.ILLUSTRATION')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('WITHDRA.MANIPULATOR')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.examname}}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('FORMHEAD.ACTION')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewDetail(scope.$index, scope.row)"
            >{{$t('SEARCHING.THEBILL')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              style="margin-top:10px"
              @click="handleViewQuxiao(scope.$index, scope.row)"
              v-show="scope.row.statuscode==10"
            >{{$t('SEARCHING.CANCELWITHDRAWA')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="form.limit"
        :page-sizes="[20,30,50,100]"
        :current-page.sync="form.start"
        :total="totalCount"
      />
    </div>
  </div>
</template>

<script>
import { fetchList, cancelOrder } from "@/api/financemanagerList";
import i18n from "element-ui/lib/locale";
export default {
  name: "list",
  data() {
    return {
      totalCount: 0,
      form: {
        accounttype: "", //	账户类型
        amtcurrency: "", //	提现币种
        orderstatus: "", //	订单状态
        accountname: "", //	收款人姓名
        account: "", //	收款人账号
        start: 1, //页数
        limit: 20, //	每页条数
        storeid: localStorage.getItem("storeid"),
      },
      options: [
        {
          value: "10",
          label: i18n.t("WITHDRA.PENDING"),
        },
        {
          value: "21",
          label: i18n.t("FORMHEAD.STOCKS"),
        },
        {
          value: "99",
          label: i18n.t("WITHDRA.CANCELLATION"),
        },
        {
          value: "98",
          label: i18n.t("WITHDRA.REFUSED"),
        },
      ],
      currency: [
        {
          value: "CNY",
          label: "CNY",
        },
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "AUD",
          label: "AUD",
        },
        {
          value: "A2U",
          label: "A2U",
        },
      ],
      genre: [
        {
          value: "ALIPAY",
          label: i18n.t("WITHDRA.ALIPAY"),
        },
        {
          value: "BANK",
          label: i18n.t("SEARCHING.BANKCARD"),
        },
      ],
      // 列表
      list: [],
      // 缓存
      listLoading: false,
    };
  },
  created() {
    this.loadWalletOrderList();
  },
  methods: {
    // 查询
    inquireHeadle() {
      this.loadWalletOrderList();
    },
    handleSizeChange(val) {
      console.log(val);
      this.form.start = 1;
      this.form.limit = val;
      this.loadWalletOrderList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.form.start = val;
      this.loadWalletOrderList();
    },
    // 查询提现列表
    loadWalletOrderList() {
      this.listLoading = true;
      fetchList(this.form).then((res) => {
        console.log(res);
        this.list = res.orderlist;
        this.listLoading = false;
        this.totalCount = res.totalCount;
      });
    },
    // 申请提现
    handleApply() {
      // 跳转到提现页面
      this.$router.push({ name: "walletwithdrawal" });
    },
    // 选中多行
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 跳转到钱包流水
    handleViewDetail(index, row) {
      this.$router.push({
        name: "thewater",
        query: { walletid: row.walletid },
      });
    },
    // 取消体现
    handleViewQuxiao(index, row) {
      console.log(row);
      this.$confirm(i18n.t("SEARCHING.CANCELWITHDRAWA"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          const storeid = row.storeid;
          const orderid = row.orderid;
          cancelOrder(orderid, storeid).then((res) => {
            console.log(res);
            this.loadWalletOrderList();
          });
          this.$message({
            type: "success",
            message: i18n.t("SEARCHING.CANCELSU"),
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("SEARCHING.CANCELLEDOP"),
          });
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style>
</style>
