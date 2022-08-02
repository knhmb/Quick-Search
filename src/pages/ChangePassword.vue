<template>
  <section class="change-password">
    <base-card>
      <h4>{{ $t("password_management") }}</h4>
      <el-form
        :rules="rules"
        :model="ruleForm"
        ref="ruleFormRef"
        label-position="top"
        hide-required-asterisk
      >
        <el-row>
          <!-- <el-col>
            <el-form-item label="現有密碼" prop="oldPassword">
              <el-input
                type="password"
                placeholder="現有密碼"
                v-model="ruleForm.oldPassword"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item :label="$t('new_password')" prop="newPassword">
              <el-input
                type="password"
                :placeholder="$t('new_password')"
                v-model="ruleForm.newPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('confirm_new_password')"
              prop="confirmNewPassword"
            >
              <el-input
                type="password"
                :placeholder="$t('confirm_new_password')"
                v-model="ruleForm.confirmNewPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-button @click="changePassword">{{
              $t("change_button")
            }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </base-card>
  </section>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_password")));
      } else {
        if (this.ruleForm.confirmNewPassword !== "") {
          if (!this.$refs.ruleFormRef) return;
          this.$refs.ruleFormRef.validateField(
            "confirmNewPassword",
            () => null
          );
        }
        callback();
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_password_again")));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error(this.$t("password_does_not_match")));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        // oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      rules: {
        // oldPassword: [
        //   {
        //     required: true,
        //     message: "Old password is required!",
        //     trigger: "blur",
        //   },
        // ],
        newPassword: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirmNewPassword: [
          {
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
  },
  methods: {
    changePassword() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            id: this.currentUserDetails.id,
            password: this.ruleForm.newPassword,
            password2: this.ruleForm.confirmNewPassword,
          };
          console.log(data);
          this.$store
            .dispatch("auth/checkAccessToken")
            .then(() => {
              this.$store.dispatch("profile/updateUser", data).then(() => {
                ElNotification({
                  title: "Success",
                  message: this.$t("password_updated"),
                  type: "success",
                });
                this.$store.dispatch(
                  "profile/getUser",
                  this.currentUserDetails.id
                );
                this.$refs.ruleFormRef.resetFields();
              });
            })
            .catch(() => {
              this.$store
                .dispatch("auth/checkRefreshToken")
                .then(() => {
                  this.$store.dispatch("profile/updateUser", data).then(() => {
                    ElNotification({
                      title: "Success",
                      message: this.$t("password_updated"),
                      type: "success",
                    });
                    this.$store.dispatch(
                      "profile/getUser",
                      this.currentUserDetails.id
                    );
                    this.$refs.ruleFormRef.resetFields();
                  });
                })
                .catch(() => {
                  ElNotification({
                    title: "Error",
                    message: this.$t("token_expired"),
                    type: "error",
                  });
                  this.$store.dispatch("auth/logout");
                });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.change-password h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 2rem;
}

.change-password :deep(.el-form .el-input__wrapper) {
  background: #f5f4f0;
  border: 1px solid #ebeae6;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  width: 100%;
}

.change-password :deep(.el-form-item .el-form-item__label) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.change-password .el-button {
  background: #985f35;
  border-radius: 8px;

  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: 8rem;
  padding: 1.4rem;
  margin-left: auto;
  display: flex;
  margin: 1rem 0 1rem auto;
}
</style>
