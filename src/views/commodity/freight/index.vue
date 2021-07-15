<template> 
  <div class="app-container">
    <el-card
      class="operate-container"
      shadow="never"
    >
      <i class="el-icon-tickets"></i>
      <span> {{$t('SEARCHING.DATALIST')}}</span>
      <el-button
        size="mini"
        @click="handleAdd"
        style="float:right"
        class="btn-add"
      > {{$t('FORM.NEW')}}</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="returnReasonTable"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column
          :label="$t('TEMPLATEFREIGHT.TEMPLATEID')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.tplid}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('TEMPLATEFREIGHT.TEMPLATENAME')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.tplname}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('TEMPLATEFREIGHT.UPSTATE')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.status | disableNextLevel}}</template>
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
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)"
            >{{$t('FORMHEAD.UPDATE')}}</el-button>
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[20,30,50,100]"
        :total="listQuery.totalCount"
      />
    </div>

  </div>
</template>
<script>
import { fetchList } from "@/api/commodityFreight";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  totalCount: 0,
  storeid: localStorage.getItem("storeid"),
};
const defaultReturnReason = {
  name: null,
  sort: 0,
  status: 1,
};
export default {
  name: "returnReasonList",
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
      operateType: null,

      dialogVisible: false,
      returnReason: Object.assign({}, defaultReturnReason),
      operateReasonId: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 添加 跳转到添加模板页面
    handleAdd() {
      this.$router.push({ name: "addFreight" });
    },
    // 编辑
    handleUpdate(index, row) {
      console.log(row);
      this.$router.push({
        name: "compileFreight",
        params: { tplid: row.tplid },
      });
    },
    // 获取列表
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.prdfreight;
        this.listLoading = false;
        this.listQuery.totalCount = response.totalCount;
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
  },
  // 检测 是否可用状态
  filters: {
    disableNextLevel(value) {
      if (value == 0) {
        return i18n.t("FORM.DISABLED");
      } else {
        return i18n.t("FORM.USABLE");
      }
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 80%;
}
</style>


