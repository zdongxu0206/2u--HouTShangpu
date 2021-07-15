<template> 
  <div>
    <!-- 2umallanminapi -->
    <el-upload
      multiple
      :action="path+'/2umallanminapi/file/inputfile'"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-change="changeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
      accept=".jpeg,.png,.jpg,"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
      >
    </el-dialog>
  </div>
</template>
<script>
import { inputfile } from "@/api/uploadingImg";

export default {
  name: "multiUpload",
  props: {
    //图片属性数组
    value: Array,
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      dataObj: {
        policy: "",
      },
      dialogVisible: false,
      dialogImageUrl: null,
      useOss: true, //使用oss->true;使用MinIO->false
      path: "",
    };
  },
  created() {
    if (this.value) {
      this.$emit("prdalbumimgs", this.value);
    }
  },
  computed: {
    fileList() {
      let fileList = [];
      if (this.value) {
        for (let i = 0; i < this.value.length; i++) {
          fileList.push({ url: this.value[i].url });
        }
        console.log(fileList);
        return fileList;
      }
    },
  },

  methods: {
    // 获取动态的上传图片地址
    changeUpload(item) {
      console.log(item);
      console.log(window.location.href);
      let href = window.location.href;
      this.path = href.slice(0, href.indexOf("/", href.indexOf("/") + 2));
      console.log(this.path);
    },
    // 设置多张图片
    emitInput(fileList) {
      console.log(fileList);
      let value = [];
      for (let i = 0; i < fileList.length; i++) {
        value.push({ url: fileList[i].url });
      }
      this.$emit("value.prdalbumimgs", value);
      console.log("4", value);
      this.fileList = value;
      localStorage.setItem("albumimg", JSON.stringify(value));
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.emitInput(fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    // 上传多个图片调用api
    beforeUpload(file) {
      let obj = new FormData();
      obj.append("file", file);
      let _self = this;
      if (!this.useOss) {
        //不使用oss不需要获取策略
        return true;
      }
      return new Promise((resolve, reject) => {
        inputfile(obj)
          .then((response) => {
            _self.dataObj.policy = response.picture;
            resolve(false);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 文件上传成功时的钩子
    handleUploadSuccess(res, file) {
      console.log(res, file);
      let url = res.picture;
      console.log(this.fileList);
      if (this.fileList) {
        this.fileList.push({
          url: url,
        });
      }

      this.emitInput(this.fileList);
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message({
        message: "最多只能上传" + this.maxCount + "张图片",
        type: "warning",
        duration: 1000,
      });
    },
  },
};
</script>
<style>
</style>


