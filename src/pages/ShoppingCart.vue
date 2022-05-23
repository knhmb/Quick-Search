<template>
  <div class="shopping-cart">
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :span="8">
          <left-section></left-section>
        </el-col>
        <el-col :span="16">
          <right-section></right-section>
        </el-col>
      </el-row>
    </base-container>
  </div>
</template>

<script>
import TopSection from "../components/shopping-cart/TopSection.vue";
import LeftSection from "../components/shopping-cart/LeftSection.vue";
import RightSection from "../components/shopping-cart/RightSection.vue";

export default {
  components: {
    TopSection,
    LeftSection,
    RightSection,
  },
};
</script>

<style scoped>
.shopping-cart {
  background-color: #ddd;
}
</style>