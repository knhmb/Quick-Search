import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import router from "./route";
import store from "./store/store";
import i18n from "./i18n";

import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

import VueSocialSharing from "vue-social-sharing";
import vue3GoogleLogin from "vue3-google-login";

import { createChatWoot } from "@huntersofbook/chatwoot-vue";

import BaseContainer from "./ui/BaseContainer";
import BaseCard from "./ui/BaseCard";

const app = createApp(App);

const chatwoot = createChatWoot({
  init: {
    websiteToken: "kNytd7JqD57hqSh5sDBbXrpF",
    // websiteToken: 'b6BejyTTuxF4yPt61ZTZHjdB'
  },
  settings: {
    locale: "en",
    position: "right",
    launcherTitle: "",
  },
  partytown: false,
});

app.use(chatwoot);

app.component("base-container", BaseContainer);
app.component("base-card", BaseCard);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(VCalendar, {});
app.use(i18n);
app.use(VueSocialSharing);
app.use(vue3GoogleLogin, {
  clientId:
    "824016799486-kn6gtoe8mbebgr607m5ksqc5eq16kl09.apps.googleusercontent.com",
});

app.mount("#app");
