<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <!-- 商品品牌 -->
      <el-form-item
        :label="$t('FORM.COMMODICATEGOR')"
        prop="prdbrand"
      >
        <el-cascader
          style="width:251px"
          v-model="value.prdbrand"
          :options="brandlist"
          :props="defCatlist"
          @change="handlePrdBrandChange"
          clearable
        ></el-cascader>

      </el-form-item>
      <!-- 商品分类 -->
      <el-form-item
        :label="$t('LOCALIZATION.GOODSCATEGORY')"
        prop="selPrdCatId"
      >
        <el-cascader
          style="width:251px"
          v-model="value.selPrdCatId"
          :options="prdCatOptions"
          clearable
        >
        </el-cascader>
        <el-button
          type="text"
          class="addfenl"
          @click="tanhHeldel()"
        >添加分类</el-button>
      </el-form-item>

      <!-- 价格币种 -->
      <el-form-item
        :label="$t('FORM.ASCURRENCY')"
        prop="currency"
      >
        <el-select
          style="width:251px"
          v-model="value.currency"
          :placeholder="$t('FORM.ASCURRENCY')"
        >
          <el-option
            style="width:251px"
            v-for="(item,index) in currencyList"
            :key="index"
            :label="item.currency_name"
            :value="item.price_currency"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 发货地区号 -->
      <el-form-item
        :label="$t('PRODUCTLIST.PLACES')"
        prop="deliveryplace"
      >
        <el-cascader
          style="width:251px"
          v-model="value.deliveryplace"
          :options="areaList"
          :props="defaultParams"
          clearable
        ></el-cascader>
      </el-form-item>

      <el-form-item
        :label="$t('SEARCHING.PRODUCTNAME')"
        prop="prdname"
      >
        <el-input v-model="value.prdname"></el-input>
      </el-form-item>
      <!-- 商品副标题 -->
      <!-- <el-form-item
        :label="$t('PRODUCTLIST.SUBTITLE')"
        prop="subname"
      >
        <el-input v-model="value.subname"></el-input>
      </el-form-item> -->
      <el-form-item
        :label="$t('PRODUCTLIST.INTRODUCTION')"
        prop="descs"
      >
        <el-input
          :autoSize="true"
          v-model="value.descs"
          type="textarea"
          :placeholder="$t('PRODUCTLIST.INTRODUCTION')"
        ></el-input>
      </el-form-item>
      <!-- 禁用地区 -->
      <!-- <el-form-item
        :label="$t('FORM.DISABLESRE')"
        prop="descs"
      >
        <el-input
          :autoSize="true"
          v-model="value.descs"
          :placeholder="$t('FORM.DISABLESRE')"
        ></el-input>
      </el-form-item> -->

      <el-form-item
        :label="$t('PRODUCTLIST.KEYWORD')"
        prop="keywords"
      >
        <el-input v-model="value.keywords"></el-input>
      </el-form-item>
      <!-- 商品货号 -->
      <!-- <el-form-item
        :label="$t('SEARCHING.COMMODITYITEMS')"
        prop="prdsn"
      >
        <el-input v-model="value.prdsn"></el-input>
      </el-form-item> -->

      <!-- 商品排序 -->
      <!-- <el-form-item :label="$t('PRODUCTLIST.GOODSSORTING')">
        <el-input v-model="value.sort"></el-input>
      </el-form-item> -->

      <!-- 运费模板 -->
      <el-form-item
        :label="$t('PRODUCTLIST.OFFREIGHT')"
        prop="freighttmpid"
      >
        <el-select
          style="width:251px"
          no-data-text
          v-model="value.freighttmpid"
          @click.native="getDivision()"
          :placeholder="$t('PRODUCTLIST.OFFREIGHT')"
        >
          <el-option
            v-for="item in prdfreight"
            :key="item.tplid"
            :label="item.tplname"
            :value="item.tplid"
            @change="delHeadle"
          >
          </el-option>
        </el-select>
        <el-button
          type="text"
          class="addfenl"
          @click="yunfeiHeadle()"
        >添加运费模板</el-button>
      </el-form-item>
      <!-- 商品上架 -->
      <el-form-item
        :label="$t('PRODUCTLIST.PUTGOODSON')"
        prop="putaway"
      >
        <el-switch
          v-model="value.publishstatus"
          :active-value="'1'"
          :inactive-value="'0'"
        >
        </el-switch>
      </el-form-item>

      <!-- 富文本编辑 商品详情 -->
      <el-form-item
        v-show="value.andshows"
        :label="$t('PRODUCTLIST.FORSDETAILS')"
        label-width="80px"
        style="margin-top:80px"
      >
        <tinymce
          :width="755"
          :height="300"
          v-model="value.detailhtml"
        ></tinymce>
      </el-form-item>
      <!-- 另一种方式 -->
      <el-form-item
        v-show="value.andshow"
        :label="$t('PRODUCTLIST.FORSDETAILS')"
        label-width="80px"
        style="margin-top:80px"
      >
        <div
          class="detailsp"
          v-for="(item,index) in value.arrlist"
          :key="index"
        >
          <img :src="item">
        </div>
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button
          type="primary"
          size="medium"
          @click="handleNext('productInfoForm')"
        >{{$t('PRODUCTLIST.FILLPRODUCT')}}</el-button>
      </el-form-item>
    </el-form>
    <!-- 如果运费模板没有值就跳转到运费模板去 -->
    <el-dialog
      :title="$t('ROLLOVERS.HINT')"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>{{$t('SEARCHING.SHOPDOES')}}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="goTocompile()"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </span>
    </el-dialog>

    <!-- 添加商品分类 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      width="40%"
    >

      <el-form
        :model="form"
        :rules="rules"
        ref="productCateFrom"
        label-width="160px"
      >
        <!-- 一级分类名称 -->
        <el-form-item
          :label="$t('GOODSCATEGORY.SYSTEMATIC')"
          required
        >
          <el-input
            style="width:300px"
            v-model="form.catname"
            :placeholder="$t('GOODSCATEGORY.SYSTEMATIC')"
          ></el-input>
        </el-form-item>
        <div
          class="filter-container"
          shadow="never"
          v-for="(item,index) in form.catlist"
          :key="index"
        >
          <!-- 二级分类名称 -->
          <el-form-item label="二级分类名称:">
            <el-input
              v-model="item.catname"
              style="width:200px"
              placeholder="二级分类名称"
            ></el-input>
            <el-button
              type="danger"
              size="mini"
              style="margin-left:10px"
              @click="removeGoodsSpec(item)"
              v-if="index!=0"
            >{{$t('FORMHEAD.DEL')}} </el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="addHeadles"
              v-if="indexflag==index"
            >新增下级分类</el-button>
          </el-form-item>
        </div>
        <el-form-item>

          <el-button
            type="primary"
            @click="onSubmitol('productCateFrom')"
          >{{$t('FORM.CONFIRM')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加运费模板 -->
    <el-dialog
      title="添加运费模板"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="margin-left:50px;margin-top:50px"
      >
        <el-form-item
          :label="$t('TEMPLATEFREIGHT.TEMPLATENAME')"
          prop="name"
        >
          <el-input
            v-model="ruleForm.tplname"
            style="width:300px;"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('TEMPLATEFREIGHT.TEMPLATETYPE')"
          prop="resource"
        >
          <el-radio-group v-model="ruleForm.tpltype">
            <el-radio :label="'SELLER'">{{$t('FORM.SELLER')}}</el-radio>
            <el-radio :label="'BUYER'">{{$t('FORM.BUYER')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('TEMPLATEFREIGHT.UPSTATE')"
          prop="resource"
        >
          <el-radio-group v-model="ruleForm.resource">
            <el-radio :label="'1'">{{$t('FORM.USABLE')}}</el-radio>
            <el-radio :label="'0'">{{$t('FORM.DISABLED')}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          :label="$t('TEMPLATEFREIGHT.FREIGHT')"
          prop="resource"
        >
          <el-button
            type="primary"
            @click=handleBatchOperate()
            v-model="operateType"
          >{{$t('TEMPLATEFREIGHT.BATCHEDITOR')}}</el-button>
        </el-form-item>
        <el-table
          ref="multipleTable"
          :data="ruleForm.provinceName"
          border
          tooltip-effect="dark"
          style="width: 661px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            :label="$t('TEMPLATEFREIGHT.PROVINCE')"
            width="200"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.areaname}}</template>
          </el-table-column>
          <el-table-column
            :label="$t('TEMPLATEFREIGHT.FREIGHT')"
            width="200"
            align="center"
          >
            <template slot-scope="scope">{{scope.row.amtfee}}</template>
          </el-table-column>
          <el-table-column
            :label="$t('FORMHEAD.ACTION')"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-row>
                <el-button
                  type="text"
                  @click="compile(scope.$index, scope.row)"
                >{{$t('FORMHEAD.UPDATE')}}</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-footer class="footer">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >{{$t('TEMPLATEFREIGHT.IMMEDIATELY')}}</el-button>
        </el-footer>
        <!-- 编辑 -->
        <el-dialog
          :title="$t('FORM.UPYUNFI')"
          :visible.sync="dialogVisible"
          width="40%"
          append-to-body
        >
          <el-form
            ref="roleForm"
            :model="role"
            label-width="150px"
            size="small"
          >
            <el-form-item :label="$t('TEMPLATEFREIGHT.PROVINCE')">
              <template>{{role.areaname}}</template>
            </el-form-item>
            <el-form-item
              :label="$t('TEMPLATEFREIGHT.FREIGHT')"
              prop="leng"
            >
              <el-input
                v-model="role.amtfee"
                :rows="5"
                style="width: 200px"
              >{{$t('FORM.YUAN')}}</el-input>
            </el-form-item>

          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              @click="dialogVisible = false"
              size="small"
            >{{$t('FORM.CANCEL')}}</el-button>
            <el-button
              type="primary"
              @click="handleDialogConfirm()"
              size="small"
            >{{$t('FORM.CONFIRM')}}</el-button>
          </span>
        </el-dialog>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {
  getPrdCatListWithStore,
  getPrdBrandListWithSys,
  loadfhd,
  loadCurrencyList,
} from "@/api/productadd";
import { getProductCate, addcat, editcat } from "@/api/commodityFenl";
import { updateProductCate, getcatlist } from "@/api/commodityFenl";
import i18n from "element-ui/lib/locale";
import { getstorefreight } from "@/api/commodityFreight";
import {
  getprovincelist,
  submitfreight,
  getbrandlist,
} from "@/api/commodityFreight";
import Tinymce from "@/components/Tinymce";
const defaultProductCate = {
  // 分类说明
  descs: "",
  // 关键字
  keywords: "",
  // 名称
  catname: "",
  // 状态
  status: "1",
  // 父级id
  pcatid: "",
  // 等级
  lvl: "1",
  // 排序
  sort: 0,
};
const defaultRole = {
  areaname: null,
  amtfee: null,
  areaid: null,
};
export default {
  name: "ProductInfoDetail",
  components: { Tinymce },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      brandlist: [],
      defCatlist: {
        label: "name",
        value: "id",
        children: "childrens",
      },
      defaultParams: {
        label: "areaname",
        value: "areaid",
        children: "province",
        checkStrictly: true,
      },
      indexflag: 0,
      form: {
        catname: "",
        catlist: [
          {
            catname: "",
          },
        ],
      },
      selectProductCateList: [],
      filterAttrs: [],

      ruleForm: {
        // 模板名称
        tplname: "",
        // 状态 可用不可用
        resource: "1",
        // 卖家 买家
        tpltype: "SELLER",
        // 省份名称
        provinceName: [],
        // 运费金额
        amtfee: 0,
      },
      // 批量操作
      operateType: null,
      // 下标
      ind: "",
      // 弹框
      dialogVisible: false,
      obj: {},
      role: Object.assign({}, defaultRole),
      // 价格币种
      currencyList: [],
      // 发货地区号
      areaList: [],
      multipleSelection: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      productCate: Object.assign({}, defaultProductCate),

      filterProductAttrList: [
        {
          value: [],
        },
      ],
      centerDialogVisible: false,
      prdfreight: [],
      hasEditCreated: false,
      //选中商品分类的值
      selPrdCatId: [],
      prdCatOptions: [],
      //分类列表
      prdBrandOptions: [],
      rules: {
        selPrdCatId: [
          {
            type: "array",
            required: true,
            message: i18n.t("LOCALIZATION.GOODSCATEGORY"),
            trigger: "blur",
          },
        ],
        prdbrand: [
          {
            required: true,
            message: i18n.t("SEARCHING.SELECTTHE"),
            trigger: "blur",
          },
        ],
        freighttmpid: [
          {
            required: true,
            message: i18n.t("SEARCHING.SHIPPING"),
            trigger: "blur",
          },
        ],
        currency: [
          {
            required: true,
            message: i18n.t("FORM.ASCURRENCY"),
            trigger: "blur",
          },
        ],
        prdname: [
          {
            required: true,
            message: i18n.t("SEARCHING.PRODUCTNAME"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 140,
            message: i18n.t("SEARCHING.BETWEEN"),
            trigger: "blur",
          },
        ],
        subname: [
          {
            required: true,
            message: i18n.t("SEARCHING.SUBTITLE"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 140,
            message: i18n.t("SEARCHING.BETWEEN"),
            trigger: "blur",
          },
        ],
        descs: [
          {
            required: true,
            message: i18n.t("SEARCHING.ENTERPRODUCT"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 500,
            message: i18n.t("SEARCHING.BETWEEN"),
            trigger: "blur",
          },
        ],
        keywords: [
          {
            required: true,
            message: i18n.t("SEARCHING.MULTIPLET"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 180,
            message: i18n.t("SEARCHING.BETWEEN"),
            trigger: "blur",
          },
        ],
        prdsn: [
          {
            required: true,
            message: i18n.t("SEARCHING.ARTICLENUMBER"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 48,
            message: i18n.t("SEARCHING.BETWEEN"),
            trigger: "blur",
          },
        ],
        deliveryplace: [
          {
            required: true,
            message: i18n.t("SEARCHING.ARTICLNUMBER"),
            trigger: "blur",
          },
        ],
        requiredProp: [
          {
            required: true,
            message: i18n.t("SEARCHING.REQUIRED"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 获取商品品牌
    this.getbrandlist();
    // 获取发货地区号
    this.loadfhd();
    // 价格币种
    this.loadCurrencyList();
    // 获取省份列表
    this.getListsf();
    this.getSelectProductCateList();
    this.getProductCateList();
    // 获取运费模板
    this.fetchList();
  },
  computed: {
    //商品的编号
    productId() {
      return this.value.pcatid;
    },
  },
  watch: {
    productId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue == undefined || newValue == null || newValue == 0) return;
      this.handleEditCreated();
    },
    selPrdCatId: function (newValue) {
      if (newValue) {
        this.value.catid = newValue[1];
        this.value.prdcatname = this.getPrdCatNameById(this.value.catid);
      }
    },
  },
  methods: {
    // 添加分类弹窗清空绑定值
    tanhHeldel() {
      this.dialogTableVisible = true;
      this.form = {
        catname: "",
        catlist: [
          {
            catname: "",
          },
        ],
      };
    },
    // 添加运费模板弹窗清空绑定值
    yunfeiHeadle() {
      this.dialogFormVisible = true;
      this.ruleForm.tplname = "";
    },
    // 获取商品品牌数组
    getbrandlist() {
      getbrandlist().then((res) => {
        this.brandlist = res.brandlist;
      });
    },
    //删除商品规格
    removeGoodsSpec(item) {
      var index = this.form.catlist.indexOf(item);
      if (index != -1) {
        this.form.catlist.splice(index, 1);
      }
      this.indexflag--;
    },
    // 动态添加商品属性
    addHeadles() {
      this.form.catlist.push({
        catname: "",
      });
      this.indexflag++;
    },
    // 添加商品分类
    onSubmitol() {
      // 添加
      this.form["storeid"] = localStorage.getItem("storeid");
      this.form["userid"] = localStorage.getItem("userid");
      addcat(this.form).then((response) => {
        if (response.returncode == "-1") {
          this.$message.error(response.returnmsg);
        } else {
          this.$message({
            message: i18n.t("SEARCHING.ADDED"),
            type: "success",
            duration: 1000,
          });
          this.dialogTableVisible = false;
          this.getProductCateList();
        }
      });
    },
    // 删除本地存储的图片
    delHeadle() {
      localStorage.removeItem("albumimg");
    },
    // 获取价格币种下拉框
    loadCurrencyList() {
      loadCurrencyList().then((res) => {
        console.log(res);
        this.currencyList = res.currencyList;
      });
    },
    // 获取省份列表
    getListsf() {
      getprovincelist().then((res) => {
        console.log(res);
        this.ruleForm.provinceName = res.provincelist;
        this.ruleForm.provinceName.forEach((item) => {
          this.$set(item, "amtfee", this.ruleForm.amtfee);
        });
      });
    },
    // 添加运费模板
    submitForm(formName) {
      console.log("添加运费模板");
      // console.log(this.ruleForm);
      console.log(this.multipleSelection);
      let obj = {};
      const storeid = localStorage.getItem("storeid");
      const userid = localStorage.getItem("userid");
      obj["storeid"] = storeid;
      obj["userid"] = userid;
      obj["tplname"] = this.ruleForm.tplname;
      obj["status"] = this.ruleForm.resource;
      const arealist = JSON.parse(JSON.stringify(this.multipleSelection));
      this.multipleSelection.forEach((item) => {
        console.log(item);
      });
      obj["arealist"] = arealist;
      obj["tpltype"] = this.ruleForm.tpltype;
      console.log(this.ruleForm.tpltype);
      console.log(obj);
      this.$confirm(i18n.t("ROLLOVERS.CREATETEMPLATE"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          submitfreight(obj).then((res) => {
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.SUBMISSION"),
            });
            this.dialogFormVisible = false;
            this.fetchList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("SEARCHING.CANCELLEDOP"),
          });
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 单个编辑
    compile(index, row) {
      this.ind = index;
      this.dialogVisible = true;
      this.role = Object.assign({}, row);
    },
    // 编辑
    handleDialogConfirm(id) {
      console.log(this.role.amtfee);
      this.obj["amtfee"] = this.role.amtfee;
      // 判断是单个编辑还是多个编辑
      if (Array.isArray(this.role.areaid) == true) {
        this.obj["ids"] = this.role.areaid;
      } else {
        this.obj["ids"] = [this.role.areaid];
      }
      this.$confirm(i18n.t("SEARCHING.AFSFIRM") + "?", {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      }).then(() => {
        // 用下标的方式把当前选中的所有人的运费值等于修改过的值
        // 判断现在是否选中
        if (this.multipleSelection.length == 0) {
          this.ruleForm.provinceName[this.ind]["amtfee"] = this.role.amtfee;
        } else {
          this.multipleSelection.forEach((item) => {
            item.amtfee = this.role.amtfee;
          });
        }

        this.$message({
          message: i18n.t("SEARCHING.SUCCESSFULLY"),
          type: "success",
        });
        // });
        this.dialogVisible = false;
      });
    },
    // 选中的多少条
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量编辑
    handleBatchOperate() {
      // 如果没有选择任何一个跳出提示
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.dialogVisible = false;
        this.$message({
          message: i18n.t("FORRETUR.SELECTTHE"),
          type: "warning",
          duration: 1000,
        });
        return;
      } else {
        this.dialogVisible = true;
      }
      let ids = [];
      let name = [];
      let mun = "";
      this.multipleSelection.forEach((item, i) => {
        name.push(item.areaname);
        ids.push(item.areaid);
      });
      this.role.areaname = name;
      this.role.areaid = ids;
    },
    // 发货地区号
    loadfhd() {
      loadfhd().then((res) => {
        console.log(res);
        this.areaList = res.areaList;
      });
    },
    //  前往编辑运费页面
    goTocompile() {
      this.centerDialogVisible = false;
      this.$router.push({ name: "addFreight" });
    },
    // 如果获取的运费模板为空的话就跳转到运费模板页面去
    getDivision() {
      if (this.prdfreight.length == 0) {
        this.centerDialogVisible = true;
      }
    },
    // 获取运费模板
    fetchList() {
      const storeid = localStorage.getItem("storeid");
      getstorefreight(storeid).then((res) => {
        console.log(res);
        this.prdfreight = res.prdfreight;
      });
    },
    //处理编辑逻辑
    handleEditCreated() {
      if (this.value.catid) {
        this.selPrdCatId.push(this.value.prdcatid + "");
        this.selPrdCatId.push(this.value.catid + "");
      }
      this.hasEditCreated = true;
    },
    // 获取商品分类
    getProductCateList() {
      const storeid = localStorage.getItem("storeid");
      getPrdCatListWithStore(storeid).then((response) => {
        console.log(response, "ss");
        let list = response.catlist;
        this.prdCatOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].childrens != null && list[i].childrens.length > 0) {
            for (let j = 0; j < list[i].childrens.length; j++) {
              children.push({
                label: list[i].childrens[j].catname,
                value: list[i].childrens[j].catid,
              });
            }
          }
          this.prdCatOptions.push({
            label: list[i].catname,
            value: list[i].catid,
            children: children,
          });
        }
      });
    },
    // 验证品牌
    handlePrdBrandChange(val) {
      console.log(val);
      let valuec = val[2];
      let prdbrandname = "";
      for (let i = 0; i < this.brandlist.length; i++) {
        for (let j = 0; j < this.brandlist[i].childrens.length; j++) {
          for (
            let l = 0;
            l < this.brandlist[i].childrens[j].childrens.length;
            l++
          ) {
            if (this.brandlist[i].childrens[j].childrens[l].id == valuec) {
              prdbrandname = this.brandlist[i].childrens[j].childrens[l].name;
              break;
            }
          }
        }
      }
      this.value.prdbrandname = prdbrandname;
      console.log(prdbrandname);
    },
    getPrdCatNameById(id) {
      let name = this.value.prdcatname;
      for (let i = 0; i < this.prdCatOptions.length; i++) {
        for (let j = 0; j < this.prdCatOptions[i].children.length; j++) {
          if (this.prdCatOptions[i].children[j].value == id) {
            name = this.prdCatOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName) {
      if (this.$route.query.id) {
        console.log("111");
      } else {
        let a = [];
        localStorage.setItem("albumimg", JSON.stringify(a));
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("nextStep");
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },

    // getProductCate() {
    //   // 初始修改数据
    //   if (this.isEdit) {
    //     getProductCate(this.$route.query.catid).then((response) => {
    //       console.log(response);
    //       this.productCate = response.catinfo;
    //     });
    //   } else {
    //     this.productCate = Object.assign({}, defaultProductCate);
    //   }
    // },
    ssscasv(v) {
      console.log(v);
    },
    // 分类
    getSelectProductCateList() {
      const storeid = localStorage.getItem("storeid");
      getcatlist(storeid).then((response) => {
        console.log(response);
        this.selectProductCateList = response.catlist;
        this.selectProductCateList.unshift({
          catid: "1",
          catname: i18n.t("SEARCHING.CLASSIFICATION"),
        });
        console.log(this.selectProductCateList);
        let list = response.catlist;
        for (let i = 0; i < list.length; i++) {
          let productAttrCate = list[i];
          let childrens = [];
          if (
            productAttrCate.productAttributeList != null &&
            productAttrCate.productAttributeList.length > 0
          ) {
            for (
              let j = 0;
              j < productAttrCate.productAttributeList.length;
              j++
            ) {
              childrens.push({
                label: productAttrCate.productAttributeList[j].name,
                value: productAttrCate.productAttributeList[j].id,
              });
            }
          }
          this.filterAttrs.push({
            label: productAttrCate.name,
            value: productAttrCate.id,
            childrens: childrens,
          });
        }
      });
    },
    getProductAttributeIdList() {
      //获取选中的筛选商品属性
      let productAttributeIdList = [];
      for (let i = 0; i < this.filterProductAttrList.length; i++) {
        let item = this.filterProductAttrList[i];
        if (item.value != null && item.value.length == 2) {
          productAttributeIdList.push(item.value[1]);
        }
      }
      return productAttributeIdList;
    },
    // onSubmit(formName) {
    //   if (this.productCate.pcatid == 1) {
    //     this.productCate.lvl = 1;
    //   } else {
    //     this.productCate.lvl = 2;
    //   }
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$confirm(i18n.t("SEARCHING.TOCOMMIT"), {
    //         confirmButtonText: i18n.t("FORM.CONFIRM"),
    //         cancelButtonText: i18n.t("FORM.CANCEL"),
    //         type: "warning",
    //       }).then(() => {
    //         // 添加
    //         const storeid = localStorage.getItem("storeid");
    //         const userid = localStorage.getItem("userid");
    //         this.productCate["storeid"] = storeid;
    //         this.productCate["userid"] = userid;
    //         console.log(this.productCate);
    //         updateProductCate(this.productCate).then((response) => {
    //           this.$message({
    //             message: i18n.t("SEARCHING.ADDED"),
    //             type: "success",
    //             duration: 1000,
    //           });
    //           this.getProductCateList();
    //           this.dialogTableVisible = false;
    //         });
    //       });
    //     } else {
    //       this.$message({
    //         message: i18n.t("SEARCHING.FAILED"),
    //         type: "error",
    //         duration: 1000,
    //       });
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.productCate = Object.assign({}, defaultProductCate);
      this.getSelectProductCateList();
      this.filterProductAttrList = [
        {
          value: [],
        },
      ];
    },
    removeFilterAttr(productAttributeId) {
      if (this.filterProductAttrList.length === 1) {
        this.$message({
          message: "至少要留一个",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      var index = this.filterProductAttrList.indexOf(productAttributeId);
      if (index !== -1) {
        this.filterProductAttrList.splice(index, 1);
      }
    },
    handleAddFilterAttr() {
      if (this.filterProductAttrList.length === 3) {
        this.$message({
          message: "最多添加三个",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.filterProductAttrList.push({
        value: null,
        key: Date.now(),
      });
    },
  },
};
</script>

<style scoped>
.addfenl {
  margin-left: 20px;
}
.footer {
  position: fixed;
  height: 100px;
  bottom: 0;
  right: 500px;
}
.littleMargin {
  margin-top: 10px;
}

.detailsp > img {
  width: 100px;
  height: 100px;
  margin: 5px;
  float: left;
}
</style>
