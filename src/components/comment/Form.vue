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
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <el-icon><Download /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-col>
      </el-row>
    </base-card>
  </div>
</template>

<script>
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

export default {
  components: {
    Delete,
    Download,
    Plus,
    ZoomIn,
  },
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    handleChange() {
      this.$emit("valuesChanged", {
        title: this.title,
        description: this.description,
      });
    },
  },
};
</script>

<style scoped>
.form h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
}

.form label {
  font-family: "PingFang HK";
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