<template>
  <section class="booking-list">
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
      <Card v-if="currentOption === 'first'" />
      <second-tab v-else></second-tab>
    </base-card>
  </section>
</template>

<script>
import { ElNotification } from "element-plus";
import Card from "../components/booking-list/Card.vue";
import SecondTab from "../components/booking-list/SecondTab.vue";

export default {
  components: {
    Card,
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
    console.log(this.currentUserDetails);
    this.$store
      .dispatch("auth/checkAccessToken")
      .then(() => {
        this.$store.dispatch("profile/getBookings");
      })
      .catch(() => {
        this.$store
          .dispatch("auth/checkRefreshToken")
          .then(() => {
            this.$store.dispatch("profile/getBookings");
          })
          .catch(() => {
            ElNotification({
              title: "Error",
              message: "Token expired. Please login again!",
              type: "error",
            });
            this.$store.dispatch("auth/logout");
          });
      });
  },
};
</script>

<style scoped>
.booking-list .base-card {
  padding: 1rem 0;
}

.booking-list h4 {
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

.booking-list .component-switch {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.booking-list .component-switch p {
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

.booking-list .component-switch p:hover {
  color: #985f35;
}

.booking-list .component-switch p.is-active {
  color: #985f35;
}

.booking-list .component-switch p.is-active::after {
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