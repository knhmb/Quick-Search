<template>
  <section class="home">
    <Slider />
  </section>
</template>

<script>
import Slider from "../components/home/Slider.vue";

export default {
  components: {
    Slider,
  },
};
</script>

<style scoped>
.home {
  background: #ddd;
}
</style>