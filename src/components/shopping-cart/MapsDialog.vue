<template>
  <div class="maps-content">
    <el-dialog
      @close="$emit('closeDialog', false)"
      :model-value="dialogVisible"
      width="80%"
    >
      <GoogleMaps />
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
import GoogleMaps from "../google-maps/GoogleMaps.vue";

export default {
  props: ["dialogVisible"],
  components: {
    GoogleMaps,
  },
};
</script>

<style scoped>
.maps-content :deep(.el-dialog) {
  box-shadow: none;
  background: transparent;
}

.maps-content :deep(.el-dialog .el-dialog__headerbtn) {
  display: none;
}
</style>