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
          <el-form-item label="帳號名稱" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="電郵地址">
            <el-input v-model="ruleForm.email" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="真實姓名">
            <el-input v-model="ruleForm.actualName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="出生日期">
            <el-input
              v-model="ruleForm.dob"
              placeholder="選擇出生日期"
              :suffix-icon="Calendar"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="電話號碼">
            <el-input
              v-model="ruleForm.phoneNumber"
              placeholder="輸入電話號碼"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="性別">
            <el-select
              placeholder="選擇性別"
              v-model="ruleForm.gender"
            ></el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button @click="edit">儲存</el-button>
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
            message: "Username is required!",
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
          };
          this.$store
            .dispatch("auth/checkAccessToken")
            .then(() => {
              this.$store.dispatch("profile/updateUser", data).then(() => {
                ElNotification({
                  title: "Success",
                  message: "Data has been updated!",
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
                      message: "Data has been updated!",
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
                    message: "Token Expired. Please login again",
                    type: "error",
                  });
                  this.$store.dispatch("auth/logout");
                });
            });
          // this.$store.dispatch("profile/updateUser", data).then(() => {
          //   ElNotification({
          //     title: 'Success',
          //     message: 'Data has been updated!',
          //     type: 'success'
          //   })
          //   this.$store.dispatch('profile/getUser', this.currentUserDetails.id)
          // })
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
  font-family: "PingFang HK";
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