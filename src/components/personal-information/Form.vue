<template>
  <div class="form">
    <el-form
      label-position="top"
      :rules="rules"
      :model="ruleForm"
      ref="ruleFormRef"
      hide-required-asterisk
    >
      <el-row :gutter="20">
        <el-col>
          <el-form-item :label="$t('account_name')" prop="username">
            <el-input disabled v-model="ruleForm.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('email_address')">
            <el-input v-model="ruleForm.email" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('actual_name')">
            <el-input v-model="ruleForm.actualName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item :label="$t('date_of_birth')">
            <el-date-picker
              type="date"
              v-model="ruleForm.dob"
              :placeholder="$t('date_of_birth_placeholder')"
              :suffix-icon="Calendar"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item :label="$t('phone_number')">
            <el-input
              v-model="ruleForm.phoneNumber"
              :placeholder="$t('phone_number_placeholder')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item :label="$t('gender')">
            <el-select
              :placeholder="$t('gender_placeholder')"
              v-model="ruleForm.gender"
            >
              <el-option value="male" label="Male"></el-option>
              <el-option value="female" label="Female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button @click="edit">{{ $t("store_button") }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { Calendar } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      Calendar,
      ruleForm: {
        username: "mvanhouten",
        email: "chantaiman@email.com",
        actualName: "陳大文",
        dob: "",
        phoneNumber: "",
        gender: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t("username_required"),
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
    edit() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            id: this.currentUserDetails.id,
            username: this.ruleForm.username,
            birth: this.ruleForm.dob ? this.ruleForm.dob.toISOString() : "",
            gender: this.ruleForm.gender,
            phoneno: this.ruleForm.phoneNumber,
            name: this.ruleForm.actualName,
          };
          console.log(data);
          this.$store
            .dispatch("auth/checkAccessToken")
            .then(() => {
              this.$store.dispatch("profile/updateUser", data).then(() => {
                ElNotification({
                  title: "Success",
                  message: this.$t("data_updated"),
                  type: "success",
                });
                this.$store.dispatch(
                  "profile/getUser",
                  this.currentUserDetails.id
                );
              });
            })
            .catch(() => {
              this.$store
                .dispatch("auth/checkRefreshToken")
                .then(() => {
                  this.$store.dispatch("profile/updateUser", data).then(() => {
                    ElNotification({
                      title: "Success",
                      message: this.$t("data_updated"),
                      type: "success",
                    });
                    this.$store.dispatch(
                      "profile/getUser",
                      this.currentUserDetails.id
                    );
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
  created() {
    this.ruleForm.username = this.currentUserDetails.username;
    this.ruleForm.email = this.currentUserDetails.email;
    this.ruleForm.actualName = this.currentUserDetails.name;
  },
};
</script>

<style scoped>
.form .el-select {
  width: 100%;
}

.form :deep(.el-form .el-input__wrapper) {
  background: #f5f4f0;
  border: 1px solid #ebeae6;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  width: 100%;
}

.form :deep(.el-form-item .el-form-item__label) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.form .el-button {
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

@media screen and (max-width: 991px) {
  .form .el-button {
    padding: 0;
  }
}
</style>