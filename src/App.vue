<template>
  <div id="app">
    <router-view />
    <el-select
      v-model="value"
      @change="switchLanguage(value)"
      class="el-select vadvascas"
    >
      <el-option
        v-for="item in language"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      value: this.$i18n.locale, //为了把下拉框的默认值和全局变量的值一致，以此实现载入页面时显示的语言和数据配置一致
      language: [
        {
          value: "zh",
          label: "中文简体",
        },
        {
          value: "en",
          label: "English",
        },
        {
          value: "tr",
          label: "Türkiye",
        },
      ],
    };
  },
  methods: {
    switchLanguage(value) {
      location.reload(true);
      if (value == "zh") {
        this.$i18n.locale = "zh";
      } else if (value == "en") {
        this.$i18n.locale = "en";
      } else if (value == "tr") {
        this.$i18n.locale = "tr";
      }
      //在选择了显示的语言后，将配置保存到Cookie中
      this.$cookie.set("DefaultLanguage", value, {
        expires: "60m", //默认cookie有效时间为60分钟
      });
    },
  },
};
</script>
<style scoped>
.vadvascas {
  position: absolute;
  z-index: 2000;
  right: 150px;
  top: 5px;
}
</style>
