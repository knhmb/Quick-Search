<template>
  <div class="right-section">
    <div class="box-card">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="預約" name="first">
          <first-tab></first-tab>
        </el-tab-pane>
        <el-tab-pane label="評價" name="second">Config</el-tab-pane>
        <el-tab-pane label="相片" name="third">Role</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import FirstTab from "./FirstTab.vue";

export default {
  components: {
    FirstTab,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
.right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 8px;
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