import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./route";

import BaseContainer from "./ui/BaseContainer";

const app = createApp(App);

app.component("base-container", BaseContainer);

app.use(ElementPlus);
app.use(router);
app.mount("#app");
