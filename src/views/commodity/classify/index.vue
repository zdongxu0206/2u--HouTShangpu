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
        @click="handleAddProductCate()"
        style="float:right"
        size="mini"
      >
        {{$t('FORMHEAD.ADD')}}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <!-- 分类ID -->
        <el-table-column
          :label="$t('GOODSCATEGORY.CATID')"
          width="120"
          type="index"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.catid}}</template>
        </el-table-column>
        <!-- 分类名称 -->
        <el-table-column
          :label="$t('GOODSCATEGORY.SYSTEMATIC')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.catname}}</template>
        </el-table-column>
        <!-- 级别 -->
        <el-table-column
          :label="$t('GOODSCATEGORY.RANK')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.lvl | levelFilter}}</template>
        </el-table-column>
        <!-- 二级分类数量 -->
        <el-table-column
          :label="$t('GOODSCATEGORY.QUANTITY')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.catnum }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('FORMHEAD.ACTION')"
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
              v-if="scope.row.status==1"
              @click="handleDelete(scope.$index, scope.row)"
            >{{$t('FORMHEAD.DEL')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="pagination-container"
      style="margin-top:10px"
    >
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
import { fetchList, deleteProductCate } from "@/api/commodityFenl";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  storeid: localStorage.getItem("storeid"),
};
export default {
  name: "productCateList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
      parentId: 0,
      islvl: null,
    };
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    },
  },
  methods: {
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    // 添加
    handleAddProductCate() {
      this.$router.push({ name: "addProductCate" });
    },
    // 获取列表
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        console.log(response);
        this.listLoading = false;
        this.list = response.catlist;
        this.total = response.totalCount;
        this.islvl = 1;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      if (this.islvl == 1) {
        this.getList();
      }
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      if (this.islvl == 1) {
        this.getList();
      }
    },

    // 编辑
    handleUpdate(index, row) {
      console.log(index, row);
      this.$router.push({
        name: "updateProductCate",
        query: { catid: row.catid, pcatid: row.pcatid },
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        console.log(row.catid);
        deleteProductCate(row.catid).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
  },
  filters: {
    levelFilter(value) {
      console.log(value);
      if (value == 1) {
        return i18n.t("GOODSCATEGORY.STAIR");
      } else if (value == 2) {
        return i18n.t("GOODSCATEGORY.SECOND");
      }
    },
    disableNextLevel(value) {
      if (value == 1) {
        return false;
      } else {
        return true;
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
};
</script>

<style scoped>
</style>
