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
          <el-form-item :label="$t('profile_picture')">
            <el-avatar
              :size="70"
              :src="
                currentUserDetails.avatar
                  ? currentUserDetails.avatar
                  : defaultAvatar
              "
            />
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="`${protocol}//${hostname}/api/v1/system/uploads`"
              :on-success="handleAvatarSuccess"
            >
              <el-button type="primary" class="replace">{{
                $t("replace")
              }}</el-button>
            </el-upload>
            <el-button @click="deleteProfile" class="delete">{{
              $t("delete")
            }}</el-button>
            <!-- <el-avatar :src="imgSrc" icon :size="100" shape="circle">
                  <img
                    class="image-avatar"
                    :src="currentUserDetails.avatar"
                    alt=""
                  />
                </el-avatar> -->
          </el-form-item>
        </el-col>
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
      defaultAvatar: require("../../assets/avatar-default-lg@2x.png"),
      fileList: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
    protocol() {
      return window.location.protocol;
    },
    hostname() {
      return window.location.hostname;
    },
  },
  methods: {
    handleAvatarSuccess(response, uploadFile) {
      console.log(response);
      this.sendAvatar(response.item.name);
      console.log(uploadFile);
    },
    sendAvatar(data) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store
            .dispatch("profile/updateUserAvatar", {
              avatar: `${this.protocol}//${this.hostname}/api/v1/system/uploads/${data}`,
              id: this.currentUserDetails.id,
            })
            .then(() => {
              this.$store
                .dispatch("profile/getUser", this.currentUserDetails.id)
                .then(() => {});
            });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store
                .dispatch("profile/updateUserAvatar", {
                  avatar: `${this.protocol}//${this.hostname}/api/v1/system/uploads/${data}`,
                  id: this.currentUserDetails.id,
                })
                .then(() => {
                  this.$store
                    .dispatch("profile/getUser", this.currentUserDetails.id)
                    .then(() => {});
                });
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: "Token Expired! Please Login Again.",
                type: "error",
              });
              this.$store.dispatch("auth/logout");
              this.$router.replace("/");
            });
        });
    },
    deleteProfile() {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store
            .dispatch("profile/updateUserAvatar", {
              avatar: "",
              id: this.currentUserDetails.id,
            })
            .then(() => {
              this.$store
                .dispatch("profile/getUser", this.currentUserDetails.id)
                .then(() => {});
            });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store
                .dispatch("profile/updateUserAvatar", {
                  avatar: "",
                  id: this.currentUserDetails.id,
                })
                .then(() => {
                  this.$store
                    .dispatch("profile/getUser", this.currentUserDetails.id)
                    .then(() => {});
                });
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: "Token Expired! Please Login Again.",
                type: "error",
              });
              this.$store.dispatch("auth/logout");
              this.$router.replace("/");
            });
        });
    },
    edit() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            id: this.currentUserDetails.id,
            username: this.ruleForm.username,
            // birth: this.ruleForm.dob ? this.ruleForm.dob.toISOString() : "",
            birth: this.ruleForm.dob,
            gender: this.ruleForm.gender,
            phoneno: this.ruleForm.phoneNumber,
            name: this.ruleForm.actualName,
            email: this.ruleForm.email,
          };
          Object.keys(data).forEach((key) => {
            if (
              data[key] === "" ||
              data[key] === undefined ||
              data[key] === null
            ) {
              delete data[key];
            }
          });
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

                this.$store
                  .dispatch("profile/getUser", this.currentUserDetails.id)
                  .then(() => {
                    console.log(this.currentUserDetails);
                    this.ruleForm.actualName = this.currentUserDetails.name;
                    this.ruleForm.phoneNumber = this.currentUserDetails.phoneno;
                    this.ruleForm.dob = this.currentUserDetails.birth;
                    this.ruleForm.gender = this.currentUserDetails.gender;
                  });
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

                    this.$store
                      .dispatch("profile/getUser", this.currentUserDetails.id)
                      .then(() => {
                        this.ruleForm.actualName = this.currentUserDetails.name;
                        this.ruleForm.phoneNumber =
                          this.currentUserDetails.phoneno;
                        this.ruleForm.dob = this.currentUserDetails.birth;
                        this.ruleForm.gender = this.currentUserDetails.gender;
                      });
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
    this.ruleForm.phoneNumber = this.currentUserDetails.phoneno;
    this.ruleForm.dob = this.currentUserDetails.birth;
    this.ruleForm.gender = this.currentUserDetails.gender;
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

.form .el-button.replace,
.form .el-button.delete {
  font-size: 14px;
  line-height: 20px;
  margin: 0 1rem;
  width: 5rem;
  padding: 1.2rem;
  border-color: #985f35;
}

.form .el-button.delete {
  background: #fff;
  color: #985f35;
  margin: 0;
}

.form :deep(.el-upload-list.el-upload-list--text) {
  display: none;
}

@media screen and (max-width: 991px) {
  .form .el-button {
    padding: 0;
  }
}
</style>