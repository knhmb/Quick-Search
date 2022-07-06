<template>
  <section class="comment">
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :sm="24" :lg="15">
          <Form @valuesChanged="setValues" />
        </el-col>
        <el-col :sm="24" :lg="9">
          <Review
            @reviewSelected="setReview"
            @valuesChanged="setReviewValues"
          />
        </el-col>
        <el-col>
          <bottom-section
            :title="title"
            :description="description"
            :rate-serve="rateServe"
            :rate-surroundings="rateSurroundings"
            :rate-area="rateArea"
            :rate-cost="rateCost"
            :review="review"
          ></bottom-section>
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
  data() {
    return {
      title: "",
      description: "",
      rateServe: 0,
      rateSurroundings: 0,
      rateArea: 0,
      rateCost: 0,
      review: "",
    };
  },
  methods: {
    setValues({ title, description }) {
      this.title = title;
      this.description = description;
      console.log(this.title, this.description);
    },
    setReviewValues(data) {
      this.rateServe = data.rateServe;
      this.rateSurroundings = data.rateSurroundings;
      this.rateArea = data.rateArea;
      this.rateCost = data.rateCost;
    },
    setReview(option) {
      this.review = option;
    },
  },
  // computed: {
  //   isLoggedIn() {
  //     return this.$store.getters['auth/isLoggedIn']
  //   }
  // },
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

@media screen and (max-width: 767px) {
  .comment .img-content {
    display: none;
  }
}
</style>