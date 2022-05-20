import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home";
import BasicSearch from "./pages/BasicSearch";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/", redirect: "/home" },
    { path: "/basic-search", component: BasicSearch },
  ],
});

export default router;
