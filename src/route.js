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
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import MerchantCooperation from "./pages/MerchantCooperation";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// import { ElNotification } from "element-plus";

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // return savedPosition;
      return {
        savedPosition,
        behavior: "smooth",
      };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/", redirect: "/home" },
    { path: "/basic-search", component: BasicSearch },
    { path: "/advanced-search", component: AdvancedSearch },
    { path: "/shop", component: ShoppingCart },
    { path: "/about-us", component: AboutUs },
    { path: "/contact-us", component: ContactUs },
    { path: "/faq", component: Faq },
    { path: "/merchant-cooperation", component: MerchantCooperation },
    { path: "/terms-of-use", component: TermsOfUse },
    { path: "/privacy-policy", component: PrivacyPolicy },
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
