<template>
  <div class="register-form">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-row>
        <el-col>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :placeholder="$t('account_name')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="email">
            <el-input
              v-model="ruleForm.email"
              :placeholder="$t('email_address')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              :placeholder="$t('actual_name')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="password">
            <el-input
              type="password"
              show-password
              :placeholder="$t('password')"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="confirmPassword">
            <el-input
              type="password"
              show-password
              :placeholder="$t('confirm_new_password')"
              v-model="ruleForm.confirmPassword"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button @click="signup">{{ $t("register") }}</el-button>
        </el-col>
        <el-col>
          <p class="policy">
            {{ $t("privacy_policy_note") }}
            <span>{{ $t("privacy_policy") }}</span>
            {{ $t("and") }}
            <span>{{ $t("terms_of_use") }}</span>
          </p>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div class="have-account">
      <p>已有 <span>Quick Search</span> 帳號？</p>
      <el-button @click="login">登入</el-button>
    </div> -->
  </div>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_password")));
      } else {
        if (this.ruleForm.confirmPassword !== "") {
          if (!this.$refs.ruleFormRef) return;
          this.$refs.ruleFormRef.validateField("confirmPassword", () => null);
        }
        callback();
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_password_again")));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t("password_does_not_match")));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t("username_required"),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.$t("email_required"),
            trigger: "blur",
            type: "email",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("name_required"),
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    signup() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            password2: this.ruleForm.confirmPassword,
          };
          console.log(data);
          this.$store.dispatch("auth/register", data).then(() => {
            ElNotification({
              title: "Success",
              message: this.$t("registered_successfully"),
              type: "success",
            });
            this.$refs.ruleFormRef.resetFields();
            this.$emit("dialogClosed", false);
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.register-form .el-form {
  padding: 0 20px;
  margin-top: 1rem;
}

.register-form .el-row {
  align-items: center;
}

.register-form :deep(.el-input__wrapper) {
  background: #f5f4f0;
  border-radius: 8px;
  padding: 0.3rem 1rem;
}

.register-form p,
.register-form .have-account p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.register-form p span {
  color: #985f35;
}

.register-form .el-button {
  background: linear-gradient(
      268.49deg,
      rgba(255, 136, 51, 0.4) 0%,
      rgba(255, 136, 51, 0) 100%
    ),
    #7a4117;
  border-color: linear-gradient(
      268.49deg,
      rgba(255, 136, 51, 0.4) 0%,
      rgba(255, 136, 51, 0) 100%
    ),
    #7a4117;
  border-radius: 8px;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: 100%;
  padding: 1.4rem;
  margin: 1rem 0;
}

@media screen and (max-width: 991px) {
  .register-form .el-button {
    padding: 0;
  }
}

/* .register-form .have-account {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: #f5f4f0;
  border-radius: 0px 0px 16px 16px;
  margin-top: 2rem;
  padding: 0 20px 10px 20px;
}

.register-form .have-account .el-button {
  font-family: Noto Sans TC, PingFang, Helvetica , Arial, sans-serif, serif;
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
} */
</style>