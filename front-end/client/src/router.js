import Vue from 'vue';
import Router from 'vue-router';
import Homepage from './views/homepage/index.vue';
import Converter from './views/converter/index.vue';
import Profile from './views/profile/index.vue';
import Explore from './views/explore/index.vue';
import Page from './components/page/index.vue';
import Login from './views/login/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/page',
      name: 'Page',
      component: Page,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          component: Homepage,
          meta: { requiresAuth: true },
        },
        {
          path: '/converter',
          name: 'converter',
          component: Converter,
          meta: { requiresAuth: true },
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
          meta: { requiresAuth: true },
        },
        {
          path: '/explore',
          name: 'explore',
          component: Explore,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
