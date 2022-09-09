<template>
  <div class="form">
    <base-card>
      <h5>{{ $t("fill_review") }}</h5>
      <el-row>
        <el-col :sm="12" :md="5">
          <label>{{ $t("review_title") }}</label>
        </el-col>
        <el-col :sm="24" :md="19">
          <el-input
            @input="handleChange"
            v-model="title"
            :placeholder="$t('review_title_placeholder')"
          ></el-input>
        </el-col>
        <el-col :sm="12" :md="5">
          <label>{{ $t("comment_content") }}</label>
        </el-col>
        <el-col :sm="24" :md="19">
          <el-input
            @input="handleChange"
            v-model="description"
            type="textarea"
            rows="12"
            :placeholder="$t('comment_content_placeholder')"
          ></el-input>
        </el-col>
        <el-col :sm="12" :md="5">
          <label>{{ $t("upload_photo") }}</label>
        </el-col>
        <el-col :sm="24" :md="19">
          <el-upload
            v-model:file-list="fileList"
            action="http://localhost:8080/api/v1/system/uploads"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleSuccess1"
            :on-progress="handlePending"
            :on-error="handleError"
            ref="uploadDocument"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <!-- <el-upload
            ref="uploadDocument"
            v-model:file-list="fileList"
            :on-remove="handleRemove"
            :on-change="handleSuccess"
            :on-success="handleSuccess1"
            :on-progress="handlePending"
            :on-error="handleError"
            action="http://localhost:8080/api/v1/system/uploads"
            list-type="picture-card"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>

            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload> -->
        </el-col>
      </el-row>
    </base-card>
  </div>
</template>

<script>
import { Plus } from "@element-plus/icons-vue";

export default {
  components: {
    // Delete,
    // Download,
    Plus,
    // ZoomIn,
  },
  data() {
    return {
      title: "",
      description: "",
      fileDocument: [],
      fileList: [],
    };
  },
  computed: {
    windowProtocol() {
      return window.location.protocol;
    },
    windowHostname() {
      return window.location.hostname;
    },
  },
  methods: {
    handleChange() {
      this.$emit("valuesChanged", {
        title: this.title,
        description: this.description,
        images: this.fileDocument,
      });
    },
    handleSuccess(file) {
      console.log(file);
      const arr = [];
      arr.push(file);

      arr.forEach((item) => {
        this.fileDocument.push({
          id: item.uid,
          image: item.url,
        });
      });
      // this.fileDocument.push({
      //   id: file.uid,
      //   image: file.url,
      // });
      this.handleChange();
      // console.log(this.fileDocument);
    },
    handleSuccess1(uploadFile) {
      console.log(uploadFile);
      const arr = [];
      arr.push(uploadFile.item);

      arr.forEach((item) => {
        this.fileDocument.push({
          id: item.id,
          image: item.name,
        });
      });
      console.log(this.fileDocument);
    },
    // handlePending(progress) {
    //   console.log(progress);
    // },
    handleError(error) {
      console.log(error);
    },
    handleRemove(file) {
      console.log(file);
      this.$store
        .dispatch("shop/removeImage", file.response.item.name)
        .then(() => {
          this.fileDocument = this.fileDocument.filter(
            (item) => item.id !== file.response.item.id
          );
          this.fileList = this.fileList.filter(
            (item) => item.id !== file.response.item.id
          );
          console.log(this.fileDocument);
          this.handleChange();
        });
      // console.log(this.fileList);
      // this.fileDocument = this.fileDocument.filter(
      //   (item) => item.id !== file.uid
      // );
      // this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
      // console.log(this.fileDocument);
      // this.handleChange();
    },
  },
  created() {
    console.log(this.windowHostname);
    console.log(this.windowProtocol);
  },
};
</script>

<style scoped>
.form h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
}

.form label {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.form .el-col {
  margin-bottom: 2rem;
}

.form :deep(.el-input .el-input__wrapper),
.form :deep(.el-textarea .el-textarea__inner) {
  background: #f5f4f0;
  border-radius: 8px;
}

.form :deep(.el-upload.el-upload--picture-card) {
  width: 6rem;
  height: 6rem;
}

@media screen and (max-width: 1199px) {
  .form {
    margin-bottom: 1rem;
  }

  .form .el-col {
    margin-bottom: 1rem;
  }
}
</style>