<template>
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
        v-model="ruleForm.storetemp.tplname"
        style="width:300px;"
      ></el-input>
    </el-form-item>

    <el-form-item
      :label="$t('TEMPLATEFREIGHT.TEMPLATETYPE')"
      prop="resource"
    >
      <el-radio-group v-model="ruleForm.storetemp.tpltype">
        <el-radio :label="'SELLER'">{{$t('FORM.SELLER')}}</el-radio>
        <el-radio :label="'BUYER'">{{$t('FORM.BUYER')}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      :label="$t('TEMPLATEFREIGHT.UPSTATE')"
      prop="resource"
    >
      <el-radio-group v-model="ruleForm.storetemp.status">
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
      :data="ruleForm.storetemp.freightlist"
      border
      tooltip-effect="dark"
      style="width: 661px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="60"
        align="center"
        @change="handleCheckAllChange()"
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
      >{{$t('SEARCHING.AMEND')}}</el-button>
    </el-footer>
    <!-- 编辑 -->
    <el-dialog
      :title="$t('FORM.UPYUNFI')"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="roleForm"
        :model="role"
        label-width="150px"
        size="small"
        :rules="rules"
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

</template>

<script>
import { UPgetprovincelist, submitfreight } from "@/api/commodityFreight";
import i18n from "element-ui/lib/locale";
const defaultRole = {
  areaname: null,
  amtfee: null,
  areaid: null,
};
export default {
  name: "addFreight",
  data() {
    return {
      ruleForm: {
        // 列表
        storetemp: [],
      },
      // 批量操作
      operateType: null,
      // 下标
      ind: "",
      // 弹框
      dialogVisible: false,
      obj: {},
      role: Object.assign({}, defaultRole),
      // 表单验证
      rules: {
        // leng: [
        //   { required: true, message: "请输入快递费,", trigger: "blur" },
        //   {
        //     min: 0,
        //     max: 10,
        //     message: "长度在 0 到 10 个字符",
        //     trigger: "blur",
        //   },
        // ],
        name: [
          { required: true, message: "请输入模板名称,", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      multipleSelection: [],
    };
  },
  created() {
    // 获取省份列表
    this.getListsf();
  },
  methods: {
    handleCheckAllChange(v) {
      console.log(v);
    },
    // 获取省份列表
    getListsf() {
      // 获取模板id
      console.log(this.$route.params.tplid);
      const storeid = localStorage.getItem("storeid");
      const tplid = this.$route.params.tplid;
      UPgetprovincelist(storeid, tplid).then((res) => {
        console.log(res);
        this.ruleForm.storetemp = res.storetemp;
      });
    },
    // 修改运费模板
    submitForm(formName) {
      console.log("修改运费模板");
      // console.log(this.ruleForm);
      console.log(this.multipleSelection);
      let obj = {};
      const storeid = localStorage.getItem("storeid");
      const userid = localStorage.getItem("userid");
      const tplid = this.$route.params.tplid;
      obj["storeid"] = storeid;
      obj["tplid"] = tplid;
      obj["userid"] = userid;
      obj["tplname"] = this.ruleForm.storetemp.tplname;
      obj["status"] = this.ruleForm.storetemp.status;
      const arealist = [];
      this.multipleSelection.forEach((item) => {
        console.log(item);
        arealist.push({
          amtfee: item.amtfee,
          areaid: item.areaid,
          areaname: item.areaname,
          id: item.id,
        });
      });
      console.log(arealist, "sss");
      obj["arealist"] = arealist;
      obj["tpltype"] = this.ruleForm.storetemp.tpltype;
      console.log(this.ruleForm.storetemp.tpltype);
      console.log(obj);

      this.$confirm(i18n.t("ROLLOVERS.UPDATA"), {
        confirmButtonText: i18n.t("FORM.CONFIRM"),
        cancelButtonText: i18n.t("FORM.CANCEL"),
        type: "warning",
      })
        .then(() => {
          submitfreight(obj).then((res) => {
            this.$message({
              type: "success",
              message: i18n.t("SEARCHING.SUCCESSFULLY"),
            });
          });
          this.$router.back();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("ROLLOVERS.XIUGAI"),
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
      console.log(this.ruleForm.storetemp);
      console.log(this.ind);
      this.obj["amtfee"] = this.role.amtfee;
      console.log(this.obj);
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
          this.ruleForm.storetemp["freightlist"][this.ind][
            "amtfee"
          ] = this.role.amtfee;
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
      console.log(val);
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
  },
  filters: {
    disableNextLevel(value) {
      if (value == "") {
        return "0";
      } else {
        return true;
      }
    },
  },
};
</script>

<style  scoped>
.footer {
  position: fixed;
  height: 100px;
  bottom: 0;
  right: 500px;
}
</style>

