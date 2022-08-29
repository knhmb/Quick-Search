<template>
  <section class="terms-of-use">
    <base-container>
      <template v-for="item in footerContent" :key="item">
        <div
          v-if="item.slug === 'cms-page-terms-of-use'"
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
.terms-of-use {
  background: #ddd;
  padding: 1.5rem 0;
  height: 100vh;
}

.terms-of-use h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.terms-of-use p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}
</style>