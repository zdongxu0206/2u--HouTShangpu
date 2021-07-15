<template>
  <div class="upload-container">
    <el-button
      icon='el-icon-upload'
      size="mini"
      :style="{background:color,borderColor:color}"
      @click=" dialogVisible=true"
      type="primary"
    >{{$t('FORM.UPLOADPICTURES')}}
    </el-button>
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
    >
      <!-- 2umallanminapi    dev-api -->
      <el-upload
        class="editor-slide-upload"
        :action="path+'/2umallanminapi/file/inputfile'"
        :data="dataObj"
        multiple
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-change="changeUpload"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        accept=".jpeg,.png,.jpg,"
      >
        <el-button
          size="small"
          type="primary"
        >点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">{{$t('FORM.CANCEL')}}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
      >{{$t('FORM.CONFIRM')}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { inputfile } from "@/api/uploadingImg";

export default {
  name: "editorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#1890ff",
    },
  },
  data() {
    return {
      path: "",
      dialogVisible: false,
      listObj: {},
      fileList: [],
      dataObj: {
        policy: "",
      },
    };
  },
  methods: {
    // 获取动态的上传图片地址
    changeUpload(item) {
      let href = window.location.href;
      this.path = href.slice(0, href.indexOf("/", href.indexOf("/") + 2));
      console.log(href.slice(0, href.indexOf("/", href.indexOf("/") + 2)));
      console.log(this.path);
    },
    handleSubmit() {
      this.$emit("successCBK", this.fileList);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file) {
      let url = this.dataObj.policy;
      this.fileList.push({ url: url });
    },
    handleRemove(file, fileList) {
      this.$emit("successCBK", fileList);
    },
    // 上传多个图片调用api
    beforeUpload(file) {
      let obj = new FormData();
      obj.append("file", file);
      let _self = this;
      return new Promise((resolve, reject) => {
        inputfile(obj)
          .then((response) => {
            _self.dataObj.policy = response.picture;
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message({
        message: "最多只能上传" + "5" + "张图片",
        type: "warning",
        duration: 1000,
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container .editor-slide-upload {
  margin-bottom: 20px;
}
</style>
