import Vue from "vue";
import VueRouter from "vue-router";
import SelectCluster from "../views/SelectCluster.vue";
import ClusterInfo from "../components/ClusterInfo.vue";
import ChannelsInfo from "../components/ChannelsInfo.vue";
import ClientsInfo from "../components/ClientsInfo.vue";

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
      },
      {
        path: 'channels',
        name: 'channels',
        component: ChannelsInfo
      },
      {
        path: 'clients',
        name: 'clients',
        component: ClientsInfo
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
