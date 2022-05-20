<template>
  <div class="middle-header">
    <base-container>
      <el-row>
        <el-col :sm="24" :md="4">
          <img
            @click="$router.push('/')"
            src="../../assets/brand-logo@2x.png"
            alt=""
          />
        </el-col>
        <el-col :sm="24" :md="16">
          <el-input
            v-model="input"
            placeholder="搜尋店舖名稱、產品、類型"
            clearable
          >
            <template #suffix>
              <el-icon class="el-input__icon">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :sm="24" :md="4">
          <el-button
            ><img src="../../assets/header-advanced-search@2x.png" alt="" />
            進階搜尋</el-button
          >
        </el-col>
      </el-row>
    </base-container>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";

export default {
  components: {
    Search,
  },
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style>
.middle-header {
  background: #fff;
  box-shadow: inset 0px -1px 0px #ebebeb;
}

.middle-header .el-row {
  align-items: center;
}

.middle-header img {
  width: 100%;
  cursor: pointer;
}

.middle-header .el-row .el-input .el-input__wrapper {
  background-color: #f5f4f0;
  border-radius: 80px;
  width: 100%;
  margin-right: 1rem;
  margin-left: 6rem;
}

.middle-header .el-row .el-input .el-input__icon {
  background-color: #985f35;
  /* padding: 0.3rem; */
  width: 1.5rem;
  height: 1.5rem;
  color: #fff;
  /* font-size: 1.5rem; */
  border-radius: 100%;
  cursor: pointer;
}

.middle-header .el-row .el-button {
  width: 100%;
  background: #985f35;
  border-color: #985f35;
  border-radius: 40px;
  /* padding: 1.2rem; */
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;

  color: #ffffff;
  position: relative;
}

.middle-header .el-row .el-button img {
  width: 1.5rem;
  margin-right: 0.2rem;
}
</style>