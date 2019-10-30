import Vue from "vue";
import VueRouter from "vue-router";
import SelectCluster from "../views/SelectCluster.vue";
import ClusterInfo from "../components/ClusterInfo.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "cluster",
    component: SelectCluster
  },
  {
    path: "/cluster/:id",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    children: [
      {
        path: 'info',
        name: 'info',
        component: ClusterInfo
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
