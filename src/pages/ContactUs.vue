<template>
  <section class="contact-us">
    <base-container>
      <template v-for="item in footerContent" :key="item">
        <div
          v-if="item.slug === 'cms-page-contact-us'"
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
.contact-us {
  background: #ddd;
  padding: 1.5rem 0;
  height: 100vh;
}

.contact-us h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.contact-us p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}
</style>