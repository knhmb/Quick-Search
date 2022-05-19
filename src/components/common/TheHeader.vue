<template>
  <header>
    <top-header></top-header>
    <middle-header></middle-header>
    <bottom-header></bottom-header>
  </header>
</template>

<script>
import TopHeader from "../header/TopHeader.vue";
import MiddleHeader from "../header/MiddleHeader.vue";
import BottomHeader from "../header/BottomHeader.vue";

export default {
  components: {
    TopHeader,
    MiddleHeader,
    BottomHeader,
  },
};
</script>