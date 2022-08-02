<template>
  <div class="top-header">
    <base-container>
      <div class="left-section">
        <img src="../../assets/header-language.svg" alt="" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ $i18n.locale === "en-us" ? "English" : "繁體中文" }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="setLocale(language)"
                v-for="language in languages"
                :key="language.id"
                >{{ language.name }}</el-dropdown-item
              >
              <!-- <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="right-section">
        <div class="vendor-login hidden-xs-only">
          <img src="../../assets/header-vendor-login@2x.png" alt="" />
          <span>{{ $t("merchant_zone") }}</span>
        </div>
        <div class="member-login hidden-xs-only">
          <img
            v-if="!isLoggedIn"
            src="../../assets/header-member-login@2x.png"
            alt=""
          />
          <span v-if="!isLoggedIn" @click="openDialog"
            >{{ $t("member_login") }}/<span @click.stop="openRegisterDialog">{{
              $t("register")
            }}</span>
          </span>
          <div class="user-logged-in">
            <img
              @click="isUserDropdown = !isUserDropdown"
              v-if="isLoggedIn"
              class="avatar-img"
              src="../../assets/avatar-sample02@2x.jpg"
              alt=""
            />
            <div v-if="isUserDropdown" class="user-dropdown">
              <p @click="navigate('/member-profile')">{{ $t("profile") }}</p>
              <p @click="logout">{{ $t("log_out") }}</p>
            </div>
          </div>
        </div>
        <div @click="openSideNav" class="hamburger-icon hidden-sm-and-up">
          <div class="hamburger"></div>
          <div class="hamburger"></div>
          <div class="hamburger"></div>
        </div>
      </div>
    </base-container>
  </div>
  <teleport to="body">
    <div v-if="isCollapse" ref="mySidenav" class="sidenav">
      <div @click="closeSideNav" class="close"></div>
      <div class="vendor-login">
        <img src="../../assets/header-vendor-login@2x.png" alt="" />
        <span>{{ $t("merchant_zone") }}</span>
      </div>
      <div class="member-login">
        <img src="../../assets/header-member-login@2x.png" alt="" />
        <span @click="openDialog"
          >{{ $t("member_login") }}/{{ $t("register") }}</span
        >
      </div>
    </div>
  </teleport>
  <div class="dialog">
    <el-dialog
      @closed="resetFormTitle"
      v-model="dialogVisible"
      :title="formTitle"
    >
      <Login
        @closedDialog="dialogVisible = $event"
        v-if="formTitle === $t('login')"
      />
      <Signup
        @dialogClosed="dialogVisible = $event"
        v-if="formTitle === $t('new_member_registration')"
      />
      <forgot-password-form
        v-if="formTitle === $t('forgot_password_text')"
      ></forgot-password-form>
      <reset-password-form
        @closedDialog="dialogVisible = $event"
        v-if="formTitle === $t('reset_password_button')"
      ></reset-password-form>
    </el-dialog>
  </div>
</template>

<script>
import { ArrowDown } from "@element-plus/icons-vue";
import Login from "../login/Login.vue";
import Signup from "../signup/Signup.vue";
import ForgotPasswordForm from "../forgot-password/ForgotPasswordForm.vue";
import ResetPasswordForm from "../forgot-password/ResetPasswordForm.vue";

