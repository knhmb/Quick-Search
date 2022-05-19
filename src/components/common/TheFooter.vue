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
          <p>認識Quick Search</p>
          <ul>
            <li>關於Quick Search</li>
            <li>聯絡我們</li>
            <li>常見問題</li>
          </ul>
        </el-col>
        <el-col :sm="24" :md="5">
          <p>加入我們</p>
          <ul>
            <li>商戶合作</li>
            <li>商戶註冊</li>
            <li>商戶登入</li>
          </ul>
        </el-col>
        <el-col :sm="24" :md="5">
          <p>網站條款</p>
          <ul>
            <li>使用條款</li>
            <li>私隱條例</li>
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
  font-family: "PingFang HK";
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
</style>