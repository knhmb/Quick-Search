<template>
  <section class="login">
    <div class="login-content">
      <p>{{ $t("login_with_third_party") }}</p>
      <el-row justify="space-evenly">
        <el-col :span="2">
          <img
            @click="logInWithFacebook"
            src="../../assets/signup-facebook@2x.png"
            alt=""
          />
        </el-col>
        <el-col :span="2">
          <img
            @click="googleLogin"
            src="../../assets/signup-google@2x.png"
            alt=""
          />
        </el-col>
        <el-col :span="2">
          <img
            @click="appleSignup"
            src="../../assets/signup-apple@2x.png"
            alt=""
          />
        </el-col>
        <!-- <el-col :span="2">
          <img src="../../assets/signup-wechat@2x.png" alt="" />
        </el-col> -->
      </el-row>
      <el-divider content-position="center">{{
        $t("login_with_account")
      }}</el-divider>
    </div>
    <Form @closedDialog="$emit('closedDialog', false)" />
  </section>
</template>

<script>
import { googleTokenLogin } from "vue3-google-login";
import { ElNotification } from "element-plus";
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
  computed: {
    facebookUserDetails() {
      return this.$store.getters["auth/facebookUserDetails"];
    },
  },
  methods: {
    async logInWithFacebook() {
      const vue = this;
      window.FB.login(
        function (response) {
          console.log(response);
          if (response.status === "connected") {
            // Logged into your webpage and Facebook.\
            vue.$store
              .dispatch("auth/facebookLogin", response.authResponse.accessToken)
              .then(() => {
                console.log(vue.facebookUserDetails);
                const isAvailable = "accessToken" in vue.facebookUserDetails;
                console.log(isAvailable);
                if (!isAvailable) {
                  vue.$store.commit("OPEN_DIALOG", "register");
                  return;
                }
                vue.$emit("closedDialog", false);
              });
          } else {
            // The person is not logged into your webpage or we are unable to tell.
          }
        },
        { scope: "public_profile,email" }
      );
    },
    async googleLogin() {
      googleTokenLogin().then((response) => {
        if (response.access_token) {
          this.$store
            .dispatch("auth/googleLogin", response.access_token)
            .then(() => {
              this.$emit("closedDialog", false);
            })
            .catch((err) => {
              ElNotification({
                title: "Error",
                message: this.$t(err.response.data.message),
                type: "error",
              });
            });
        }
      });
    },
    async appleSignup() {
      try {
        const data = await window.AppleID.auth.signIn();
        console.log(data);
        this.$store
          .dispatch("auth/appleSignup", {
            id_token: data.authorization.id_token,
          })
          .then(() => {
            this.$emit("closedDialog", false);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.login p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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
  cursor: pointer;
}

.login .el-divider {
  margin-top: 1.5rem;
}

.login :deep(.el-divider__text) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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