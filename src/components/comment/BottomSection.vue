<template>
  <div class="bottom-section">
    <base-card>
      <el-row>
        <el-col :sm="24" :md="24" :lg="17">
          <p>
            按下「提交評價」，你確認遵守
            <span>〈商品說明條例〉</span
            >並同意<span>使用條款</span>及<span>私隱條例</span>。
          </p>
        </el-col>
        <el-col style="text-align: end" :sm="24" :md="24" :lg="7">
          <el-button class="cancel">取消</el-button>
          <el-button class="submit" @click="addReview">發表評價</el-button>
        </el-col>
      </el-row>
    </base-card>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  props: [
    "title",
    "description",
    "rateServe",
    "rateSurroundings",
    "rateArea",
    "rateCost",
    "review",
  ],
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
  },
  methods: {
    addReview() {
      if (!this.isLoggedIn) {
        ElNotification({
          title: "Error",
          message: "Please login first!",
          type: "error",
        });
        return;
      }
      const data = {
        account: this.currentUserDetails.username,
        shop: "test",
        content: "The test",
      };
      this.$store.dispatch("shop/postReview", data).then(() => {
        ElNotification({
          title: "success",
          message: "Review has been added!",
          type: "success",
        });
        this.$router.replace("/");
      });
      //   console.log(this.title, this.description);
      //   console.log(
      //     this.rateServe,
      //     this.rateSurroundings,
      //     this.rateArea,
      //     this.rateCost
      //   );
      //   console.log(this.review);
    },
  },
};
</script>

<style scoped>
.bottom-section {
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.bottom-section .el-row {
  align-items: center;
}

.bottom-section p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.bottom-section p span {
  color: #985f35;
}

.bottom-section .el-button {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
  background: transparent;
  border-color: #6f6f6f;
  width: 7rem;
  padding: 1.3rem;
  border-radius: 8px;
}

.bottom-section .el-button.submit {
  color: #fff;
  background: #985f35;
  border-color: #985f35;
}

@media screen and (max-width: 1199px) {
  .bottom-section .el-button {
    margin-top: 1rem;
  }
}
</style>