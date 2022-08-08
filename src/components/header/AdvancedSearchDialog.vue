<template>
  <div class="advanced-search-dialog">
    <el-dialog
      @close="$emit('closeDialog', false)"
      :model-value="dialogVisible"
      title="進階搜尋"
      width="100%"
    >
      <div class="body">
        <div class="body-header">
          <p>主分類</p>
          <div
            @click="setFilter(item.name)"
            :class="{ 'is-active': currentFilter === item.name }"
            v-for="item in searchItems"
            :key="item"
            class="box"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="body-header">
          <p>篩選條件</p>
          <p class="area">地區</p>
          <div class="areas">
            <div class="single-area">
              <el-checkbox
                v-model="checkAll"
                class="checkbox-header"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >港島區</el-checkbox
              >
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="single-area">
              <el-checkbox
                v-model="checkAllKowloon"
                class="checkbox-header"
                :indeterminate="isIndeterminateKowloon"
                @change="handleKowloon"
                >九龍區</el-checkbox
              >
              <el-checkbox-group
                v-model="checkedKowloonAreas"
                @change="handleCheckedKowloonAreas"
              >
                <el-checkbox
                  v-for="city in kowloonAreas"
                  :key="city"
                  :label="city"
                  >{{ city }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div class="single-area">
              <el-checkbox
                v-model="checkAllNewTerritories"
                class="checkbox-header"
                :indeterminate="isIndeterminateNewTerritories"
                @change="handleNewTerritories"
                >新界區</el-checkbox
              >
              <el-checkbox-group
                v-model="checkedNewTerritories"
                @change="handleCheckedNewTerritories"
              >
                <el-checkbox
                  v-for="city in newTerritories"
                  :key="city"
                  :label="city"
                  >{{ city }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div class="single-area">
              <el-checkbox
                v-model="checkAllIslandDistrict"
                class="checkbox-header"
                :indeterminate="isIndeterminateIslandDistrict"
                @change="handleIslandDistrict"
                >離島區</el-checkbox
              >
              <el-checkbox-group
                v-model="checkedIslandDistrict"
                @change="handleCheckedIslandDistrict"
              >
                <el-checkbox
                  v-for="city in islandDistrict"
                  :key="city"
                  :label="city"
                  >{{ city }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
          <div class="other-filters">
            <div class="single-filter">
              <p class="area">優惠</p>
              <el-checkbox label="有優惠" value="有優惠"></el-checkbox>
              <el-checkbox label="無優惠" value="無優惠"></el-checkbox>
            </div>
            <div class="single-filter middle">
              <p class="area">價格範圍</p>
              <p class="any">任何</p>
              <el-slider v-model="priceRange" range :max="100" />
            </div>
            <div class="single-filter">
              <p class="area">付款方式</p>
              <el-checkbox-group v-model="paymentMethod">
                <el-checkbox label="現金" />
                <el-checkbox label="八達通" />
                <el-checkbox label="信用卡" />
                <el-checkbox label="微信" />
                <el-checkbox label="支付寶" />
                <el-checkbox label="轉數快" />
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('closeDialog', false)"
            >顯示 0 項搜尋結果</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      currentFilter: "",
      priceRange: [0, 100],
      paymentMethod: [],
      checkAll: false,
      checkAllKowloon: false,
      checkAllNewTerritories: false,
      checkAllIslandDistrict: false,
      isIndeterminateKowloon: false,
      isIndeterminateNewTerritories: false,
      isIndeterminateIslandDistrict: false,
      isIndeterminate: false,
      checkedCities: [],
      checkedKowloonAreas: [],
      checkedNewTerritories: [],
      checkedIslandDistrict: [],
      cities: [
        "堅尼地城站",
        "香港大學站",
        "西營盤站",
        "上環站",
        "中環站",
        "金鐘站",
      ],
      kowloonAreas: [
        "藍田站",
        "觀塘站",
        "牛頭角站",
        "九龍灣站",
        "彩虹站",
        "鑽石山站",
      ],
      newTerritories: [
        "荃灣站",
        "大窩口站",
        "葵興站",
        "葵芳站",
        "康城站",
        "寶琳站",
      ],
      islandDistrict: [
        "青衣站",
        "欣澳站",
        "迪士尼站",
        "東涌站",
        "機場站",
        "博覽館站",
      ],
      searchItems: [
        {
          name: "個人護理",
        },
        {
          name: "寵物",
        },
        {
          name: "手工藝",
        },
        {
          name: "藥妝",
        },
        {
          name: "攝影",
        },
        {
          name: "化妝",
        },
        {
          name: "保健食品",
        },
        {
          name: "興趣",
        },
        {
          name: "烘焙",
        },
        {
          name: "醫療",
        },
        {
          name: "媽媽",
        },
        {
          name: "母嬰",
        },
        {
          name: "精品",
        },
        {
          name: "玩具",
        },
        {
          name: "車項目",
        },
        {
          name: "工程裝飾",
        },
        {
          name: "長者",
        },
        {
          name: "旅行社",
        },
        {
          name: "商務",
        },
        {
          name: "私人服務",
        },
        {
          name: "補習社",
        },
        {
          name: "娛樂",
        },
        {
          name: "運動",
        },
        {
          name: "個人服飾",
        },
        {
          name: "名牌代購",
        },
        {
          name: "科技電子",
        },
        {
          name: "影音項目",
        },
      ],
    };
  },
  methods: {
    setFilter(item) {
      this.currentFilter = item;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
      console.log(val);
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleKowloon(val) {
      this.checkedKowloonAreas = val ? this.kowloonAreas : [];
      this.isIndeterminateKowloon = false;
      console.log(val);
    },
    handleCheckedKowloonAreas(value) {
      console.log(value);
      const checkedCount = value.length;
      this.checkAllKowloon = checkedCount === this.kowloonAreas.length;
      this.isIndeterminateKowloon =
        checkedCount > 0 && checkedCount < this.kowloonAreas.length;
    },
    handleNewTerritories(val) {
      this.checkedNewTerritories = val ? this.newTerritories : [];
      this.isIndeterminateNewTerritories = false;
      console.log(val);
    },
    handleCheckedNewTerritories(value) {
      console.log(value);
      const checkedCount = value.length;
      this.checkAllNewTerritories = checkedCount === this.newTerritories.length;
      this.isIndeterminateNewTerritories =
        checkedCount > 0 && checkedCount < this.newTerritories.length;
    },
    handleIslandDistrict(val) {
      this.checkedIslandDistrict = val ? this.islandDistrict : [];
      this.isIndeterminateIslandDistrict = false;
      console.log(val);
    },
    handleCheckedIslandDistrict(value) {
      console.log(value);
      const checkedCount = value.length;
      this.checkAllIslandDistrict = checkedCount === this.islandDistrict.length;
      this.isIndeterminateIslandDistrict =
        checkedCount > 0 && checkedCount < this.islandDistrict.length;
    },
  },
};
</script>

<style scoped>
.advanced-search-dialog :deep(.el-dialog .el-dialog__header),
.advanced-search-dialog :deep(.el-dialog .el-headerbtn),
.advanced-search-dialog :deep(.el-dialog .el-dialog__body),
.advanced-search-dialog :deep(.el-dialog .el-dialog__footer) {
  padding: 1.5rem 7rem;
}

.advanced-search-dialog :deep(.el-dialog .el-dialog__body) {
  padding: 0 7rem;
}

.advanced-search-dialog :deep(.el-dialog .el-dialog__title) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  background: linear-gradient(
      268.49deg,
      rgba(255, 136, 51, 0.4) 0%,
      rgba(255, 136, 51, 0) 100%
    ),
    #7a4117;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.advanced-search-dialog .body .body-header {
  margin-bottom: 1rem;
}

