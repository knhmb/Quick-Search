<template>
  <section class="member-profile">
    <base-container>
      <el-row :gutter="15">
        <el-col :sm="24" :lg="7">
          <base-card>
            <div class="avatar-content" v-if="avatarLoaded">
              <!-- <img :src="currentUserDetails.avatar" alt="" /> -->
              <el-upload
                class="avatar-uploader"
                :action="`${protocol}//${hostname}/api/v1/system/uploads`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <label for="file-upload">
                  <el-icon style="cursor: pointer"><camera /></el-icon>
                </label>
                <el-avatar :src="imgSrc" icon :size="100" shape="circle">
                  <img
                    class="image-avatar"
                    :src="
                      currentUserDetails.avatar
                        ? currentUserDetails.avatar
                        : defaultAvatar
                    "
                    alt=""
                  />
                  <!-- <label for="file-upload">
                  <el-icon style="cursor: pointer"><camera /></el-icon>
                </label> -->
                </el-avatar>
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
              </el-upload>
              <!-- <img src="../assets/avatar-sample02@2x.jpg" alt="" /> -->
              <p>{{ currentUserDetails.name }}</p>
            </div>
            <ul>
              <router-link
                :to="{ name: 'personal-information' }"
                v-slot="{ navigate }"
              >
                <li
                  :class="{
                    'is-active':
                      $route.path === '/member-profile/personal-information',
                  }"
                  @mouseleave="unhover('account')"
                  @mouseover="hover('account')"
                  @click="navigate"
                >
                  <img :src="accountImg" alt="" /> {{ $t("account_settings") }}
                </li>
              </router-link>
              <router-link
                :to="{ name: 'change-password' }"
                v-slot="{ navigate }"
              >
                <li
                  :class="{
                    'is-active':
                      $route.path === '/member-profile/change-password',
                  }"
                  @mouseleave="unhover('password')"
                  @mouseover="hover('password')"
                  @click="navigate"
                >
                  <img :src="passwordImg" alt="" />
                  {{ $t("password_management") }}
                </li>
              </router-link>
              <router-link :to="{ name: 'booking-list' }" v-slot="{ navigate }">
                <li
                  :class="{
                    'is-active': $route.path === '/member-profile/booking-list',
                  }"
                  @mouseleave="unhover('booking')"
                  @mouseover="hover('booking')"
                  @click="navigate"
                >
                  <img :src="bookingImg" alt="" /> {{ $t("appointment_list") }}
                </li>
              </router-link>
              <router-link :to="{ name: 'coupon' }" v-slot="{ navigate }">
                <li
                  :class="{
                    'is-active': $route.path === '/member-profile/coupon',
                  }"
                  @mouseleave="unhover('coupon')"
                  @mouseover="hover('coupon')"
                  @click="navigate"
                >
                  <img :src="couponImg" alt="" /> {{ $t("offer_list") }}
                </li>
              </router-link>
              <router-link :to="{ name: 'bookmark' }" v-slot="{ navigate }">
                <li
                  :class="{
                    'is-active': $route.path === '/member-profile/bookmark',
                  }"
                  @mouseleave="unhover('bookmark')"
                  @mouseover="hover('bookmark')"
                  @click="navigate"
                >
                  <img :src="bookmarkImg" alt="" /> {{ $t("my_collection") }}
                </li>
              </router-link>
              <router-link :to="{ name: 'notification' }" v-slot="{ navigate }">
                <li
                  :class="{
                    'is-active': $route.path === '/member-profile/notification',
                  }"
                  @mouseleave="unhover('notification')"
                  @mouseover="hover('notification')"
                  @click="navigate"
                >
                  <img :src="notificationImg" alt="" />
                  {{ $t("message_management") }}
                </li>
              </router-link>
            </ul>
          </base-card>
        </el-col>
        <el-col :sm="24" :lg="17">
          <router-view></router-view>
        </el-col>
      </el-row>
    </base-container>
  </section>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      defaultAvatar: require("../assets/avatar-default-lg@2x.png"),

      imgSrc: null,
      accountImg: require("../assets/profile-account-default@2x.png"),
      passwordImg: require("../assets/profile-password-default@2x.png"),
      bookingImg: require("../assets/profile-booking-default@2x.png"),
      couponImg: require("../assets/profile-coupon-default@2x.png"),
      bookmarkImg: require("../assets/profile-bookmark-default@2x.png"),
      notificationImg: require("../assets/profile-notification-default@2x.png"),
      avatarLoaded: true,
    };
  },
  watch: {
    "$route.path": {
      deep: true,
      immediate: true,
      handler() {
        if (this.$route.path === "/member-profile/personal-information") {
          this.accountImg = require("../assets/profile-account-on@2x.png");
          this.passwordImg = require("../assets/profile-password-default@2x.png");
          this.bookingImg = require("../assets/profile-booking-default@2x.png");
          this.couponImg = require("../assets/profile-coupon-default@2x.png");
          this.bookmarkImg = require("../assets/profile-bookmark-default@2x.png");
          this.notificationImg = require("../assets/profile-notification-default@2x.png");
        } else if (this.$route.path === "/member-profile/change-password") {
          this.accountImg = require("../assets/profile-account-default@2x.png");
          this.passwordImg = require("../assets/profile-password-on@2x.png");
          this.bookingImg = require("../assets/profile-booking-default@2x.png");
          this.couponImg = require("../assets/profile-coupon-default@2x.png");
          this.bookmarkImg = require("../assets/profile-bookmark-default@2x.png");
          this.notificationImg = require("../assets/profile-notification-default@2x.png");
        } else if (this.$route.path === "/member-profile/booking-list") {
          this.accountImg = require("../assets/profile-account-default@2x.png");
          this.passwordImg = require("../assets/profile-password-default@2x.png");
          this.bookingImg = require("../assets/profile-booking-on@2x.png");
          this.couponImg = require("../assets/profile-coupon-default@2x.png");
          this.bookmarkImg = require("../assets/profile-bookmark-default@2x.png");
          this.notificationImg = require("../assets/profile-notification-default@2x.png");
        } else if (this.$route.path === "/member-profile/coupon") {
          this.accountImg = require("../assets/profile-account-default@2x.png");
          this.passwordImg = require("../assets/profile-password-default@2x.png");
          this.bookingImg = require("../assets/profile-booking-default@2x.png");
          this.couponImg = require("../assets/profile-coupon-on@2x.png");
          this.bookmarkImg = require("../assets/profile-bookmark-default@2x.png");
          this.notificationImg = require("../assets/profile-notification-default@2x.png");
        } else if (this.$route.path === "/member-profile/bookmark") {
          this.accountImg = require("../assets/profile-account-default@2x.png");
          this.passwordImg = require("../assets/profile-password-default@2x.png");
          this.bookingImg = require("../assets/profile-booking-default@2x.png");
          this.couponImg = require("../assets/profile-coupon-default@2x.png");
          this.bookmarkImg = require("../assets/profile-bookmark-on@2x.png");
          this.notificationImg = require("../assets/profile-notification-default@2x.png");
        } else if (this.$route.path === "/member-profile/notification") {
          this.accountImg = require("../assets/profile-account-default@2x.png");
          this.passwordImg = require("../assets/profile-password-default@2x.png");
          this.bookingImg = require("../assets/profile-booking-default@2x.png");
          this.couponImg = require("../assets/profile-coupon-default@2x.png");
          this.bookmarkImg = require("../assets/profile-bookmark-default@2x.png");
          this.notificationImg = require("../assets/profile-notification-on@2x.png");
        }
      },
    },
  },
  computed: {
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
    protocol() {
      return window.location.protocol;
    },
    hostname() {
      return window.location.hostname;
    },
    image() {
      return this.$store.getters["profile/image"];
    },
  },
  methods: {
    hover(option) {
      if (option === "account") {
        this.accountImg = require("../assets/profile-account-on@2x.png");
      } else if (option === "password") {
        this.passwordImg = require("../assets/profile-password-on@2x.png");
      } else if (option === "booking") {
        this.bookingImg = require("../assets/profile-booking-on@2x.png");
      } else if (option === "coupon") {
        this.couponImg = require("../assets/profile-coupon-on@2x.png");
      } else if (option === "bookmark") {
        this.bookmarkImg = require("../assets/profile-bookmark-on@2x.png");
      } else if (option === "notification") {
        this.notificationImg = require("../assets/profile-notification-on@2x.png");
      }
    },
    unhover(option) {
      if (
        option === "account" &&
        this.$route.path !== "/member-profile/personal-information"
      ) {
        this.accountImg = require("../assets/profile-account-default@2x.png");
      } else if (
        option === "password" &&
        this.$route.path !== "/member-profile/change-password"
      ) {
        this.passwordImg = require("../assets/profile-password-default@2x.png");
      } else if (
        option === "booking" &&
        this.$route.path !== "/member-profile/booking-list"
      ) {
        this.bookingImg = require("../assets/profile-booking-default@2x.png");
      } else if (
        option === "coupon" &&
        this.$route.path !== "/member-profile/coupon"
      ) {
        this.couponImg = require("../assets/profile-coupon-default@2x.png");
      } else if (
        option === "bookmark" &&
        this.$route.path !== "/member-profile/bookmark"
      ) {
        this.bookmarkImg = require("../assets/profile-bookmark-default@2x.png");
      } else if (
        option === "notification" &&
        this.$route.path !== "/member-profile/notification"
      ) {
        this.notificationImg = require("../assets/profile-notification-default@2x.png");
      }
    },
    handleAvatarSuccess(response, uploadFile) {
      console.log(response);
      this.imgSrc = response.item.name;
      // this.getImageFilename(this.imgSrc);
      this.sendAvatar(this.imgSrc);
      console.log(uploadFile);
    },
    getImageFilename(data) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store.dispatch("profile/getImage", data).then(() => {
            this.sendAvatar(this.image);
          });
          // .then(() => {
          //   this.$store.dispatch("profile/getImage").then(() => {
          //     this.imgSrc = this.userDetails.avatar;
          //   });
          // });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store.dispatch("profile/getImage", data).then(() => {
                this.sendAvatar(this.image);
                // .then(() => {
                //   this.imgSrc = this.userDetails.avatar;
                // });
              });
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: "Token Expired! Please Login Again.",
                type: "error",
              });
              this.$store.dispatch("auth/logout");
              this.$router.replace("/");
            });
        });
    },
    sendAvatar(data) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store
            .dispatch("profile/updateUserAvatar", {
              avatar: `${this.protocol}//${this.hostname}/api/v1/system/uploads/${data}`,
              id: this.currentUserDetails.id,
            })
            .then(() => {
              this.avatarLoaded = false;
              this.$store
                .dispatch("profile/getUser", this.currentUserDetails.id)
                .then(() => {
                  this.avatarLoaded = true;

                  // this.imgSrc = this.userDetails.avatar;
                });
            });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store
                .dispatch("profile/updateUserAvatar", {
                  avatar: `${this.protocol}//${this.hostname}/api/v1/system/uploads/${data}`,
                  id: this.currentUserDetails.id,
                })
                .then(() => {
                  this.avatarLoaded = false;

                  this.$store
                    .dispatch("profile/getUser", this.currentUserDetails.id)
                    .then(() => {
                      this.avatarLoaded = false;

                      // this.imgSrc = this.userDetails.avatar;
                    });
                });
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: "Token Expired! Please Login Again.",
                type: "error",
              });
              this.$store.dispatch("auth/logout");
              this.$router.replace("/");
            });
        });
    },
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

.member-profile .el-row .el-col:first-of-type {
  margin-bottom: 1.5rem;
}

/* .image-avatar {
  width: 100%;
  border-radius: 100%;
  height: 100%;
  object-fit: cover;
} */

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

.member-profile .avatar-content .el-avatar {
  position: relative;
  overflow: visible;
}

.member-profile .avatar-content .el-icon {
  position: absolute;
  top: 60%;
  right: -0.3rem;
  color: #525252;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 100px;
  padding: 13px;
  z-index: 1;
}

.member-profile .avatar-content .el-icon svg {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}

.member-profile .avatar-content p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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

  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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

.member-profile .avatar-uploader :deep(.el-icon) {
  display: none;
}
</style>