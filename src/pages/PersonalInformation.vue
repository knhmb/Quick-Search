<template>
  <section class="personal-information">
    <base-card>
      <h4>{{ $t("account_settings") }}</h4>
      <Form />
    </base-card>
  </section>
</template>

<script>
import Form from "../components/personal-information/Form.vue";

export default {
  components: {
    Form,
  },
};
</script>

<style scoped>
.personal-information h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 2rem;
}
</style>