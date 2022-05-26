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
        <el-col>
          <bottom-section></bottom-section>
        </el-col>
      </el-row>
    </base-container>
    <div class="img-content">
      <img class="comment-img" src="../assets/vector.png" alt="" />
    </div>
  </section>
</template>

<script>
import TopSection from "../components/comment/TopSection.vue";
import Form from "../components/comment/Form.vue";
import Review from "../components/comment/Review.vue";
import BottomSection from "../components/comment/BottomSection.vue";

export default {
  components: {
    TopSection,
    Form,
    Review,
    BottomSection,
  },
};
</script>

<style scoped>
.comment {
  background: #ddd;
  position: relative;
}

.comment .img-content {
  position: absolute;
  right: 2.5rem;
  bottom: 18rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  background: #fec135;
  border-radius: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comment img.comment-img {
  width: 1.3rem;
}
</style>