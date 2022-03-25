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
    currentTag:null,
    // 管理员账户
    adminAccount:[{id:1,name:'温沐春',account:'admin',password:123456},
                  {id:2,name:'张小龙',account:'123',password:123}],
    //   判断是否是管理员
    isAdmin:false,
    // 当前用户的账户状态
    userInfo :{hadLogin:false,id:'',name:'',email:''},
    // 动物轨迹点 存放格式: {id:'',name:'',date:'',info:'',position:{lng:...,lat:...}   }
    animalPoints:JSON.parse(localStorage.getItem('animalPoints')) || []
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
                if(state.isAdmin == true){
                    state.routeLog.push(item);
                }else{
                    if(item.name == 'animalManage'){
                        // alert('只有管理员才能进入哦')
                    }else{
                        state.routeLog.push(item)
                    }
                }
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
    },
    changeLoginState(state){
        state.userInfo.hadLogin = !state.userInfo.hadLogin
    },
    // 点击header的登出按钮
    logOut(state){
        state.userInfo.hadLogin = false;
        sessionStorage.removeItem('userInfo')
        state.isAdmin = false
        
    },
    // 用户登录成功和注册成功时 vuex要干的事是完全一样的
    userRegister(state,userInput){

        state.userInfo = userInput
        sessionStorage.setItem('userInfo',JSON.stringify(userInput))
        state.userInfo.hadLogin = true
    },
    // 管理员登录
   adminLogin(state){
        state.isAdmin = true
   },
    // 用户分数变化
   userPoint(){
       let up = {
           date: new Date().toLocaleDateString(),
           detail:'上传轨迹',
           points:3
       }
       let totalUserInfo = JSON.parse(localStorage.getItem('userInfo'))

    //    先得到当前用户  便于使用他的id  顺便把session的数据改了
       let currentUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))
       currentUserInfo.points.push(up)
       sessionStorage.setItem('userInfo',JSON.stringify(currentUserInfo))

       
        // 再用for in 循环  把用户的积分给改变了 然后再上传到locaStorage中
      for (let index in totalUserInfo){
           if(totalUserInfo[index].id == currentUserInfo.id){

                totalUserInfo[index].points.push(up)
                console.log(totalUserInfo)
                localStorage.setItem('userInfo',JSON.stringify(totalUserInfo))
                break
           }
      }

      


   },
    // 添加轨迹点
    addPoint(state,item){
        
        if(state.animalPoints){
            item.id = state.animalPoints.length+1
            state.animalPoints.push(item)
            localStorage.setItem('animalPoints',JSON.stringify(state.animalPoints))
        }else{
             item.id = 1
             state.animalPoints.push(item)
             localStorage.setItem('animalPoints',JSON.stringify(state.animalPoints))
        }
        
        this.commit('userPoint')

    },
    // 删除轨迹点
    deletePoint(state,item){
        

        let res
        
        for(let index in state.animalPoints){

            // console.log(typeof(index))  注意 这个for in 循环的index是string类型的 
            // 得到要删除的标记的下标
             if(state.animalPoints[index].id === item.id){
                 res = index
             }
        }
        console.log(state.animalPoints[res].name)
        state.animalPoints.splice(res,1)

        for(let i in state.animalPoints){
            // 删除一个标记后要把所有标记的id重置一遍
            if(state.animalPoints[i].id > res){
                 state.animalPoints[i].id = (state.animalPoints[i].id-1)
            }
        }
        // 先在state里面删除
        
        

        // 再上传到数据库中
        localStorage.setItem('animalPoints',JSON.stringify(state.animalPoints))


    } 

}

export default new Vuex.Store({
    actions,
    mutations,
    state
})