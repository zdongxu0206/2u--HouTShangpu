<template>
  <el-card
    class="form-container"
    shadow="never"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="productCateFrom"
      label-width="260px"
      style="width:900px;margin:50px"
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
          v-if="!isEdit"
          @click="resetForm('productCateFrom')"
        >{{$t('FORM.CANCEL')}}</el-button>

        <el-button
          type="primary"
          @click="onSubmit('productCateFrom')"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
import { getProductCate, addcat, editcat } from "@/api/commodityFenl";
import SingleUpload from "@/components/Upload/singleUpload";
import i18n from "element-ui/lib/locale";

export default {
  name: "ProductCateDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
      },
      filterAttrs: [],
      filterProductAttrList: [
        {
          value: [],
        },
      ],
    };
  },
  created() {
    this.getProductCate();
  },
  methods: {
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

    getProductCate() {
      // 初始修改数据
      if (this.isEdit) {
        let obj = {};
        obj["storeid"] = localStorage.getItem("storeid");
        obj["catid"] = this.$route.query.catid;
        getProductCate(obj).then((response) => {
          console.log(response);
          this.form = response;
          this.indexflag = response.catlist.length - 1;
        });
      }
    },
    // 添加编辑
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(i18n.t("SEARCHING.TOCOMMIT"), {
            confirmButtonText: i18n.t("FORM.CONFIRM"),
            cancelButtonText: i18n.t("FORM.CANCEL"),
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              // 修改
              this.form["storeid"] = localStorage.getItem("storeid");
              this.form["userid"] = localStorage.getItem("userid");
              this.form["catid"] = this.$route.query.catid;
              this.form["pcatid"] = this.$route.query.pcatid;
              editcat(this.form).then((response) => {
                this.$message({
                  message: i18n.t("SEARCHING.SUCCESSFULLY"),
                  type: "success",
                  duration: 1000,
                });
                this.$router.back(-1);
              });
            } else {
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
                  this.$router.back(-1);
                }
              });
            }
          });
        } else {
          this.$message({
            message: i18n.t("SEARCHING.FAILED"),
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    // 取消
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
  },
};
</script>

<style scoped>
</style>
