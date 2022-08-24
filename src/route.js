import { createRouter, createWebHistory } from "vue-router";
// import store from "./store/store";

import Home from "./pages/Home";
import BasicSearch from "./pages/BasicSearch";
import AdvancedSearch from "./pages/AdvancedSearch";
import ShoppingCart from "./pages/ShoppingCart";
import Comment from "./pages/Comment";
import MemberProfile from "./pages/MemberProfile";
import PersonalInformation from "./pages/PersonalInformation";
import ChangePassword from "./pages/ChangePassword";
import BookingList from "./pages/BookingList";
import Coupon from "./pages/Coupon";
import Bookmark from "./pages/Bookmark";
import Notification from "./pages/Notification";
import AboutUs from "./pages/AboutUs";
// import { ElNotification } from "element-plus";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/", redirect: "/home" },
    { path: "/basic-search", component: BasicSearch },
    { path: "/advanced-search", component: AdvancedSearch },
    { path: "/shop", component: ShoppingCart },
    { path: "/about-us", component: AboutUs },
    {
      path: "/comment",
      component: Comment,
      // beforeEnter(to, from, next) {
      //   if (!store.getters["auth/isLoggedIn"]) {
      //     next("/home");
      //     ElNotification({
      //       title: "Error",
      //       message: "Please login first!",
      //       type: "error",
      //     });
      //   } else {
      //     next();
      //     console.log(store.getters["auth/isLoggedIn"]);
      //   }
      // },
    },
    {
      path: "/member-profile",
      component: MemberProfile,
      children: [
        {
          path: "personal-information",
          component: PersonalInformation,
          name: "personal-information",
        },
        {
          path: "change-password",
          component: ChangePassword,
          name: "change-password",
        },
        {
          path: "booking-list",
          component: BookingList,
          name: "booking-list",
        },
        {
          path: "coupon",
          component: Coupon,
          name: "coupon",
        },
        {
          path: "bookmark",
          component: Bookmark,
          name: "bookmark",
        },
        {
          path: "notification",
          component: Notification,
          name: "notification",
        },
      ],
    },
  ],
});

export default router;
