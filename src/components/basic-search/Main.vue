<template>
  <div class="basic-search-main">
    <base-container>
      <h4>按類別瀏覽</h4>
      <p>個人護理 <span>(924)</span></p>
      <p>藥妝 <span>(924)</span></p>
      <p>化妝 <span>(924)</span></p>
      <p>保健食品 <span>(924)</span></p>
      <p>興趣 <span>(924)</span></p>
      <p>醫療 <span>(924)</span></p>
      <p>媽媽 <span>(924)</span></p>
      <Card />
    </base-container>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
};
</script>

<style scoped>
.basic-search-main {
  margin-top: 1rem;
}
.basic-search-main h4 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.basic-search-main p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #2d68ce;
  display: inline-block;
  margin-right: 2rem;
  position: relative;
}

.basic-search-main p:not(:last-of-type)::after {
  content: "";
  position: absolute;
  right: -1rem;
  background: #8d8d8d;
  width: 1px;
  height: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.basic-search-main p span {
  color: #8d8d8d;
}
</style>