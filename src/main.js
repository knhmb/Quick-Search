import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./route";
import store from "./store/store";

import BaseContainer from "./ui/BaseContainer";
import BaseCard from "./ui/BaseCard";

const app = createApp(App);

app.component("base-container", BaseContainer);
app.component("base-card", BaseCard);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
