<template>
  <div class="image-dialog">
    <el-dialog
      @close="$emit('closeDialog', false)"
      :model-value="dialogVisible"
      title="Tips"
      width="30%"
    >
      <el-row>
        <el-col :xs="24" :sm="15">
          <img :src="singleItem.image" alt="" />
        </el-col>
        <el-col :xs="24" :sm="9">
          <h5>{{ singleItem.name }}</h5>
          <p>{{ singleItem.description }}</p>
        </el-col>
      </el-row>
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('closeDialog', false)">Cancel</el-button>
          <el-button type="primary" @click="$emit('closeDialog', false)"
            >Confirm</el-button
          >
        </span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
  },
};
</script>

<style scoped>
.image-dialog :deep(.el-dialog) {
  width: 50%;
  border-radius: 8px;
}

.image-dialog :deep(.el-dialog .el-dialog__header) {
  display: none;
}

.image-dialog :deep(.el-dialog .el-dialog__body) {
  padding: 0;
}
.image-dialog img {
  width: 100%;
  height: 100%;
  border-radius: 8px 0 0 8px;
}

.image-dialog .el-row .el-col:nth-of-type(2) {
  padding: 5rem 1rem;
  text-align: center;
}

.image-dialog .el-row .el-col:nth-of-type(2) h5 {
  margin-bottom: 1.5rem;
}
</style>