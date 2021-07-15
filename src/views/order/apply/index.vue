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
          <el-form-item :label="$t('RETURNAPP.SERVICE')">
            <el-input
              v-model="listQuery.returnid"
              class="input-width"
              :placeholder="$t('RETURNAPP.SERVICE')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('RETURNAPP.PROCESSSTATE')">
            <el-select
              v-model="listQuery.status"
              :placeholder="$t('RETURNAPP.PROCESSSTATE')"
              clearable
              class="input-width"
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
          <el-form-item :label="$t('FORMHEAD.APPLICATIONTIME')">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createtime"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('FORMHEAD.APPLICATIONTIME')"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('RETURNAPP.PERSONNEL')">
            <el-input
              v-model="listQuery.handleuser"
              class="input-width"
              :placeholder="$t('RETURNAPP.PERSONNEL')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('RETURNAPP.PROCESSING')">
            <el-date-picker
              class="input-width"
              v-model="listQuery.handletime"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('RETURNAPP.PROCESSING')"
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
        ref="returnApplyTable"
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
        <el-table-column
          :label="$t('RETURNAPP.SERVICE')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.returnid}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.APPLICATIONTIME')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.createtime}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('RETURNAPP.ACCOUNT')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('RETURNAPP.REFUND')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">￥{{scope.row.returnamt}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('RETURNAPP.APPLICATION')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('RETURNAPP.PROCESSING')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.handletime | formatTime}}</template>
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
            > {{$t('FORMHEAD.VIEWDETAILS')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
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
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[20,30,50,100]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/orderReason";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  storeid: localStorage.getItem("storeid"),
  returnid: null,
  status: null,
  createtime: null,
  handleuser: null,
  handletime: null,
};
const defaultStatusOptions = [
  {
    label: i18n.t("SEARCHING.PENDINGA"),
    value: 0,
  },
  {
    label: i18n.t("SEARCHING.THERETURNOF"),
    value: 1,
  },
  {
    label: i18n.t("FORMHEAD.STOCKS"),
    value: 2,
  },
  {
    label: i18n.t("SEARCHING.DENIED"),
    value: 3,
  },
];
export default {
  name: "returnApplyList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      statusOptions: Object.assign({}, defaultStatusOptions),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      operateType: 1,
      operateOptions: [
        {
          label: i18n.t("RETURNAPP.DELETEIN"),
          value: 1,
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatStatus(status) {
      if (status == 0) {
        return i18n.t("FORMHEAD.STOCKS");
      } else if (status == 1) {
        return i18n.t("SEARCHING.PENDINGA");
      } else if (status == 2) {
        return i18n.t("SEARCHING.AGREEMENTS");
      } else if (status == 3) {
        return i18n.t("SEARCHING.REFUSE");
      }
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    // 跳转到详情页
    handleViewDetail(index, row) {
      console.log(row.returnid);
      this.$router.push({
        name: "returnApplyDetail",
        params: { returnid: row.returnid },
      });
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: i18n.t("RETURNAPP.APPLICATIONS"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.operateType === 1) {
        //批量删除
        this.$confirm(i18n.t("ROLLOVERS.DELS"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        }).then(() => {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].id);
          }
          params.append("ids", ids);
          deleteApply(params).then((response) => {
            this.getList();
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            });
          });
        });
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
    // 获取列表
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        console.log(response);
        this.listLoading = false;
        this.list = response.returnOrder;
        this.total = response.totalCount;
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


