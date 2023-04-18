<template>
  <div class="right-section">
    <el-tabs @tab-click="openSecondTab" v-model="activeName" class="demo-tabs">
      <el-tab-pane
        @click="openSecondTab"
        :label="$t('evaluation')"
        name="second"
      >
        <second-tab></second-tab>
      </el-tab-pane>
      <el-tab-pane :label="$t('photo')" name="third">
        <third-tab></third-tab>
      </el-tab-pane>
      <el-tab-pane :label="$t('reserve')" name="first">
        <first-tab></first-tab>
      </el-tab-pane>
      <!-- <el-tab-pane
        @click="openSecondTab"
        :label="$t('evaluation')"
        name="second"
      >
        <second-tab></second-tab>
      </el-tab-pane> -->
      <!-- <el-tab-pane :label="$t('photo')" name="third">
        <third-tab></third-tab>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import FirstTab from "./FirstTab.vue";
import SecondTab from "./SecondTab.vue";
import ThirdTab from "./ThirdTab.vue";
// import { ElNotification } from "element-plus";

export default {
  components: {
    FirstTab,
    SecondTab,
    ThirdTab,
  },
  data() {
    return {
      // activeName: "first",
    };
  },
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
    activeName() {
      return this.$store.getters["shop/activeName"];
    },
  },
  methods: {
    openSecondTab(val) {
      if (val.paneName === "second") {
        // this.$store.dispatch("shop/getComments", this.singleItem.item.slug);
        this.$store.commit("shop/SET_TAB_VALUE", val.paneName);

        // this.$store
        //   .dispatch("auth/checkAccessToken")
        //   .then(() => {
        //     this.$store.dispatch("shop/getComments");
        //   })
        //   .catch(() => {
        //     this.$store
        //       .dispatch("auth/checkRefreshToken")
        //       .then(() => {
        //         this.$store.dispatch("shop/getComments");
        //       })
        //       .catch(() => {
        //         ElNotification({
        //           title: "Error",
        //           message: this.$t("token_expired"),
        //           type: "error",
        //         });
        //         this.$store.dispatch("auth/logout");
        //       });
        //   });
      }
    },
  },
};
</script>

<style scoped>
/* .right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
} */

.right-section :deep(.el-tabs .el-tabs__header) {
  background: #fff;
  border-radius: 8px 8px 0 0;
  margin: 0;
}

.right-section :deep(.el-tabs__nav-wrap) {
  display: flex;
  justify-content: center;
}

.right-section :deep(.el-tabs__active-bar) {
  background-color: #985f35;
  width: 2.5rem !important;
  border-radius: 8px 8px 0 0;
  height: 0.2rem;
}

.right-section :deep(.el-tabs__item.is-active) {
  color: #985f35;
}
</style>