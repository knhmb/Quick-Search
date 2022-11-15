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
            <img
              @click="signupWithFacebook"
              src="../../assets/signup-facebook@2x.png"
              alt=""
            />
          </el-col>
          <el-col :span="2">
            <img
              @click="googleRegister"
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
import { ElNotification } from "element-plus";
import { googleTokenLogin } from "vue3-google-login";
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
  computed: {
    facebookUserDetails() {
      return this.$store.getters["auth/facebookUserDetails"];
    },
  },
  methods: {
    login() {
      this.$store.commit("changeFormTitle", this.$t("login"));
      // this.$store.commit("changeFormTitle", "登入");
    },
    async signupWithFacebook() {
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
                vue.$emit("dialogClosed", false);
              });
          } else {
            // The person is not logged into your webpage or we are unable to tell.
          }
        },
        { scope: "public_profile,email" }
      );
    },
    async googleRegister() {
      googleTokenLogin().then((response) => {
        console.log(response);
        if (response.access_token) {
          this.$store
            .dispatch("auth/googleLogin", response.access_token)
            .then(() => {
              this.$emit("dialogClosed", false);
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
            this.$emit("dialogClosed", false);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.register p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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

@media screen and (max-width: 991px) {
  .register .have-account .el-button {
    padding: 0;
  }
}
</style>