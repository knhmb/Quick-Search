<template>
  <div class="shopping-cart">
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :sm="24" :md="8">
          <left-section></left-section>
        </el-col>
        <el-col :sm="24" :md="16">
          <right-section></right-section>
        </el-col>
      </el-row>
    </base-container>
    <!-- <div class="img-content" v-if="isChatwootAvailable">
      <img class="comment-img" src="../assets/vector.png" alt="" />
    </div> -->
  </div>
</template>

<script>
import TopSection from "../components/shopping-cart/TopSection.vue";
import LeftSection from "../components/shopping-cart/LeftSection.vue";
import RightSection from "../components/shopping-cart/RightSection.vue";
import { useChatWoot } from "@huntersofbook/chatwoot-vue";

export default {
  components: {
    TopSection,
    LeftSection,
    RightSection,
  },
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
    isChatwootAvailable() {
      return "chatwootWebsiteToken" in this.singleItem.item;
    },
  },
  created() {
    const { toggleBubbleVisibility } = useChatWoot();

    if (this.isChatwootAvailable) {
      toggleBubbleVisibility("show");
    }
  },
  unmounted() {
    const { toggleBubbleVisibility } = useChatWoot();
    toggleBubbleVisibility("hide");
  },
};
</script>

<style scoped>
.shopping-cart {
  background-color: #ddd;
  position: relative;
}

.shopping-cart .img-content {
  position: absolute;
  right: 2.5rem;
  top: 40rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  background: #fec135;
  border-radius: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shopping-cart img.comment-img {
  width: 1.3rem;
}

@media screen and (max-width: 767px) {
  .shopping-cart .img-content {
    top: 50%;
    transform: translateY(-50%);
    right: 1.5rem;
    display: none;
  }
}
</style>