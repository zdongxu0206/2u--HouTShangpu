<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      ref="productInfoForm"
      label-width="120px"
      style="width: 900px;margin:0 200px"
      size="small"
    >
      <el-form-item
        :label="$t('LOCALIZATION.GOODSCATEGORY')"
        prop="prdcatid"
      >
        <el-select
          disabled
          v-model="value.catname"
          :placeholder="$t('LOCALIZATION.GOODSCATEGORY')"
        >
          <el-option
            v-for="item in 1"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.COMMODITYBRAND')"
        prop="prdbrand"
      >
        <el-select
          disabled
          v-model="value.prdbrandname"
          :placeholder="$t('SEARCHING.COMMODITYBRAND')"
        >
          <el-option
            v-for="item in 1"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.PRODUCTNAME')"
        prop="prdname"
      >
        <el-input
          disabled
          v-model="value.prdname"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('PRODUCTLIST.SUBTITLE')"
        prop="subname"
      >
        <el-input
          disabled
          v-model="value.subname"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('PRODUCTLIST.INTRODUCTION')"
        prop="descs"
      >
        <el-input
          disabled
          :autoSize="true"
          v-model="value.descs"
          type="textarea"
          :placeholder="$t('PRODUCTLIST.INTRODUCTION')"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('PRODUCTLIST.KEYWORD')"
        prop="keywords"
      >
        <el-input
          disabled
          v-model="value.keywords"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('SEARCHING.COMMODITYITEMS')"
        prop="prdsn"
      >
        <el-input
          disabled
          v-model="value.prdsn"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('PRODUCTLIST.PLACES')"
        prop="deliveryplace"
      >
        <el-input
          disabled
          v-model="value.deliveryplace"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.GOODSSORTING')">
        <el-input
          disabled
          v-model="value.sort"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.PUTGOODSON')">
        <el-switch
          disabled
          v-model="value.publishstatus"
          :active-value="'1'"
          :inactive-value="'0'"
        >
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.COMMODITYRE')">
        <span style="margin-right: 10px">{{$t('PRODUCTLIST.NEWPRODUCT')}}</span>
        <el-switch
          disabled
          v-model="value.newstatus"
          :active-value="'1'"
          :inactive-value="'0'"
        >
        </el-switch>
        <span style="margin-left: 10px;margin-right: 10px">{{$t('PRODUCTLIST.RECOMMEND')}}</span>
        <el-switch
          disabled
          v-model="value.recommandstatus"
          :active-value="'1'"
          :inactive-value="'0'"
        >
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.SERVICEGUARANTEES')">
        <el-checkbox-group
          disabled
          v-model="value.serviceids"
        >
          <el-checkbox :label="'1'">{{$t('PRODUCTLIST.SAFERETURN')}}</el-checkbox>
          <el-checkbox :label="'2'">{{$t('PRODUCTLIST.QUICKREFUND')}}</el-checkbox>
          <el-checkbox :label="'3'">{{$t('PRODUCTLIST.PACKAGEMAIL')}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        :label="$t('PRODUCTLIST.DETAILPAGE')"
        prop="detailtitle"
      >
        <el-input
          disabled
          v-model="value.detailtitle"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('PRODUCTLIST.DESCRIPTION')"
        prop="detaildesc"
      >
        <el-input
          disabled
          v-model="value.detaildesc"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.NOTE')">
        <el-input
          disabled
          v-model="value.note"
          type="textarea"
          :autoSize="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.TYPESS')">
        <el-select
          disabled
          v-model="value.attrlsit[0].name"
          :placeholder="$t('SEARCHING.ATTPIBUTE')"
        >
          <el-option
            disabled
            v-for="item in 1"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.SPECIFICATION')">
        <el-table
          style="width: 100%;margin-top: 20px"
          :data="value.skulist"
          border
          stripe
        >
          <el-table-column
            :label="$t('SEARCHING.SKUSERIAL')"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.skucode"
                disabled
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('PRODUCTLIST.FACTORYPRICE')"
            disabled
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.pricefactory"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('PRODUCTLIST.PRICETAG')"
            disabled
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.priceoriginal"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('PRODUCTLIST.SALEPRICE')"
            width="80"
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
          <el-table-column
            :label="$t('PRODUCTLIST.A2UPRICE')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pricea2u"
                disabled
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('SEARCHING.INVENTORYS')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                disabled
                step="1"
                min="1"
                v-model="scope.row.stock"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('PRODUCTLIST.WARNING')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                disabled
                step="1"
                min="1"
                v-model="scope.row.stocklow"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.OFCOMMODITY')">
        <el-card class="cardBg">
          <img
            class="spzhutu"
            :src="value.prdimg"
          >
        </el-card>
      </el-form-item>
      <el-form-item :label="$t('PRODUCTLIST.PHOTOALBUM')">
        <el-card class="cardBg">
          <ul class="list">
            <li
              class="list-li"
              v-for="(item,index) in value.prdalbumimgs"
              :key="index"
            >
              <img
                class="img"
                :src="item"
              >
              <!-- <video
                class="video"
                :src="item"
              ></video> -->
            </li>
          </ul>
        </el-card>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getgoodsinfo } from "@/api/productList";
export default {
  name: "particularX",
  data() {
    return {
      value: {},
    };
  },
  created() {
    this.getgoodsInfo();
  },
  methods: {
    getgoodsInfo() {
      const prdid = this.$route.query.prdid;
      console.log(prdid);
      getgoodsinfo(prdid).then((res) => {
        console.log(res);
        this.value = res.goodsInfo;
      });
    },
  },
};
</script>

<style scoped>
.spzhutu {
  width: 300px;
  height: 200px;
  display: block;
}
.list {
  width: 800px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.list > .list-li {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 20px;
}
.list .img {
  width: 300px;
  height: 200px;
}
</style>
