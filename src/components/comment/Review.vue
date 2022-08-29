<template>
  <div class="review">
    <base-card>
      <h4>{{ $t("satisfaction_score") }}</h4>
      <el-row>
        <el-col :span="8">
          <p>{{ $t("item_scoring") }}</p>
        </el-col>
        <el-col :span="16">
          <div class="faded">
            <p class="grey">{{ $t("lowest_score") }}</p>
            <p class="grey">{{ $t("highest_score") }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <p>{{ $t("serve") }}</p>
        </el-col>
        <el-col :span="16">
          <el-rate @change="handleChange" v-model="rateServe"></el-rate>
        </el-col>
        <el-col :span="8">
          <p>{{ $t("surroundings") }}</p>
        </el-col>
        <el-col :span="16">
          <el-rate @change="handleChange" v-model="rateSurroundings"></el-rate>
        </el-col>
        <el-col :span="8">
          <p>{{ $t("area") }}</p>
        </el-col>
        <el-col :span="16">
          <el-rate @change="handleChange" v-model="rateArea"></el-rate>
        </el-col>
        <el-col :span="8">
          <p>{{ $t("cost_effective") }}</p>
        </el-col>
        <el-col :span="16">
          <el-rate @change="handleChange" v-model="rateCost"></el-rate>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <h5>{{ $t("overall_rating") }}</h5>
        </el-col>
        <el-col :span="8">
          <div class="review-content">
            <img
              @click="selectReview('excellent')"
              @mouseover="hover('excellent')"
              @mouseleave="unHover('excellent')"
              :src="ratingExcellent"
              alt=""
            />
            <p class="review-comment">{{ $t("like") }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="review-content">
            <img
              @click="selectReview('good')"
              @mouseover="hover('good')"
              @mouseleave="unHover('good')"
              :src="ratingGood"
              alt=""
            />
            <p class="review-comment">{{ $t("ok") }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="review-content">
            <img
              @click="selectReview('dislike')"
              @mouseover="hover('dislike')"
              @mouseleave="unHover('dislike')"
              :src="ratingDislike"
              alt=""
            />
            <p class="review-comment">{{ $t("do_not_like") }}</p>
          </div>
        </el-col>
      </el-row>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rateServe: 0,
      rateSurroundings: 0,
      rateArea: 0,
      rateCost: 0,
      selected: null,
      ratingExcellent: require("../../assets/rating-excellent-large-off@2x.png"),
      ratingGood: require("../../assets/rating-good-large-off@2x.png"),
      ratingDislike: require("../../assets/rating-dislike-large-off@2x.png"),
    };
  },
  methods: {
    handleChange() {
      const data = {
        rateServe: this.rateServe,
        rateSurroundings: this.rateSurroundings,
        rateArea: this.rateArea,
        rateCost: this.rateCost,
      };
      this.$emit("valuesChanged", data);
    },
    hover(option) {
      if (option === "excellent") {
        this.ratingExcellent = require("../../assets/rating-excellent-large-on@2x.png");
      } else if (option === "good") {
        this.ratingGood = require("../../assets/rating-good-large-on@2x.png");
      } else if (option === "dislike") {
        this.ratingDislike = require("../../assets/rating-dislike-large-on@2x.png");
      }
    },
    unHover(option) {
      if (option === "excellent" && this.selected !== 5) {
        this.ratingExcellent = require("../../assets/rating-excellent-large-off@2x.png");
      } else if (option === "good" && this.selected !== 3) {
        this.ratingGood = require("../../assets/rating-good-large-off@2x.png");
      } else if (option === "dislike" && this.selected !== 1) {
        this.ratingDislike = require("../../assets/rating-dislike-large-off@2x.png");
      }
    },
    selectReview(option) {
      if (option === "good") {
        // this.selected = "good";
        this.selected = 3;
        this.ratingGood = require("../../assets/rating-good-large-on@2x.png");
        this.ratingExcellent = require("../../assets/rating-excellent-large-off@2x.png");
        this.ratingDislike = require("../../assets/rating-dislike-large-off@2x.png");
        this.$emit("reviewSelected", this.selected);
      } else if (option === "excellent") {
        // this.selected = "excellent";
        this.selected = 5;
        this.ratingGood = require("../../assets/rating-good-large-off@2x.png");
        this.ratingExcellent = require("../../assets/rating-excellent-large-on@2x.png");
        this.ratingDislike = require("../../assets/rating-dislike-large-off@2x.png");
        this.$emit("reviewSelected", this.selected);
      } else if (option === "dislike") {
        // this.selected = "dislike";
        this.selected = 1;
        this.ratingGood = require("../../assets/rating-good-large-off@2x.png");
        this.ratingExcellent = require("../../assets/rating-excellent-large-off@2x.png");
        this.ratingDislike = require("../../assets/rating-dislike-large-on@2x.png");
        this.$emit("reviewSelected", this.selected);
      }
    },
  },
};
</script>

<style scoped>
.review h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.review .el-row:first-of-type {
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

.review .el-row:nth-of-type(2) .el-col.el-col-8 {
  margin-bottom: 6rem;
}

.review p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
}

.review p.grey {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #a8a8a8;
}

.review .faded {
  display: flex;
  justify-content: space-between;
}

.review .el-col {
  margin-bottom: 1rem;
}

.review :deep(.el-icon.el-rate__icon) {
  background-color: #c6c6c6;
  border-radius: 100%;
  color: #e6e6e6;
  margin-right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.review :deep(.el-icon.el-rate__icon.is-active) {
  color: #fff;
  background-color: #f9c021;
}

.review h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.review .review-content {
  text-align: center;
}

.review p.review-comment {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #a8a8a8;
}

.review img {
  width: 4rem;
  cursor: pointer;
}
</style>