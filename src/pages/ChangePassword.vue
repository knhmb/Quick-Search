<template>
  <section class="change-password">
    <base-card>
      <h4>密碼管理</h4>
      <el-form
        :rules="rules"
        :model="ruleForm"
        ref="ruleFormRef"
        label-position="top"
        hide-required-asterisk
      >
        <el-row>
          <el-col>
            <el-form-item label="現有密碼" prop="oldPassword">
              <el-input
                type="password"
                placeholder="現有密碼"
                v-model="ruleForm.oldPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="新密碼" prop="newPassword">
              <el-input
                type="password"
                placeholder="新密碼"
                v-model="ruleForm.newPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="確認新密碼" prop="confirmNewPassword">
              <el-input
                type="password"
                placeholder="確認新密碼"
                v-model="ruleForm.confirmNewPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-button @click="changePassword">更改</el-button>
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
        callback(new Error("Please input the password"));
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
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "Old password is required!",
            trigger: "blur",
          },
        ],
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
                  message: "Password has been updated!",
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
                      message: "Password has been updated!",
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
                    message: "Token Expired. Please login again",
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
  font-family: "PingFang HK";
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
  font-family: "PingFang HK";
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

  font-family: "PingFang HK";
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
