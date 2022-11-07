<template>
  <div class="top-section">
    <div class="main-section">
      <base-container>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item class="first">{{
            $t("home")
          }}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item class="first">{{
            singleItem.category
          }}</el-breadcrumb-item> -->
          <!-- <el-breadcrumb-item class="first">{{
            $t("personal_care")
          }}</el-breadcrumb-item> -->
          <el-breadcrumb-item class="first">{{ category }}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item class="first">{{
            $t("hair_salon")
          }}</el-breadcrumb-item> -->
          <el-breadcrumb-item>{{ singleItem.item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="15">
          <el-col :sm="12" :md="4">
            <!-- <img class="product-img" src="../../assets/avatar.png" alt="" /> -->
            <img class="product-img" :src="singleItem.item.image" alt="" />
          </el-col>
          <el-col :sm="24" :md="13">
            <h5>{{ singleItem.item.name }}</h5>
            <el-rate
              show-score
              disabled
              :model-value="singleItem.resources.score.average"
            />
            <img
              class="arrow-down"
              src="../../assets/arrowhead-down@2x.png"
              alt=""
            />
            <p>{{ singleItem.item.district }} ． $120-320 ． {{ category }}</p>
          </el-col>
          <el-col style="text-align: end" :sm="12" :md="7">
            <div class="social-content">
              <div class="social-media-share" v-if="isSocialOpen">
                <p>{{ $t("share_to") }}</p>
                <div class="media-icons">
                  <ShareNetwork
                    network="facebook"
                    :url="href"
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    quote="The hot reload is so fast it\'s near instant. - Evan You"
                    hashtags="vuejs,vite"
                  >
                    <img
                      src="../../assets/share-social-media-facebook.png"
                      alt=""
                    />
                  </ShareNetwork>
                  <img
                    src="../../assets/share-social-media-instagram.png"
                    alt=""
                  />
                </div>
              </div>
              <img
                @click="$router.push('/comment')"
                class="shop-profile-icon"
                src="../../assets/shop-profile-comment@2x.png"
                alt=""
              />
              <img
                @click="isSocialOpen = !isSocialOpen"
                class="shop-profile-icon"
                src="../../assets/shop-profile-share@2x.png"
                alt=""
              />
              <img
                @click="checkAccessToken"
                class="shop-profile-icon"
                src="../../assets/shop-profile-bookmark@2x.png"
                alt=""
              />
            </div>
          </el-col>
        </el-row>
      </base-container>
    </div>

    <div class="reviews">
      <base-container>
        <div class="rating">
          <img class="good-rating" src="../../assets/rating-ok@2x.png" alt="" />
          <span>{{ singleItem.resources.count.overall5 }}</span>
        </div>
        <div class="rating">
          <img
            class="good-rating"
            src="../../assets/rating-good@2x.png"
            alt=""
          />
          <span>{{ singleItem.resources.count.overall3 }}</span>
        </div>
        <div class="rating">
          <img
            class="good-rating"
            src="../../assets/rating-bad@2x.png"
            alt=""
          />
          <span>{{ singleItem.resources.count.overall1 }}</span>
        </div>
      </base-container>
    </div>
  </div>
</template>

<script>
import { ArrowRight } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      ArrowRight,
      isSocialOpen: false,
    };
  },
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
    category() {
      return this.$store.getters.category;
    },
  },
  methods: {
    bookmark() {
      console.log(this.singleItem);
      console.log(this.currentUserDetails);
      const data = {
        account: this.currentUserDetails.id,
        resource: "shop",
        resourceRef: this.singleItem.item.slug,
      };
      console.log(data);
      this.$store.dispatch("auth/addToFavorites", data).then(() => {
        ElNotification({
          title: "Success",
          message: this.$t("added_to_favorites"),
          type: "success",
        });
      });
    },
    checkAccessToken() {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.bookmark();
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.bookmark();
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: this.$t("token_expired"),
                type: "error",
              });
            });
        });
    },
  },
  created() {
    console.log(this.singleItem);
  },
};
</script>

<style scoped>
.top-section {
  background: rgba(239, 223, 200, 0.6);
  backdrop-filter: blur(200px);
}

.top-section .el-row {
  align-items: center;
}

.top-section .main-section {
  margin-bottom: -4rem;
}

.top-section .el-breadcrumb {
  margin-bottom: 1rem;
}

.top-section :deep(.el-breadcrumb__inner) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.top-section :deep(.el-breadcrumb__item.first .el-breadcrumb__inner) {
  color: #7a4117;
}

.top-section img.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.top-section img.arrow-down {
  width: 1.2rem;
}

.top-section img.good-rating {
  width: 2rem;
}

.top-section img.shop-profile-icon {
  width: 2rem;
  background-color: #985f35;
  border-radius: 100%;
  padding: 0.2rem;
  cursor: pointer;
}

.top-section img.shop-profile-icon:not(:last-of-type) {
  margin-right: 1rem;
}

.top-section h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.top-section .el-rate {
  margin: 0.2rem 0;
}

.top-section :deep(.el-icon.el-rate__icon) {
  background-color: #c6c6c6;
  border-radius: 100%;
  color: #e6e6e6;
}

.top-section :deep(.el-icon.el-rate__icon.is-active) {
  color: #fff;
  background-color: #f9c021;
}

.top-section p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 3rem;
}

.top-section .reviews {
  background-color: #fff;
  padding-left: 28%;
}

.top-section .reviews .container {
  display: flex;
  padding: 1rem 0;
}

.top-section .reviews .container .rating {
  display: flex;
  align-items: center;
}

.top-section .reviews .container .rating span {
  margin-left: 0.5rem;
  margin-right: 2rem;
}

.top-section .social-media-share {
  background: #ffffff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: -5.5rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 7rem;
}

.top-section .social-media-share p {
  text-align: start;
  margin: 0;
  margin-bottom: 1rem;
}

.top-section .social-media-share .media-icons {
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  width: 100%;
}

.top-section .social-media-share .media-icons .share-network-facebook {
  margin-right: 1rem;
}

.top-section .social-media-share .media-icons img {
  width: 2rem;
  cursor: pointer;
}

.top-section .social-content {
  position: relative;
  width: fit-content;
  margin-left: auto;
}

@media screen and (max-width: 991px) {
  .top-section .reviews {
    padding-left: 2rem;
    margin-top: 4rem;
  }
}
</style>