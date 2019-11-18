import Vue from "vue";
import VueRouter from "vue-router";
import SelectCluster from "@/views/SelectCluster.vue";
import ClusterInfo from "@/components/ClusterInfo.vue";
import Channels from "@/components/Channels.vue";
import Channel from "@/components/Channel.vue";
import ChannelList from "@/components/ChannelList.vue";
import ClientList from "@/components/ClientList.vue";
import Registry from "@/components/Registry.vue";
import Streamer from "@/components/Streamer.vue";
import StreamerDash from "@/components/StreamerDash.vue";

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
          name: '',
          component: Channels,
          children: [
            {
              path: ':channelID',
              name: 'channel',
              component: Channel,
              props: true
            },
            {
              path: '',
              name: 'channellist',
              component: ChannelList,
            }
          ]
        },
        {
          path: 'clients',
          name: 'clients',
          component: ClientList
        },
        {
          path: 'registry',
          name: 'registry',
          component: Registry,
          props: true
        },
        {
          path: 'streamer',
          name: '',
          component: Streamer,
          children: [
            {
              path: ':channelID',
              name: 'streamerdata',
              component: StreamerDash,
            },
            {
              path: '',
              name: 'streamerdash',
              component: StreamerDash,
            }
          ]
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