export default {
  components: {
    ArrowDown,
    Login,
    Signup,
    ForgotPasswordForm,
    ResetPasswordForm,
  },
  data() {
    return {
      dialogVisible: false,
      isCollapse: false,
      isUserDropdown: false,
    };
  },
  computed: {
    formTitle() {
      return this.$store.getters.formTitle;
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    languages() {
      return this.$store.getters["dashboard/languages"];
    },
  },
  methods: {
    setLocale(lang) {
      this.$i18n.locale = lang.slug;
    },
    openDialog() {
      this.$store.commit("changeFormTitle", this.$t("login"));
      // this.$store.commit("changeFormTitle", "登入");

      this.dialogVisible = true;
      this.isCollapse = false;
      document.querySelector("body").style.overflowY = "hidden";

      // this.$refs.mySidenav.style.width = "0";
      // this.$refs.mySidenav.style.display = "none";
    },
    openRegisterDialog() {
      this.$store.commit("changeFormTitle", this.$t("new_member_registration"));
      // this.$store.commit("changeFormTitle", "新會員註冊");
      this.dialogVisible = true;
      this.isCollapse = false;
      document.querySelector("body").style.overflowY = "hidden";
      console.log("register");
    },
    openSideNav() {
      this.isCollapse = !this.isCollapse;
      document.querySelector("body").style.overflowY = "hidden";
    },
    closeSideNav() {
      this.isCollapse = false;
      document.querySelector("body").style.overflowY = "visible";
    },
    resetFormTitle() {
      this.$store.commit("changeFormTitle", this.$t("login"));
      // this.$store.commit("changeFormTitle", "登入");
      document.querySelector("body").style.overflowY = "visible";
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.isUserDropdown = false;
    },
    navigate(path) {
      this.$router.push(path);
      this.isUserDropdown = false;
    },
  },
};
</script>

<style scoped>
.top-header {
  background-color: #985f35;
}

.top-header .container {
  display: flex;
  justify-content: space-between;
}

.top-header .left-section,
.top-header .right-section .vendor-login,
.top-header .right-section .member-login {
  display: flex;
  align-items: center;
}

.top-header .left-section img,
.top-header .right-section img {
  margin-right: 0.3rem;
  width: 1.2rem;
}

.top-header .right-section .member-login img.avatar-img {
  border-radius: 100%;
  width: 2rem;
  border: 1px solid #f5f5f5;
  cursor: pointer;
}

.top-header .user-logged-in {
  position: relative;
}

.top-header .user-logged-in .user-dropdown {
  background: #fff;
  padding: 1rem;
  width: 10rem;
  position: absolute;
  z-index: 1;
  bottom: -4.8rem;
  left: 0;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08);
}

.top-header .user-logged-in .user-dropdown p {
  cursor: pointer;
  transition: 0.3s;
}

.top-header .user-logged-in .user-dropdown p:not(:last-of-type) {
  margin-bottom: 0.7rem;
}

.top-header .user-logged-in .user-dropdown p:hover {
  padding-left: 0.3rem;
}

.top-header .el-dropdown-link,
.top-header .right-section span {
  cursor: pointer;
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #ffffff;
}

.top-header .right-section .vendor-login {
  border-right: 1px solid #cab3a2;
  padding-right: 1.5rem;
}

.top-header .right-section .member-login {
  margin-left: 1.5rem;
}

.top-header .right-section {
  display: flex;
  align-items: center;
}

.top-header div.hamburger {
  width: 1.5rem;
  height: 3px;
  background-color: #fff;
  margin: 5px 0;
  border-radius: 2px;
}

.sidenav {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #985f35;
  overflow-x: hidden;
  transition: 0.5s;
  padding: 1rem;
}

.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: "";
  height: 33px;
  width: 2px;
  background-color: #fff;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

.dialog :deep(.el-dialog) {
  border-radius: 16px;
  /* max-width: 416px; */
  width: 30rem;
}

.dialog :deep(.el-dialog__body) {
  padding: 0;
}

.dialog :deep(.el-dialog__title) {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
}

@media screen and (max-width: 991px) {
  .sidenav {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    padding-top: 8rem;
  }
  .sidenav img {
    margin-right: 0.3rem;
    width: 1.5rem;
  }

  .sidenav span {
    color: #fff;
  }

  .sidenav .vendor-login,
  .sidenav .member-login {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 520px) {
  .dialog :deep(.el-dialog) {
    width: 20rem;
  }
}
</style>
