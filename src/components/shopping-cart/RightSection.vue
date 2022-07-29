<template>
  <div class="right-section">
    <!-- <div class="box-card"> -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane :label="$t('reserve')" name="first">
        <first-tab></first-tab>
      </el-tab-pane>
      <el-tab-pane :label="$t('evaluation')" name="second">
        <second-tab></second-tab>
      </el-tab-pane>
      <el-tab-pane :label="$t('photo')" name="third">
        <third-tab></third-tab>
      </el-tab-pane>
    </el-tabs>
    <!-- </div> -->
  </div>
</template>

<script>
import FirstTab from "./FirstTab.vue";
import SecondTab from "./SecondTab.vue";
import ThirdTab from "./ThirdTab.vue";

export default {
  components: {
    FirstTab,
    SecondTab,
    ThirdTab,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
/* .right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
} */

.right-section :deep(.el-tabs .el-tabs__header) {
  background: #fff;
  border-radius: 8px 8px 0 0;
  margin: 0;
}

.right-section :deep(.el-tabs__nav-wrap) {
  display: flex;
  justify-content: center;
}

.right-section :deep(.el-tabs__active-bar) {
  background-color: #985f35;
  width: 2.5rem !important;
  border-radius: 8px 8px 0 0;
  height: 0.2rem;
}

.right-section :deep(.el-tabs__item.is-active) {
  color: #985f35;
}
</style>