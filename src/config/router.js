import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/Main'
import model0 from '@/pages/model0'
import model1 from '@/pages/model1'
import model2 from '@/pages/model2'
import model3 from '@/pages/model3'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: main,
            redirect: '/model0',
            children:[
                {
                    path: 'model0', 
                    name: 'model0',
                    component: model0
                },
                {
                    path: 'model1', 
                    name: 'model1',
                    component: model1
                },
                {
                    path: 'model2', 
                    name: 'model2',
                    component: model2
                },
                {
                    path: 'model3', 
                    name: 'model3',
                    component: model3
                }
            ]
        },
        { path: '*', redirect: '/model0' }
    ]
})
