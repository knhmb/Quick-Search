<template>
  <div class="middle-header">
    <base-container>
      <el-row>
        <el-col :sm="24" :md="4">
          <img
            @click="$router.push('/')"
            src="../../assets/logo-dark.png"
            alt=""
          />
          <!-- <img
            @click="$router.push('/')"
            src="../../assets/brand-logo@2x.png"
            alt=""
          /> -->
        </el-col>
        <el-col :sm="24" :md="16">
          <el-input
            v-model="search"
            :placeholder="$t('search_store_placeholder')"
            clearable
          >
            <template #suffix>
              <el-icon @click="searchItem" class="el-input__icon">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :sm="24" :md="4">
          <el-button class="middle-header-button" @click="dialogVisible = true"
            ><img src="../../assets/header-advanced-search@2x.png" alt="" />
            {{ $t("advanced_search_button") }}</el-button
          >
        </el-col>
      </el-row>
    </base-container>
    <advanced-search-dialog
      :dialog-visible="dialogVisible"
      @closeDialog="dialogVisible = $event"
    ></advanced-search-dialog>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
import AdvancedSearchDialog from "./AdvancedSearchDialog.vue";

export default {
  components: {
    Search,
    AdvancedSearchDialog,
  },
  data() {
    return {
      search: "",
      dialogVisible: false,
    };
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        const button = document.querySelector(".middle-header-button");

        if (this.$i18n.locale === "en-us") {
          button.style.width = "12rem";
        } else {
          button.style.width = "9rem";
        }
      },
    },
  },
  methods: {
    searchItem() {
      const data = {
        search: this.search,
      };

      this.$store.dispatch("search/searchItem", data).then(() => {
        this.$router.push({
          path: "/advanced-search",
          query: { q: this.search },
        });
        this.search = "";
      });
    },
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
  width: 11rem;
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
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;

  color: #ffffff;
  position: relative;
  /* width: 12rem; */
}

.middle-header .el-row .el-button img {
  width: 1.5rem;
  margin-right: 0.2rem;
}

@media screen and (max-width: 991px) {
  .middle-header .el-row .el-input .el-input__wrapper {
    margin: 1.5rem 0;
  }

  .middle-header img {
    margin: 0 auto;
    display: block;
  }
}
</style>