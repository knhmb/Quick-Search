<template>
  <div class="left-section">
    <base-card>
      <div class="content">
        <div class="single-content">
          <p class="title">{{ $t("filter") }}</p>
          <img src="../../assets/arrowhead-down@2x.png" alt="" />
        </div>
        <div class="single-content">
          <p>{{ $t("area") }}</p>
          <img src="../../assets/chevron-up-black@2x.png" alt="" />
        </div>
        <div class="single-content checkboxes">
          <el-tree
            @check-change="handleChange"
            accordion
            :data="data"
            :props="defaultProps"
            show-checkbox
            node-key="uniqueNode"
            ref="treeRef"
          >
            <template #default="{ node }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <img src="../../assets/chevron-down-black@2x.png" alt="" />
              </span>
            </template>
          </el-tree>
        </div>
        <div class="single-content checkboxes unhide-img">
          <el-row>
            <el-col :span="12">
              <p>{{ $t("price_range") }}</p>
            </el-col>
            <el-col :span="12">
              <img src="../../assets/chevron-up-black@2x.png" alt="" />
            </el-col>
            <el-col :span="24">
              <div class="slider-content">
                <p>{{ $t("any") }}</p>
                <el-slider
                  @change="handleChange"
                  range
                  v-model="priceRange"
                  :max="1000000"
                />
                <div class="range-selector">
                  <el-input
                    type="number"
                    v-model="priceRange[0]"
                    @change="handleChange"
                  ></el-input>
                  <el-input
                    type="number"
                    v-model="priceRange[1]"
                    @change="handleChange"
                  ></el-input>
                  <!-- <div class="range-box">
                  ${{ priceRange[0] }}
                </div>
                <div class="range-box">
                  ${{ priceRange[1] }}
                </div> -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="single-content checkboxes unhide-img">
          <el-row>
            <el-col :span="12">
              <p>{{ $t("discount") }}</p>
            </el-col>
            <el-col :span="12">
              <img src="../../assets/chevron-up-black@2x.png" alt="" />
            </el-col>
            <el-col>
              <el-checkbox
                @change="handleDiscount"
                v-model="discount"
                label="有優惠"
                >{{ $t("there_are_discounts") }}</el-checkbox
              >
              <el-checkbox
                @change="handleDiscount"
                v-model="discount"
                label="無優惠"
                >{{ $t("no_discount") }}</el-checkbox
              >
            </el-col>
          </el-row>
        </div>
        <div class="single-content checkboxes unhide-img">
          <el-row>
            <el-col :span="12">
              <p>{{ $t("payment_method") }}</p>
            </el-col>
            <el-col :span="12">
              <img src="../../assets/chevron-up-black@2x.png" alt="" />
            </el-col>
            <el-col>
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="現金"
                >{{ $t("cash") }}</el-checkbox
              >
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="八達通"
                >{{ $t("octupus") }}</el-checkbox
              >
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="信用卡"
                >{{ $t("credit_card") }}</el-checkbox
              >
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="微信"
                >{{ $t("we_chat") }}</el-checkbox
              >
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="支付寶"
                >{{ $t("ali_pay") }}</el-checkbox
              >
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="轉數快"
                >{{ $t("fast_speed") }}</el-checkbox
              >
            </el-col>
          </el-row>
        </div>
        <el-row
          class="alignment"
          v-if="dynamicMainCategoryFilter.length > 0 && !selectedSubCategory"
        >
          <h5>{{ $t("main_category") }}</h5>

          <el-col
            :span="24"
            v-for="group in mainCategoryFilter"
            :key="group.id"
          >
            <p>{{ group.name }}</p>
            <template v-for="item in dynamicMainCategoryFilter" :key="item">
              <template v-for="subItem in item" :key="subItem">
                <el-checkbox-group
                  @change="handleDiscount(subItem.slug)"
                  v-model="checkList[`meta.${subItem.group}`]"
                >
                  <el-checkbox
                    v-if="group.slug === subItem.group"
                    :label="`&quot;${subItem.slug}&quot;`"
                    >{{ subItem.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </template>
            </template>
            <!-- <p v-if="dynamicFilters.some((e) => e.group === group.slug)">
              {{ group.name }}
            </p> -->
            <!-- <template v-for="item in dynamicFilters" :key="item">
              <el-checkbox-group
                @change="handleDiscount(item.slug)"
                v-model="checkList[`${item.group}`]"
              >
                <el-checkbox
                  v-if="item.group === group.slug"
                  :label="`&quot;${item.slug}&quot;`"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </template> -->
          </el-col>
        </el-row>
        <el-row class="alignment" v-if="dynamicFilters.length > 0">
          <h5>{{ $t("sub_category") }}</h5>

          <el-col :span="24" v-for="group in subCategoryFilter" :key="group.id">
            <p>{{ group.name }}</p>
            <template v-for="item in dynamicFilters" :key="item">
              <template v-for="subItem in item" :key="subItem">
                <el-checkbox-group
                  @change="handleDiscount(subItem.slug)"
                  v-model="checkList[`meta.${subItem.group}`]"
                >
                  <el-checkbox
                    v-if="group.slug === subItem.group"
                    :label="`&quot;${subItem.slug}&quot;`"
                    >{{ subItem.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </template>
            </template>
          </el-col>
        </el-row>
        <!-- <el-row class="alignment" v-if="dynamicFilters.length > 0">
          <h5>{{ $t("sub_category") }}</h5>

          <el-col
            :span="24"
            v-for="group in dynamicFilterGroup"
            :key="group.id"
          >
            <p v-if="dynamicFilters.some((e) => e.group === group.slug)">
              {{ group.name }}
            </p>
            <template v-for="item in dynamicFilters" :key="item">
              <el-checkbox-group
                @change="handleDiscount(item.slug)"
                v-model="checkList[`${item.group}`]"
              >
                <el-checkbox
                  v-if="item.group === group.slug"
                  :label="`&quot;${item.slug}&quot;`"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </template>
          </el-col>
        </el-row> -->
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ["sorting", "currentPage"],
  data() {
    return {
      arr: [],
      // checkList: {},
      filter: {
        arr: [],
        discountCheckbox: [],
        paymentCheckbox: [],
        sliderValue: "",
      },
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "disabled",
      },
      data: [
        {
          id: 1,
          label:
            this.$i18n.locale === "zh-Hant-HK" ? "港島區" : "Hong Kong Island",
          children: [
            {
              id: 2,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "堅尼地城"
                  : "Kennedy Town ",
            },
            {
              id: 3,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "香港大學"
                  : "Hong Kong University ",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "西營盤" : "Sai Ying Pun ",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "上環" : "Sheung Wan ",
              disabled: false,
            },
            {
              id: 6,
              label: this.$i18n.locale === "zh-Hant-HK" ? "中環" : "Central ",
              disabled: false,
            },
            {
              id: 7,
              label: this.$i18n.locale === "zh-Hant-HK" ? "金鐘" : "Admiralty ",
              disabled: false,
            },
            {
              id: 8,
              label: this.$i18n.locale === "zh-Hant-HK" ? "灣仔" : "Wan Chai ",
              disabled: false,
            },
            {
              id: 9,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "銅鑼灣" : "Causeway Bay ",
              disabled: false,
            },
            {
              id: 10,
              label: this.$i18n.locale === "zh-Hant-HK" ? "天后" : "Tin Hau ",
              disabled: false,
            },
            {
              id: 11,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "炮台山"
                  : "Fortress Hill ",
              disabled: false,
            },
            {
              id: 12,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "北角" : "North Point ",
              disabled: false,
            },
            {
              id: 13,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "鰂魚涌" : "Quarry Bay ",
              disabled: false,
            },
            {
              id: 14,
              label: this.$i18n.locale === "zh-Hant-HK" ? "太古" : "Tai Koo ",
              disabled: false,
            },
            {
              id: 15,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "西灣河" : "Sai Wan Ho ",
              disabled: false,
            },
            {
              id: 16,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "筲箕灣" : "Shau Kei Wan ",
              disabled: false,
            },
            {
              id: 17,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "杏花邨"
                  : "Heng Fa Chuen ",
              disabled: false,
            },
            {
              id: 18,
              label: this.$i18n.locale === "zh-Hant-HK" ? "柴灣" : "Chai Wan ",
              disabled: false,
            },
            {
              id: 19,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "海洋公園" : "Ocean Park ",
              disabled: false,
            },
            {
              id: 20,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "黃竹坑"
                  : "Wong Chuk Hang ",
              disabled: false,
            },
            {
              id: 21,
              label: this.$i18n.locale === "zh-Hant-HK" ? "利東" : "Lei Tung ",
              disabled: false,
            },
            {
              id: 22,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "海怡半島"
                  : "South Horizons ",
              disabled: false,
            },
            {
              id: 23,
              label: this.$i18n.locale === "zh-Hant-HK" ? "香港" : "Hong Kong ",
              disabled: false,
            },
          ],
        },
        {
          id: 2,
          label: this.$i18n.locale === "zh-Hant-HK" ? "九龍區" : "Kowloon",
          children: [
            {
              id: 2,
              label: this.$i18n.locale === "zh-Hant-HK" ? "藍田" : "Lam Tin ",
            },
            {
              id: 3,
              label: this.$i18n.locale === "zh-Hant-HK" ? "觀塘" : "Kwun Tong ",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "牛頭角" : "Ngau Tau Kok ",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "九龍灣" : "Kowloon Bay ",
              disabled: false,
            },
            {
              id: 6,
              label: this.$i18n.locale === "zh-Hant-HK" ? "彩虹" : "Choi Hung ",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "鑽石山" : "Diamond Hill ",
              disabled: false,
            },
            {
              id: 8,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "黃大仙" : "Wong Tai Sin ",
              disabled: false,
            },
            {
              id: 9,
              label: this.$i18n.locale === "zh-Hant-HK" ? "樂富" : "Lok Fu ",
              disabled: false,
            },
            {
              id: 10,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "九龍塘" : "Kowloon Tong ",
              disabled: false,
            },
            {
              id: 11,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "石硤尾" : "Shek Kip Mei ",
              disabled: false,
            },
            {
              id: 12,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "太子" : "Prince Edward ",
              disabled: false,
            },
            {
              id: 13,
              label: this.$i18n.locale === "zh-Hant-HK" ? "旺角" : "Mong Kok ",
              disabled: false,
            },
            {
              id: 14,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "油麻地" : "Yau Ma Tei ",
              disabled: false,
            },
            {
              id: 15,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "何文田" : "Ho Man Tin ",
              disabled: false,
            },
            {
              id: 16,
              label: this.$i18n.locale === "zh-Hant-HK" ? "黃埔" : "Whampoa ",
              disabled: false,
            },
            {
              id: 17,
              label: this.$i18n.locale === "zh-Hant-HK" ? "荔景" : "Lai King ",
              disabled: false,
            },
            {
              id: 18,
              label: this.$i18n.locale === "zh-Hant-HK" ? "美孚" : "Mei Foo ",
              disabled: false,
            },
            {
              id: 19,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "荔枝角" : "Lai Chi Kok ",
              disabled: false,
            },
            {
              id: 20,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "長沙灣"
                  : "Cheung Sha Wan ",
              disabled: false,
            },
            {
              id: 21,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "深水埗" : "Sham Shui Po ",
              disabled: false,
            },
            {
              id: 22,
              label: this.$i18n.locale === "zh-Hant-HK" ? "佐敦" : "Jordan ",
              disabled: false,
            },
            {
              id: 23,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "尖沙咀"
                  : "Tsim Sha Tsui ",
              disabled: false,
            },
            {
              id: 24,
              label: this.$i18n.locale === "zh-Hant-HK" ? "油塘" : "Yau Tong ",
              disabled: false,
            },
            {
              id: 25,
              label: this.$i18n.locale === "zh-Hant-HK" ? "九龍" : "Kowloon ",
              disabled: false,
            },
            {
              id: 26,
              label: this.$i18n.locale === "zh-Hant-HK" ? "奧運" : "Olympic ",
              disabled: false,
            },
            {
              id: 27,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "南昌" : "Nam Cheong ",
              disabled: false,
            },
            {
              id: 28,
              label: this.$i18n.locale === "zh-Hant-HK" ? "紅磡" : "Hung Hom ",
              disabled: false,
            },
            {
              id: 29,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "旺角東"
                  : "Mong Kok East ",
              disabled: false,
            },
            {
              id: 30,
              label: this.$i18n.locale === "zh-Hant-HK" ? "柯士甸" : "Austin ",
              disabled: false,
            },
            {
              id: 31,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "尖東"
                  : "East Tsim Sha Tsui ",
              disabled: false,
            },
            {
              id: 32,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "土瓜灣" : "To Kwa Wan ",
              disabled: false,
            },
            {
              id: 33,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "宋皇臺"
                  : "Sung Wong Toi ",
              disabled: false,
            },
            {
              id: 29,
              label: this.$i18n.locale === "zh-Hant-HK" ? "啟德" : "Kai Tak ",
              disabled: false,
            },
          ],
        },
        {
          id: 3,
          label:
            this.$i18n.locale === "zh-Hant-HK" ? "新界區" : "New Territories",
          children: [
            {
              id: 2,
              label: this.$i18n.locale === "zh-Hant-HK" ? "荃灣" : "Tsuen Wan ",
            },
            {
              id: 3,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "大窩口" : "Tai Wo Hau ",
              disabled: false,
            },
            {
              id: 4,
              label: this.$i18n.locale === "zh-Hant-HK" ? "葵興" : "Kwai Hing ",
              disabled: false,
            },
            {
              id: 5,
              label: this.$i18n.locale === "zh-Hant-HK" ? "葵芳" : "Kwai Fong ",
              disabled: false,
            },
            {
              id: 6,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "康城" : "LOHAS Park ",
              disabled: false,
            },
            {
              id: 7,
              label: this.$i18n.locale === "zh-Hant-HK" ? "寶琳" : "Po Lam ",
              disabled: false,
            },
            {
              id: 8,
              label: this.$i18n.locale === "zh-Hant-HK" ? "坑口" : "Hang Hau ",
              disabled: false,
            },
            {
              id: 9,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "將軍澳"
                  : "Tseung Kwan O ",
              disabled: false,
            },
            {
              id: 10,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "調景嶺"
                  : "Tiu Keng Leng ",
              disabled: false,
            },
            {
              id: 11,
              label: this.$i18n.locale === "zh-Hant-HK" ? "大圍" : "Tai Wai ",
              disabled: false,
            },
            {
              id: 12,
              label: this.$i18n.locale === "zh-Hant-HK" ? "沙田" : "Sha Tin ",
              disabled: false,
            },
            {
              id: 13,
              label: this.$i18n.locale === "zh-Hant-HK" ? "火炭" : "Fo Tan ",
              disabled: false,
            },
            {
              id: 14,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "馬場" : "Racecourse ",
              disabled: false,
            },
            {
              id: 15,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "大學" : "University ",
              disabled: false,
            },
            {
              id: 16,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大埔墟"
                  : "Tai Po Market ",
              disabled: false,
            },
            {
              id: 17,
              label: this.$i18n.locale === "zh-Hant-HK" ? "太和" : "Tai Wo ",
              disabled: false,
            },
            {
              id: 18,
              label: this.$i18n.locale === "zh-Hant-HK" ? "粉嶺" : "Fanling ",
              disabled: false,
            },
            {
              id: 19,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "上水" : "Sheung Shui ",
              disabled: false,
            },
            {
              id: 20,
              label: this.$i18n.locale === "zh-Hant-HK" ? "羅湖" : "Lo Wu ",
              disabled: false,
            },
            {
              id: 21,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "落馬洲" : "Lok Ma Chau ",
              disabled: false,
            },
            {
              id: 22,
              label: this.$i18n.locale === "zh-Hant-HK" ? "屯門" : "Tuen Mun ",
              disabled: false,
            },
            {
              id: 23,
              label: this.$i18n.locale === "zh-Hant-HK" ? "兆康" : "Siu Hong ",
              disabled: false,
            },
            {
              id: 24,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "天水圍" : "Tin Shui Wai ",
              disabled: false,
            },
            {
              id: 25,
              label: this.$i18n.locale === "zh-Hant-HK" ? "朗屏" : "Long Ping ",
              disabled: false,
            },
            {
              id: 26,
              label: this.$i18n.locale === "zh-Hant-HK" ? "元朗" : "Yuen Long ",
              disabled: false,
            },
            {
              id: 27,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "錦上路"
                  : "Kam Sheung Road ",
              disabled: false,
            },
            {
              id: 28,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "荃灣西"
                  : "Tsuen Wan West ",
              disabled: false,
            },
            {
              id: 29,
              label: this.$i18n.locale === "zh-Hant-HK" ? "顯徑" : "Hin Keng ",
              disabled: false,
            },
            {
              id: 30,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "車公廟"
                  : "Che Kung Temple ",
              disabled: false,
            },
            {
              id: 31,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "沙田圍" : "Sha Tin Wai ",
              disabled: false,
            },
            {
              id: 32,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "第一城" : "City One ",
              disabled: false,
            },
            {
              id: 33,
              label: this.$i18n.locale === "zh-Hant-HK" ? "石門" : "Shek Mun ",
              disabled: false,
            },
            {
              id: 34,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大水坑"
                  : "Tai Shui Hang ",
              disabled: false,
            },
            {
              id: 35,
              label: this.$i18n.locale === "zh-Hant-HK" ? "恒安" : "Heng On ",
              disabled: false,
            },
            {
              id: 36,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "馬鞍山" : "Ma On Shan ",
              disabled: false,
            },
            {
              id: 37,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "烏溪沙" : "Wu Kai Sha ",
              disabled: false,
            },
          ],
        },
        {
          id: 4,
          label:
            this.$i18n.locale === "zh-Hant-HK" ? "離島區" : "Islands District",
          children: [
            {
              id: 2,
              label: this.$i18n.locale === "zh-Hant-HK" ? "青衣" : "Tsing Yi ",
            },
            {
              id: 3,
              label: this.$i18n.locale === "zh-Hant-HK" ? "欣澳" : "Sunny Bay ",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "迪士尼"
                  : "Disneyland Resort ",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "東涌" : "Tung Chung ",
              disabled: false,
            },
            {
              id: 6,
              label: this.$i18n.locale === "zh-Hant-HK" ? "機場" : "Airport ",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "博覽館"
                  : "AsiaWorld-Expo ",
              disabled: false,
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        if (!JSON.parse(this.$route.query.filter).discount) {
          this.$store.commit("search/UPDATE_DISCOUNT", []);
        }
      },
    },
    sorting() {
      this.handlePayment();
    },
    currentPage() {
      this.handlePayment();
    },
    $i18n: {
      deep: true,
      handler() {
        this.data = [
          {
            id: 1,
            label:
              this.$i18n.locale === "zh-Hant-HK"
                ? "港島區"
                : "Hong Kong Island",
            children: [
              {
                id: 2,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "堅尼地城"
                    : "Kennedy Town ",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "香港大學"
                    : "Hong Kong University ",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "西營盤"
                    : "Sai Ying Pun ",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "上環" : "Sheung Wan ",
                disabled: false,
              },
              {
                id: 6,
                label: this.$i18n.locale === "zh-Hant-HK" ? "中環" : "Central ",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "金鐘" : "Admiralty ",
                disabled: false,
              },
              {
                id: 8,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "灣仔" : "Wan Chai ",
                disabled: false,
              },
              {
                id: 9,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "銅鑼灣"
                    : "Causeway Bay ",
                disabled: false,
              },
              {
                id: 10,
                label: this.$i18n.locale === "zh-Hant-HK" ? "天后" : "Tin Hau ",
                disabled: false,
              },
              {
                id: 11,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "炮台山"
                    : "Fortress Hill ",
                disabled: false,
              },
              {
                id: 12,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "北角" : "North Point ",
                disabled: false,
              },
              {
                id: 13,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "鰂魚涌" : "Quarry Bay ",
                disabled: false,
              },
              {
                id: 14,
                label: this.$i18n.locale === "zh-Hant-HK" ? "太古" : "Tai Koo ",
                disabled: false,
              },
              {
                id: 15,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "西灣河" : "Sai Wan Ho ",
                disabled: false,
              },
              {
                id: 16,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "筲箕灣"
                    : "Shau Kei Wan ",
                disabled: false,
              },
              {
                id: 17,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "杏花邨"
                    : "Heng Fa Chuen ",
                disabled: false,
              },
              {
                id: 18,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "柴灣" : "Chai Wan ",
                disabled: false,
              },
              {
                id: 19,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "海洋公園"
                    : "Ocean Park ",
                disabled: false,
              },
              {
                id: 20,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "黃竹坑"
                    : "Wong Chuk Hang ",
                disabled: false,
              },
              {
                id: 21,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "利東" : "Lei Tung ",
                disabled: false,
              },
              {
                id: 22,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "海怡半島"
                    : "South Horizons ",
                disabled: false,
              },
              {
                id: 23,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "香港" : "Hong Kong ",
                disabled: false,
              },
            ],
          },
          {
            id: 2,
            label: this.$i18n.locale === "zh-Hant-HK" ? "九龍區" : "Kowloon",
            children: [
              {
                id: 2,
                label: this.$i18n.locale === "zh-Hant-HK" ? "藍田" : "Lam Tin ",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "觀塘" : "Kwun Tong ",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "牛頭角"
                    : "Ngau Tau Kok ",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "九龍灣"
                    : "Kowloon Bay ",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "彩虹" : "Choi Hung ",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "鑽石山"
                    : "Diamond Hill ",
                disabled: false,
              },
              {
                id: 8,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "黃大仙"
                    : "Wong Tai Sin ",
                disabled: false,
              },
              {
                id: 9,
                label: this.$i18n.locale === "zh-Hant-HK" ? "樂富" : "Lok Fu ",
                disabled: false,
              },
              {
                id: 10,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "九龍塘"
                    : "Kowloon Tong ",
                disabled: false,
              },
              {
                id: 11,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "石硤尾"
                    : "Shek Kip Mei ",
                disabled: false,
              },
              {
                id: 12,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "太子"
                    : "Prince Edward ",
                disabled: false,
              },
              {
                id: 13,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "旺角" : "Mong Kok ",
                disabled: false,
              },
              {
                id: 14,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "油麻地" : "Yau Ma Tei ",
                disabled: false,
              },
              {
                id: 15,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "何文田" : "Ho Man Tin ",
                disabled: false,
              },
              {
                id: 16,
                label: this.$i18n.locale === "zh-Hant-HK" ? "黃埔" : "Whampoa ",
                disabled: false,
              },
              {
                id: 17,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "荔景" : "Lai King ",
                disabled: false,
              },
              {
                id: 18,
                label: this.$i18n.locale === "zh-Hant-HK" ? "美孚" : "Mei Foo ",
                disabled: false,
              },
              {
                id: 19,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "荔枝角"
                    : "Lai Chi Kok ",
                disabled: false,
              },
              {
                id: 20,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "長沙灣"
                    : "Cheung Sha Wan ",
                disabled: false,
              },
              {
                id: 21,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "深水埗"
                    : "Sham Shui Po ",
                disabled: false,
              },
              {
                id: 22,
                label: this.$i18n.locale === "zh-Hant-HK" ? "佐敦" : "Jordan ",
                disabled: false,
              },
              {
                id: 23,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "尖沙咀"
                    : "Tsim Sha Tsui ",
                disabled: false,
              },
              {
                id: 24,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "油塘" : "Yau Tong ",
                disabled: false,
              },
              {
                id: 25,
                label: this.$i18n.locale === "zh-Hant-HK" ? "九龍" : "Kowloon ",
                disabled: false,
              },
              {
                id: 26,
                label: this.$i18n.locale === "zh-Hant-HK" ? "奧運" : "Olympic ",
                disabled: false,
              },
              {
                id: 27,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "南昌" : "Nam Cheong ",
                disabled: false,
              },
              {
                id: 28,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "紅磡" : "Hung Hom ",
                disabled: false,
              },
              {
                id: 29,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "旺角東"
                    : "Mong Kok East ",
                disabled: false,
              },
              {
                id: 30,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "柯士甸" : "Austin ",
                disabled: false,
              },
              {
                id: 31,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "尖東"
                    : "East Tsim Sha Tsui ",
                disabled: false,
              },
              {
                id: 32,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "土瓜灣" : "To Kwa Wan ",
                disabled: false,
              },
              {
                id: 33,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "宋皇臺"
                    : "Sung Wong Toi ",
                disabled: false,
              },
              {
                id: 29,
                label: this.$i18n.locale === "zh-Hant-HK" ? "啟德" : "Kai Tak ",
                disabled: false,
              },
            ],
          },
          {
            id: 3,
            label:
              this.$i18n.locale === "zh-Hant-HK" ? "新界區" : "New Territories",
            children: [
              {
                id: 2,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "荃灣" : "Tsuen Wan ",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "大窩口" : "Tai Wo Hau ",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "葵興" : "Kwai Hing ",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "葵芳" : "Kwai Fong ",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "康城" : "LOHAS Park ",
                disabled: false,
              },
              {
                id: 7,
                label: this.$i18n.locale === "zh-Hant-HK" ? "寶琳" : "Po Lam ",
                disabled: false,
              },
              {
                id: 8,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "坑口" : "Hang Hau ",
                disabled: false,
              },
              {
                id: 9,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "將軍澳"
                    : "Tseung Kwan O ",
                disabled: false,
              },
              {
                id: 10,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "調景嶺"
                    : "Tiu Keng Leng ",
                disabled: false,
              },
              {
                id: 11,
                label: this.$i18n.locale === "zh-Hant-HK" ? "大圍" : "Tai Wai ",
                disabled: false,
              },
              {
                id: 12,
                label: this.$i18n.locale === "zh-Hant-HK" ? "沙田" : "Sha Tin ",
                disabled: false,
              },
              {
                id: 13,
                label: this.$i18n.locale === "zh-Hant-HK" ? "火炭" : "Fo Tan ",
                disabled: false,
              },
              // {
              //   id: 14,
              //   label:
              //     this.$i18n.locale === "zh-Hant-HK" ? "馬場" : "Racecourse ",
              //   disabled: false,
              // },
              {
                id: 15,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "大學" : "University ",
                disabled: false,
              },
              {
                id: 16,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大埔墟"
                    : "Tai Po Market ",
                disabled: false,
              },
              {
                id: 17,
                label: this.$i18n.locale === "zh-Hant-HK" ? "太和" : "Tai Wo ",
                disabled: false,
              },
              {
                id: 18,
                label: this.$i18n.locale === "zh-Hant-HK" ? "粉嶺" : "Fanling ",
                disabled: false,
              },
              {
                id: 19,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "上水" : "Sheung Shui ",
                disabled: false,
              },
              {
                id: 20,
                label: this.$i18n.locale === "zh-Hant-HK" ? "羅湖" : "Lo Wu ",
                disabled: false,
              },
              {
                id: 21,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "落馬洲"
                    : "Lok Ma Chau ",
                disabled: false,
              },
              {
                id: 22,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "屯門" : "Tuen Mun ",
                disabled: false,
              },
              {
                id: 23,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "兆康" : "Siu Hong ",
                disabled: false,
              },
              {
                id: 24,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "天水圍"
                    : "Tin Shui Wai ",
                disabled: false,
              },
              {
                id: 25,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "朗屏" : "Long Ping ",
                disabled: false,
              },
              {
                id: 26,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "元朗" : "Yuen Long ",
                disabled: false,
              },
              {
                id: 27,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "錦上路"
                    : "Kam Sheung Road ",
                disabled: false,
              },
              {
                id: 28,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "荃灣西"
                    : "Tsuen Wan West ",
                disabled: false,
              },
              {
                id: 29,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "顯徑" : "Hin Keng ",
                disabled: false,
              },
              {
                id: 30,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "車公廟"
                    : "Che Kung Temple ",
                disabled: false,
              },
              {
                id: 31,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "沙田圍" : "Sha Tin Wai",
                disabled: false,
              },
              {
                id: 32,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "第一城" : "City One ",
                disabled: false,
              },
              {
                id: 33,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "石門" : "Shek Mun ",
                disabled: false,
              },
              {
                id: 34,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大水坑"
                    : "Tai Shui Hang ",
                disabled: false,
              },
              // {
              //   id: 35,
              //   label: this.$i18n.locale === "zh-Hant-HK" ? "恒安" : "Heng On ",
              //   disabled: false,
              // },
              {
                id: 36,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "馬鞍山" : "Ma On Shan ",
                disabled: false,
              },
              {
                id: 37,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "烏溪沙" : "Wu Kai Sha ",
                disabled: false,
              },
            ],
          },
          {
            id: 4,
            label:
              this.$i18n.locale === "zh-Hant-HK"
                ? "離島區"
                : "Islands District",
            children: [
              {
                id: 2,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "青衣" : "Tsing Yi ",
              },
              {
                id: 3,
                label: this.$i18n.locale === "zh-Hant-HK" ? "大澳" : "Tai O",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "長洲"
                    : "Dumbbell Island",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK" ? "東涌" : "Tung Chung ",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "南丫島"
                    : "Lamma Island ",
                disabled: false,
              },
            ],
          },
        ];
      },
    },
    checkList: {
      deep: true,
      handler() {
        console.log(this.checkList);
      },
    },
  },
  computed: {
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    // defaultProps() {
    //   return this.$store.getters["search/defaultProps"];
    // },
    // data() {
    //   return this.$store.getters["search/data"];
    // },
    dynamicFilters() {
      return this.$store.getters["dashboard/dynamicFilters"];
    },
    storeCompareArr() {
      return this.$store.getters["search/compareArr"];
    },
    mainCategoryFilter() {
      return this.$store.getters["dashboard/mainCategoryFilter"];
    },
    subCategoryFilter() {
      return this.$store.getters["dashboard/subCategoryFilter"];
    },
    dynamicMainCategoryFilter() {
      return this.$store.getters["dashboard/dynamicMainCategoryFilter"];
    },
    selectedAreas() {
      return this.$store.getters["search/selectedAreas"];
    },
    selectedSubCategory() {
      return this.$store.getters["search/selectedSubCategory"];
    },
    checkList: {
      get() {
        return this.$store.getters["search/checkList"];
      },
      set(value) {
        this.$store.commit("search/UPDATE_CHECKLIST", value);
      },
    },
    discount: {
      get() {
        return this.$store.getters["search/discount"];
      },
      set(value) {
        this.$store.commit("search/UPDATE_DISCOUNT", value);
      },
    },
    paymentMethod: {
      get() {
        return this.$store.getters["search/paymentMethod"];
      },
      set(value) {
        this.$store.commit("search/UPDATE_PAYMENT_METHOD", value);
      },
    },
    priceRange: {
      get() {
        return this.$store.getters["search/priceRange"];
      },
      set(value) {
        this.$store.commit("search/UPDATE_PRICE_RANGE", value);
      },
    },
  },
  methods: {
    handleChange(data, checked, indeterminate) {
      console.log(data);
      console.log(checked);
      console.log(indeterminate);
      let arr = [];
      for (const item in this.checkList) {
        arr.push(`${item}:{"$in":[${this.checkList[item]}]}`);
        // if (!arr.includes(this.checkList[item])) {
        //   arr = [];
        // }
      }

      if (checked) {
        this.filter.arr.push({
          id: data.id,
          label: `${data.label}`,
        });
      } else if (!checked) {
        this.filter.arr = this.filter.arr.filter((item) => item.id !== data.id);
      }
      const filterArr = [];
      const filterDiscount = [];
      const filterPayment = [];

      this.filter.arr.forEach((item) => {
        filterArr.push(`"${item.label}"`);
      });
      // this.filter.discountCheckbox.forEach((item) => {
      //   console.log(item);
      //   filterDiscount.push(`"${item}"`);
      // });
      this.discount.forEach((item) => {
        filterDiscount.push(`"${item}"`);
      });
      this.paymentMethod.forEach((item) => {
        console.log(item);
        filterPayment.push(`"${item}"`);
      });
      // this.filter.paymentCheckbox.forEach((item) => {
      //   console.log(item);
      //   filterPayment.push(`"${item}"`);
      // });
      const discountData =
        filterDiscount.length > 0 ? `{"$in":[${filterDiscount}]}` : "";
      const paymentData =
        filterPayment.length > 0 ? `{"$in":[${filterPayment}]}` : "";

      const filter = {
        // area: filterArr ? filterArr.toString().replaceAll(",", "|") : "",
        area: filterArr.length > 0 ? `{"$in":[${filterArr}]}` : "",
        // query: this.$route.query ? this.$route.query : "",
        query: arr.length > 0 ? arr.toString() : "",

        price: this.priceRange,
        // price: this.filter.sliderValue ? this.filter.sliderValue : "",
        discount: discountData,
        // discount:
        //   this.filter.discountCheckbox.length > 0
        //     ? this.filter.discountCheckbox.toString().replaceAll(",", "|")
        //     : "",
        payment: paymentData,
        // payment:
        //   this.filter.paymentCheckbox.length > 0
        //     ? this.filter.paymentCheckbox.toString().replaceAll(",", "|")
        //     : "",
        sort: this.sorting ? this.sorting : "",
        dynamic: arr.length > 0 ? arr.toString() : "",
      };
      console.log(filter);

      this.$store.dispatch("search/filterSearch", filter);
    },
    removeAllBlankObjects(detailsObj) {
      Object.keys(detailsObj).forEach((k) => {
        if (
          detailsObj[k] &&
          typeof detailsObj[k] === "object" &&
          this.removeAllBlankObjects(detailsObj[k]) === null
        ) {
          delete detailsObj[k];
        }
      });
      if (!Object.keys(detailsObj).length) {
        return null;
      }
    },
    handleDiscount(item) {
      console.log(item);
      console.log(this.checkList);
      this.removeAllBlankObjects(this.checkList);

      const filterArr = [];
      const filterDiscount = [];
      const filterPayment = [];
      let arr = [];
      // const compareArr = [];
      for (const item in this.checkList) {
        console.log(this.checkList[item]);
        arr.push(`${item}:{"$in":[${this.checkList[item]}]}`);
        // if (!arr.includes(this.checkList[item])) {
        //   arr = [];
        // }
        // compareArr.push({ item: this.checkList[item] });
        // if (this.storeCompareArr[0].includes(this.checkList[item])) {
        //   console.log("YESSSSS");
        //   console.log(this.checkList[item]);
        // }
      }

      this.filter.arr.forEach((item) => {
        filterArr.push(`"${item.label}"`);
      });
      this.discount.forEach((item) => {
        filterDiscount.push(`"${item}"`);
      });
      this.paymentMethod.forEach((item) => {
        console.log(item);
        filterPayment.push(`"${item}"`);
      });
      // this.filter.paymentCheckbox.forEach((item) => {
      //   filterPayment.push(`"${item}"`);
      // });
      const discountData =
        filterDiscount.length > 0 ? `{"$in":[${filterDiscount}]}` : "";
      const paymentData =
        filterPayment.length > 0 ? `{"$in":[${filterPayment}]}` : "";
      // const hhh = arr.reduce((a, v) => ({ ...a, [v.split(":")[0]]: v }), {});
      // console.log(hhh);
      // this.$router.push({
      //   path: "/advanced-search",
      //   query: { filter: arr.toString() },
      // });

      const filter = {
        area: filterArr.length > 0 ? `{"$in":[${filterArr}]}` : "",

        // query: this.$route.query ? this.$route.query : "",
        query: arr.length > 0 ? arr.toString() : "",
        price: this.priceRange,
        // price: this.filter.sliderValue ? this.filter.sliderValue : "",
        discount: discountData,
        payment: paymentData,
        sort: this.sorting ? this.sorting : "",
        dynamic: arr.length > 0 ? arr.toString() : "",
        page: this.currentPage,
      };
      console.log(filter);
      // console.log(this.$route.query);
      this.$store.dispatch("search/filterSearch", filter);
    },
    handlePayment() {
      this.handleDiscount();
    },
  },
  // mounted() {
  //   console.log(JSON.parse(this.$route.query.filter));
  //   console.log(JSON.parse(this.$route.query.filter).dynamicFilter.split(":"));
  //   console.log(
  //     JSON.parse(this.$route.query.filter).dynamicFilter.split(":")[1]
  //   );
  // },
};
</script>

<style scoped>
.left-section {
  margin-bottom: 1rem;
}

.left-section p.title {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.left-section .single-content {
  margin-bottom: 0.5rem;
}

.left-section .single-content p,
.left-section .el-tree,
.left-section p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
}

.left-section .single-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.left-section .single-content.checkboxes:not(:last-of-type) {
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0.1px;
  padding-bottom: 1rem;
}

.left-section .single-content.checkboxes.unhide-img {
  display: block;
}

.left-section .single-content.checkboxes.unhide-img .slider-content {
  padding: 0 1rem;
  margin-top: 0.5rem;
}

.left-section .single-content.checkboxes.unhide-img .slider-content p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #393939;
  text-align: right;
}

.left-section
  .single-content.single-content.checkboxes.unhide-img
  :deep(.el-slider__bar) {
  background-color: #985f35;
}

.left-section
  .single-content.single-content.checkboxes.unhide-img
  .el-checkbox {
  display: block;
}

.left-section
  .single-content.single-content.checkboxes.unhide-img
  .el-checkbox:first-of-type {
  margin-top: 1rem;
}

.left-section
  .single-content.single-content.checkboxes.unhide-img
  :deep(.el-slider__button) {
  border-color: #985f35;
}
.left-section .single-content.checkboxes.unhide-img img {
  display: block;
  margin-left: auto;
}

.left-section .single-content img {
  width: 1.5rem;
  display: none;
}

.left-section .el-row.alignment {
  margin-bottom: 1rem;
}

.left-section .el-row.alignment h5 {
  margin-bottom: 0.5rem;
  font-size: 16px;
}

/* .left-section :deep(.is-penultimate img) {
  display: block;
} */

.left-section .el-tree {
  padding-left: 1rem;
  width: 100%;
  white-space: break-spaces;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.left-section :deep(.el-tree .el-icon) {
  display: none;
}

.left-section .single-content :deep(.custom-tree-node) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.left-section
  .single-content
  :deep(.el-tree-node__children .el-tree-node__content .custom-tree-node img) {
  display: none;
}

.left-section
  .single-content
  :deep(.el-tree-node__content .custom-tree-node img) {
  display: block;
}

.left-section :deep(.el-checkbox .el-checkbox__label) {
  white-space: break-spaces;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;

  /* color: #6f6f6f; */
}

.left-section .range-selector {
  display: flex;
  justify-content: space-between;
}

.left-section .range-selector .el-input {
  width: 6rem;
  position: relative;
}

.left-section .range-selector .el-input::before {
  content: "$";
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
}

.left-section .range-selector :deep(.el-input__wrapper) {
  background: #f5f4f0;
  /* border: 1px solid #ebeae6; */
  border-radius: 8px;
}
.left-section .range-selector :deep(.el-input__inner) {
  text-align: end;
}

/* .left-section
  .single-content
  :deep(.el-tree-node__content:nth-of-type(2) .custom-tree-node img) {
  display: block;
} */
</style>