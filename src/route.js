import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home";
import BasicSearch from "./pages/BasicSearch";
import AdvancedSearch from "./pages/AdvancedSearch";
import ShoppingCart from "./pages/ShoppingCart";
import Comment from "./pages/Comment";
import MemberProfile from "./pages/MemberProfile";
import PersonalInformation from "./pages/PersonalInformation";
import ChangePassword from "./pages/ChangePassword";
import BookingList from "./pages/BookingList";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/", redirect: "/home" },
    { path: "/basic-search", component: BasicSearch },
    { path: "/advanced-search", component: AdvancedSearch },
    { path: "/shopping-cart", component: ShoppingCart },
    { path: "/comment", component: Comment },
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
      ],
    },
  ],
});

export default router;
