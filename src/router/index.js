import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home.vue";
import UserCenter from "../pages/UserCenter";
import AnimalInfo from "../pages/animalInfo.vue";
import AnimalManage from "../pages/animalManage.vue";
import Trail from "../pages/animalPath/Trail.vue"
import TrailAnalysis from "../pages/animalPath/TrailAnalysis";
import PathUpload from "../pages/doTings/pathUpload";
import PictureUpload from "../pages/doTings/pictureUpload.vue"


import Login from "../components/Login.vue"

Vue.use(VueRouter)

const routes = [
    {
        name:"home",
        path:"/home",
        component:Home,
    },
    {
        name:"userCenter",
        path:"/userCenter",
        component:UserCenter
    },
    {
        name:"login",
        path:"/",
        component:Login
    },
    {
        name:"animalInfo",
        path:"/animalInfo",
        component:AnimalInfo
    },
    {
        name:"animalManage",
        path:"/animalManage",
        component:AnimalManage
    },
    {
        name:"trail",
        path:"/trail",
        component:Trail
    },
    {
        name:"trailAnalysis",
        path:"/trailAnalysis",
        component:TrailAnalysis
    },
    {
        name:"pathUpload",
        path:"/pathUpload",
        component:PathUpload
    },
    {
        name:"pictureUpload",
        path:"/pictureUpload",
        component:PictureUpload
    },
    
]

const router  = new VueRouter({
    mode:"history",
    routes
})

export default router

// 1.引入Vue和Vuerouter 还有路由页面的组件  vue-router是插件需要use
// 2.准备一个数组，数组里面存放的是路由页面对象
// 3.创建一个VueRouter对象，里面是设置一些路由配置 然后把router对象暴露出去
// 4.在main.js里面引入router，并在new Vue({router,...})注册router变量 就可以在各个组件里面使用router了
// 5.在APP组件里面使用<router-view> 和<router-link to ="path"> 来引入路由页面
// 6.to里面可以写字符串或者是对象，可以通过query和params两种方式传递参数，params是跟随url上的，可能会出现404错误
// 7.编程式路由导航就是不用router-link标签跳转，而是使用其他标签，比如button，给button绑定一个click事件，
//   然后使用this.$router.push()、replace()、go()等方法来跳转页面