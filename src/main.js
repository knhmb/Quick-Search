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

import BaseContainer from "./ui/BaseContainer";
import BaseCard from "./ui/BaseCard";

const app = createApp(App);

app.component("base-container", BaseContainer);
app.component("base-card", BaseCard);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(VCalendar, {});
app.use(i18n);
app.use(VueSocialSharing);

app.mount("#app");
