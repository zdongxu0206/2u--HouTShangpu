<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 100%;margin: 0 auto"
      size="small"
    >
      <el-form-item
        :label="$t('FORM.ECIFICATIONS')"
        prop="prdattrcatid"
      >
        <el-select
          v-model="value.prdattrcatid"
          clearable
          :placeholder="$t('PRODUCTLIST.TYPESS')"
          @change="handleProductAttrChange"
        >
          <el-option
            v-for="(item,index) in prdAttrCatOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          type="text"
          style="margin-left:20px"
          @click="tanHelik()"
        >{{$t('LOCALIZATION.ADDPRODUCT')}}</el-button>
      </el-form-item>
      <!-- 商品规格 -->
      <el-form-item
        :label="$t('PRODUCTLIST.SPECIFICATION')"
        prop="handAddStatus"
        style="width:100%"
      >
        <el-card
          shadow="never"
          class="cardBg"
        >
          <div
            v-for="(item,idx) in selPrdAttr"
            :key="idx"
          >
            {{item.name}}：
            <el-checkbox-group
              v-if="item.handAddStatus==0"
              v-model="selPrdAttr[idx].values"
            >
              <el-checkbox
                v-for="(item,index) in getInputListArr(item.inputList)"
                :label="item"
                :key="index"
                class="littleMarginLeft"
                @change="prohibitChange(item,index)"
              >
              </el-checkbox>

              <el-button
                type="text"
                @click="selectedEvent(item,selPrdAttr[idx].values)"
                style="margin-left:20px"
              >{{$t('FORM.NVERTELECTIO')}}</el-button>
            </el-checkbox-group>
            <div v-else>
              <el-checkbox-group v-model="selPrdAttr[idx].values">
                <div
                  v-for="(items,index) in selPrdAttr[idx].options"
                  :key="index"
                  style="display: inline-block"
                  class="littleMarginLeft"
                >
                  <el-checkbox
                    :label="items"
                    :key="items"
                  ></el-checkbox>
                  <!-- 删除当前列表 -->
                  <el-button
                    type="text"
                    class="littleMarginLeft"
                    @click="handleRemoveProductAttrValue(idx,index)"
                  >{{$t('FORMHEAD.DEL')}}
                  </el-button>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </el-card>
        <!-- 一键生成规格组合 -->
        <el-button
          type="primary"
          style="margin-top: 20px"
          @click="handleRefreshProductSkuList"
        >{{$t('SEARCHING.OFSKUS')}}
        </el-button>

        <el-table
          style="width: 100%;margin-top: 20px"
          :data="value.skulist"
          border
          stripe
        >
          <el-table-column
            fixed
            v-for="(item,index) in selPrdAttr"
            :label="item.name"
            :key="index"
            align="center"
            width="70"
          >
            <template slot-scope="scope">
              {{getProductSkuSp(scope.row,index)}}
            </template>
          </el-table-column>
          <!-- sku编号 -->
          <el-table-column
            :label="$t('SEARCHING.SKUSERIAL')"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.skucode"></el-input>
            </template>
          </el-table-column>
          <!-- 出厂价 -->
          <el-table-column
            :label="$t('PRODUCTLIST.FACTORYPRICE')"
            width="130"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                style="width:80px;float:left"
                step="0.01"
                min="0.01"
                v-model.number="scope.row.pricefactory"
                @blur="handleCalcPrice(scope.$index)"
                @change="handleCalcPrice(scope.$index)"
              ></el-input>
              <!-- 出厂价下同 -->
              <el-button
                style="float:right"
                type="text"
                @click="handleSyncProductSkuPrice"
              >{{$t('SEARCHING.SKUPRICES')}}
              </el-button>
            </template>

          </el-table-column>
          <!-- 建议价 -->
          <el-table-column
            :label="$t('PRODUCTLIST.PRICETAG')"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                step="0.01"
                min="0.01"
                v-model.number="scope.row.priceoriginal"
                @blur="handleCalcPrice(scope.$index)"
                @change="handleCalcPrice(scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
          <!-- 销售价格 -->
          <el-table-column
            :label="$t('PRODUCTLIST.SALEPRICE')"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.price"
                disabled
                oninput="value=value.replace(/[^\d.]/g,'')"
              ></el-input>
            </template>
          </el-table-column>
          <!-- a2u价格 -->
          <el-table-column
            :label="$t('PRODUCTLIST.A2UPRICE')"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pricea2u"
                disabled
              ></el-input>
            </template>
          </el-table-column>
          <!-- 商品库存 -->
          <el-table-column
            :label="$t('SEARCHING.INVENTORYS')"
            width="130"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                style="width:80px;float:left"
                step="1"
                min="1"
                v-model="scope.row.stock"
              ></el-input>
              <el-button
                style="width:20px;float:right"
                type="text"
                @click="handleSyncProductSkuStock"
              >{{$t('SEARCHING.SKUPRICES')}}
              </el-button>
            </template>
          </el-table-column>
          <!-- 库存预警 -->
          <el-table-column
            :label="$t('PRODUCTLIST.WARNING')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                step="1"
                min="1"
                v-model="scope.row.stocklow"
              ></el-input>
            </template>
          </el-table-column>
          <!-- sku图片 -->
          <el-table-column
            :label="$t('FORM.PRINT')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <div class="shanchauntupian">{{$t('FORM.UPLOADPICTURES')}}
                <input
                  class="up-ipt"
                  ref="modelInput"
                  type="file"
                  @change="uploadTeachlp($event,scope.$index, scope.row)"
                  accept="image/jpeg,image/png,image/jpg"
                />
                <img :src="scope.row.img">
              </div>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            :label="$t('FORMHEAD.ACTION')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveProductSku(scope.$index, scope.row)"
              >{{$t('FORMHEAD.DEL')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- 商品主图 -->
      <el-form-item
        :label="$t('PRODUCTLIST.OFCOMMODITY')"
        prop="prdimg"
      >
        <div class="shanchaun">{{$t('FORM.UPLOADPICTURES')}}
          <input
            class="up-ipt"
            ref="modelInput"
            type="file"
            @change="uploadTeach($event)"
            accept="image/jpeg,image/png,image/jpg"
          />
          <img
            v-if="showImg"
            :src="value.prdimg"
          >
        </div>
      </el-form-item>
      <!-- 商品相册 -->
      <el-form-item
        :label="$t('PRODUCTLIST.PHOTOALBUM')"
        prop="prdalbumimgs"
      >
        <!-- <multi-upload v-model="value.prdalbumimgs"></multi-upload> -->
        <!-- 2umallanminapi      dev-api -->
        <el-upload
          v-model="value.prdalbumimgs"
          :file-list="fileList"
          :action="path+'/2umallanminapi/file/inputfile'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-change="changeUpload"
          :limit="maxCount"
          :on-exceed="handleExceed"
          accept=".jpeg,.png,.jpg,"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog
          :close-on-click-modal="false
          "
          :visible.sync="dialogVisible"
        >
          <img
            width="100%"
            :src="dialogImageUrl"
          >
        </el-dialog>

      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.COMMODITYVIDEO')">
        <div class="shanchaun">{{$t('SEARCHING.AVIDEO')}}
          <input
            class="up-ipt"
            ref="modelInput"
            type="file"
            @change="uploadTeachs($event)"
            accept=".mp4,.ogg,.flv,.avi,.wmv,.rmvb,.mov"
          />
          <video
            v-if="showVideo"
            class="vidoo"
            autoplay
            controls
            loop
            :src="value.prdalbumvideo"
          ></video>
        </div>
      </el-form-item>
      <el-form-item style="text-align: center;margin-top:200px">
        <el-button
          size="medium"
          @click="handlePrev"
        >{{$t('PRODUCTLIST.MERCHANDISENEWS')}}</el-button>

        <!-- <el-button
          type="primary"
          size="medium"
          @click="handleNext('productInfoForm')"
        >{{$t('PRODUCTLIST.ASSOCIATED')}}</el-button> -->

        <el-button
          type="primary"
          size="medium"
          @click="handleFinishCommit('productInfoForm')"
        >{{$t('SEARCHING.COMPLETE')}}</el-button>

      </el-form-item>
    </el-form>
    <!-- 添加商品规格 -->
    <el-dialog
      :title="$t('LOCALIZATION.ADDPRODUCT')"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="forms"
        ref="productInfoForm"
        label-width="150px"
      >
        <!-- 规格名称 -->
        <el-form-item
          :label="$t('FORM.ABELPRINTER')+':'"
          style="margin-top:20px"
        >
          <el-input
            v-model="forms.catname"
            style="width:200px"
          ></el-input>
        </el-form-item>

        <el-card
          class="filter-container"
          shadow="never"
          v-for="(item,index) in forms.paramlist"
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
              @click="addHeadless"
              v-if="indexflag==index"
            >{{$t('FORM.ADDATTRIBUTE')}}</el-button>
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
            >{{$t('FORMHEAD.DEL')}}</el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="addxiao(ind, index)"
              v-if="isLast(ind, item.slist.length)"
            >{{$t('FORM.NEWATTRVA')}}</el-button>
          </el-form-item>
        </el-card>

        <el-form-item style="margin-top:30px">
          <el-button
            type="primary"
            @click="onSubmits('productInfoForm')"
          >{{$t('FORM.CONFIRM')}}</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { inputfile } from "@/api/uploadingImg";
import { getAttrCatList } from "@/api/productadd";
import SingleUpload from "@/components/Upload/singleUpload";
import MultiUpload from "@/components/Upload/multiUpload";
import i18n from "element-ui/lib/locale";

import { fetchListss, addattr } from "@/api/commodityType";
export default {
  name: "ProductAttrDetail",
  components: { SingleUpload, MultiUpload },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      path: "",
      dialogImageUrl: "",
      dialogVisible: false,
      maxCount: 5,
      ceshiss: ["x", "xl", "xxl"],
      rules: {
        prdattrcatid: [
          {
            required: true,
            message: i18n.t("SEARCHING.ATTPIBUTE"),
            trigger: "blur",
          },
        ],
        prdimg: [
          {
            required: true,
            message: i18n.t("SEARCHING.THEPRODUCT"),
            trigger: "blur",
          },
        ],
        handAddStatus: [
          {
            required: false,
            message: i18n.t("SEARCHING.SELECTPRODUCT"),
            trigger: "blur",
          },
        ],
        prdalbumimgs: [
          {
            required: false,
            message: i18n.t("SEARCHING.UPLOADTHE"),
            trigger: "blur",
          },
        ],
        prdalbumvideo: [
          {
            required: true,
            message: i18n.t("SEARCHING.PRODUCTVIDEO"),
            trigger: "blur",
          },
        ],
      },
      productAttrCateList: null,
      indexflag: 0,
      indexxiao: 0,
      forms: {
        catname: "",
        paramlist: [
          {
            name: "",
            slist: [{ name: "" }],
          },
        ],
      },
      name2: "",
      form: {
        name: "",
        attrpatamid: "",
        inputlist: [
          {
            name: "",
          },
        ],
      },
      productAttrCateList: null,
      indexflag: 0,
      dialogFormVisible: false,
      // 上传视频的显示
      showVideo: true,
      showImg: true,
      //编辑模式时是否初始化成功
      hasEditCreated: false,
      //商品属性分类下拉选项
      prdAttrCatOptions: [],
      //选中的商品属性
      selPrdAttr: [],
      //选中的商品参数
      selectProductParam: [],
      //选中的商品属性图片
      selectProductAttrPics: [],
      //可手动添加的商品属性
      addProductAttrValue: "",
      //商品富文本详情激活类型
      activeHtmlName: "mobile",
      teachList: [],
      checked: false,
      check: true,
      reList: [],
      flag: false,
    };
  },

  computed: {
    //是否有商品属性图片
    // hasAttrPic() {
    //   if (this.selectProductAttrPics.length < 1) {
    //     return false;
    //   }
    //   return true;
    // },

    fileList() {
      let fileList = [];
      if (this.value.prdalbumimgs) {
        localStorage.setItem(
          "albumimg",
          JSON.stringify(this.value.prdalbumimgs)
        );
        for (let i = 0; i < this.value.prdalbumimgs.length; i++) {
          fileList.push({
            url: this.value.prdalbumimgs[i].url,
            response: { picture: this.value.prdalbumimgs[i].url },
          });
        }
        console.log(fileList);
        return fileList;
      }
    },

    //商品的编号
    productId() {
      return this.value.id;
    },
    jianTing() {
      return this.$route.query.id;
    },
    //商品的主图和画册图片
    selectProductPics: {
      get: function () {
        let pics = [];
        if (
          this.value.pic == undefined ||
          this.value.pic == null ||
          this.value.pic == ""
        ) {
          return pics;
        }
        pics.push(this.value.pic);
        if (
          this.value.prdalbumimgs == undefined ||
          this.value.prdalbumimgs == null ||
          this.value.prdalbumimgs == ""
        ) {
          return pics;
        }
        let prdalbumimgs = this.value.prdalbumimgs.split(",");
        for (let i = 0; i < prdalbumimgs.length; i++) {
          pics.push(prdalbumimgs[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length == 0) {
          this.value.pic = null;
          this.value.prdalbumimgs = null;
        } else {
          this.value.pic = newValue[0];
          this.value.prdalbumimgs = "";
          if (newValue.length > 1) {
            for (let i = 1; i < newValue.length; i++) {
              this.value.prdalbumimgs += newValue[i];
              if (i != newValue.length - 1) {
                this.value.prdalbumimgs += ",";
              }
            }
          }
        }
      },
    },
  },
  created() {
    this.getProductAttrCateList();
  },

  watch: {
    jianTing: function (id) {
      console.log(id);
      this.handleEditCreated();
    },
    //商品的编号
    productId: function (newValue) {
      console.log(newValue);
      this.handleEditCreated();
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue == undefined || newValue == null || newValue == 0) return;
    },
  },
  methods: {
    // 文件上传成功时的钩子
    handleUploadSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      let list = JSON.parse(localStorage.getItem("albumimg"));
      let url = res.picture;
      list.push({ url: url });
      localStorage.setItem("albumimg", JSON.stringify(list));
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let list = JSON.parse(localStorage.getItem("albumimg"));
      console.log(list);
      list.filter((item, index) => {
        if (item.url == file.response.picture) {
          list.splice(index, 1);
        }
      });
      console.log(list);

      localStorage.setItem("albumimg", JSON.stringify(list));
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取动态的上传图片地址
    changeUpload(item) {
      console.log(item);
      console.log(window.location.href);
      let href = window.location.href;
      this.path = href.slice(0, href.indexOf("/", href.indexOf("/") + 2));
      console.log(this.path);
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message({
        message: "最多只能上传" + this.maxCount + "张图片",
        type: "warning",
        duration: 1000,
      });
    },
    // 添加商品规格点击弹窗 清空绑定值
    tanHelik() {
      this.dialogFormVisible = true;
      this.forms = {
        catname: "",
        paramlist: [
          {
            name: "",
            slist: [{ name: "" }],
          },
        ],
      };
    },
    //  编辑时的显示
    handleEditCreated() {
      //根据商品属性分类id获取属性和参数
      console.log(this.value.prdattrcatid);
      if (this.value.prdattrcatid != null) {
        this.handleProductAttrChange(this.value.prdattrcatid);
      }
      this.hasEditCreated = true;
    },
    // 获取属性参数列表
    getProductAttrCateList() {
      const storeid = localStorage.getItem("storeid");
      getAttrCatList(storeid).then((response) => {
        console.log(response);
        if (this.$route.query.id) {
          this.handleEditCreated();
        }
        this.prdAttrCatOptions = [];
        let list = response.attrcatlist;
        for (let i = 0; i < list.length; i++) {
          // 赋值
          this.prdAttrCatOptions.push({
            label: list[i].catname, //属性分类名字
            value: parseInt(list[i].catid), //属性分类id
            prdattrs: list[i].attrs, //属性分类主分类
            prdattrparams: list[i].params, //属性子分类
          });
        }
        console.log(this.prdAttrCatOptions);
      });
    },
    removexiao(item, inde) {
      var index = this.forms.paramlist[inde].slist.indexOf(item);
      if (index != -1) {
        this.forms.paramlist[inde].slist.splice(index, 1);
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
      this.forms.paramlist[_out].slist.push({
        name: "",
      });
    },
    //删除商品规格
    removeGoodsSpec(item) {
      var index = this.forms.paramlist.indexOf(item);
      if (index != -1) {
        this.forms.paramlist.splice(index, 1);
      }
      this.indexflag--;
    },
    // 动态添加商品属性
    addHeadless() {
      console.log("sss");
      this.forms.paramlist.push({
        name: "",
        slist: [{ name: "" }],
      });
      this.indexflag++;
    },
    // 添加商品规格
    onSubmits(formName) {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 添加
        // 店铺id
        const storeid = localStorage.getItem("storeid");
        let obj = {};
        obj["storeid"] = storeid;
        let arr = [];
        let array = [];
        this.forms.paramlist.forEach((item) => {
          arr = [];
          item.slist.forEach((ing) => {
            arr.push(ing.name);
          });
          array.push({ name: item.name, slist: arr.join(",") });
        });
        obj["paramlist"] = array;
        obj["catname"] = this.forms.catname;
        addattr(obj).then((response) => {
          this.dialogFormVisible = false;
          this.getProductAttrCateList();
          this.$message({
            message: i18n.t("SEARCHING.ADDED"),
            type: "success",
            duration: 1000,
          });
          this.resetForm("productAttrFrom");
        });
      });
    },
    //删除商品规格
    removeGoodsSpec(item) {
      var index = this.form.inputlist.indexOf(item);
      if (index !== -1) {
        this.form.inputlist.splice(index, 1);
      }
      this.indexflag--;
    },
    // 动态添加商品属性
    addHeadles() {
      this.form.inputlist.push({
        name: "",
      });
      this.indexflag++;
    },
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
              console.log(this.form);
              let inputlist = [];
              this.form.inputlist.forEach((item) => {
                inputlist.push(item.name);
              });
              inputlist = inputlist.join(",");
              const storeid = localStorage.getItem("storeid");
              const userid = localStorage.getItem("userid");
              let obj = {};
              obj["storeid"] = storeid;
              obj["userid"] = userid;
              obj["attrcatid"] = this.$route.query.id;
              obj["inputlist"] = inputlist;
              obj["name"] = this.form.name;
              obj["attrpatamid"] = this.form.attrpatamid;
              console.log(obj);
              fetchListss(obj).then((response) => {
                this.$router.go(-1);
                this.$message({
                  message: i18n.t("SEARCHING.SUCCESSFULLY"),
                  type: "success",
                  duration: 1000,
                });
              });
            } else {
              console.log(this.form);
              let inputlist = [];
              this.form.inputlist.forEach((item) => {
                inputlist.push(item.name);
              });
              inputlist = inputlist.join(",");
              // 添加
              // 店铺id
              const storeid = localStorage.getItem("storeid");
              const userid = localStorage.getItem("userid");
              let obj = {};
              obj["storeid"] = storeid;
              obj["userid"] = userid;
              obj["attrcatid"] = this.$route.query.id;
              obj["inputlist"] = inputlist;
              obj["name"] = this.form.name;
              console.log(obj);
              fetchListss(obj).then((response) => {
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
    prohibitChange(item, index) {
      console.log(item, index);
      if (this.selPrdAttr.length > 0) {
        this.check = true;
      }
    },
    // 反选
    selectedEvent(item, index) {
      console.log(item, index);

      if (item.values.length == 0) {
        let arr1 = [];
        arr1 = item.inputList.split(",");
        item.values = arr1;
      } else if (item.values.length == 1) {
        let arr = [];
        arr = item.inputList.split(",");
        for (let i = 0; i < arr.length; i++) {
          if (index[0] == arr[i]) {
            arr.splice(i, 1);
          }
        }
        item.values = arr;
      } else if (item.values.length >= 2) {
        let arr2 = [];
        arr2 = item.inputList.split(",");
        for (let i = 0; i < arr2.length; i++) {
          for (let j = 0; j < index.length; j++) {
            console.log(index[j]);
            if (index[j] == arr2[i]) {
              arr2.splice(i, 1);
            }
          }
        }
        item.values = arr2;
      }
    },
    // 提交商品
    handleFinishCommit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("finishCommit", this.isEdit);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传图片
    uploadTeach(event) {
      console.log(this.value);
      console.log(event);
      console.log(this.prdimg);
      let modelName = event.target.files[0].name;
      let limiteFileType = ["png", "jpeg", "jpg"];
      if (
        !limiteFileType.includes(
          modelName.split(".")[modelName.split(".").length - 1].toLowerCase()
        )
      ) {
        this.$message.warning("文件格式错误！");
        return;
      }
      this.teachList.push(modelName);
      this.teachName = modelName;
      this.teach = event.target.files[0];
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      inputfile(formData).then((res) => {
        // console.log(res);
        this.value.prdimg = res.picture;
        this.showImg = true;
      });
    },
    // 上传视频
    uploadTeachs(event) {
      console.log(event);
      let modelName = event.target.files[0].name;
      let limiteFileType = ["mp4", "ogg", "flv", "avi", "wmv", "mvb", "mov"];
      if (
        !limiteFileType.includes(
          modelName.split(".")[modelName.split(".").length - 1].toLowerCase()
        )
      ) {
        this.$message.warning("文件格式错误！");
        return;
      }
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      inputfile(formData).then((res) => {
        // console.log(res);
        this.value.prdalbumvideo = res.picture;
        this.showVideo = true;
      });
    },

    // sku图片
    uploadTeachlp(event, index, row) {
      console.log(event);
      console.log(index);
      console.log(row);
      let modelName = event.target.files[0].name;
      let limiteFileType = ["png", "jpeg", "jpg"];
      if (
        !limiteFileType.includes(
          modelName.split(".")[modelName.split(".").length - 1].toLowerCase()
        )
      ) {
        this.$message.warning("文件格式错误！");
        return;
      }
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      inputfile(formData).then((res) => {
        this.value.skulist[index].img = res.picture;
        this.handleCalcPrice(index);
        return this.value.skulist;
      });
    },
    // 把当前选中的属性种类的id拿过来  第二步
    getProductAttrList(prdattrcatid) {
      console.log(prdattrcatid);
      let valueList = [];
      if (this.$route.query.id) {
        for (let k = 0; k < this.value.skulist.length; k++) {
          for (let m = 0; m < this.value.skulist[k].prdattrs.length; m++) {
            valueList.push(this.value.skulist[k].prdattrs[m].value);
          }
        }
      }
      for (let i = 0; i < this.prdAttrCatOptions.length; i++) {
        // 当选择的属性种类的id等于当前的属性分类id
        if (this.prdAttrCatOptions[i].value == prdattrcatid) {
          //  选中的商品属性
          this.selPrdAttr = [];
          for (let j = 0; j < this.prdAttrCatOptions[i].prdattrs.length; j++) {
            this.selPrdAttr.push({
              name: this.prdAttrCatOptions[i].prdattrs[j].name,
              handAddStatus: "0",
              inputList: this.prdAttrCatOptions[i].prdattrs[j].inputlist,
              values: valueList,
            });
          }
          this.selectProductParam = [];
          for (
            let j = 0;
            j < this.prdAttrCatOptions[i].prdattrparams.length;
            j++
          ) {
            this.selectProductParam.push({
              name: this.prdAttrCatOptions[i].prdattrparams[j].name,
              handAddStatus: "0",
              inputList: this.prdAttrCatOptions[i].prdattrparams[j].inputlist,
              values: valueList,
            });
          }

          break;
        }
      }
    },
    // 开始选择属性类型 第一步
    handleProductAttrChange(value) {
      this.getProductAttrList(value);
    },
    getInputListArr(inputList) {
      return inputList.split(",");
    },
    // 增加属性  暂时不用
    handleAddProductAttrValue(idx) {
      // console.log(idx);
      // let options = this.selPrdAttr[idx].options;
      // if (this.addProductAttrValue == null || this.addProductAttrValue == "") {
      //   this.$message({
      //     message: "属性值不能为空",
      //     type: "warning",
      //     duration: 1000,
      //   });
      //   return;
      // }
      // if (options.indexOf(this.addProductAttrValue) != -1) {
      //   this.$message({
      //     message: "属性值不能重复",
      //     type: "warning",
      //     duration: 1000,
      //   });
      //   return;
      // }
      // this.selPrdAttr[idx].options.push(this.addProductAttrValue);
      // this.addProductAttrValue = null;
    },
    // 删除当前列表数据
    handleRemoveProductAttrValue(idx, index) {
      this.selPrdAttr[idx].options.splice(index, 1);
    },
    // 表格前面的 类如尺寸 颜色的数据
    getProductSkuSp(row, index) {
      let prdattr = JSON.parse(row.prdattr);
      if (prdattr != null && index < prdattr.length) {
        return prdattr[index].value;
      } else {
        return null;
      }
    },
    // 一件生成规格组合
    handleRefreshProductSkuList() {
      this.$confirm("刷新列表将导致sku信息重新生成，是否要刷新", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.refreshProductAttrPics();
        this.refreshProductSkuList();
      });
    },
    // 下同出厂价
    handleSyncProductSkuPrice() {
      this.$confirm("将同步第一个sku的价格到所有sku,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.value.skulist != null && this.value.skulist.length > 0) {
          let tempSkuList = [];
          tempSkuList = tempSkuList.concat(tempSkuList, this.value.skulist);
          let pricefactory = this.value.skulist[0].pricefactory;
          let priceoriginal = this.value.skulist[0].priceoriginal;
          let price = this.value.skulist[0].price;
          let pricea2u = this.value.skulist[0].pricea2u;
          for (let i = 0; i < tempSkuList.length; i++) {
            tempSkuList[i].pricefactory = pricefactory;
            tempSkuList[i].priceoriginal = priceoriginal;
            tempSkuList[i].price = price;
            tempSkuList[i].pricea2u = pricea2u;
          }
          this.value.skulist = [];
          this.value.skulist = this.value.skulist.concat(
            this.value.skulist,
            tempSkuList
          );
        }
      });
    },
    // 下同商品库存
    handleSyncProductSkuStock() {
      this.$confirm("将同步第一个sku的库存到所有sku,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.value.skulist != null && this.value.skulist.length > 0) {
          let tempSkuList = [];
          tempSkuList = tempSkuList.concat(tempSkuList, this.value.skulist);
          let stock = this.value.skulist[0].stock;
          let lowStock = this.value.skulist[0].lowStock;
          for (let i = 0; i < tempSkuList.length; i++) {
            tempSkuList[i].stock = stock;
            tempSkuList[i].lowStock = lowStock;
          }
          this.value.skulist = [];
          this.value.skulist = this.value.skulist.concat(
            this.value.skulist,
            tempSkuList
          );
        }
      });
    },
    refreshProductSkuList() {
      this.value.skulist = [];
      let skuList = this.value.skulist;
      //只有一个属性时
      if (this.selPrdAttr.length == 1) {
        let attr = this.selPrdAttr[0];
        for (let i = 0; i < attr.values.length; i++) {
          skuList.push({
            prdattr: JSON.stringify([
              { key: attr.name, value: attr.values[i] },
            ]),
          });
        }
      } else if (this.selPrdAttr.length == 2) {
        let attr0 = this.selPrdAttr[0];
        let attr1 = this.selPrdAttr[1];
        for (let i = 0; i < attr0.values.length; i++) {
          if (attr1.values.length == 0) {
            skuList.push({
              prdattr: JSON.stringify([
                { key: attr0.name, value: attr0.values[i] },
              ]),
            });
            continue;
          }
          for (let j = 0; j < attr1.values.length; j++) {
            let prdattr = [];
            prdattr.push({ key: attr0.name, value: attr0.values[i] });
            prdattr.push({ key: attr1.name, value: attr1.values[j] });
            skuList.push({
              prdattr: JSON.stringify(prdattr),
            });
          }
        }
      } else {
        let attr0 = this.selPrdAttr[0];
        let attr1 = this.selPrdAttr[1];
        let attr2 = this.selPrdAttr[2];
        for (let i = 0; i < attr0.values.length; i++) {
          if (attr1.values.length == 0) {
            skuList.push({
              prdattr: JSON.stringify([
                { key: attr0.name, value: attr0.values[i] },
              ]),
            });
            continue;
          }
          for (let j = 0; j < attr1.values.length; j++) {
            if (attr2.values.length == 0) {
              let prdattr = [];
              prdattr.push({ key: attr0.name, value: attr0.values[i] });
              prdattr.push({ key: attr1.name, value: attr1.values[j] });
              skuList.push({
                prdattr: JSON.stringify(prdattr),
              });
              continue;
            }
            for (let k = 0; k < attr2.values.length; k++) {
              let prdattr = [];
              prdattr.push({ key: attr0.name, value: attr0.values[i] });
              prdattr.push({ key: attr1.name, value: attr1.values[j] });
              prdattr.push({ key: attr2.name, value: attr2.values[k] });
              skuList.push({
                prdattr: JSON.stringify(prdattr),
              });
            }
          }
        }
      }
    },
    refreshProductAttrPics() {
      this.selectProductAttrPics = [];
      if (this.selPrdAttr.length >= 1) {
        let values = this.selPrdAttr[0].values;
        for (let i = 0; i < values.length; i++) {
          let pic = null;
          if (this.isEdit) {
            //编辑状态下获取图片
            pic = this.getProductSkuPic(values[i]);
          }
          this.selectProductAttrPics.push({ name: values[i], pic: pic });
        }
      }
    },
    //获取商品相关属性的图片
    getProductSkuPic(name) {
      for (let i = 0; i < this.value.skulist.length; i++) {
        let prdattr = JSON.parse(this.value.skulist[i].prdattr);
        if (name == prdattr[0].value) {
          return this.value.skulist[i].pic;
        }
      }
      return null;
    },
    //合并商品属性
    mergeProductAttrValue() {
      this.value.attrlsit = [];
      for (let i = 0; i < this.selPrdAttr.length; i++) {
        let attr = this.selPrdAttr[i];
        if (
          attr.handAddStatus == 1 &&
          attr.options != null &&
          attr.options.length > 0
        ) {
          this.value.attrlsit.push({
            productAttributeId: attr.id,
            value: this.getOptionStr(attr.options),
          });
        }
      }
      for (let i = 0; i < this.selectProductParam.length; i++) {
        let param = this.selectProductParam[i];
        this.value.attrlsit.push({
          productAttributeId: param.id,
          value: param.value,
        });
      }
    },
    //合并商品属性图片
    mergeProductAttrPics() {
      for (let i = 0; i < this.selectProductAttrPics.length; i++) {
        for (let j = 0; j < this.value.skulist.length; j++) {
          let prdattr = JSON.parse(this.value.skulist[j].prdattr);
          if (prdattr[0].value == this.selectProductAttrPics[i].name) {
            this.value.skulist[j].pic = this.selectProductAttrPics[i].pic;
          }
        }
      }
    },
    getOptionStr(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i != arr.length - 1) {
          str += ",";
        }
      }
      return str;
    },
    // 删除数据
    handleRemoveProductSku(index, row) {
      console.log(index, row);
      let list = this.value.skulist;
      if (list.length == 1) {
        list.pop();
      } else {
        list.splice(index, 1);
      }
    },
    // 商品参数  暂时不用
    getParamInputList(inputList) {
      return inputList.split(",");
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    handleNext(formName) {
      this.mergeProductAttrValue();
      this.mergeProductAttrPics();
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
    // 出厂价计算 销售价格 a2u价格
    handleCalcPrice(rowIndex) {
      if (this.value.skulist == null || this.value.skulist.length == 0) {
        return;
      }
      let tempSkuList = [];
      tempSkuList = tempSkuList.concat(tempSkuList, this.value.skulist);
      let pricefactory = this.value.skulist[rowIndex].pricefactory;
      let priceoriginal = this.value.skulist[rowIndex].priceoriginal;
      if (pricefactory > 0 && priceoriginal > 0) {
        let price =
          parseInt(priceoriginal - pricefactory) * 0.95 +
          parseInt(pricefactory);
        let profit = (price - pricefactory) / pricefactory;
        if (profit >= 0.15) {
          tempSkuList[rowIndex].price = price;
          tempSkuList[rowIndex].pricea2u = price / 5;
        } else {
          this.$message({
            message: "利润太小，请重新输入",
            type: "warning",
            duration: 1000,
          });
          return;
        }
      } else {
        tempSkuList[rowIndex].price = 0;
        tempSkuList[rowIndex].pricea2u = 0;
      }

      this.value.skulist = [];
      this.value.skulist = this.value.skulist.concat(
        this.value.skulist,
        tempSkuList
      );
      if (this.$route.query.id) {
        this.handleEditCreated();
      }

      console.log(this.value.skulist);
    },
  },
};
</script>

<style scoped>
.littleMarginLeft {
  margin-left: 10px;
}

.littleMarginTop {
  margin-top: 10px;
}

.paramInput {
  width: 250px;
}

.paramInputLabel {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.cardBg {
  background: #f8f9fc;
}
.shanchaun {
  position: relative;
  width: 102px;
  height: 102px;
  border: 1px dashed #999;
  line-height: 100px;
  text-align: center;
  color: red;
}
.shanchaun > img {
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  width: 98px;
  height: 98px;
}
.shanchauntupian {
  font-size: 10px;
  position: relative;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: rgb(129, 90, 255);
}
.shanchauntupian > img {
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  width: 48px;
  height: 48px;
}
.up-ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  opacity: 0;
}
.vidoo {
  position: absolute;
  left: 150px;
  top: 0;
  width: 300px;
  height: 170px;
  display: block;
}
</style>
