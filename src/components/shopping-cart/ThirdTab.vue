<template>
  <div class="third-tab">
    <div class="box-card">
      <el-row :gutter="15">
        <template v-for="item in comments" :key="item">
          <el-col v-for="image in item.images" :key="image" :span="8">
            <!-- <img :src="../../assets/avatar.png" alt="" /> -->
            <img
              @click="
                imageDetail({
                  title: item.title,
                  content: item.content,
                  image: image,
                })
              "
              :src="`/api/v1/system/uploads/${image}`"
              alt=""
            />
          </el-col>
        </template>
        <!-- <el-col v-for="item in 18" :key="item" :span="8">
          <img
            @click="dialogVisible = true"
            :src="singleItem.item.image"
            alt=""
          />
        </el-col> -->
      </el-row>
    </div>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="comments.length + 0"
      pager-count="8"
    />
  </div>
  <image-dialog
    @closeDialog="dialogVisible = $event"
    :dialog-visible="dialogVisible"
    :title="title"
    :content="content"
    :image="image"
  ></image-dialog>
</template>

<script>
import ImageDialog from "./ImageDialog.vue";

export default {
  components: {
    ImageDialog,
  },
  data() {
    return {
      dialogVisible: false,
      title: "",
      content: "",
      image: null,
    };
  },
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
    comments() {
      return this.$store.getters["shop/comments"];
    },
  },
  methods: {
    imageDetail({ title, content, image }) {
      this.title = title;
      this.content = content;
      this.image = image;
      this.dialogVisible = true;
    },
  },
  created() {
    this.$store.dispatch("shop/getPhotos");
  },
};
</script>

<style scoped>
.right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
  padding: 1rem;
}

.third-tab .el-col {
  margin-bottom: 0.5rem;
}

.third-tab img {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  cursor: pointer;
}

.third-tab .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.third-tab :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.third-tab :deep(.el-pagination .btn-next),
.third-tab :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
}

.third-tab
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
}
</style>