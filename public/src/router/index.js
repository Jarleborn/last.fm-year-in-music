import Vue from 'vue';
import Router from 'vue-router';
import Getter from '@/components/Getter';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Getter',
      component: Getter,
    },
  ],
});
