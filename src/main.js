import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./route";
import store from "./store/store";

import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

import BaseContainer from "./ui/BaseContainer";
import BaseCard from "./ui/BaseCard";

const app = createApp(App);

app.component("base-container", BaseContainer);
app.component("base-card", BaseCard);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(VCalendar, {});

app.mount("#app");
