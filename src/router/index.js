import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend.vue'
import hotMusic from '../components/hotMusic.vue'
import newMusic from '../components/newMusic.vue'
import mine from '../components/mine.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: recommend
    },
    {
      path: '/recommend',
      component:recommend
    },
    {
      path: '/hotMusic',
      component:hotMusic
    },
    {
      path: '/newMusic',
      component:newMusic
    },
    {
      path: '/mine',
      component:mine
    },


  ]
})
