<template>
  <div class="advanced-search-dialog">
    <el-dialog
      @close="$emit('closeDialog', false)"
      :model-value="dialogVisible"
      :title="$t('advanced_search')"
      width="100%"
    >
      <div class="body">
        <div class="body-header">
          <p>{{ $t("main_category") }}</p>
          <div
            @click="changeFilter(item)"
            :class="{ 'is-active': currentFilter === item.name }"
            v-for="item in categories"
            :key="item"
            class="box"
          >
            {{ item.name }}
          </div>
          <div class="grey-section" v-if="dynamicMainCategoryFilter.length > 0">
            <h5>{{ $t("filters") }}</h5>
            <el-row class="alignment">
              <!-- <template v-for="item in categories" :key="item"> -->
              <el-col
                :span="4"
                v-for="group in mainCategoryFilter"
                :key="group"
              >
                <p>{{ group.name }}</p>
                <!-- <p>{{ item.category }}</p> -->
                <template v-for="item in dynamicMainCategoryFilter" :key="item">
                  <template v-for="subItem in item" :key="subItem">
                    <el-checkbox-group v-model="checkList[`${subItem.group}`]">
                      <el-checkbox
                        v-if="group.slug === subItem.group"
                        :label="`&quot;${subItem.slug}&quot;`"
                        >{{ subItem.name }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </template>
                  <!-- <el-checkbox-group v-model="mainCategory[`${item.group}`]">
                    <el-checkbox :label="`&quot;${item.slug}&quot;`">{{
                      item.name
                    }}</el-checkbox>
                  </el-checkbox-group> -->
                </template>
              </el-col>
              <!-- </template> -->
            </el-row>
          </div>
        </div>
        <div class="body-header">
          <p>{{ $t("sub_category") }}</p>
          <div
            @click="getFilterItems(item)"
            :class="{ 'is-active': currentFilter2 === item.name }"
            v-for="item in dynamicFilterGroup"
            :key="item"
            class="box"
          >
            {{ item.name }}
          </div>
          <div class="grey-section" v-if="dynamicFilters.length > 0">
            <h5>{{ $t("filters") }}</h5>
            <el-row class="alignment">
              <el-col
                :span="6"
                v-for="group in dynamicFilterGroup"
                :key="group.id"
              >
                <p>{{ group.name }}</p>
                <template v-for="item in dynamicFilters" :key="item">
                  <el-checkbox-group v-model="checkList[`${item.group}`]">
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
        </div>
        <div class="body-header">
          <p>{{ $t("filter") }}</p>
          <p class="area">{{ $t("area") }}</p>
          <div class="areas">
            <el-tree
              @check-change="handleChange"
              @check="dummy"
              :data="data"
              :props="defaultProps"
              show-checkbox
              default-expand-all
              node-key="uniqueNode"
            >
              <template #default="{ node }">
                <span class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <!-- <img src="../../assets/chevron-down-black@2x.png" alt="" /> -->
                </span>
              </template>
            </el-tree>
            <!-- <div class="single-area">
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
            </div> -->
          </div>
          <div class="other-filters">
            <div class="single-filter">
              <p class="area">{{ $t("discount") }}</p>
              <el-checkbox-group v-model="discount">
                <el-checkbox label="有優惠">{{
                  $t("there_are_discounts")
                }}</el-checkbox>
                <el-checkbox label="無優惠">{{
                  $t("no_discount")
                }}</el-checkbox>
              </el-checkbox-group>
              <!-- <el-checkbox v-model="discount" label="有優惠"
                >有優惠</el-checkbox
              >
              <el-checkbox v-model="discount" label="無優惠"
                >無優惠</el-checkbox
              > -->
            </div>
            <div class="single-filter middle">
              <p class="area">{{ $t("price_range") }}</p>
              <p class="any">{{ $t("any") }}</p>
              <el-slider v-model="priceRange" range :max="100" />
            </div>
            <div class="single-filter">
              <p class="area">{{ $t("payment_method") }}</p>
              <el-checkbox-group v-model="paymentMethod">
                <el-checkbox label="現金">{{ $t("cash") }}</el-checkbox>
                <el-checkbox label="八達通">{{ $t("octupus") }}</el-checkbox>
                <el-checkbox label="信用卡">{{
                  $t("credit_card")
                }}</el-checkbox>
                <el-checkbox label="微信">{{ $t("we_chat") }}</el-checkbox>
                <el-checkbox label="支付寶">{{ $t("ali_pay") }}</el-checkbox>
                <el-checkbox label="轉數快">{{ $t("fast_speed") }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="searchFilter">{{
            $t("showing_search_results")
          }}</el-button>
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
      filter: {
        arr: [],
      },
      filterArray: [],
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "disabled",
      },
      // checkList: {},
      // discount: [],
      finalDiscount: [],
      finalPayment: [],
      currentFilter: "",
      currentFilter2: "",
      // priceRange: [0, 100],
      // paymentMethod: [],
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
                  : "Kenny Town Station",
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
                  : "Rainbow Station",
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
                  : "Da Wo Hau Station",
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
                  : "Cannes Station",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "寶琳站"
                  : "Pauline Station",
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
                  : "Disney Station",
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
                  : "airport station",
              disabled: false,
            },
            {
              id: 7,
              label:
                this.$i18n.locale === "zh-Hant-HK"
                  ? "博覽館站"
                  : "Expo Station",
              disabled: false,
            },
          ],
        },
      ],
    };
  },
  watch: {
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
                    : "Kenny Town Station",
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
                    : "Rainbow Station",
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
                    : "Da Wo Hau Station",
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
                    : "Cannes Station",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "寶琳站"
                    : "Pauline Station",
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
                    : "Disney Station",
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
                    : "airport station",
                disabled: false,
              },
              {
                id: 7,
                label:
                  this.$i18n.locale === "zh-Hant-HK"
                    ? "博覽館站"
                    : "Expo Station",
                disabled: false,
              },
            ],
          },
        ];
      },
    },
  },
  computed: {
    filtersGroup() {
      return this.$store.getters["dashboard/filtersGroup"];
    },
    // defaultProps() {
    //   return this.$store.getters["search/defaultProps"];
    // },
    dynamicMainCategoryFilter() {
      return this.$store.getters["dashboard/dynamicMainCategoryFilter"];
    },
    mainCategoryFilter() {
      return this.$store.getters["dashboard/mainCategoryFilter"];
    },
    filtersItem() {
      return this.$store.getters["dashboard/filtersItem"];
    },
    categories() {
      return this.$store.getters["dashboard/categories"];
    },
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    dynamicFilters() {
      return this.$store.getters["dashboard/dynamicFilters"];
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
    // data: {
    //   get() {
    //     return this.$store.getters["search/data"];
    //   },
    //   set(value) {
    //     this.$store.commit("search/UPDATE_DATA", value);
    //   },
    // },
  },
  methods: {
    setFilter(item) {
      this.currentFilter = item.name;
      this.$store.dispatch("dashboard/getFiltersGroup", item.parent);
    },
    dummy(one, selectedAreas) {
      console.log(one);
      console.log(selectedAreas);
      this.$store.commit("search/STORE_SELECTED_AREAS", selectedAreas);
    },
    handleChange(data, checked) {
      // console.log(checked);
      console.log(data);
      // this.$store.commit("search/STORE_REF", this.$refs.treeRef);
      if (checked) {
        this.filter.arr.push({
          id: data.$treeNodeId,
          label: `${data.label}`,
        });
        // console.log(this.filter.arr);
        // if (!this.filter.arr.includes(`${data.label}`)) {
        //   this.filter.arr.push(`${data.label}`);
        // }
      }
      if (!checked) {
        this.filter.arr = this.filter.arr.filter(
          (item) => item.id !== data.$treeNodeId
        );
      }

      let filterArr = [];

      this.filter.arr.forEach((item) => {
        // filterArr.push(`"${item}"`);
        filterArr.push(`"${item.label}"`);
      });

      this.filterArray = filterArr;

      // console.log(filterArr);
    },
    getFilterItems(item) {
      console.log(item);
      this.currentFilter2 = item.name;
      this.$store.dispatch("dashboard/getDynamicFilters", item);
    },
    searchFilter() {
      console.log(this.checkList);
      const arr = [];
      const compareArr = [];
      for (const item in this.checkList) {
        console.log(`${item}:{"$in":[${this.checkList[item]}]}`);
        arr.push(`${item}:{"$in":[${this.checkList[item]}]}`);
        compareArr.push(this.checkList[item]);
      }
      this.$store.commit("search/SET_COMPARE_ARR", compareArr);
      console.log(arr);
      console.log(arr.toString());
      // let result = Object.keys(this.checkList).map((key) => [
      //   `${key}:${this.checkList[key].toString().replaceAll(",", "|")}`,
      // ]);
      // this.checkList = {};
      // const finalData = result.toString();
      // console.log(finalData);

      // const discountData =
      //   this.discount.length > 0
      //     ? this.discount.toString().replaceAll(",", "|")
      //     : "";
      // const finalDiscount = []

      this.paymentMethod.forEach((item) => {
        if (!this.finalPayment.includes(item)) {
          this.finalPayment.push(`"${item}"`);
        }
      });

      const paymentData =
        this.finalPayment.length > 0 ? `{"$in":[${this.finalPayment}]}` : "";

      this.discount.forEach((item) => {
        if (!this.finalDiscount.includes(item)) {
          this.finalDiscount.push(`"${item}"`);
        }
      });
      console.log(this.finalDiscount);

      const discountData =
        this.finalDiscount.length > 0 ? `{"$in":[${this.finalDiscount}]}` : "";
      // const discountData =
      //   this.discount.length > 0 ? `{"$in":[${this.discount}]}` : "";

      const areas = [];

      this.checkedCities.forEach((city) => {
        areas.push(city);
      });
      this.checkedKowloonAreas.forEach((city) => {
        areas.push(city);
      });
      this.checkedNewTerritories.forEach((city) => {
        areas.push(city);
      });
      this.checkedIslandDistrict.forEach((city) => {
        areas.push(city);
      });
      console.log(areas);

      const dataObject = {
        dynamicFilter: arr.toString(),
        dynamicFilter1: arr,
        // dynamicFilter: finalData,
        discount: discountData,
        area:
          this.filterArray.length > 0 ? `{"$in":[${this.filterArray}]}` : "",
        // area: areas.length > 0 ? `{"$in":["${areas}"]}` : "",
        // area: areas.length > 0 ? areas.toString().replaceAll(",", "|") : "",
        price: this.priceRange,
        paymentMethod: paymentData,
        // paymentMethod:
        //   this.paymentMethod.length > 0
        //     ? this.paymentMethod.toString().replaceAll(",", "|")
        //     : "",
      };

      console.log(dataObject);

      this.$store.dispatch("search/advancedFilter", dataObject).then(() => {
        this.$emit("closeDialog", false);
        this.$router.push({
          path: "/advanced-search",
          query: { filter: arr.toString() },
        });
      });
      // this.$store.dispatch("search/advancedFilter", dataObject).then(() => {
      //   this.$emit("closeDialog", false);
      //   this.$router.push({
      //     path: "/advanced-search",
      //     query: { filter: finalData },
      //   });
      // });
    },
    changeFilter(item) {
      this.currentFilter = item.name;
      console.log(item);
      this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", item.name);
      this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
      this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
      this.$store.dispatch("dashboard/getDynamicFilterGroup", item.slug);
      this.$store.dispatch("dashboard/getMainCategoryFilter", item.slug);
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
.advanced-search-dialog :deep(.el-dialog) {
  max-height: 500px;
  overflow-y: scroll;
}

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
  /* display: flex;
  justify-content: space-between; */
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

.advanced-search-dialog .grey-section {
  background: #f5f4f0;
  border-radius: 16px;
  padding: 1rem;
  margin-top: 1rem;
}

.advanced-search-dialog .grey-section h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.advanced-search-dialog .body .body-header .grey-section p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
  padding-left: 0;
}

.advanced-search-dialog .grey-section p:before {
  display: none;
}

.advanced-search-dialog .grey-section .el-row.alignment {
  align-items: flex-start;
}

.advanced-search-dialog .el-tree {
  display: flex;
  justify-content: space-between;
}

.advanced-search-dialog .el-tree :deep(.custom-tree-node) img {
  width: 1.1rem;
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