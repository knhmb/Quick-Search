<template>
  <div class="top-section">
    <base-container>
      <base-card>
        <h4>{{ $t("store_information") }}</h4>
        <el-row :gutter="15">
          <el-col :sm="12" :md="5">
            <img :src="singleItem.item.image" alt="" />
          </el-col>
          <el-col :sm="24" :md="19">
            <h5>{{ singleItem.item.name }}</h5>
            <div class="info">
              <p>{{ $t("phone_number") }}</p>
              <span>{{ singleItem.item.phoneno }}</span>
            </div>
            <div class="info">
              <p>{{ $t("email_address") }}</p>
              <span>{{ singleItem.item.email }}</span>
            </div>
            <div class="info">
              <p>{{ $t("shop_address") }}</p>
              <span>{{ singleItem.item.district }}</span>
              <span>{{ singleItem.item.address }}</span>
            </div>
          </el-col>
        </el-row>
      </base-card>
    </base-container>
  </div>
</template>

<script>
export default {
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
  },
};
</script>

<style scoped>
.top-section h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.top-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.top-section h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
}

.top-section p,
.top-section span {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
}

.top-section p {
  color: #7a4117;
  display: inline-block;
  margin-right: 1.5rem;
}

.top-section span {
  color: #393939;
  margin-right: 1rem;
}

.top-section .info {
  margin-bottom: 1rem;
}
</style>