import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import recommend from '../components/recommend/recommend.vue'
import rankList from '../components/rank/rankBar.vue'
import singerBar from '../components/singer/singerBar.vue'
import search from '../components/search/search.vue'
import rank from '../components/rank/rank.vue'
import singer from '../components/singer/singer.vue'


Vue.use(Router);
import 'swiper/dist/css/swiper.css';
export default new Router({
    routes: [
        {
            path: '/',
            component: index,
            children: [
                {
                    path:"",
                    redirect:"/recommend"
                },
                {
                    path: '/recommend',
                    component: recommend,
                },
                {
                    path: '/rank',
                    component: rank,
                },
                {
                    path: '/rankList/:id',
                    component: rankList
                },
                {
                    path: '/singerBar/:id',
                    component: singerBar
                },
                {
                    path: '/singer',
                    component: singer
                },
                {
                    path: '/search',
                    component: search
                },

            ]
        },


    ]
})
