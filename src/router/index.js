import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/fleet-builder",
    name: "Fleet Builder",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Fleets/FleetBuilder.vue"),
    children: [
      {
        path: "/fleet-builder",
        name: "User Fleet List",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "../views/Fleets/UserFleetList.vue"
          ),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/fleet-builder/:FleetGuid",
        name: "User Fleet",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "../views/Fleets/UserFleet.vue"
          ),
        props: (route) => ({
          fleetGuid: route.params.FleetGuid || null,
        }),
        meta: {
          authRequired: true,
        },
      },
    ],
    meta: {
      authRequired: true,
    },
  },
  {
        path: "/configurations",
        name: "Configurations",
        component: () =>
            import(
                /* webpackChunkName: "home" */ "../views/Configurations/Configurations.vue"
            ),
        children: [
            {
                path: "/configurations",
                name: "User Configurations List",
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ "../views/Configurations/UserConfigurationsList.vue"
                    ),
                meta: {
                    authRequired: true,
                },
            },
            {
                path: "/configurations/battlecruisers/:BattlecruiserConfigurationGuid",
                name: "User Battlecruiser Configuration",
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ "../views/Configurations/UserBattlecruiserConfiguration.vue"
                    ),
                props: (route) => ({
                battlecruiserConfigurationGuid: route.params.BattlecruiserConfigurationGuid || null,
                }),
                meta: {
                    authRequired: true,
                },
            },
            {
                path: "/configurations/destroyers/:DestroyerConfigurationGuid",
                name: "User Destroyer Configuration",
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ "../views/Configurations/UserDestroyerConfiguration.vue"
                    ),
                props: (route) => ({
                    destroyerConfigurationGuid: route.params.DestroyerConfigurationGuid || null,
                }),
                meta: {
                    authRequired: true,
                },
            },
        ],
        meta: {
            authRequired: true,
        },
  },
  {
    path: "/your-profile",
    name: "Your Profile",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/YourProfile.vue"),
    meta: {
      authRequired: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/logout") {
    store.dispatch("resetUser").then(() => {
      next("/login");
    });
    return;
  } else if (to.path === "/login") {
    if (store.getters.user.exp === 0) {
      const userAuthToken = localStorage.getItem("CelestialFrontierAuthToken");
      if (userAuthToken !== null) {
        store.dispatch("setUser", userAuthToken);
      }
    }
    const userAuthTokenIsValid = store.getters.userAuthTokenIsValid;
    if (!userAuthTokenIsValid) {
      store.dispatch("resetUser");
      next();
    } else {
      next(from);
    }
  } else if (to.meta.authRequired === false) {
    next();
  } else {
    if (store.getters.user.exp === 0) {
      const userAuthToken = localStorage.getItem("CelestialFrontierAuthToken");
      if (userAuthToken !== null) {
        store.dispatch("setUser", userAuthToken);
      }
    }
    const userAuthTokenIsValid = store.getters.userAuthTokenIsValid;
    if (!userAuthTokenIsValid) {
      store.dispatch("resetUser");
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
