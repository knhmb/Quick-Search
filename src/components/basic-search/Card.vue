<template>
  <div class="basic-search-card">
    <template v-for="item in searchItems.items" :key="item">
      <el-row :gutter="10">
        <el-col :sm="24" :md="12">
          <h5>
            {{ item.resources.category ? item.resources.category.name : "" }}
          </h5>
          <div class="box">{{ item.count }}</div>
        </el-col>
        <el-col :sm="24" :md="12">
          <!-- <p>{{ $t("more") }}</p>
          <img src="../../assets/more@2x.png" alt="" /> -->
        </el-col>
        <el-col v-for="subItem in item.items" :key="subItem" :sm="12" :md="6">
          <div
            class="card"
            @click="
              selectShop({
                mainCat: subItem.category,
                slug: subItem.slug,
                category: item.resources.category.name,
                id: item.resources.category.slug,
              })
            "
          >
            <img :src="subItem.image" alt="" />
            <div class="content">
              <p class="title">
                {{ subItem.name }}
              </p>
              <p class="description">
                {{
                  subItem.description.length > 45
                    ? `${subItem.description.slice(0, 45)}...`
                    : subItem.description
                }}
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- <template v-for="category in categories" :key="category">
      <el-row :gutter="10">
        <el-col :sm="24" :md="12">
          <h5>{{ $t(category) }}</h5>
          <div class="box">924</div>
        </el-col>
        <el-col :sm="24" :md="12">
          <p>{{ $t("more") }}</p>
          <img src="../../assets/more@2x.png" alt="" />
        </el-col>
        <el-col :sm="12" :md="6">
          <div class="card">
            <img src="../../assets/shop-sample01@2x.jpg" alt="" />
            <div class="content">
              <p class="title">
                店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱
              </p>
              <p class="description">
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
              </p>
            </div>
          </div>
        </el-col>
        <el-col :sm="12" :md="6">
          <div class="card">
            <img src="../../assets/shop-sample02@2x.jpg" alt="" />
            <div class="content">
              <p class="title">
                店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱
              </p>
              <p class="description">
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
              </p>
            </div>
          </div>
        </el-col>
        <el-col :sm="12" :md="6">
          <div class="card">
            <img src="../../assets/shop-sample03@2x.jpg" alt="" />
            <div class="content">
              <p class="title">
                店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱
              </p>
              <p class="description">
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
              </p>
            </div>
          </div>
        </el-col>
        <el-col :sm="12" :md="6">
          <div class="card">
            <img src="../../assets/shop-sample04@2x.jpg" alt="" />
            <div class="content">
              <p class="title">
                店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱
              </p>
              <p class="description">
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </template> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        "personal_care",
        "cosmeceutical",
        "make_up",
        "healthy_food",
        "interest",
        "medical",
        "mother",
      ],
      dummy:
        "This is Hair Four This is Hair Four This is Hair Four This is Hair Four",
    };
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        console.log("language changed");
        const data = {
          search: this.searchValue,
        };
        this.$store.dispatch("search/searchItem", data);
      },
    },
  },
  computed: {
    searchItems() {
      return this.$store.getters["search/searchItems"];
    },
    searchValue() {
      return this.$store.getters["search/searchValue"];
    },
  },
  methods: {
    selectShop({ slug, category, id, mainCat }) {
      console.log(category);
      console.log(slug);
      console.log(id);
      console.log(mainCat);
      this.$store.commit("SET_SELECTED_MAIN_CATEGORY_SLUG", mainCat);

      this.$store.commit("SET_CATEGORY", category);
      this.$store.commit("SET_CATEGORY_ID", id);
      this.$store.commit("SET_SELECTED_SHOP_SLUG", slug);
      this.$router.push({
        name: "shop",
        params: { id: slug },
      });
      // this.$store
      //   .dispatch("search/searchSingleShop", { slug: slug })
      //   .then(() => {
      //     this.$router.push({
      //       name: "shop",
      //       params: { id: slug },
      //       // query: { q: slug },
      //     });
      //   });
    },
  },
};
</script>

<style scoped>
.basic-search-card .el-row {
  margin-bottom: 2rem;
}

.basic-search-card {
  margin-top: 4rem;
  cursor: pointer;
}

.basic-search-card .el-row .el-col:first-of-type,
.basic-search-card .el-row .el-col:nth-of-type(2) {
  display: flex;
  align-items: center;
}

.basic-search-card .el-row .el-col:nth-of-type(2) {
  justify-content: flex-end;
}

.basic-search-card .el-row .el-col:nth-of-type(2) p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #985f35;
  margin-right: 0.5rem;
}

.basic-search-card h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-right: 0.5rem;
}

.basic-search-card div.box {
  border-radius: 8px;
  background: transparent;
  border: 1px solid #985f35;
  padding: 0.1rem 0.5rem;

  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #985f35;
}

.basic-search-card img {
  width: 1.5rem;
}

.basic-search-card .card {
  background: #fff;
  border-radius: 8px;
  margin-top: 1rem;
}

.basic-search-card .card .content {
  padding: 8px;
}

.basic-search-card .card img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.basic-search-card .card .content p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-feature-settings: "liga" off;
}

.basic-search-card .card .content p.title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #393939;
  margin-bottom: 0.5rem;
}
.basic-search-card .card .content p.description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #8d8d8d;
}
</style>