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
                <el-slider @change="handleChange" range v-model="priceRange" />
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
        <el-row class="alignment" v-if="dynamicMainCategoryFilter.length > 0">
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
        </el-row>
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
                  ? "堅尼地城站"
                  : "Kennedy Town Station",
            },
            {
              id: 3,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "香港大學站"
                  : "Hong Kong University Station",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "西營盤站"
                  : "Sai Ying Pun Station",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "上環站"
                  : "Sheung Wan Station",
              disabled: false,
            },
            {
              id: 6,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "中環站"
                  : "Central Station",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "金鐘站"
                  : "Admiralty Station",
              disabled: false,
            },
            {
              id: 8,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "灣仔站"
                  : "Wan Chai Station",
              disabled: false,
            },
            {
              id: 9,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "銅鑼灣站"
                  : "Causeway Bay Station",
              disabled: false,
            },
            {
              id: 10,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "天后站"
                  : "Tin Hau Station",
              disabled: false,
            },
            {
              id: 11,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "炮台山站"
                  : "Fortress Hill Station",
              disabled: false,
            },
            {
              id: 12,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "北角站"
                  : "North Point Station",
              disabled: false,
            },
            {
              id: 13,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "鰂魚涌站"
                  : "Quarry Bay Station",
              disabled: false,
            },
            {
              id: 14,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "太古站"
                  : "Tai Koo Station",
              disabled: false,
            },
            {
              id: 15,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "西灣河站"
                  : "Sai Wan Ho Station",
              disabled: false,
            },
            {
              id: 16,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "筲箕灣站"
                  : "Shau Kei Wan Station",
              disabled: false,
            },
            {
              id: 17,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "杏花邨站"
                  : "Heng Fa Chuen Station",
              disabled: false,
            },
            {
              id: 18,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "柴灣站"
                  : "Chai Wan Station",
              disabled: false,
            },
            {
              id: 19,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "海洋公園站"
                  : "Ocean Park Station",
              disabled: false,
            },
            {
              id: 20,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "黃竹坑站"
                  : "Wong Chuk Hang Station",
              disabled: false,
            },
            {
              id: 21,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "利東站"
                  : "Lei Tung Station",
              disabled: false,
            },
            {
              id: 22,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "海怡半島站"
                  : "South Horizons Station",
              disabled: false,
            },
            {
              id: 23,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "香港站"
                  : "Hong Kong Station",
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
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "藍田站"
                  : "Lam Tin Station",
            },
            {
              id: 3,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "觀塘站"
                  : "Kwun Tong Station",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "牛頭角站"
                  : "Ngau Tau Kok Station",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "九龍灣站"
                  : "Kowloon Bay Station",
              disabled: false,
            },
            {
              id: 6,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "彩虹站"
                  : "Choi Hung Station",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "鑽石山站"
                  : "Diamond Hill Station",
              disabled: false,
            },
            {
              id: 8,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "黃大仙站"
                  : "Wong Tai Sin Station",
              disabled: false,
            },
            {
              id: 9,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "樂富站"
                  : "Lok Fu Station",
              disabled: false,
            },
            {
              id: 10,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "九龍塘站"
                  : "Kowloon Tong Station",
              disabled: false,
            },
            {
              id: 11,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "石硤尾站"
                  : "Shek Kip Mei Station",
              disabled: false,
            },
            {
              id: 12,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "太子站"
                  : "Prince Edward Station",
              disabled: false,
            },
            {
              id: 13,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "旺角站"
                  : "Mong Kok Station",
              disabled: false,
            },
            {
              id: 14,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "油麻地站"
                  : "Yau Ma Tei Station",
              disabled: false,
            },
            {
              id: 15,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "何文田站"
                  : "Ho Man Tin Station",
              disabled: false,
            },
            {
              id: 16,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "黃埔站"
                  : "Whampoa Station",
              disabled: false,
            },
            {
              id: 17,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "荔景站"
                  : "Lai King Station",
              disabled: false,
            },
            {
              id: 18,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "美孚站"
                  : "Mei Foo Station",
              disabled: false,
            },
            {
              id: 19,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "荔枝角站"
                  : "Lai Chi Kok Station",
              disabled: false,
            },
            {
              id: 20,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "長沙灣站"
                  : "Cheung Sha Wan Station",
              disabled: false,
            },
            {
              id: 21,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "深水埗站"
                  : "Sham Shui Po Station",
              disabled: false,
            },
            {
              id: 22,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "佐敦站"
                  : "Jordan Station",
              disabled: false,
            },
            {
              id: 23,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "尖沙咀站"
                  : "Tsim Sha Tsui Station",
              disabled: false,
            },
            {
              id: 24,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "油塘站"
                  : "Yau Tong Station",
              disabled: false,
            },
            {
              id: 25,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "九龍站"
                  : "Kowloon Station",
              disabled: false,
            },
            {
              id: 26,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "奧運站"
                  : "Olympic Station",
              disabled: false,
            },
            {
              id: 27,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "南昌站"
                  : "Nam Cheong Station",
              disabled: false,
            },
            {
              id: 28,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "紅磡站"
                  : "Hung Hom Station",
              disabled: false,
            },
            {
              id: 29,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "旺角東站"
                  : "Mong Kok East Station",
              disabled: false,
            },
            {
              id: 30,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "柯士甸站"
                  : "Austin Station",
              disabled: false,
            },
            {
              id: 31,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "尖東站"
                  : "East Tsim Sha Tsui Station",
              disabled: false,
            },
            {
              id: 32,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "土瓜灣站"
                  : "To Kwa Wan Station",
              disabled: false,
            },
            {
              id: 33,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "宋皇臺站"
                  : "Sung Wong Toi Station",
              disabled: false,
            },
            {
              id: 29,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "啟德站"
                  : "Kai Tak Station",
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
                this.$i18n.locale === "zh-Hant-HK"
                  ? "荃灣站"
                  : "Tsuen Wan Station",
            },
            {
              id: 3,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大窩口站"
                  : "Tai Wo Hau Station",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "葵興站"
                  : "Kwai Hing Station",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "葵芳站"
                  : "Kwai Fong Station",
              disabled: false,
            },
            {
              id: 6,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "康城站"
                  : "LOHAS Park Station",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "寶琳站"
                  : "Po Lam Station",
              disabled: false,
            },
            {
              id: 8,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "坑口站"
                  : "Hang Hau Station",
              disabled: false,
            },
            {
              id: 9,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "將軍澳站"
                  : "Tseung Kwan O Station",
              disabled: false,
            },
            {
              id: 10,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "調景嶺站"
                  : "Tiu Keng Leng Station",
              disabled: false,
            },
            {
              id: 11,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大圍站"
                  : "Tai Wai Station",
              disabled: false,
            },
            {
              id: 12,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "沙田站"
                  : "Sha Tin Station",
              disabled: false,
            },
            {
              id: 13,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "火炭站"
                  : "Fo Tan Station",
              disabled: false,
            },
            {
              id: 14,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "馬場站"
                  : "Racecourse Station",
              disabled: false,
            },
            {
              id: 15,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大學站"
                  : "University Station",
              disabled: false,
            },
            {
              id: 16,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大埔墟站"
                  : "Tai Po Market Station",
              disabled: false,
            },
            {
              id: 17,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "太和站"
                  : "Tai Wo Station",
              disabled: false,
            },
            {
              id: 18,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "粉嶺站"
                  : "Fanling Station",
              disabled: false,
            },
            {
              id: 19,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "上水站"
                  : "Sheung Shui Station",
              disabled: false,
            },
            {
              id: 20,
              label:
                this.$i18n.locale === "zh-Hant-HK" ? "羅湖站" : "Lo Wu Station",
              disabled: false,
            },
            {
              id: 21,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "落馬洲站"
                  : "Lok Ma Chau Station",
              disabled: false,
            },
            {
              id: 22,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "屯門站"
                  : "Tuen Mun Station",
              disabled: false,
            },
            {
              id: 23,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "兆康站"
                  : "Siu Hong Station",
              disabled: false,
            },
            {
              id: 24,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "天水圍站"
                  : "Tin Shui Wai Station",
              disabled: false,
            },
            {
              id: 25,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "朗屏站"
                  : "Long Ping Station",
              disabled: false,
            },
            {
              id: 26,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "元朗站"
                  : "Yuen Long Station",
              disabled: false,
            },
            {
              id: 27,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "錦上路站"
                  : "Kam Sheung Road Station",
              disabled: false,
            },
            {
              id: 28,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "荃灣西站"
                  : "Tsuen Wan West Station",
              disabled: false,
            },
            {
              id: 29,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "顯徑站"
                  : "Hin Keng Station",
              disabled: false,
            },
            {
              id: 30,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "車公廟站"
                  : "Che Kung Temple Station",
              disabled: false,
            },
            {
              id: 31,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "沙田圍站"
                  : "Sha Tin Wai Station",
              disabled: false,
            },
            {
              id: 32,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "第一城站"
                  : "City One Station",
              disabled: false,
            },
            {
              id: 33,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "石門站"
                  : "Shek Mun Station",
              disabled: false,
            },
            {
              id: 34,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "大水坑站"
                  : "Tai Shui Hang Station",
              disabled: false,
            },
            {
              id: 35,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "恒安站"
                  : "Heng On Station",
              disabled: false,
            },
            {
              id: 36,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "馬鞍山站"
                  : "Ma On Shan Station",
              disabled: false,
            },
            {
              id: 37,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "烏溪沙站"
                  : "Wu Kai Sha Station",
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
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "青衣站"
                  : "Tsing Yi Station",
            },
            {
              id: 3,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "欣澳站"
                  : "Sunny Bay Station",
              disabled: false,
            },
            {
              id: 4,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "迪士尼站"
                  : "Disneyland Resort Station",
              disabled: false,
            },
            {
              id: 5,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "東涌站"
                  : "Tung Chung Station",
              disabled: false,
            },
            {
              id: 6,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "機場站"
                  : "Airport station",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "博覽館站"
                  : "AsiaWorld-Expo Station",
              disabled: false,
            },
          ],
        },
      ],
    };
  },
  watch: {
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
                    ? "堅尼地城站"
                    : "Kennedy Town Station",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "香港大學站"
                    : "Hong Kong University Station",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "西營盤站"
                    : "Sai Ying Pun Station",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "上環站"
                    : "Sheung Wan Station",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "中環站"
                    : "Central Station",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "金鐘站"
                    : "Admiralty Station",
                disabled: false,
              },
              {
                id: 8,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "灣仔站"
                    : "Wan Chai Station",
                disabled: false,
              },
              {
                id: 9,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "銅鑼灣站"
                    : "Causeway Bay Station",
                disabled: false,
              },
              {
                id: 10,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "天后站"
                    : "Tin Hau Station",
                disabled: false,
              },
              {
                id: 11,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "炮台山站"
                    : "Fortress Hill Station",
                disabled: false,
              },
              {
                id: 12,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "北角站"
                    : "North Point Station",
                disabled: false,
              },
              {
                id: 13,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "鰂魚涌站"
                    : "Quarry Bay Station",
                disabled: false,
              },
              {
                id: 14,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "太古站"
                    : "Tai Koo Station",
                disabled: false,
              },
              {
                id: 15,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "西灣河站"
                    : "Sai Wan Ho Station",
                disabled: false,
              },
              {
                id: 16,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "筲箕灣站"
                    : "Shau Kei Wan Station",
                disabled: false,
              },
              {
                id: 17,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "杏花邨站"
                    : "Heng Fa Chuen Station",
                disabled: false,
              },
              {
                id: 18,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "柴灣站"
                    : "Chai Wan Station",
                disabled: false,
              },
              {
                id: 19,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "海洋公園站"
                    : "Ocean Park Station",
                disabled: false,
              },
              {
                id: 20,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "黃竹坑站"
                    : "Wong Chuk Hang Station",
                disabled: false,
              },
              {
                id: 21,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "利東站"
                    : "Lei Tung Station",
                disabled: false,
              },
              {
                id: 22,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "海怡半島站"
                    : "South Horizons Station",
                disabled: false,
              },
              {
                id: 23,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "香港站"
                    : "Hong Kong Station",
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
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "藍田站"
                    : "Lam Tin Station",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "觀塘站"
                    : "Kwun Tong Station",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "牛頭角站"
                    : "Ngau Tau Kok Station",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "九龍灣站"
                    : "Kowloon Bay Station",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "彩虹站"
                    : "Choi Hung Station",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "鑽石山站"
                    : "Diamond Hill Station",
                disabled: false,
              },
              {
                id: 8,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "黃大仙站"
                    : "Wong Tai Sin Station",
                disabled: false,
              },
              {
                id: 9,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "樂富站"
                    : "Lok Fu Station",
                disabled: false,
              },
              {
                id: 10,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "九龍塘站"
                    : "Kowloon Tong Station",
                disabled: false,
              },
              {
                id: 11,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "石硤尾站"
                    : "Shek Kip Mei Station",
                disabled: false,
              },
              {
                id: 12,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "太子站"
                    : "Prince Edward Station",
                disabled: false,
              },
              {
                id: 13,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "旺角站"
                    : "Mong Kok Station",
                disabled: false,
              },
              {
                id: 14,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "油麻地站"
                    : "Yau Ma Tei Station",
                disabled: false,
              },
              {
                id: 15,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "何文田站"
                    : "Ho Man Tin Station",
                disabled: false,
              },
              {
                id: 16,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "黃埔站"
                    : "Whampoa Station",
                disabled: false,
              },
              {
                id: 17,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "荔景站"
                    : "Lai King Station",
                disabled: false,
              },
              {
                id: 18,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "美孚站"
                    : "Mei Foo Station",
                disabled: false,
              },
              {
                id: 19,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "荔枝角站"
                    : "Lai Chi Kok Station",
                disabled: false,
              },
              {
                id: 20,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "長沙灣站"
                    : "Cheung Sha Wan Station",
                disabled: false,
              },
              {
                id: 21,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "深水埗站"
                    : "Sham Shui Po Station",
                disabled: false,
              },
              {
                id: 22,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "佐敦站"
                    : "Jordan Station",
                disabled: false,
              },
              {
                id: 23,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "尖沙咀站"
                    : "Tsim Sha Tsui Station",
                disabled: false,
              },
              {
                id: 24,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "油塘站"
                    : "Yau Tong Station",
                disabled: false,
              },
              {
                id: 25,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "九龍站"
                    : "Kowloon Station",
                disabled: false,
              },
              {
                id: 26,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "奧運站"
                    : "Olympic Station",
                disabled: false,
              },
              {
                id: 27,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "南昌站"
                    : "Nam Cheong Station",
                disabled: false,
              },
              {
                id: 28,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "紅磡站"
                    : "Hung Hom Station",
                disabled: false,
              },
              {
                id: 29,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "旺角東站"
                    : "Mong Kok East Station",
                disabled: false,
              },
              {
                id: 30,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "柯士甸站"
                    : "Austin Station",
                disabled: false,
              },
              {
                id: 31,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "尖東站"
                    : "East Tsim Sha Tsui Station",
                disabled: false,
              },
              {
                id: 32,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "土瓜灣站"
                    : "To Kwa Wan Station",
                disabled: false,
              },
              {
                id: 33,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "宋皇臺站"
                    : "Sung Wong Toi Station",
                disabled: false,
              },
              {
                id: 29,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "啟德站"
                    : "Kai Tak Station",
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
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "荃灣站"
                    : "Tsuen Wan Station",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大窩口站"
                    : "Tai Wo Hau Station",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "葵興站"
                    : "Kwai Hing Station",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "葵芳站"
                    : "Kwai Fong Station",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "康城站"
                    : "LOHAS Park Station",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "寶琳站"
                    : "Po Lam Station",
                disabled: false,
              },
              {
                id: 8,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "坑口站"
                    : "Hang Hau Station",
                disabled: false,
              },
              {
                id: 9,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "將軍澳站"
                    : "Tseung Kwan O Station",
                disabled: false,
              },
              {
                id: 10,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "調景嶺站"
                    : "Tiu Keng Leng Station",
                disabled: false,
              },
              {
                id: 11,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大圍站"
                    : "Tai Wai Station",
                disabled: false,
              },
              {
                id: 12,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "沙田站"
                    : "Sha Tin Station",
                disabled: false,
              },
              {
                id: 13,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "火炭站"
                    : "Fo Tan Station",
                disabled: false,
              },
              {
                id: 14,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "馬場站"
                    : "Racecourse Station",
                disabled: false,
              },
              {
                id: 15,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大學站"
                    : "University Station",
                disabled: false,
              },
              {
                id: 16,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大埔墟站"
                    : "Tai Po Market Station",
                disabled: false,
              },
              {
                id: 17,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "太和站"
                    : "Tai Wo Station",
                disabled: false,
              },
              {
                id: 18,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "粉嶺站"
                    : "Fanling Station",
                disabled: false,
              },
              {
                id: 19,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "上水站"
                    : "Sheung Shui Station",
                disabled: false,
              },
              {
                id: 20,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "羅湖站"
                    : "Lo Wu Station",
                disabled: false,
              },
              {
                id: 21,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "落馬洲站"
                    : "Lok Ma Chau Station",
                disabled: false,
              },
              {
                id: 22,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "屯門站"
                    : "Tuen Mun Station",
                disabled: false,
              },
              {
                id: 23,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "兆康站"
                    : "Siu Hong Station",
                disabled: false,
              },
              {
                id: 24,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "天水圍站"
                    : "Tin Shui Wai Station",
                disabled: false,
              },
              {
                id: 25,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "朗屏站"
                    : "Long Ping Station",
                disabled: false,
              },
              {
                id: 26,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "元朗站"
                    : "Yuen Long Station",
                disabled: false,
              },
              {
                id: 27,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "錦上路站"
                    : "Kam Sheung Road Station",
                disabled: false,
              },
              {
                id: 28,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "荃灣西站"
                    : "Tsuen Wan West Station",
                disabled: false,
              },
              {
                id: 29,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "顯徑站"
                    : "Hin Keng Station",
                disabled: false,
              },
              {
                id: 30,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "車公廟站"
                    : "Che Kung Temple Station",
                disabled: false,
              },
              {
                id: 31,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "沙田圍站"
                    : "Sha Tin Wai Station",
                disabled: false,
              },
              {
                id: 32,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "第一城站"
                    : "City One Station",
                disabled: false,
              },
              {
                id: 33,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "石門站"
                    : "Shek Mun Station",
                disabled: false,
              },
              {
                id: 34,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "大水坑站"
                    : "Tai Shui Hang Station",
                disabled: false,
              },
              {
                id: 35,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "恒安站"
                    : "Heng On Station",
                disabled: false,
              },
              {
                id: 36,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "馬鞍山站"
                    : "Ma On Shan Station",
                disabled: false,
              },
              {
                id: 37,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "烏溪沙站"
                    : "Wu Kai Sha Station",
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
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "青衣站"
                    : "Tsing Yi Station",
              },
              {
                id: 3,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "欣澳站"
                    : "Sunny Bay Station",
                disabled: false,
              },
              {
                id: 4,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "迪士尼站"
                    : "Disneyland Resort Station",
                disabled: false,
              },
              {
                id: 5,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "東涌站"
                    : "Tung Chung Station",
                disabled: false,
              },
              {
                id: 6,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "機場站"
                    : "Airport station",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "博覽館站"
                    : "AsiaWorld-Expo Station",
                disabled: false,
              },
            ],
          },
        ];
      },
    },
    // checkList() {
    //   console.log(this.checkList);
    // },
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
    dynamicMainCategoryFilter() {
      return this.$store.getters["dashboard/dynamicMainCategoryFilter"];
    },
    selectedAreas() {
      return this.$store.getters["search/selectedAreas"];
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
      // console.log("HERERERERERER");
      // console.log(arr);
      // if (arr.includes(this.$route.query.filters)) {
      //   console.log(this.$route);
      // } else {
      //   console.log("LOSER");
      // }

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
    handleDiscount(item) {
      console.log(item);
      console.log(this.checkList);
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
      // console.log(this.storeCompareArr);
      // console.log(this.storeCompareArr[0]);
      // console.log("HERERERERERER");
      // console.log(arr);
      // console.log(this.$route.query.filter);
      // console.log(compareArr);
      // console.log(arr.toString());
      // if (compareArr[0].item.includes(this.$route.query.filters)) {
      //   console.log("YYEESSS");
      // } else {
      //   console.log("LOSER");
      // }

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
  mounted() {
    // this.$refs.treeRef.load((one, two) => {
    //   console.log(one);
    //   console.log(two);
    // });
    console.log(this.selectedAreas);
    // if (Object.keys(this.selectedAreas).length > 0) {
    //   this.$refs.treeRef.setCheckedNodes(this.selectedAreas.checkedNodes);
    // }
    // this.$refs.treeRef.getHalfCheckedNodes();
    // this.$refs.treeRef.setCheckedKeys(this.selectedAreas.checkedNodes);
  },
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

/* .left-section
  .single-content
  :deep(.el-tree-node__content:nth-of-type(2) .custom-tree-node img) {
  display: block;
} */
</style>