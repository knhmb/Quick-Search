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
              ></el-checkbox>
              <el-checkbox
                @change="handleDiscount"
                v-model="discount"
                label="無優惠"
              ></el-checkbox>
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
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="八達通"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="信用卡"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="微信"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="支付寶"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="paymentMethod"
                label="轉數快"
              ></el-checkbox>
            </el-col>
          </el-row>
        </div>
        <el-row class="alignment">
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
                  v-model="checkList[`${subItem.group}`]"
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
        <el-row class="alignment">
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
  props: ["sorting"],
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
      // defaultProps: {
      //   children: "children",
      //   label: "label",
      //   disabled: "disabled",
      // },
      // data: [
      //   {
      //     id: 1,
      //     label: "港島區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "堅尼地城站",
      //       },
      //       {
      //         id: 3,
      //         label: "香港大學站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "西營盤站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "上環站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "中環站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "金鐘站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     label: "九龍區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "藍田站",
      //       },
      //       {
      //         id: 3,
      //         label: "觀塘站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "牛頭角站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "九龍灣站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "彩虹站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "鑽石山站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      //   {
      //     id: 3,
      //     label: "新界區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "荃灣站",
      //       },
      //       {
      //         id: 3,
      //         label: "大窩口站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "葵興站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "葵芳站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "康城站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "寶琳站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      //   {
      //     id: 4,
      //     label: "離島區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "青衣站",
      //       },
      //       {
      //         id: 3,
      //         label: "欣澳站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "迪士尼站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "東涌站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "機場站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "博覽館站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      // ],
    };
  },
  watch: {
    sorting() {
      this.handlePayment();
    },
    // checkList() {
    //   console.log(this.checkList);
    // },
  },
  computed: {
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    defaultProps() {
      return this.$store.getters["search/defaultProps"];
    },
    data() {
      return this.$store.getters["search/data"];
    },
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
    // this.$refs.treeRef.getHalfCheckedNodes();
    this.$refs.treeRef.setCheckedNodes(this.selectedAreas.checkedNodes);
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

.left-section .single-content p {
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

/* .left-section
  .single-content
  :deep(.el-tree-node__content:nth-of-type(2) .custom-tree-node img) {
  display: block;
} */
</style>