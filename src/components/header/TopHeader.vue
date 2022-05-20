<template>
  <div class="top-header">
    <base-container>
      <div class="left-section">
        <img src="../../assets/header-language.svg" alt="" />
        <el-dropdown>
          <span class="el-dropdown-link">
            繁體中文
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="right-section">
        <div class="vendor-login">
          <img src="../../assets/header-vendor-login@2x.png" alt="" />
          <span @click="openDialog">商戶專區</span>
        </div>
        <div class="member-login">
          <img src="../../assets/header-member-login@2x.png" alt="" />
          <span>會員登入/註冊</span>
        </div>
      </div>
    </base-container>
  </div>
  <div class="dialog">
    <el-dialog
      @closed="resetFormTitle"
      v-model="dialogVisible"
      :title="formTitle"
      width="30%"
    >
      <Login v-if="formTitle === '登入'" />
      <Signup v-if="formTitle === `新會員註冊`" />
    </el-dialog>
  </div>
</template>

<script>
import { ArrowDown } from "@element-plus/icons-vue";
import Login from "../login/Login.vue";
import Signup from "../signup/Signup.vue";

export default {
  components: {
    ArrowDown,
    Login,
    Signup,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    formTitle() {
      return this.$store.getters.formTitle;
    },
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    resetFormTitle() {
      this.$store.commit("changeFormTitle", "登入");
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

.dialog :deep(.el-dialog) {
  border-radius: 16px;
  /* max-width: 416px; */
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
</style>
