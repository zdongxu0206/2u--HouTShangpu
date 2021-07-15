<template> 
  <div class="app-container">
    <el-card
      class="operate-container"
      shadow="never"
    >

      <i
        class="el-icon-tickets"
        style="margin-top: 5px"
      ></i>
      <span style="margin-top: 5px">{{$t('SEARCHING.DATALIST')}}</span>
      <el-button
        class="btn-add"
        @click="addProductAttr()"
        style="float:right"
        size="mini"
      >
        {{$t('FORM.ADDATTRIBUTE')}}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productAttrTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <!-- 多选 -->
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <!-- 编号 -->
        <el-table-column
          :label="$t('FORMHEAD.SERIAL')"
          type="index"
          width="100"
          align="center"
        >
        </el-table-column>
        <!-- 属性名称 -->
        <el-table-column
          :label="$t('TYPEMERCHANDISE.ATTRIBUTENAME')"
          width="240"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <!-- 可选值列表 -->
        <el-table-column
          :label="$t('TYPEMERCHANDISE.OPTIONALVALUES')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.inputlist}}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('FORMHEAD.ACTION')"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
            >{{$t('FORMHEAD.UPDATE')}}
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >{{$t('FORMHEAD.DEL')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 批量操作 -->
    <div
      class="batch-operate-container"
      style="margin:10px 0"
    >
      <el-select
        size="small"
        v-model="operateType"
        :placeholder="$t('SEARCHING.BATCHOPERATION')"
      >
        <el-option
          v-for="item in operates"
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
        :page-size="listQuery.limit"
        :page-sizes="[20,30,50,100]"
        :current-page.sync="listQuery.start"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchLists, deleteProductAttr } from "@/api/commodityType";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  start: 1,
  limit: 20,
  catid: null,
  paramstatus: null,
};
export default {
  name: "productAttrList",
  data() {
    return {
      list: null,
      total: null,
      // 表头
      formhead: [],
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
      operateType: null,
      multipleSelection: [],
      operates: [
        {
          label: i18n.t("FORMHEAD.DEL"),
          value: "deleteProductAttr",
        },
      ],
    };
  },
  created() {
    this.getList();
    console.log(this.$route.query.paramstatus);
  },

  methods: {
    // 获取列表
    getList() {
      this.listQuery.catid = this.$route.query.id;
      this.listQuery.paramstatus = this.$route.query.paramstatus;
      fetchLists(this.listQuery).then((response) => {
        console.log(response);
        this.listLoading = false;
        this.list = response.attrlist;
        this.formhead = response.formhead;
        // 页面列表总条数
        this.total = response.totalCount;
      });
    },
    // 添加  属性参数id
    addProductAttr() {
      this.$router.push({
        name: "addProductAttr",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
        },
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleBatchOperate() {
      console.log(this.multipleSelection);
      if (this.multipleSelection < 1) {
        this.$message({
          message: i18n.t("SEARCHING.ARECORD"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.operateType !== "deleteProductAttr") {
        this.$message({
          message: i18n.t("SEARCHING.OFBATCH"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].attrpatamid);
      }
      this.handleDeleteProductAttr(ids);
    },
    handleSizeChange(val) {
      this.listQuery.start = 1;
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.start = val;
      this.getList();
    },
    // 前往编辑页面
    handleUpdate(index, row) {
      console.log(row);
      this.$router.push({
        name: "updateProductAttr",
        query: {
          id: this.$route.query.id,
          attrpatamid: row.attrpatamid,
          name: this.$route.query.name,
        },
      });
    },
    handleDeleteProductAttr(ids) {
      console.log(this.multipleSelection, ids);
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        let data = new URLSearchParams();
        data.append("attrpatamid", ids);
        deleteProductAttr(ids).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    // 删除
    handleDelete(index, row) {
      console.log(row);
      let ids = [];
      ids.push(row.attrpatamid);
      this.handleDeleteProductAttr(ids);
    },
  },
  filters: {
    inputTypeFilter(value) {
      if (value == 1) {
        return i18n.t("SEARCHING.THELIST");
      } else {
        return i18n.t("SEARCHING.ENTERMANUALLY");
      }
    },
    newStatus(value) {
      if (value == "1") {
        return i18n.t("FORM.VALID");
      } else {
        return i18n.t("FORM.INVALID");
      }
    },
    selectTypeFilter(value) {
      if (value == 1) {
        return i18n.t("SEARCHING.CHOICE");
      } else if (value == 2) {
        return i18n.t("SEARCHING.MULTIPLECHOICE");
      } else {
        return i18n.t("SEARCHING.SOLE");
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>


