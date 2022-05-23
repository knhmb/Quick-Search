<template>
  <section class="advanced-search">
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :span="7">
          <left-section></left-section>
        </el-col>
        <el-col :span="17">
          <right-section></right-section>
        </el-col>
      </el-row>
    </base-container>
  </section>
</template>

<script>
import TopSection from "../components/advanced-search/TopSection.vue";
import LeftSection from "../components/advanced-search/LeftSection.vue";
import RightSection from "../components/advanced-search/RightSection.vue";

export default {
  components: {
    TopSection,
    LeftSection,
    RightSection,
  },
};
</script>

<style scoped>
.advanced-search {
  background: #ddd;
}
</style>