.advanced-search-dialog .body .body-header p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  position: relative;
  padding-left: 0.7rem;
  margin-bottom: 1rem;
}

.advanced-search-dialog .body .body-header p::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #985f35;
  border-radius: 40px;
  width: 6px;
  height: 20px;
}

.advanced-search-dialog .body .box {
  background: #f5f4f0;
  border: 1px solid #ebeae6;
  border-radius: 40px;
  width: fit-content;
  display: inline-block;
  padding: 0.3rem 0.7rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
}

.advanced-search-dialog .body .box:hover,
.advanced-search-dialog .body .box.is-active {
  background: linear-gradient(
      264.22deg,
      rgba(217, 111, 33, 0.6) 0%,
      rgba(152, 95, 53, 0.6) 100%
    ),
    #985f35;
  color: #fff;
  border-color: #985f35;
}

.advanced-search-dialog .body .el-checkbox-group :deep(.el-checkbox) {
  display: block;
  padding-left: 0.5rem;
}

.advanced-search-dialog .body .el-checkbox {
  display: block;
}

.advanced-search-dialog .body .el-checkbox.checkbox-header {
  margin-bottom: 0.5rem;
}

.advanced-search-dialog .body p.area {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
  padding-left: 0;
}

.advanced-search-dialog .body p.area:before {
  display: none;
}

