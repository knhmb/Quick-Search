<template>
  <section class="register">
    <div v-if="!isEmail">
      <div class="register-content">
        <p>{{ $t("sign_up_with_email_or_third_party") }}</p>
        <el-row justify="space-evenly">
          <el-col :span="2">
            <img
              @click="isEmail = true"
              src="../../assets/signup-email@2x.png"
              alt=""
            />
          </el-col>
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
      </div>
    </div>
    <Form @dialogClosed="$emit('dialogClosed', false)" v-else></Form>
    <div class="have-account">
      <!-- <p>已有 <span>Quick Search</span> 帳號？</p> -->
      <p>{{ $t("already_have_an_account") }}</p>
      <el-button @click="login">{{ $t("login") }}</el-button>
    </div>
  </section>
</template>

<script>
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
  data() {
    return {
      isEmail: false,
    };
  },
  methods: {
    login() {
      this.$store.commit("changeFormTitle", "登入");
    },
  },
};
</script>

<style scoped>
.register p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  font-feature-settings: "liga" off;
  color: #393939;
  margin: 1rem 0;
}

.register img {
  width: 100%;
  cursor: pointer;
}

.register .have-account {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: #f5f4f0;
  border-radius: 0px 0px 16px 16px;
  margin-top: 2rem;
  padding: 10px 20px 10px 20px;
}

.register .have-account .el-button {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #7a4117;
  border-color: #7a4117;
  background: transparent;
  width: 20%;
  padding: 1.2rem;
}
</style>