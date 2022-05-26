<template>
  <section class="member-profile">
    <base-container>
      <el-row :gutter="15">
        <el-col :span="7">
          <base-card>
            <div class="avatar-content">
              <img src="../assets/avatar-sample02@2x.jpg" alt="" />
              <p>mvanhouten</p>
            </div>
            <ul>
              <router-link
                :to="{ name: 'personal-information' }"
                v-slot="{ navigate }"
              >
                <li @click="navigate">
                  <img :src="accountImg" alt="" /> 帳號設定
                </li>
              </router-link>
              <router-link
                :to="{ name: 'change-password' }"
                v-slot="{ navigate }"
              >
                <li @click="navigate">
                  <img :src="passwordImg" alt="" /> 密碼管理
                </li>
              </router-link>
              <router-link :to="{ name: 'booking-list' }" v-slot="{ navigate }">
                <li @click="navigate">
                  <img :src="bookingImg" alt="" /> 預約列表
                </li>
              </router-link>
              <router-link :to="{ name: 'coupon' }" v-slot="{ navigate }">
                <li @click="navigate">
                  <img :src="couponImg" alt="" /> 優惠列表
                </li>
              </router-link>
              <router-link :to="{ name: 'bookmark' }" v-slot="{ navigate }">
                <li @click="navigate">
                  <img :src="bookmarkImg" alt="" /> 我的收藏
                </li>
              </router-link>
              <router-link :to="{ name: 'notification' }" v-slot="{ navigate }">
                <li @click="navigate">
                  <img :src="notificationImg" alt="" /> 訊息管理
                </li>
              </router-link>
            </ul>
          </base-card>
        </el-col>
        <el-col :span="17">
          <router-view></router-view>
        </el-col>
      </el-row>
    </base-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      accountImg: require("../assets/profile-account-default@2x.png"),
      passwordImg: require("../assets/profile-password-default@2x.png"),
      bookingImg: require("../assets/profile-booking-default@2x.png"),
      couponImg: require("../assets/profile-coupon-default@2x.png"),
      bookmarkImg: require("../assets/profile-bookmark-default@2x.png"),
      notificationImg: require("../assets/profile-notification-default@2x.png"),
    };
  },
};
</script>

<style scoped>
.member-profile {
  background: #ddd;
}

.member-profile .el-row {
  margin-top: 0.5rem;
}

.member-profile .avatar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.member-profile .avatar-content img {
  width: 9rem;
  border-radius: 100%;
  /* background: rgba(0, 0, 0, 0.3); */
  padding: 0.1rem;
  border: 3px solid #fff;
  box-shadow: 1px 1px 10px rgb(0 0 0 / 30%);
}

.member-profile .avatar-content p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 1rem;
}

.member-profile ul {
  margin-top: 2rem;
  list-style: none;
}

.member-profile ul a {
  text-decoration: none;
}

.member-profile ul img {
  width: 1.5rem;
  margin-right: 0.5rem;
}

.member-profile ul li {
  display: flex;
  align-items: center;
  cursor: pointer;

  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
  position: relative;
}

.member-profile ul li.is-active,
.member-profile ul li:hover {
  color: #985f35;
}

.member-profile ul li.is-active::after {
  content: "";
  position: absolute;
  background-color: #985f35;
  border-radius: 0px 4px 4px 0px;
  left: -1rem;
  top: -0.4rem;
  width: 0.3rem;
  height: 2.3rem;
}
</style>