<template>
  <section class="comment">
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :span="15">
          <Form />
        </el-col>
        <el-col :span="9">
          <Review />
        </el-col>
      </el-row>
    </base-container>
  </section>
</template>

<script>
import TopSection from "../components/comment/TopSection.vue";
import Form from "../components/comment/Form.vue";
import Review from "../components/comment/Review.vue";

export default {
  components: {
    TopSection,
    Form,
    Review,
  },
};
</script>

<style scoped>
.comment {
  background: #ddd;
}
</style>