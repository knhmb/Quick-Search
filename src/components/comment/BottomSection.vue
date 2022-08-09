<template>
  <div class="bottom-section">
    <base-card>
      <el-row>
        <el-col :sm="24" :md="24" :lg="17">
          <p>
            {{ $t("agreement_note") }}
            <span>{{ $t("trade") }}</span> {{ $t("and_agree") }}
            <span>{{ $t("terms_of_use") }}</span> {{ $t("and") }}
            <span>{{ $t("privacy_policy") }}</span
            >{{ $i18n.locale === "en-us" ? "." : "。" }}
          </p>
        </el-col>
        <el-col style="text-align: end" :sm="24" :md="24" :lg="7">
          <el-button class="cancel">{{ $t("cancel_button") }}</el-button>
          <el-button class="submit" @click="addReview">{{
            $t("leave_review_button")
          }}</el-button>
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
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
  },
  methods: {
    addReview() {
      if (!this.isLoggedIn) {
        ElNotification({
          title: "Error",
          message: this.$t("login_first"),
          type: "error",
        });
        return;
      }
      const data = {
        account: this.currentUserDetails.id,
        shop: this.singleItem.slug,
        content: this.description,
      };
      console.log(data);
      this.$store.dispatch("shop/postReview", data).then(() => {
        ElNotification({
          title: "success",
          message: this.$t("review_added"),
          type: "success",
        });
        this.$router.replace("/");
      });
      console.log(this.title, this.description);
      console.log(
        this.rateServe,
        this.rateSurroundings,
        this.rateArea,
        this.rateCost
      );
      console.log(this.review);
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
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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
  .bottom-section .el-button {
    padding: 0;
  }
}
</style>