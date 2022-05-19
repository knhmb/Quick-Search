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
          <span>商戶專區</span>
        </div>
        <div class="member-login">
          <img src="../../assets/header-member-login@2x.png" alt="" />
          <span>會員登入/註冊</span>
        </div>
      </div>
    </base-container>
  </div>
</template>

<script>
import { ArrowDown } from "@element-plus/icons-vue";

export default {
  components: {
    ArrowDown,
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
</style>