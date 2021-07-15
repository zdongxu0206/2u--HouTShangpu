<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:20px"
    v-loading="listLoading"
  >
    <el-table-column
      :label="$t('WITHDRA.NOTECASEID')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.walletid}}</template>
    </el-table-column>
    <el-table-column
      :label="$t('SEARCHING.STOREID')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.storeid}}</template>
    </el-table-column>
    <el-table-column
      :label="$t('SEARCHING.STORENAME')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.storename}}</template>
    </el-table-column>
    <el-table-column
      :label="$t('SEARCHING.CURRENCY')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.walltype}}</template>
    </el-table-column>
    <el-table-column
      :label="$t('SEARCHING.MONEY')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.amount}}</template>
    </el-table-column>
    <el-table-column
      :label="$t('FORMHEAD.CREATIONTIME')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.createtime}}</template>
    </el-table-column>
    <el-table-column
      :label="$t('ORDERLIST.NOTES')"
      align="center"
    >
      <template slot-scope="scope">{{scope.row.remark}}</template>
    </el-table-column>

  </el-table>
</template>

<script>
import { walletRecord } from "@/api/financemanagerList";
export default {
  data() {
    return {
      // 列表
      tableData: [],
      // 缓存
      listLoading: false,
    };
  },
  created() {
    this.FetchList();
  },
  methods: {
    FetchList() {
      const storeid = localStorage.getItem("storeid");
      const walletid = this.$route.query.walletid;
      console.log(walletid);
      // 页数
      const start = 20;
      //  每页条数
      const limit = 20;
      let obj = {};
      obj["storeid"] = storeid;
      obj["walletid"] = walletid;
      this.listLoading = true;
      walletRecord(obj).then((res) => {
        console.log(res);
        this.tableData = res.orderlist;
        this.listLoading = false;
      });
    },
  },
};
</script>
