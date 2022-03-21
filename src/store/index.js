import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const actions = {}

const state = {
     //    记录的是用户访问记录 用push来存放数据
     routeLog:[
        {
            name:"home",
            path:"/",
            label:"首页"
        },
    ],
    // 记录用户当前访问的页面 会以高亮显示
    currentTag:null

    
}

const mutations = {

    // 就是用来给routeLog push对象的，不过要判断用户点击的是不是首页
    routeRegister(state,item){
        // 如果用户点击的不是首页 那么就准备改变routeLog
        if(item.name !== "home"){
            // 先将当前访问页面改成现在的
            state.currentTag = item
            // 再判断一下routeLog里面有没有存放过这个记录
            const result = state.routeLog.findIndex(index => index.name === item.name)
            // 如果没有,用户访问了一个真正的从未访问过的页面 那么就push一下 
            if(result === -1){
                state.routeLog.push(item);
            }
            // 否则就改变一下当前访问的页面的记录就行了 这一个在第一步就做了 所以不用再做了

            // 如果用户点击的就是首页，那么重置一下用户当前访问页的tag就行了
        }else{
            // 千万别忘了state啊
            state.currentTag = null;
        }
    },
    // 点关闭按钮可以删除这个历史记录
    deleteLog(state,index){
        state.routeLog.splice(index,1)
    }

}



export default new Vuex.Store({
    actions,
    mutations,
    state
})