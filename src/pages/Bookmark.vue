<template>
  <section class="bookmark">
    <base-card>
      <h4>{{ $t("my_collection") }}</h4>
      <el-row :gutter="15">
        <el-col v-for="item in favorites" :key="item" :sm="12" :md="8">
          <div class="card">
            <img :src="item.resources.shop.image" alt="" />
            <!-- <img src="../assets/shop-sample01@2x.jpg" alt="" /> -->
            <div class="content">
              <p class="name">
                {{ item.resources.shop.name }}
              </p>
              <p>{{ item.resources.shop.description }}</p>
              <div @click="removeFavorite(item.id)" class="bookmark-action">
                <img src="../assets/shop-profile-bookmark-on@2x.png" alt="" />
                <p>{{ $t("remove_favorite_button") }}</p>
              </div>
            </div>
          </div>
        </el-col>
        <!-- <el-col v-for="item in favorites" :key="item" :sm="12" :md="8">
          <div class="card">
            <img src="../assets/shop-sample01@2x.jpg" alt="" />
            <div class="content">
              <p class="name">
                店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱
              </p>
              <p>
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
              </p>
              <div class="bookmark-action">
                <img src="../assets/shop-profile-bookmark-on@2x.png" alt="" />
                <p>{{ $t("remove_favorite_button") }}</p>
              </div>
            </div>
          </div>
        </el-col> -->
      </el-row>
    </base-card>
  </section>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  computed: {
    favorites() {
      return this.$store.getters["auth/favorites"];
    },
  },
  methods: {
    removeFavorite(id) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store.dispatch("auth/removeFavorite", id).then(() => {
            this.$store.dispatch("auth/getFavorites");
          });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store.dispatch("auth/removeFavorite", id).then(() => {
                this.$store.dispatch("auth/getFavorites");
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
    },
  },
  created() {
    this.$store
      .dispatch("auth/checkAccessToken")
      .then(() => {
        this.$store.dispatch("auth/getFavorites");
      })
      .catch(() => {
        this.$store
          .dispatch("auth/checkRefreshToken")
          .then(() => {
            this.$store.dispatch("auth/getFavorites");
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
};
</script>

<style scoped>
.bookmark h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 2rem;
}

.bookmark .card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  position: relative;
  margin-bottom: 0.7rem;
}

.bookmark .card::after {
  content: "";
  position: absolute;
  background: #e0e0e0;
  bottom: 2.7rem;
  left: 0;
  width: 100%;
  height: 1px;
}

.bookmark img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.bookmark .content {
  padding: 0.5rem;
}

.bookmark p.name {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.bookmark p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
}

.bookmark .bookmark-action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  cursor: pointer;
}

.bookmark .bookmark-action img {
  width: 1.7rem;
}

.bookmark .bookmark-action p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #7a4117;
  margin-left: 0.3rem;
}
</style>