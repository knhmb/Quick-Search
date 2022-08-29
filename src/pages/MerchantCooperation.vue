<template>
  <section class="merchant-cooperation">
    <base-container>
      <template v-for="item in footerContent" :key="item">
        <div
          v-if="item.slug === 'cms-page-merchant-cooperation'"
          v-html="item.content"
        ></div>
      </template>
    </base-container>
  </section>
</template>

<script>
export default {
  computed: {
    footerContent() {
      return this.$store.getters["dashboard/footerContent"];
    },
  },
};
</script>

<style scoped>
.merchant-cooperation {
  background: #ddd;
  padding: 1.5rem 0;
  height: 100vh;
}

.merchant-cooperation h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.merchant-cooperation p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}
</style>