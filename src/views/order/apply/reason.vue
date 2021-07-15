<template> 
  <div class="app-container">
    <el-card
      class="operate-container"
      shadow="never"
    >
      <i class="el-icon-tickets"></i>
      <span>{{$t('SEARCHING.DATALIST')}}</span>
      <el-button
        size="mini"
        @click="handleAdd"
        style="float:right"
        class="btn-add"
      >{{$t('FORMHEAD.ADD')}}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="returnReasonTable"
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
          :label="$t('FORMHEAD.SERIAL')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORRETUR.TYPE')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <!-- <el-table-column
          :label="$t('SEARCHING.SORT')"
          width="100"
          align="center"
          :sortable="true"
          :sort-method="sortByDate"
        >
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column> -->
        <el-table-column
          :label="$t('FORRETUR.WHETHER')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.isuse | newIsuse}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('FORMHEAD.STATUS')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.status | newStatus}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('SEARCHING.ADDTIME')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.createtime}}</template>
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
              @click="handleUpdate(scope.$index, scope.row)"
            >{{$t('FORMHEAD.UPDATE')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >{{$t('FORMHEAD.DEL')}}</el-button>
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
        @click="handleBatchOperate"
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
    <el-dialog
      :title="$t('FORRETUR.REASONS')"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="returnReason"
        ref="reasonForm"
        label-width="150px"
      >
        <el-form-item
          :label="$t('FORRETUR.TYPE')"
          required
        >
          <el-input
            v-model="returnReason.name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SEARCHING.SORT')"
          required
        >
          <el-input
            v-model="returnReason.sort"
            class="input-width"
            type='number'
            @change="numHeadle"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('FORRETUR.WHETHER')"
          required
        >
          <el-switch
            v-model="returnReason.isuse"
            :active-value="'1'"
            :inactive-value="'0'"
          ></el-switch>
        </el-form-item>
        <!-- <el-form-item
          :label="$t('FORMHEAD.STATUS')"
          required
        >
          <el-switch
            v-model="returnReason.status"
            :active-value="'1'"
            :inactive-value="'0'"
          ></el-switch>
        </el-form-item> -->

      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  addReason,
  deleteReason,
  updateReason,
  getReturninfo,
} from "@/api/orderCause";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
};
const defaultReturnReason = {
  name: null,
  sort: 1,
  isuse: "1",
  status: "1",
};
export default {
  name: "returnReasonList",
  data() {
    return {
      list: null,
      total: null,
      multipleSelection: [],
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
      operateType: null,
      operateOptions: [
        {
          label: i18n.t("FORMHEAD.DEL"),
          value: 1,
        },
      ],
      dialogVisible: false,
      returnReason: Object.assign({}, defaultReturnReason),
      operateReasonId: null,
    };
  },
  created() {
    this.getList();
  },
  filters: {
    newIsuse(value) {
      if (value == 1) {
        return i18n.t("FORRETUR.EMPLOY");
      } else {
        return i18n.t("FORRETUR.NONUSE");
      }
    },
    newStatus(value) {
      if (value == 1) {
        return i18n.t("FORM.VALID");
      } else {
        return i18n.t("FORM.INVALID");
      }
    },
  },

  methods: {
    // 排序
    sortByDate(obj1, obj2) {
      console.log(obj1, obj2);
      let val1 = obj1.deadline;
      let val2 = obj2.deadline;
      return val1 - val2;
    },
    // 只能输入汉字
    numHeadle(val) {
      if (val == "") {
        this.$message({
          message: i18n.t("SEARCHING.BEEMPTY"),
          type: "warning",
        });
      }
      if (val <= 0) {
        this.$message({
          message: i18n.t("SEARCHING.ONLYPOSITIVE"),
          type: "warning",
        });
        this.returnReason.sort = 1;
      }
    },
    // 添加
    handleAdd() {
      this.dialogVisible = true;
      this.operateReasonId = null;
      this.returnReason = Object.assign({}, defaultReturnReason);
    },
    // 添加退货原因
    handleConfirm() {
      if (this.operateReasonId == null) {
        //添加操作
        const storeid = localStorage.getItem("storeid");
        this.returnReason["storeid"] = storeid;
        console.log(this.returnReason);
        addReason(this.returnReason).then((response) => {
          console.log(response);
          this.dialogVisible = false;
          this.operateReasonId = null;
          this.$message({
            message: i18n.t("SEARCHING.ADDED"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      } else {
        //编辑操作 修改
        const storeid = localStorage.getItem("storeid");
        this.returnReason["storeid"] = storeid;
        updateReason(this.returnReason).then((response) => {
          this.dialogVisible = false;
          this.operateReasonId = null;
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLY"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      }
    },
    // 根据id查点击的那个列表获取数据
    handleUpdate(index, row) {
      console.log(row);
      this.dialogVisible = true;
      this.operateReasonId = row.id;
      getReturninfo(row.id).then((response) => {
        this.returnReason = response.returninfo;
      });
    },
    // 删除
    handleDelete(index, row) {
      console.log(row);
      let id = [];
      id.push(row.id);
      this.deleteReason(id);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleStatusChange(index, row) {
      let id = [];
      id.push(row.id);
      let param = new URLSearchParams();
      param.append("status", row.status);
      param.append("id", id);
      updateStatus(param).then((response) => {
        this.$message({
          message: i18n.t("SEARCHING.SUCCESSFULLY"),
          type: "success",
        });
      });
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: i18n.t("FORRETUR.SELECTTHE"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.operateType === 1) {
        let id = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          id.push(this.multipleSelection[i].id);
        }
        this.deleteReason(id);
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
      const storeid = localStorage.getItem("storeid");
      this.listQuery["storeid"] = storeid;
      fetchList(this.listQuery).then((response) => {
        console.log(response);
        this.list = response.returnReason;
        this.listLoading = false;
        this.total = response.totalCount;
      });
    },
    // 删除
    deleteReason(id) {
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", [id]);
        console.log(id);
        const storeid = localStorage.getItem("storeid");
        params.append("storeid", storeid);
        deleteReason(storeid, id).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.listQuery.pageNum = 1;
          this.getList();
        });
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 80%;
}
</style>


