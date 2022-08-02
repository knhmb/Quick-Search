<template>
  <div class="right-section">
    <base-card>
      <el-row>
        <el-col :sm="24" :md="12">
          <p>{{ $t("turn_up") }} <span>924</span> {{ $t("search_results") }}</p>
        </el-col>
        <el-col class="input-select" :sm="24" :md="12">
          <span>{{ $t("sort_by") }} :</span>
          <el-select :placeholder="$t('sort_by_placeholder')">
            <el-option />
          </el-select>
        </el-col>
      </el-row>
    </base-card>
    <el-row :gutter="15">
      <el-col v-for="item in searchItems" :key="item" :sm="12" :md="8">
        <div class="card" @click="selectShop(item.slug)">
          <img src="../../assets/shop-sample01@2x.jpg" alt="" />
          <div class="content">
            <h5>{{ item.name }}</h5>
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
      </el-col>
      <el-col>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="80"
          pager-count="8"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  computed: {
    searchItems() {
      return this.$store.getters["search/searchItems"];
    },
  },
  methods: {
    selectShop(slug) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store
            .dispatch("search/searchSingleShop", { slug: slug })
            .then(() => {
              this.$router.push({ path: "/shop", query: { q: slug } });
            });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store
                .dispatch("search/searchSingleShop", { slug: slug })
                .then(() => {
                  this.$router.push({ path: "/shop", query: { q: slug } });
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
    console.log(this.searchItems);
  },
};
</script>

<style scoped>
.right-section .el-row {
  align-items: center;
}

.right-section p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.right-section p span {
  color: #7a4117;
  font-weight: 500;
}
.right-section span {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.right-section .el-select {
  width: 50%;
  margin-left: 0.5rem;
}

.right-section .card {
  background-color: #fff;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
}

.right-section .card img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.right-section .card .content {
  padding: 0.5rem;
}

.right-section .card .content h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 0.5rem;
}

.right-section .card .content p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
}

.right-section .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.right-section
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.right-section :deep(.el-pagination .btn-next),
.right-section :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
}

.right-section
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
}

.right-section .input-select {
  text-align: right;
}

@media screen and (max-width: 767px) {
  .right-section .input-select {
    margin-top: 1rem;
  }
}
</style>