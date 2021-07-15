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
          style="float: right"
          @click="searchBrandList()"
          type="primary"
          size="small"
        >
          {{$t('SEARCHING.SEARCH')}}
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item :label="$t('SEARCHING.ENTERSEARCH')">
            <el-input
              style="width: 203px"
              v-model="listQuery.keyword"
              :placeholder="$t('SEARCHING.ENTERSEARCH')"
            ></el-input>
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
      <el-button
        class="btn-add"
        @click="addBrand()"
        style="float:right"
        size="mini"
      >
        {{$t('FORMHEAD.ADD')}}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="brandTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <!-- 编号 -->
        <el-table-column
          :label="separator.bno"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <!-- 品牌图 -->
        <el-table-column
          :label="separator.bno"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <!-- 品牌名称 -->
        <el-table-column
          :label="separator.brandname"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <!-- 品牌首字母 -->
        <el-table-column
          :label="separator.bfirst"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.letter}}</template>
        </el-table-column>
        <!-- 排序 -->
        <!-- <el-table-column
          :label="separator.sort"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column> -->
        <!-- 品牌制造商 -->
        <el-table-column
          :label="separator.manu"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="handleFactoryStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.factoryStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('FORM.SHOWBUTTONS')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 相关 -->
        <el-table-column
          :label="separator.relevant"
          width="220"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{$t('SEARCHING.PRODUCTNAME')}}</span>
            <el-button
              size="mini"
              type="text"
              @click="getProductList(scope.$index, scope.row)"
            >{{scope.row.goodnum}}
            </el-button>
            <span>{{$t('FORMHEAD.EVALUATE')}}</span>
            <el-button
              size="mini"
              type="text"
              @click="getProductCommentList(scope.$index, scope.row)"
            >{{scope.row.countcomment}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="operation"
          width="160"
          :label="$t('FORMHEAD.ACTION')"
          align="center"
        >
          <template slot-scope="scope">
            <p
              class="p"
              style="float:left;"
              v-for="(item,index) in operation"
              :key="index"
            >
              <el-button
                size="mini"
                :type="index=='del'&&'danger'"
                @click="handle(index, scope.row)"
              >{{item}}
              </el-button>
            </p>
            <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button> -->
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
        :page-size="listQuery.pageSize"
        :page-sizes="[20,30,50,100]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import i18n from "element-ui/lib/locale";
import {
  fetchList,
  handleDelete,
  handleBatchOperates,
  updateShowStatus,
  deleteBrand,
} from "@/api/brand";

export default {
  name: "brandList",
  data() {
    return {
      operates: [
        {
          label: i18n.t("FORM.SHOWBRAND"),
          value: "showBrand",
        },
        {
          label: i18n.t("FORM.FURTIVEBRANDS"),
          value: "hideBrand",
        },
      ],
      operateType: null,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 20,
      },
      // 表格头部
      separator: [],
      // 操作
      operation: [],
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true;
      fetchList().then((response) => {
        console.log(response);
        this.listLoading = false;
        this.list = response.brandlist;
        this.separator = response.formhead;
        this.operation = response.formhead.operation;
        this.total = 10;
        // this.totalPage = response.data.totalPage;
        // this.pageSize = response.data.pageSize;
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除
    handleDeletes(id) {
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        const userid = localStorage.getItem("userid");
        console.log(id);
        handleDelete(id, userid).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    // 是否显示
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      data.append("id", row.id);
      data.append("status", row.status);
      dateShowStatus(data)
        .then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLY"),
            type: "success",
            duration: 1000,
          });
        })
        .catch((error) => {
          if (row.status == 0) {
            row.status = 1;
          } else {
            row.status = 0;
          }
        });
    },
    // 点击触发事件
    handle(index, row) {
      console.log(index, row);
      switch (index) {
        case "edit":
          this.$router.push({ name: "updateBrand", query: { id: row.id } });
          break;
        case "log":
          console.log("日志存留字段", row);
          break;
        case "look":
          console.log("查看存留字段", row);
          break;
        case "del":
          this.handleDeletes(row.id);
          break;
      }
      // this.$router.push({path: '/pms/updateBrand', query: {id: row.id}})
    },

    getProductList(index, row) {
      console.log(index, row);
    },
    getProductCommentList(index, row) {
      console.log(index, row);
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
    searchBrandList() {
      this.listQuery.pageNum = 1;
      this.getList();
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
      let status = 0;
      if (this.operateType === "showBrand") {
        status = 1;
      } else if (this.operateType === "hideBrand") {
        status = 0;
      } else {
        this.$message({
          message: i18n.t("SEARCHING.OFBATCH"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let id = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        id.push(this.multipleSelection[i].id);
      }
      let data = new URLSearchParams();
      data.append("ids", [id]);
      data.append("status", status);
      console.log(id);
      console.log(status);
      // 批量显示隐藏 用户id
      handleBatchOperates(id, status).then((response) => {
        this.getList();
        this.$message({
          message: i18n.t("SEARCHING.SUCCESSFULLY"),
          type: "success",
          duration: 1000,
        });
      });
    },
    // 跳转到添加页 路由
    addBrand() {
      this.$router.push({ name: "addBrand" });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.p:nth-child(1) {
  margin-right: 15px;
}
</style>


