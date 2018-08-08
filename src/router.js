import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Line from "./views/line";

export default new Router({
  // mode: "hash",
  base: process.env.NODE_ENV == "production" ? "/h5/qx/" : "",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home")
    },
    {
      path: "/city",
      name: "city",
      component: () => import("./views/city")
    },
    {
      path: "/line",
      name: "line",
      component: Line
    },
    {
      path: "/rank",
      name: "rank",
      component: () => import("./views/rank")
    },
    {
      path: "/list",
      name: "list",
      component: () => import("./views/list")
    },
    {
      path: "/albumList",
      name: "albumList",
      component: () => import("./views/albumList")
    },
    {
      path: "/albume_1",
      name: "albume_1",
      component: () => import("./views/themes/albume_1")
    },
    {
      path: "/albume_2",
      name: "albume_2",
      component: () => import("./views/themes/albume_2")
    },
    {
      path: "/albume_3",
      name: "albume_3",
      component: () => import("./views/themes/albume_3")
    }
  ]
});
