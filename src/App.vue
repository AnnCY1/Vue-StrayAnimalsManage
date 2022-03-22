<template>
  <div id="app">
    <el-container class="wrap1" >
      <!-- 先引入布局container 再引入导航 -->
        <el-aside width="200px">
        <!-- 导航栏组件 -->
          <navigate/>

        </el-aside>
      <el-container class="wrap2">
        <!-- 头部区域 -->
      <el-header class="headerWrap">
        
        <Header/>
        
      </el-header>
        <el-main>
          
            <router-view></router-view> 
               <!-- 登录组件 如果没有登录的话 个人中心页面就会要求用户登录 -->
            <login  v-if="this.$route.path == '/userCenter' && !this.$store.state.userInfo.hadLogin" style="margin-left:-150px ;margin-top:-100px"/>  
        </el-main>
      </el-container>

    </el-container>
  
  </div>
</template>

<script>

import Navigate from "./components/Navigate";
import Header from "./components/Header";
import Login from '@/components/Login.vue';

import {mapState} from 'vuex';




export default {
  name: 'App',
  components: {Navigate,Header,Login},
  data(){
    return{   
     
    }
  },
  computed:{
      ...mapState({hadLogin:'hadLogin'})
  },

  methods:{
    logout(){
      this.$store.commit('changeLoginState')
      if(this.$store.state.hadLogin){
         this.$router.push({name:"userCenter"})
      }
    }
  },
   mounted(){
     this.$bus.$on("logout",this.logout)
   },
   beforeDestory(){
     this.$bus.$on("logout")
   }
}


</script>

<style lang = "less" scoped>
#app{
  width: 100vw;
  height: 100vh;
}

.wrap1{
  
  height: 100%;
  
  aside{
    height: 100%;
    overflow: hidden;
    background-color: #545c64;
  }
  .wrap2{
    .headerWrap{
      padding: 0px;
    }
    
}
  main{
    padding: 0px;
    width: 100%;
    height: 100%;
    
  }
}
 
  

</style>