.advanced-search-dialog .body .areas {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.advanced-search-dialog .body .other-filters {
  display: flex;
}

.advanced-search-dialog .body .el-slider {
  width: 15rem;
}

.advanced-search-dialog
  .body
  .el-slider
  :deep(.el-slider__button.el-tooltip__trigger.el-tooltip__trigger) {
  border-color: #985f35;
}

.advanced-search-dialog .body .el-slider :deep(.el-slider__bar) {
  background-color: #985f35;
}

.advanced-search-dialog .body .single-filter p.any {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 0;
  padding-left: 0;
}

.advanced-search-dialog .body .single-filter p.any::before {
  display: none;
}

.advanced-search-dialog .body .other-filters .single-filter.middle {
  margin-left: 10rem;
  margin-right: 2rem;
}

.advanced-search-dialog
  .body
  :deep(.el-checkbox.is-checked .el-checkbox__inner) {
  background-color: #985f35;
  border-color: #985f35;
}

.advanced-search-dialog
  .body
  :deep(.el-checkbox.is-checked .el-checkbox__label) {
  color: #393939;
}

.advanced-search-dialog .body :deep(.el-checkbox .el-checkbox__label) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.advanced-search-dialog .el-button {
  background: #985f35;
  border-color: #985f35;
  border-radius: 8px;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  margin: 0 auto;
  display: flex;
  padding: 1.4rem;
}

@media screen and (max-width: 991px) {
  .advanced-search-dialog .el-button {
    padding: 0 1rem;
  }

  .advanced-search-dialog :deep(.el-dialog) {
    width: 100%;
  }

  .advanced-search-dialog :deep(.el-dialog .el-dialog__header),
  .advanced-search-dialog :deep(.el-dialog .el-headerbtn),
  .advanced-search-dialog :deep(.el-dialog .el-dialog__body),
  .advanced-search-dialog :deep(.el-dialog .el-dialog__footer) {
    /* padding: 0; */
    padding: 1.5rem 2rem;
  }

  .advanced-search-dialog .body .areas {
    flex-direction: column;
  }

  .advanced-search-dialog .body .areas .single-area {
    margin-bottom: 0.5rem;
  }

  .advanced-search-dialog .body .other-filters {
    flex-direction: column;
  }

  .advanced-search-dialog .body .other-filters .single-filter.middle {
    margin-left: 0;
    margin-right: 0;
  }

  .advanced-search-dialog .body .el-slider {
    width: 100%;
  }

  .advanced-search-dialog .body p.area {
    margin-bottom: 0;
  }
}
</style>