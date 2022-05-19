<template>
  <header>
    <top-header></top-header>
    <middle-header></middle-header>
  </header>
</template>

<script>
import TopHeader from "../header/TopHeader.vue";
import MiddleHeader from "../header/MiddleHeader.vue";

export default {
  components: {
    TopHeader,
    MiddleHeader,
  },
};
</script>