<template> 
  <div class="app-container">
    <el-card
      class="filter-container"
      shadow="never"
    >
      <div>
        <i class="el-icon-search"></i>
        <span>{{$t("SEARCHING.SCREENING")}}</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >{{$t("SEARCHING.SEARCH")}}</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >{{$t("SEARCHING.RESET")}}</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item :label="$t('SEARCHING.PRODUCTNAME')">
            <el-input
              style="width: 203px"
              v-model="listQuery.prdname"
              :placeholder="$t('SEARCHING.PRODUCTNAME')"
              clearable
            />
          </el-form-item>
          <!-- <el-form-item
            label-width="180px"
            :label="$t('SEARCHING.COMMODITYITEMS')"
          >
            <el-input
              style="width: 203px"
              v-model="listQuery.prdsn"
              :placeholder="$t('SEARCHING.COMMODITYITEMS')"
              clearable
            />
          </el-form-item> -->
          <!-- 商品分类第一级 -->
          <el-form-item :label="$t('FORM.PRIMARYCOMMODITY')">
            <el-select
              v-model="listQuery.prdcatname"
              :placeholder="$t('FORM.PRIMARYCOMMODITY')"
              @change="banHeadle"
            >
              <el-option
                v-for="item in catlist"
                :key="item.catid"
                :label="item.catname"
                :value="item.catid"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 商品分类第二级 -->
          <el-form-item :label="$t('FORM.SECONDARYCOMMODITY')">
            <el-select
              :disabled="showdisabled"
              v-model="listQuery.catid"
              :placeholder="$t('FORM.SECONDARYCOMMODITY')"
            >
              <el-option
                v-for="item in catlister"
                :key="item.catid"
                :label="item.catname"
                :value="item.catid"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item :label="$t('SEARCHING.COMMODITYBRAND')">
            <el-select
              v-model="listQuery.prdbrand"
              :placeholder="$t('SEARCHING.COMMODITYBRAND')"
              clearable
            >
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('SEARCHING.ONSTATE')">
            <el-select
              v-model="listQuery.publishstatus"
              :placeholder="$t('SEARCHING.ONSTATE')"
              clearable
            >
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item :label="$t('SEARCHING.GOODSSTATE')">
            <el-select
              v-model="listQuery.previewstatus"
              :placeholder="$t('SEARCHING.GOODSSTATE')"
              clearable
            >
              <el-option
                v-for="item in commodity"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('SEARCHING.AUDITSTATUS')">
            <el-select
              v-model="listQuery.examstatus"
              :placeholder="$t('SEARCHING.AUDITSTATUS')"
              clearable
            >
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        @click="handleAddProduct()"
        style="float:right"
        size="mini"
      >{{$t('FORMHEAD.ADD')}}</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        border
      >
        <!-- 单选框 -->
        <el-table-column
          type="selection"
          width="60"
          align="center"
        />
        <!-- 编号 -->
        <el-table-column
          type="index"
          :label="$t('FORMHEAD.SERIAL')"
          width="80"
          align="center"
        />
        <!-- 商品图片 -->
        <el-table-column
          :label="$t('PRODUCTLIST.COMMODITYIMAGES')"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <img
              style="height: 100px;width:100px"
              :src="scope.row.prdimg"
            />
          </template>
        </el-table-column>
        <!-- 商品名称 -->
        <el-table-column
          :label="$t('SEARCHING.PRODUCTNAME')"
          align="center"
          width="450"
        >
          <template slot-scope="scope">
            <p>{{scope.row.prdname}}</p>
            <!-- <p>{{$t('PRODUCTLIST.BRAND')}}：{{scope.row.prdbrandname}}</p> -->
          </template>
        </el-table-column>

        <!-- 标签 -->
        <el-table-column
          :label="$t('PRODUCTLIST.label')"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <p>{{$t('SEARCHING.PUTAWAY')}}：
              <el-switch
                :active-value="'1'"
                :inactive-value="'0'"
                v-model="scope.row.publishstatus"
                @change="handlePublishStatusChange(scope.$index, scope.row)"
              />
            </p>

          </template>
        </el-table-column>
        <!-- SKU库存 -->
        <el-table-column
          :label="$t('PRODUCTLIST.SKUINVENTORIES')"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleShowSkuEditDialog(scope.$index, scope.row)"
              circle
            />
          </template>
        </el-table-column>
        <!-- 销量 -->
        <el-table-column
          :label="$t('PRODUCTLIST.SALES')"
          align="center"
        >
          <template slot-scope="scope">{{scope.row.countsale}}</template>
        </el-table-column>
        <!-- 审核状态 -->
        <el-table-column
          :label="$t('SEARCHING.AUDITSTATUS')"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{scope.row.examstatusname}}</p>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          fixed="right"
          :label="$t('FORMHEAD.ACTION')"
          width="220"
          align="center"
        >
          <template slot-scope="scope">
            <p
              v-for="(item,index) in operation"
              :key="index"
              style="float:left;margin-right:10px"
            >
              <el-button
                size="mini"
                :type="index=='del'&&'danger'"
                @click="handleShow(index,scope.row)"
              >{{item}}</el-button>
            </p>
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
        />
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >{{$t('FORM.CONFIRM')}}</el-button>
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
        :total="listQuery.totalCount"
      />
    </div>
    <!-- 查询商品sku库存 -->
    <el-dialog
      :title="$t('SEARCHING.INFORMATION')"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>{{$t('SEARCHING.COMMODITYITEMS')}}：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <el-input
        :placeholder="$t('SEARCHING.SKUNUMBER')"
        v-model="editSkuInfo.keyword"
        size="small"
        style="width: 50%;margin-left: 20px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchEditSku"
        />
      </el-input>
      <el-table
        style="width: 100%;margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column
          :label="$t('SEARCHING.SKUSERIAL')"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.skucode"
              :disabled="true"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center"
        >
          <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
        </el-table-column>
        <!-- 销售价格 -->
        <el-table-column
          :label="$t('PRODUCTLIST.SALEPRICE')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.priceoriginal"
              :disabled="true"
            ></el-input>
          </template>
        </el-table-column>
        <!-- a2u价格 -->
        <el-table-column
          :label="$t('PRODUCTLIST.INVENTORY')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <!-- 库存预警值 -->
        <el-table-column
          :label="$t('SEARCHING.WARNINGVALUE')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.stocklow"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editSkuInfo.dialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="handleEditSkuConfirm"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  handleDelete,
  loadSkunum,
  updateSkuStockList,
  fetchListWithChildren,
  fetchBrandList,
  displayGoods,
  updateSkunum,
  loadcatlist,
} from "@/api/productList";
import i18n from "element-ui/lib/locale";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  totalCount: 0,
  storeid: localStorage.getItem("storeid"),
  prdname: null,
  previewstatus: null,
  prdsn: null,
  prdcatname: null,
  prdbrand: null,
  prdbrandname: null,
  publishstatus: null,
  examstatus: null,
  // 商品分类二级
  catid: null,
};
export default {
  name: "productList",
  data() {
    return {
      // 商品分类第一级
      catlist: [],
      // 商品分类第二级
      catlister: [],
      // 二级禁用
      showdisabled: true,
      // 表格头部
      separator: [],
      // 编辑，修改等操作
      operation: [],
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productSn: "",
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
        keyword: null,
      },
      operates: [
        {
          label: i18n.t("PRODUCTLIST.PUTGOODSON"),
          value: "publishOn",
        },
        {
          label: i18n.t("PRODUCTLIST.TAKESTH"),
          value: "publishOff",
        },
        {
          label: i18n.t("PRODUCTLIST.SETRECIMAGES"),
          value: "recommendOn",
        },
        {
          label: i18n.t("PRODUCTLIST.RECOMMENDED"),
          value: "recommendOff",
        },
        {
          label: i18n.t("PRODUCTLIST.SETANEW"),
          value: "newOn",
        },
        {
          label: i18n.t("PRODUCTLIST.THEPRODUCT"),
          value: "newOff",
        },
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [
        { value: 666, label: i18n.t("FORM.ALL") },
        { value: 1, label: i18n.t("SEARCHING.PUTAWAY") },
        { value: 0, label: i18n.t("SEARCHING.SOLDOUT") },
      ],
      verifyStatusOptions: [
        { value: 666, label: i18n.t("FORM.ALL") },
        { value: 0, label: i18n.t("SEARCHING.UNREVIEWED") },
        { value: 1, label: i18n.t("SEARCHING.UNDER") },
        { value: 2, label: i18n.t("SEARCHING.VERIFIED") },
        { value: 3, label: i18n.t("SEARCHING.REFUSED") },
      ],
      commodity: [
        { value: 0, label: i18n.t("SEARCHING.PRESALEGOODS") },
        { value: 1, label: i18n.t("SEARCHING.INQUIREGENERAL") },
      ],
    };
  },
  created() {
    this.getList();
    this.getProductCateList();
    this.fetchBrandList();
  },
  watch: {
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length == 2) {
        this.listQuery.prdcatname = newValue[1];
      } else {
        this.listQuery.prdcatname = null;
      }
    },
  },
  filters: {
    verifyStatusFilter(value) {
      if (value == "1") {
        return i18n.t("SEARCHING.VERIFIED");
      } else {
        return i18n.t("SEARCHING.UNREVIEWED");
      }
    },
  },
  methods: {
    // 上架
    handlePublishStatusChange(index, row) {
      console.log(row);
      console.log(this.listQuery.publishstatus);
      console.log(row.examstatus); //上架
      let ids = [];
      ids.push(row.id);
      if (row.examstatus == "2") {
        // 点击下架
        this.$confirm(i18n.t("FORM.ETHERTR"), {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            this.updatePublishStatus(row.publishstatus, ids);
            this.$message({
              type: "success",
              message: i18n.t("FORM.EDITTHEIT"),
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("SEARCHING.CANCELLEDOP"),
            });
            this.getList();
          });
      } else {
        this.$confirm(i18n.t("SEARCHING.WHETHER") + "?", {
          confirmButtonText: i18n.t("FORM.CONFIRM"),
          cancelButtonText: i18n.t("FORM.CANCEL"),
          type: "warning",
        })
          .then(() => {
            this.updatePublishStatus(row.publishstatus, ids);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: i18n.t("SEARCHING.CANCELLEDOP"),
            });
            this.getList();
          });
      }
    },
    // 商品分类选中时的状态
    banHeadle(value) {
      console.log(value);
      this.listQuery.catid = "";
      let obj = {};
      obj["catid"] = value;
      obj["storeid"] = localStorage.getItem("storeid");
      loadcatlist(obj).then((res) => {
        console.log(res);
        this.catlister = res.catlist;
        if (value != 666) {
          this.showdisabled = false;
        } else {
          this.showdisabled = true;
        }
      });
    },
    getProductSkuSp(row, index) {
      let prdattr = JSON.parse(row.prdattr);
      if (prdattr != null && index < prdattr.length) {
        return prdattr[index].value;
      } else {
        return null;
      }
    },
    endLoading() {
      this.listLoading = true;
    },
    // 获取商品列表
    getList() {
      this.listLoading = true;
      let obj = {};
      const storeid = localStorage.getItem("storeid");
      obj["storeid"] = storeid;
      obj["prdname"] = this.listQuery.prdname;
      obj["previewstatus"] = this.listQuery.previewstatus;
      obj["prdsn"] = this.listQuery.prdsn;
      obj["catid"] = this.listQuery.catid;
      obj["prdbrand"] = this.listQuery.prdbrand;

      if (this.listQuery.prdcatname == 666) {
        obj["prdcatname"] = null;
      } else {
        obj["prdcatname"] = this.listQuery.prdcatname;
      }

      if (this.listQuery.publishstatus == 666) {
        obj["publishstatus"] = null;
      } else {
        obj["publishstatus"] = this.listQuery.publishstatus;
      }

      if (this.listQuery.examstatus == 666) {
        obj["examstatus"] = null;
      } else {
        obj["examstatus"] = this.listQuery.examstatus;
      }

      obj["start"] = this.listQuery.pageNum - 1;
      obj["limit"] = this.listQuery.pageSize;
      console.log(obj);

      fetchList(obj).then((response) => {
        this.separator = response.formhead;
        this.list = response.goodslist;
        this.operation = response.formhead.operation;
        this.listQuery.totalCount = response.totalCount;
        this.listLoading = false;
      });
      this.endLoading();
    },
    fetchBrandList() {
      // 获取商品品牌数组
      fetchBrandList().then((response) => {
        this.brandOptions = [];
        let brandList = response.brandlist;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id,
          });
        }
      });
    },
    getProductCateList() {
      // 获取商品分类数组
      fetchListWithChildren(this.listQuery.storeid).then((response) => {
        console.log(response);
        this.catlist = response.catlist;
        this.catlist.unshift({ catname: i18n.t("FORM.ALL"), catid: "666" });

        // 暂时搁置  二级菜单

        //  let list = response.catlist;
        // this.productCateOptions = [];
        // for (let i = 0; i < list.length; i++) {
        //   let children = [];
        //   if (list[i].childrens != null && list[i].childrens.length > 0) {
        //     for (let j = 0; j < list[i].childrens.length; j++) {
        //       children.push({
        //         label: list[i].childrens[j].catname,
        //         value: list[i].childrens[j].catid,
        //       });
        //     }
        //   }
        //   this.productCateOptions.push({
        //     label: list[i].catname,
        //     value: list[i].catid,
        //     children: children,
        //   });
        // }
      });
    },
    // 获取sku编号
    handleShowSkuEditDialog(index, row) {
      console.log(row);
      this.editSkuInfo.dialogVisible = true;
      this.editSkuInfo.productId = row.id;
      this.editSkuInfo.productSn = row.prdsn;
      // this.editSkuInfo.productAttributeCategoryId =
      //   row.productAttributeCategoryId;
      this.editSkuInfo.keyword = null;
      // 获取sku
      updateSkuStockList(row.id).then((res) => {
        console.log(res);
        this.editSkuInfo.stockList = res.skunum;
      });
    },
    // 搜索sku号
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, {
        keyword: this.editSkuInfo.keyword,
      }).then((response) => {
        this.editSkuInfo.stockList = response.data;
      });
    },
    handleEditSkuConfirm() {
      console.log("aaa");
      if (
        this.editSkuInfo.stockList == null ||
        this.editSkuInfo.stockList.length <= 0
      ) {
        this.$message({
          message: "暂无sku信息",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        console.log(this.editSkuInfo.stockList);
        let stocklist = [];
        this.editSkuInfo.stockList.forEach((item) => {
          stocklist.push({
            stokid: item.stockid,
            stock: item.stock,
            stocklow: item.stocklow,
          });
        });
        console.log(stocklist);
        // 修改库存
        updateSkunum(stocklist).then((response) => {
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLY"),
            type: "success",
            duration: 1000,
          });
          this.editSkuInfo.dialogVisible = false;
        });
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.listLoading = true;
      this.getList();
      this.endLoading();
    },
    handleAddProduct() {
      let a = [];
      localStorage.setItem("albumimg", JSON.stringify(a));
      this.$router.push({ path: "add" });
    },
    // 批量操作
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: i18n.t("SEARCHING.OPERATIONOF"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: i18n.t("SEARCHING.THEITEM"),
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm(i18n.t("SEARCHING.BATCHOPERATION"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        // 编辑等操作
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids);
            break;
          default:
            break;
        }
        this.getList();
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
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },

    // 新品
    handleNewStatusChange(index, row) {
      console.log(row);
      let ids = [];
      ids.push(row.id);
      this.updateNewStatus(row.newstatus, ids);
    },
    // 推荐
    handleRecommendStatusChange(index, row) {
      console.log(row);
      let ids = [];
      ids.push(row.id);
      this.updateRecommendStatus(row.recommandstatus, ids);
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    handleUpdateProduct(index, row) {
      this.$router.push({ path: "/pms/updateProduct", query: { id: row.id } });
    },
    // 选择多重删除
    updateDeleteStatus(deleteStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("deleteStatus", deleteStatus);
      updateDeleteStatus(params).then((response) => {
        this.$message({
          message: i18n.t("SEARCHING.SUCCESSFULLYDELETE"),
          type: "success",
          duration: 1000,
        });
      });
      this.getList();
    },
    // 删除
    handleDelete(id) {
      this.$confirm(i18n.t("ROLLOVERS.DELS"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then((res) => {
        handleDelete(id).then((res) => {
          this.getList();
        });
        // 多个删除
        // let ids = [];
        // ids.push(id);
        // this.updateDeleteStatus(1,ids);
      });
    },
    // 新品修改
    updateNewStatus(newstatus, ids) {
      let obj = {};
      obj["prdid"] = ids;
      obj["newstatus"] = newstatus;
      console.log(obj);
      displayGoods(obj).then((response) => {
        this.$message({
          message: i18n.t("SEARCHING.SUCCESSFULLY"),
          type: "success",
          duration: 1000,
        });
        this.getList();
      });
    },
    // 点击触发事件
    handleShow(index, row) {
      switch (index) {
        case "edit":
          // 编辑  当此列表的商品是上架状态的话让商家先下架在进行编辑操作
          console.log(row.publishstatus);
          if (row.publishstatus == 1) {
            this.$message({
              message: i18n.t("SEARCHING.SHELFBEFORE"),
              type: "warning",
            });
          } else {
            this.$router.push({
              path: "/commodity/updateProduct",
              query: { id: row.id },
            });
          }
          break;
        case "log":
          console.log("日志存留字段", row);
          break;
        case "look":
          console.log("查看存留字段", row);
          this.$router.push({
            name: "particularX",
            query: { prdid: row.id },
          });
          break;
        case "del":
          this.handleDelete(row.id);
          break;
      }
      // console.log("handleShowProduct",row);
    },
    handleShowVerifyDetail(index, row) {
      console.log("handleShowVerifyDetail", row);
    },
    handleShowLog(index, row) {
      console.log("handleShowLog", row);
    },
    // 上架
    updatePublishStatus(publishstatus, ids) {
      console.log(publishstatus, ids);
      let obj = {};
      obj["prdid"] = ids;
      obj["publishstatus"] = publishstatus;
      displayGoods(obj).then((response) => {
        if (response.returncode == 0 && publishstatus == 0) {
          this.getList();
          this.$message({
            message: i18n.t("SEARCHING.SUCCESSFULLY"),
            type: "success",
            duration: 1000,
          });
        } else {
          this.getList();
          this.$message({
            message: i18n.t("SEARCHING.WAITPATIENTLY"),
            type: "warning",
            duration: 1000,
          });
        }
      });
    },
    // 推荐
    updateRecommendStatus(recommands, ids) {
      let obj = {};
      obj["prdid"] = ids;
      obj["recommands"] = recommands;
      displayGoods(obj).then((response) => {
        this.$message({
          message: i18n.t("SEARCHING.SUCCESSFULLY"),
          type: "success",
          duration: 1000,
        });
        this.getList();
      });
    },
  },
};
</script>



