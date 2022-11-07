<template>
  <section class="notification">
    <base-card>
      <h4>{{ $t("message_management") }}</h4>
      <el-row>
        <el-col v-for="item in profileMessages" :key="item">
          <div class="card">
            <div class="header">
              <div class="avatar">
                <div class="pill"></div>
                <img :src="item.resources.account.avatar" alt="" />
              </div>
              <div class="text">
                <p class="name">{{ item.title }}</p>
                <p>{{ item.shop }} - {{ filterDate(item.createdAt) }}</p>
              </div>
            </div>
            <div class="main">
              <el-row>
                <el-col :span="21">
                  <div class="paragraphs">
                    <p>
                      {{ item.content }}
                    </p>
                  </div>
                </el-col>
                <el-col style="display: flex" :span="3">
                  <p class="brown">{{ $t("put_away") }}</p>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <!-- <el-col>
          <div class="card">
            <div class="header">
              <div class="avatar">
                <div class="pill"></div>
              </div>
              <div class="text">
                <p class="name">訊息標題訊息標題訊息標題訊息標題訊息標題</p>
                <p>來自 Quick search 的訊息 ． 2022-10-10</p>
              </div>
            </div>
            <div class="main">
              <el-row>
                <el-col :span="21">
                  <div class="paragraphs">
                    <p>
                      家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
                    </p>

                    <p>
                      家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
                    </p>

                    <p>
                      家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
                    </p>
                  </div>
                </el-col>
                <el-col style="display: flex" :span="3">
                  <p class="brown">{{ $t("put_away") }}</p>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col> -->
        <!-- <el-col v-for="item in 7" :key="item">
          <div class="card">
            <div class="header">
              <div class="avatar">
                <div class="pill"></div>
              </div>
              <div class="text">
                <p class="name">訊息標題訊息標題訊息標題訊息標題訊息標題</p>
                <p>來自 Quick search 的訊息 ． 2022-10-10</p>
              </div>
            </div>
            <div class="main">
              <el-row>
                <el-col :span="21">
                  <div class="paragraphs">
                    <p>
                      家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快...
                    </p>
                  </div>
                </el-col>
                <el-col style="display: flex" :span="3">
                  <p class="brown">{{ $t("put_away") }}</p>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col> -->
      </el-row>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="profileMessages.length"
        pager-count="8"
      />
    </base-card>
  </section>
</template>

<script>
import { ElNotification } from "element-plus";
import moment from "moment";

export default {
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.getComments();
      },
    },
  },
  computed: {
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
    profileMessages() {
      return this.$store.getters["profile/profileMessages"];
    },
  },
  methods: {
    filterDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    getComments() {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store.dispatch(
            "profile/getComments",
            this.currentUserDetails.id
          );
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store.dispatch(
                "profile/getComments",
                this.currentUserDetails.id
              );
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
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style scoped>
.notification .el-col {
  margin-bottom: 1rem;
}

.notification h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.notification .card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}

.notification .card .avatar {
  /* background: #985f35; */
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  position: relative;
}

.notification .card .avatar .pill {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: #fe4f53;
  border: 2px solid #ffffff;
  border-radius: 100%;
  right: 0;
  top: 0;
}

.notification .card .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.notification .card p.name {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  display: inline-block;
  margin-bottom: 0.3rem;
}

.notification .card p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
  margin-left: 0.5rem;
}

.notification .card .header {
  display: flex;
}

.notification .card .main {
  /* display: flex; */
}

.notification .main .paragraphs p,
.notification .main p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 1rem;
  /* width: 110%; */
}

.notification .main .paragraphs p {
  text-align: start;
  word-break: break-all;
}

.notification .main p {
  color: #7a4117;
  text-align: end;
  margin: 0;
  align-self: flex-end;
  width: 100%;
}

.notification .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  /* margin-bottom: 3rem; */
}

.notification
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.notification :deep(.el-pagination .btn-next),
.notification :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.notification
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
  border-color: #985f35;
}

@media screen and (max-width: 500px) {
  .notification .card .header {
    flex-direction: column;
    align-items: center;
  }

  .notification .card .header .avatar {
    margin-bottom: 1rem;
  }

  .notification .card .header .text {
    align-self: flex-start;
  }
}
</style>