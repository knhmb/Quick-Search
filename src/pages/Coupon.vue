<template>
  <section class="coupon">
    <base-card>
      <h4>預約列表</h4>
      <div class="component-switch">
        <p
          @click="currentOption = 'first'"
          :class="{ 'is-active': currentOption === 'first' }"
        >
          已確認
        </p>
        <p
          @click="currentOption = 'second'"
          :class="{ 'is-active': currentOption === 'second' }"
        >
          已完成
        </p>
      </div>
      <first-tab v-if="currentOption === 'first'"></first-tab>
      <second-tab v-else></second-tab>
    </base-card>
  </section>
</template>

<script>
// import { ElNotification } from "element-plus";

import FirstTab from "../components/coupon/FirstTab.vue";
import SecondTab from "../components/coupon/SecondTab.vue";

export default {
  components: {
    FirstTab,
    SecondTab,
  },
  data() {
    return {
      currentOption: "first",
    };
  },
  computed: {
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
  },
  created() {
    //   this.$store
    //     .dispatch("auth/checkAccessToken")
    //     .then(() => {
    //       this.$store.dispatch("profile/getComments");
    //     })
    //     .catch(() => {
    //       this.$store
    //         .dispatch("auth/checkRefreshToken")
    //         .then(() => {
    //           this.$store.dispatch("profile/getComments");
    //         })
    //         .catch(() => {
    //           ElNotification({
    //             title: "Error",
    //             message: "Token Expired. Please login again",
    //             type: "error",
    //           });
    //           this.$store.dispatch("auth/logout");
    //         });
    //     });
  },
};
</script>

<style scoped>
.coupon .base-card {
  padding: 1rem 0;
}

.coupon h4 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.coupon .component-switch {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.coupon .component-switch p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
  display: inline-block;
  margin-bottom: 1rem;
  margin-right: 2.5rem;
  cursor: pointer;
  position: relative;
}

.coupon .component-switch p:hover {
  color: #985f35;
}

.coupon .component-switch p.is-active {
  color: #985f35;
}

.coupon .component-switch p.is-active::after {
  content: "";
  position: absolute;
  background: #985f35;
  border-radius: 4px 4px 0px 0px;
  width: 150%;
  height: 0.4rem;
  bottom: -1rem;
  left: -0.6rem;
}
</style>