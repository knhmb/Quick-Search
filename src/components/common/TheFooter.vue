<template>
  <footer class="footer">
    <base-container>
      <el-row justify="space-between">
        <el-col :sm="24" :md="5">
          <img src="../../assets/brand-logo-footer@2x.png" alt="" />
          <a
            href="https://www.facebook.com/profile.php?id=100087977491259"
            target="_blank"
          >
            <img
              src="../../assets/social-media-facebook@2x.png"
              alt=""
              class="social-media"
            />
          </a>
          <a href="https://www.instagram.com/quicksearch_hk" target="_blank">
            <img
              src="../../assets/social-media-instagram@2x.png"
              alt=""
              class="social-media"
            />
          </a>
        </el-col>
        <el-col :sm="24" :md="5">
          <p>{{ $t("meet_quick_search") }}</p>
          <ul>
            <template v-for="item in footerContent" :key="item">
              <li
                @click="$router.push('/about-us')"
                v-if="item.slug === 'cms-page-about-us'"
              >
                {{ item.title }}
              </li>
              <li
                @click="$router.push('/contact-us')"
                v-if="item.slug === 'cms-page-contact-us'"
              >
                {{ item.title }}
              </li>
              <li
                @click="$router.push('/faq')"
                v-if="item.slug === 'cms-page-faqs'"
              >
                {{ item.title }}
              </li>
            </template>
          </ul>
        </el-col>
        <el-col :sm="24" :md="5">
          <template v-for="item in footerContent" :key="item">
            <p v-if="item.slug === 'cms-page-join-us'">
              {{ item.title }}
            </p>
          </template>
          <ul>
            <template v-for="item in footerContent" :key="item">
              <li
                @click="$router.push('/merchant-cooperation')"
                v-if="item.slug === 'cms-page-merchant-cooperation'"
              >
                {{ item.title }}
              </li>
            </template>

            <li @click="dialogVisible = true">
              {{ $t("merchant_registration") }}
            </li>
            <li @click="vendorLogin">{{ $t("merchant_login") }}</li>
          </ul>
        </el-col>
        <el-col :sm="24" :md="5">
          <p>{{ $t("site_terms") }}</p>
          <ul>
            <template v-for="item in footerContent" :key="item">
              <li
                @click="$router.push('/terms-of-use')"
                v-if="item.slug === 'cms-page-terms-of-use'"
              >
                {{ item.title }}
              </li>
              <li
                @click="$router.push('/privacy-policy')"
                v-if="item.slug === 'cms-page-privacy-policy'"
              >
                {{ item.title }}
              </li>
            </template>
          </ul>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p class="copyright">
            © {{ year }} Ten In One Company Limited. All Rights Reserved.
          </p>
        </el-col>
      </el-row>
    </base-container>
  </footer>
  <VendorRegisterDialogueVue
    :dialog-visible="dialogVisible"
    @closeDialog="dialogVisible = $event"
  />
</template>

<script>
import VendorRegisterDialogueVue from "./VendorRegisterDialogue.vue";

export default {
  components: {
    VendorRegisterDialogueVue,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    footerContent() {
      return this.$store.getters["dashboard/footerContent"];
    },
    year() {
      return new Date().getFullYear();
    },
  },
  methods: {
    vendorLogin() {
      window.location.href = `${window.location.protocol}//${window.location.hostname}/admin/`;
    },
    goToInstagram() {
      window.location.href = `https://www.instagram.com/quicksearch_hk`;
    },
  },
};
</script>

<style scoped>
.footer {
  background: #e0c9aa;
  padding: 1rem 0 0 0;
  position: relative;
}

.footer::after {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 4rem;
}

.footer img {
  width: 100%;
}

.footer img.social-media {
  width: 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
}

.footer img.social-media:nth-of-type(2n + 1) {
  margin-left: 1rem;
}

.footer p {
  margin-bottom: 0.5rem;
}

.footer p,
.footer ul li,
.footer p.copyright {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #5c2300;
}

.footer ul {
  list-style: none;
}

.footer ul li {
  font-weight: 400;
  color: #985f35;
  margin-bottom: 0.2rem;
  cursor: pointer;
}

.footer p.copyright {
  font-weight: 400;
  color: #7a4117;
  text-align: center;
  margin-top: 2rem;
}

@media screen and (max-width: 991px) {
  .footer {
    text-align: center;
  }

  .footer ul {
    margin: 1rem 0;
  }

  .footer img.social-media {
    margin-bottom: 1rem;
  }
}

/* @media screen and (max-width: 404px) {
  .footer::after {
    bottom: 5rem;
  }
} */
</style>