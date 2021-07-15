<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="productInfoForm"
      label-width="150px"
    >
      <!-- 规格名称 -->
      <el-form-item
        :label="$t('FORM.ABELPRINTER')+':'"
        style="margin-top:20px"
      >
        <el-input
          v-model="form.catname"
          style="width:200px"
        ></el-input>
      </el-form-item>

      <el-card
        class="filter-container"
        shadow="never"
        v-for="(item,index) in form.paramlist"
        :key="index"
      >
        <!-- 属性名称 -->
        <el-form-item :label="$t('FORM.LONGNAME')+':'">
          <el-input
            v-model="item.name"
            style="width:200px"
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
          >新增属性</el-button>
        </el-form-item>
        <!-- 属性可选值 -->
        <el-form-item
          v-for="(io,ind) in item.slist"
          :key="ind"
          :label="$t('TYPEMERCHANDISE.OPTIONALVALUES')+':'"
        >
          <el-input
            :autosize="true"
            style="width:200px"
            v-model="io.name"
          ></el-input>
          <el-button
            type="danger"
            size="mini"
            style="margin-left:10px"
            @click="removexiao(io,index)"
            v-if="isFalse(ind,item.slist.length)"
          >{{$t('FORMHEAD.DEL')}} </el-button>
          <el-button
            type="primary"
            size="mini"
            style="margin-left:10px"
            @click="addxiao(ind, index)"
            v-if="isLast(ind, item.slist.length)"
          >新增属性值</el-button>
        </el-form-item>
      </el-card>

      <el-form-item style="margin-top:30px">
        <el-button
          v-if="!isEdit"
          @click="resetForm('productInfoForm')"
        >{{$t('FORM.CANCEL')}}</el-button>
        <el-button
          type="primary"
          @click="onSubmit('productInfoForm')"
        >{{$t('FORM.CONFIRM')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  fetchListss,
  getProductAttr,
  addattr,
  updateattrs,
  updateparams,
} from "@/api/commodityType";
import i18n from "element-ui/lib/locale";
export default {
  name: "ProductAttrDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        catname: "",
        paramlist: [
          {
            name: "",
            slist: [{ name: "" }],
          },
        ],
      },

      rules: {
        name: [
          {
            required: true,
            message: i18n.t("TYPEMERCHANDISE.ATTRIBUTENAME"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 140,
            message: i18n.t("SEARCHING.BETWEEN"),
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: i18n.t("SEARCHING.ISSTATUS"),
            trigger: "blur",
          },
        ],
        paramlist: [
          {
            required: true,
            message: i18n.t("SEARCHING.ENTERLIST"),
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: i18n.t("SEARCHING.SORTINGPROPERTIES"),
            trigger: "blur",
          },
        ],
      },
      productAttrCateList: null,
      indexflag: 0,
      indexxiao: 0,
    };
  },

  created() {
    this.name2 = this.$route.query.name;
    this.updateattrs();
  },

  methods: {
    // 获取编辑数据
    updateattrs() {
      if (this.isEdit) {
        updateattrs(this.$route.query.catid).then((res) => {
          console.log(res);
          this.form = res;
        });
      }
    },
    removexiao(item, inde) {
      var index = this.form.paramlist[inde].slist.indexOf(item);
      if (index != -1) {
        this.form.paramlist[inde].slist.splice(index, 1);
      }
      this.indexxiao--;
    },
    isLast(idx, len) {
      return idx == len - 1;
    },
    isFalse(ind, index) {
      return ind != 0;
    },
    addxiao(_in, _out) {
      this.form.paramlist[_out].slist.push({
        name: "",
      });
    },
    //删除商品规格
    removeGoodsSpec(item) {
      var index = this.form.paramlist.indexOf(item);
      if (index != -1) {
        this.form.paramlist.splice(index, 1);
      }
      this.indexflag--;
    },
    // 动态添加商品属性
    addHeadles() {
      this.form.paramlist.push({
        name: "",
        slist: [{ name: "" }],
      });
      this.indexflag++;
    },

    // 添加  编辑
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // 修改
            if (this.isEdit) {
              const storeid = localStorage.getItem("storeid");
              let obj = {};
              obj["storeid"] = storeid;
              let arr = [];
              let array = [];
              this.form.paramlist.forEach((item) => {
                arr = [];
                item.slist.forEach((ing) => {
                  arr.push(ing.name);
                });
                array.push({
                  name: item.name,
                  slist: arr.join(","),
                  attrpatamid: item.attrpatamid,
                });
              });
              obj["paramlist"] = array;
              obj["catname"] = this.form.catname;
              obj["catid"] = this.$route.query.catid;
              console.log(obj);
              console.log(this.form);
              updateparams(obj).then((response) => {
                this.$router.go(-1);
                this.$message({
                  message: i18n.t("SEARCHING.SUCCESSFULLY"),
                  type: "success",
                  duration: 1000,
                });
              });
            } else {
              // 添加
              // 店铺id
              const storeid = localStorage.getItem("storeid");
              let obj = {};
              obj["storeid"] = storeid;
              let arr = [];
              let array = [];
              this.form.paramlist.forEach((item) => {
                arr = [];
                item.slist.forEach((ing) => {
                  arr.push(ing.name);
                });
                array.push({ name: item.name, slist: arr.join(",") });
              });
              obj["paramlist"] = array;
              obj["catname"] = this.form.catname;
              console.log(obj);
              console.log(this.form);
              addattr(obj).then((response) => {
                this.$router.go(-1);
                this.$message({
                  message: i18n.t("SEARCHING.ADDED"),
                  type: "success",
                  duration: 1000,
                });
                this.resetForm("productAttrFrom");
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
  },
};
</script>

<style scoped>
</style>
