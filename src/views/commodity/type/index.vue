<template> 
  <div class="app-container">
    <el-card
      class="operate-container"
      shadow="never"
    >
      <i
        class="el-icon-tickets"
        style="margin-top: 5px"
      />
      <span style="margin-top: 5px">{{$t('SEARCHING.DATALIST')}}</span>
      <el-button
        class="btn-add"
        @click="addProductAttrCate()"
        style="float:right"
        size="mini"
      >{{$t('FORMHEAD.ADD')}}</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productAttrCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <!-- 编号 -->
        <el-table-column
          :label="$t('FORMHEAD.SERIAL')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.catid}}</template>
        </el-table-column>
        <!-- 规格名称 -->
        <el-table-column
          :label="$t('FORM.ABELPRINTER')"
          align="center"
          width="400"
        >
          <template slot-scope="scope">{{scope.row.catname}}</template>
        </el-table-column>
        <!-- 规格属性 -->
        <el-table-column
          :label="$t('FORM.ITEMSPECIFICS')"
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="leftduiqi"
              v-for="(item,index) in scope.row.property"
              :key="index"
            >
              {{item.paramkey}} : {{item.paramvalue}}
            </div>

          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
          fixed="right"
          :label="$t('FORMHEAD.ACTION')"
          width="160"
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
              >{{item}}</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[20,30,50,100]"
        :total="listQuery.totalCount"
      />
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      style="float:right"
      width="30%"
    >
      <el-form
        ref="productAttrCatForm"
        :model="productAttrCate"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          :label="$t('TYPEMERCHANDISE.NAME')"
          prop="name"
        >
          <el-input
            v-model="productAttrCate.catname"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleConfirm('productAttrCatForm')"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  createProductAttrCate,
  deleteProductAttrCate,
  updateProductAttrCate,
} from "@/api/commodityType";
import i18n from "element-ui/lib/locale";
export default {
  name: "productAttrCateList",
  data() {
    return {
      list: null,
      // 操作 编辑 删除
      operation: [],
      // 表头
      formhead: [],
      // 属性列表
      sets: [],
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 0,
        storeid: localStorage.getItem("storeid"),
      },
      dialogVisible: false,
      dialogTitle: "",
      productAttrCate: {
        // 分类名称
        catname: "",
        // 店铺id
        storeid: "",
        // 状态   默认为1
        status: "1",
        // 分类id
        catid: "",
      },
      rules: {
        catname: [
          {
            required: true,
            message: i18n.t("SEARCHING.PLASSNAME"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        console.log(response);
        this.listLoading = false;
        this.list = response.catgoodslist;
        this.formhead = response.formhead;
        this.operation = response.formhead.operation;
        this.sets = response.formhead.sets;
        this.listQuery.totalCount = response.totalCount;
      });
    },
    // 点击添加类型按钮
    addProductAttrCate() {
      // this.dialogVisible = true;
      // this.dialogTitle = i18n.t("TYPEMERCHANDISE.ADDTYPE");
      // 跳转添加商品属性
      this.$router.push({
        name: "addProductAttr",
      });
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
    // 删除
    handleDelete(id) {
      console.log(id);
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        console.log(id);
        deleteProductAttrCate(id).then((response) => {
          console.log(response);
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },

    // 编辑
    handleUpdate(index, row) {
      console.log(index, row);
      this.$router.push({
        name: "updateProductAttr",
        query: {
          catid: row.catid,
        },
      });
      // this.dialogVisible = true;
      this.dialogTitle = i18n.t("SEARCHING.EDITINGTYPE");
      this.productAttrCate.catname = row.catname;
      this.productAttrCate.storeid = row.storeid;
      this.productAttrCate.status = row.status;
      this.productAttrCate.catid = row.catid;
    },
    // 操作
    handle(index, row) {
      switch (index) {
        case "edit":
          // 编辑
          this.handleUpdate(index, row);
          break;
        case "log":
          console.log("日志存留字段", row);
          break;
        case "look":
          console.log("查看存留字段", row);
          break;
        case "del":
          this.handleDelete(row.catid);
          break;
      }
    },

    // 添加商品类型名称
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userid = localStorage.getItem("userid");
          const catname = this.productAttrCate.catname;
          const status = this.productAttrCate.status;
          const storeid = localStorage.getItem("storeid");
          if (this.dialogTitle == i18n.t("TYPEMERCHANDISE.ADDTYPE")) {
            createProductAttrCate(storeid, userid, catname, status).then(
              (response) => {
                this.$message({
                  message: i18n.t("SEARCHING.ADDED"),
                  type: "success",
                  duration: 1000,
                });
                this.dialogVisible = false;
                this.getList();
              }
            );
          } else {
            // 修改编辑商品类型名称
            const storeid = this.productAttrCate.storeid;
            const userid = localStorage.getItem("userid");
            const catname = this.productAttrCate.catname;
            const status = this.productAttrCate.status;
            const catid = this.productAttrCate.catid;
            updateProductAttrCate(storeid, userid, catname, status, catid).then(
              (response) => {
                this.$message({
                  message: i18n.t("SEARCHING.SUCCESSFULLY"),
                  type: "success",
                  duration: 1000,
                });
                this.dialogVisible = false;
                this.getList();
              }
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.p:nth-child(1) {
  margin-right: 15px;
}
.leftduiqi {
  text-align: left;
  margin-left: 30px;
}
</style>


