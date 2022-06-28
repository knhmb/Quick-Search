<template>
  <section class="login">
    <div class="login-content">
      <p>以第三方帳號登入</p>
      <el-row justify="space-evenly">
        <el-col :span="2">
          <img src="../../assets/signup-facebook@2x.png" alt="" />
        </el-col>
        <el-col :span="2">
          <img src="../../assets/signup-google@2x.png" alt="" />
        </el-col>
        <el-col :span="2">
          <img src="../../assets/signup-apple@2x.png" alt="" />
        </el-col>
        <el-col :span="2">
          <img src="../../assets/signup-wechat@2x.png" alt="" />
        </el-col>
      </el-row>
      <el-divider content-position="center">或使用帳號登入</el-divider>
    </div>
    <Form @closedDialog="$emit('closedDialog', false)" />
  </section>
</template>

<script>
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
};
</script>

<style scoped>
.login p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.login img {
  width: 100%;
}

.login .el-divider {
  margin-top: 1.5rem;
}

.login :deep(.el-divider__text) {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #a8a8a8;
}

.login .login-content {
  padding: 20px;
}
</style>