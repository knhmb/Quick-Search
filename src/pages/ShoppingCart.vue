<template>
  <div class="shopping-cart">
    <a
      aria-label="Chat on WhatsApp"
      :href="`https://wa.me/852${singleItem.item.phoneno}`"
      target="_blank"
    >
      <img class="whatsapp" src="../assets/1240341.png" alt="" />
    </a>

    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :sm="24" :lg="8">
          <left-section></left-section>
        </el-col>
        <el-col :sm="24" :lg="16">
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
    this.$store
      .dispatch("search/searchSingleShop", { slug: this.$route.params.id })
      .then(() => {
        this.$store.commit(
          "SET_SELECTED_MAIN_CATEGORY_SLUG",
          this.singleItem.resources.category.slug
        );

        this.$store.commit(
          "SET_CATEGORY",
          this.singleItem.resources.category.name
        );
        this.$store.commit("SET_CATEGORY_ID", this.singleItem.item.slug);
        this.$store.commit(
          "SET_SELECTED_SHOP_SLUG",
          this.singleItem.resources.category.slug
        );
      });

    // const { toggleBubbleVisibility } = useChatWoot();

    // if (this.isChatwootAvailable) {
    //   toggleBubbleVisibility("show");
    // }
  },
  unmounted() {
    const { toggleBubbleVisibility } = useChatWoot();
    toggleBubbleVisibility("hide");
    this.$store.commit("shop/SET_TAB_VALUE", "first");
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

.shopping-cart img.whatsapp {
  width: 3rem;
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100%;
  cursor: pointer;
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