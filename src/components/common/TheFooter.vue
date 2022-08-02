<template>
  <footer class="footer">
    <base-container>
      <el-row justify="space-between">
        <el-col :sm="24" :md="5">
          <img src="../../assets/brand-logo-footer@2x.png" alt="" />
          <img
            src="../../assets/social-media-facebook@2x.png"
            alt=""
            class="social-media"
          />
          <img
            src="../../assets/social-media-instagram@2x.png"
            alt=""
            class="social-media"
          />
        </el-col>
        <el-col :sm="24" :md="5">
          <p>{{ $t("meet_quick_search") }}</p>
          <ul>
            <li>{{ $t("about_quick_search") }}</li>
            <li>{{ $t("contact_us") }}</li>
            <li>{{ $t("common_problem") }}</li>
          </ul>
        </el-col>
        <el-col :sm="24" :md="5">
          <p>{{ $t("join_us") }}</p>
          <ul>
            <li>{{ $t("merchant_cooperation") }}</li>
            <li>{{ $t("merchant_registration") }}</li>
            <li>{{ $t("merchant_login") }}</li>
          </ul>
        </el-col>
        <el-col :sm="24" :md="5">
          <p>{{ $t("site_terms") }}</p>
          <ul>
            <li>{{ $t("terms_of_use") }}</li>
            <li>{{ $t("privacy_policy") }}</li>
          </ul>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p class="copyright">© 2022 Quick Search. All Rights Reserved.</p>
        </el-col>
      </el-row>
    </base-container>
  </footer>
</template>

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