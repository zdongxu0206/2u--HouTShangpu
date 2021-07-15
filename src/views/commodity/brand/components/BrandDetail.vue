<template> 
  <el-card
    class="form-container"
    shadow="never"
  >
    <el-form
      :model="brand"
      :rules="rules"
      ref="brandFrom"
      label-width="150px"
    >
      <el-form-item
        :label="$t('FORM.BRANDNAME')"
        prop="name"
      >
        <el-input
          v-model="brand.name"
          :placeholder="$t('FORM.BRANDNAME')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('FORM.BRANDINITIALS')">
        <el-input
          v-model="brand.letter"
          :placeholder="$t('FORM.BRANDINITIALS')"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('FORM.LEVELID')"
        prop="pid"
      >
        <el-input
          v-model="brand.pid"
          :placeholder="$t('FORM.LEVELID')"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="品牌LOGO：" prop="logo">
        <single-upload v-model="brand.logo"></single-upload>
      </el-form-item> -->
      <!-- <el-form-item label="品牌专区大图：">
        <single-upload v-model="brand.bigimg"></single-upload>
      </el-form-item> -->
      <el-form-item
        :label="$t('SEARCHING.SORT')"
        prop="sort"
      >
        <el-input
          v-model.number="brand.sort"
          :placeholder="$t('SEARCHING.SORT')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('FORM.SHOWBUTTONS')">
        <el-radio-group v-model="brand.status">
          <el-radio :label="1">{{$t('SEARCHING.YES')}}</el-radio>
          <el-radio :label="0">{{$t('SEARCHING.NO')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit('brandFrom')"
        >{{$t('FORMHEAD.SUBMIT')}}</el-button>
        <el-button
          v-if="!isEdit"
          @click="resetForm('brandFrom')"
        >{{$t('SEARCHING.RESET')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { updateShowStatus, particulars } from "@/api/brand";
import SingleUpload from "@/components/Upload/singleUpload";
import i18n from "element-ui/lib/locale";
const defaultBrand = {
  name: "",
  letter: "",
  bigimg: "",
  pid: "",
  logo: "",
  status: 1,
  sort: 1,
};
export default {
  name: "BrandDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      brand: Object.assign({}, defaultBrand),
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
        logo: [{ required: true, message: "请输入品牌logo", trigger: "blur" }],
        sort: [{ type: "number", message: "排序必须为数字" }],
      },
    };
  },
  created() {
    if (this.isEdit) {
      // 获取单个品牌的各项参数
      particulars(this.$route.query.id).then((response) => {
        this.brand = response.brandinfo;
      });
    } else {
      this.brand = Object.assign({}, defaultBrand);
    }
  },
  methods: {
    // 编辑
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(i18n.t("SEARCHING.TOCOMMIT"), {
            confirmButtonText: i18n.t("FORM.CONFIRM"),
            cancelButtonText: i18n.t("FORM.CANCEL"),
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              const userid = localStorage.getItem("userid");
              this.brand["userid"] = userid;
              const id = this.$route.query.id;
              console.log(id, userid, 202020);
              this.brand["id"] = id;
              console.log(this.brand);
              //  编辑 有id为编辑
              updateShowStatus(this.brand).then((response) => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: i18n.t("SEARCHING.SUCCESSFULLY"),
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              // 添加 没有id为添加
              const userid = localStorage.getItem("userid");
              this.brand["userid"] = userid;
              updateShowStatus(this.brand).then((response) => {
                console.log(response, "111");
                this.$router.back();
                this.$refs[formName].resetFields();
                this.brand = Object.assign({}, defaultBrand);
                this.$message({
                  message: i18n.t("SEARCHING.SUBMISSION"),
                  type: "success",
                  duration: 1000,
                });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.brand = Object.assign({}, defaultBrand);
    },
  },
};
</script>
<style>
</style>


