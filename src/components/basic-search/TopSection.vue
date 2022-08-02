<template>
  <div class="top-section">
    <base-container>
      <h3>{{ $t("search_result_text") }}</h3>
      <!-- <h3>以下是與 <span>“美白服務”</span> 相關的搜尋結果</h3> -->
    </base-container>
  </div>
</template>


<style scoped>
.top-section {
  background: #ebebeb;
  padding: 2em 0;
}

.top-section h3 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
  text-align: center;
}

.top-section h3 span {
  font-weight: 500;
}
</style>