<template>
  <div class="popular-categories">
    <h4>熱門類別</h4>
    <el-row :gutter="10">
      <el-col :span="4">
        <img src="../../assets/main-category01@2x.jpg" alt="" />
        <p>個人護理</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category02@2x.jpg" alt="" />
        <p>寵物</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category03@2x.jpg" alt="" />
        <p>手工藝</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category04@2x.jpg" alt="" />
        <p>婚禮</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category05@2x.jpg" alt="" />
        <p>玩具</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category06@2x.jpg" alt="" />
        <p>汽車</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category07@2x.jpg" alt="" />
        <p>興趣</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category08@2x.jpg" alt="" />
        <p>烘焙</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category09@2x.jpg" alt="" />
        <p>醫療</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category10@2x.jpg" alt="" />
        <p>媽媽</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category11@2x.jpg" alt="" />
        <p>商務</p>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/main-category12@2x.jpg" alt="" />
        <p>科技電子</p>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.popular-categories {
  padding: 2rem 0;
}

.popular-categories h4 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.popular-categories .el-col {
  position: relative;
  margin-bottom: 1rem;
}

.popular-categories img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.popular-categories p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}
</style>