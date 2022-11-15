<template>
  <div class="top-section">
    <base-container>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item class="first">{{ $t("home") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ selectedMainCategory }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>{{ $t("personal_care") }}</el-breadcrumb-item> -->
        <el-breadcrumb-item v-if="currentOption">{{
          currentOption
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h5>
        {{ selectedMainCategory }} {{ currentOption ? currentOption : "" }}
      </h5>
      <!-- <h5>
        {{ $t("personal_care") }} {{ currentOption ? currentOption : "" }}
      </h5> -->
      <carousel
        v-if="dynamicFilterGroup.length > 0"
        :breakpoints="breakpoints"
        :items-to-show="1.5"
      >
        <slide v-for="item in mainCategoryChildren" :key="item">
          <div
            @click="setOption(item)"
            :class="{ 'is-active': currentOption === item.name }"
            class="pill"
          >
            {{ item.name }}
          </div>
        </slide>
        <!-- <slide v-for="item in dynamicFilterGroup" :key="item">
          <div
            @click="setOption(item)"
            :class="{ 'is-active': currentOption === item.name }"
            class="pill"
          >
            {{ item.name }}
          </div>
        </slide> -->

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </base-container>
  </div>
</template>

<script>
import { ArrowRight } from "@element-plus/icons-vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      ArrowRight,
      currentOption: "",
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3.7,
          snapAlign: "start",
        },
        1240: {
          itemsToShow: 5.7,
          snapAlign: "start",
        },
      },
      options: [
        "all",
        "manicure",
        "eyelashes",
        "massage_parlor",
        "steam",
        "embroidered_eyebrows",
        // "全部",
        // "美甲",
        // "美睫",
      ],
    };
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.currentOption = "";
      },
    },
  },
  computed: {
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    selectedMainCategory() {
      return this.$store.getters["search/selectedMainCategory"];
    },
    mainCategoryChildren() {
      return this.$store.getters["dashboard/mainCategoryChildren"];
    },
  },
  methods: {
    setOption(option) {
      this.currentOption = option.name;
      // this.$emit("sort", option);
      this.$store.dispatch("dashboard/getDynamicFilters", option);
    },
  },
};
</script>

<style scoped>
.top-section {
  background: rgba(239, 223, 200, 0.6);
  backdrop-filter: blur(200px);
}

.top-section :deep(.el-breadcrumb__inner) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.top-section :deep(.el-breadcrumb__item.first .el-breadcrumb__inner) {
  color: #7a4117;
}

.top-section h5 {
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
  /* text-fill-color: transparent; */
  margin: 1rem 0 2rem 0;
}

.top-section .carousel {
  margin-bottom: 1rem;
}

.top-section :deep(.carousel__prev.carousel__prev),
.top-section :deep(.carousel__next.carousel__next) {
  background: #fff;
  color: #393939;
}

.top-section :deep(.carousel__prev.carousel__prev--in-active),
.top-section :deep(.carousel__next.carousel__next--in-active) {
  display: none;
}

.top-section .pill {
  background: #ffffff;
  border-radius: 32px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.3s ease-out;
  width: 8rem;
  text-align: start;
}

.top-section .pill:hover,
.top-section .pill.is-active {
  background: linear-gradient(
      264.22deg,
      rgba(217, 111, 33, 0.6) 0%,
      rgba(152, 95, 53, 0.6) 100%
    ),
    #985f35;
  color: #fff;
}
</style>