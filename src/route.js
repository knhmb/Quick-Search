import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/", redirect: "/home" },
  ],
});

export default router;
