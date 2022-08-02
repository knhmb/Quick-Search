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
          <!-- <el-checkbox>港島區</el-checkbox> -->
          <el-tree
            @check-change="handleChange"
            accordion
            :data="data"
            :props="defaultProps"
            show-checkbox
          >
            <template #default="{ node }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <!-- <span> -->
                <img src="../../assets/chevron-down-black@2x.png" alt="" />
                <!-- </span> -->
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
                  v-model="filter.sliderValue"
                />
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
                v-model="filter.discountCheckbox"
                label="有優惠"
              ></el-checkbox>
              <el-checkbox
                @change="handleDiscount"
                v-model="filter.discountCheckbox"
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
                v-model="filter.paymentCheckbox"
                label="現金"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="filter.paymentCheckbox"
                label="八達通"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="filter.paymentCheckbox"
                label="信用卡"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="filter.paymentCheckbox"
                label="微信"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="filter.paymentCheckbox"
                label="支付寶"
              ></el-checkbox>
              <el-checkbox
                @change="handlePayment"
                v-model="filter.paymentCheckbox"
                label="轉數快"
              ></el-checkbox>
            </el-col>
          </el-row>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
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
          label: "港島區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
        {
          id: 2,
          label: "九龍區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
        {
          id: 3,
          label: "新界區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
        {
          id: 4,
          label: "離島區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange(data, checked, indeterminate) {
      console.log(data);
      console.log(checked);
      console.log(indeterminate);

      if (checked) {
        this.filter.arr.push({
          id: data.id,
          label: data.label,
        });
      } else if (!checked) {
        this.filter.arr = this.filter.arr.filter((item) => item.id !== data.id);
      }
      const filterArr = [];

      this.filter.arr.forEach((item) => {
        filterArr.push(item.label);
      });
      console.log(filterArr);

      const filter = {
        query: this.$route.query.q ? this.$route.query.q : "",
        area: filterArr ? filterArr.toString().replaceAll(",", "|") : "",
        price: this.filter.sliderValue ? this.filter.sliderValue : "",
        discount:
          this.filter.discountCheckbox.length > 0
            ? this.filter.discountCheckbox.toString().replaceAll(",", "|")
            : "",
      };
      console.log(filter);

      this.$store.dispatch("search/filterSearch", filter);
    },
    handleDiscount() {
      const filterArr = [];

      this.filter.arr.forEach((item) => {
        filterArr.push(item.label);
      });
      console.log(filterArr);

      const filter = {
        area: filterArr ? filterArr.toString().replaceAll(",", "|") : "",
        query: this.$route.query.q ? this.$route.query.q : "",
        price: this.filter.sliderValue ? this.filter.sliderValue : "",
        discount:
          this.filter.discountCheckbox.length > 0
            ? this.filter.discountCheckbox.toString().replaceAll(",", "|")
            : "",
        payment:
          this.filter.paymentCheckbox.length > 0
            ? this.filter.paymentCheckbox.toString().replaceAll(",", "|")
            : "",
      };
      console.log(filter);
      this.$store.dispatch("search/filterSearch", filter);
    },
    handlePayment() {
      this.handleDiscount();
    },
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