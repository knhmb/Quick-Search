<template>
  <div class="box-card">
    <div class="second-tab">
      <div class="content" v-for="comment in comments" :key="comment.id">
        <el-row :gutter="10">
          <el-col :span="5">
            <img :src="comment.resources.account.avatar" alt="" />
          </el-col>
          <el-col :span="19">
            <h5>{{ comment.title }}</h5>
            <p>
              {{ comment.resources.account.username }} ．
              {{ formatDate(comment.createdAt) }}
            </p>
          </el-col>
          <el-col :span="20">
            <p v-if="comment.readActivated" class="description">
              {{ comment.content }}
            </p>
            <p v-if="!comment.readActivated" class="description">
              {{
                comment.content.length > 170
                  ? `${comment.content.slice(0, 170)}...`
                  : comment.content
              }}
            </p>
          </el-col>
          <el-col class="end" :sm="24" :md="4">
            <p @click="toggleComment(comment)" class="right">
              {{ !comment.isTextHidden ? $t("view_all") : $t("collapse") }}
            </p>
          </el-col>
        </el-row>

        <el-row class="img-row">
          <el-col v-for="item in comment.images" :key="item" :span="3">
            <img
              class="prod-img"
              :src="`/api/v1/system/uploads/${item}`"
              alt=""
            />
          </el-col>
        </el-row>
      </div>
      <!-- <div class="content" v-for="item in 6" :key="item">
        <el-row :gutter="10">
          <el-col :span="3">
            <img src="../../assets/avatar-sample01@2x.jpg" alt="" />
          </el-col>
          <el-col :span="21">
            <h5>訊息標題訊息標題訊息標題訊息標題訊息標題</h5>
            <p>username username ． 2022-10-10</p>
          </el-col>
          <el-col :span="20">
            <p class="description">
              家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着...
            </p>
          </el-col>
          <el-col class="end" :sm="24" :md="4">
            <p class="right">查看全部</p>
          </el-col>
        </el-row>

        <el-row class="img-row" justify="space-between">
          <el-col v-for="item in 7" :key="item" :span="3">
            <img class="prod-img" src="../../assets/avatar.png" alt="" />
          </el-col>
        </el-row>
      </div> -->
    </div>
  </div>
  <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="comments.length + 0"
    pager-count="8"
  />
</template>

<script>
import moment from "moment";
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      isTextHidden: true,
    };
  },
  watch: {
    activeName() {
      if (this.activeName === "second") {
        this.$store
          .dispatch("auth/checkAccessToken")
          .then(() => {
            this.$store.dispatch("shop/getComments", this.singleItem.item.slug);
          })
          .catch(() => {
            this.$store
              .dispatch("auth/checkRefreshToken")
              .then(() => {
                this.$store.dispatch(
                  "shop/getComments",
                  this.singleItem.item.slug
                );
              })
              .catch(() => {
                this.$store.commit("shop/SET_TAB_VALUE", "first");

                ElNotification({
                  title: "Error",
                  message: this.$t("token_expired"),
                  type: "error",
                });
                this.$store.dispatch("auth/logout");
              });
          });
      }
    },
  },
  computed: {
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
    comments() {
      return this.$store.getters["shop/comments"];
    },
    windowProtocol() {
      return window.location.protocol;
    },
    windowHostname() {
      return window.location.hostname;
    },
    activeName() {
      return this.$store.getters["shop/activeName"];
    },
  },
  methods: {
    formatDate(date) {
      return moment(new Date(date)).format("YYYY-MM-DD");
    },
    toggleComment(comment) {
      comment.isTextHidden = !comment.isTextHidden;
      comment.readActivated = !comment.readActivated;
    },
  },
  // created() {
  //   if (this.activeName === "second") {
  //     this.$store
  //       .dispatch("auth/checkAccessToken")
  //       .then(() => {
  //         this.$store.dispatch("shop/getComments", this.singleItem.item.slug);
  //       })
  //       .catch(() => {
  //         this.$store
  //           .dispatch("auth/checkRefreshToken")
  //           .then(() => {
  //             this.$store.dispatch(
  //               "shop/getComments",
  //               this.singleItem.item.slug
  //             );
  //           })
  //           .catch(() => {
  //             ElNotification({
  //               title: "Error",
  //               message: this.$t("token_expired"),
  //               type: "error",
  //             });
  //             this.$store.dispatch("auth/logout");
  //           });
  //       });
  //   }
  // },
};
</script>

<style scoped>
.right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
}
.second-tab .content {
  border-bottom: 1px solid #e6e6e6;
}

.second-tab .el-row {
  padding: 1rem;
}

.second-tab img {
  width: 100%;
  border-radius: 100%;
}

.second-tab .el-row.img-row {
  gap: 1rem;
}

.second-tab img.prod-img {
  border-radius: 8px;
  width: 100%;
  height: 5rem;
  object-fit: cover;
  /* height: 4rem; */
}

.second-tab h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 0.5rem;
}

.second-tab p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
}

.second-tab p.description {
  font-size: 14px;
  line-height: 20px;
  color: #393939;
  margin-top: 1rem;
  word-break: break-all;
}

.second-tab .el-col.end {
  display: flex;
}

.second-tab .el-col.end p {
  cursor: pointer;
}

.second-tab p.right {
  color: #7a4117;
  align-self: flex-end;
}

.box-card ~ .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.box-card ~ :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.box-card ~ :deep(.el-pagination .btn-next),
.box-card ~ :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
}

.box-card
  ~ :deep(
    .el-pagination.is-background .el-pager li:not(.is-disabled).is-active
  ) {
  background-color: #985f35;
}

@media screen and (max-width: 991px) {
  .second-tab p.right {
    margin-top: 1rem;
  }
}
</style>