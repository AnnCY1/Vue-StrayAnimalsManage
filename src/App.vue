<template>
  <div id="app">
    <el-container class="wrap1" >
      <!-- 先引入布局container 再引入导航 -->
        <el-aside width="200px" v-if="hadLogin">
        <!-- 导航栏组件 -->
          <navigate/>

        </el-aside>
      <el-container class="wrap2">
      <el-header class="headerWrap" v-if="hadLogin">
        
        <Header/>
        
      </el-header>
        <el-main>
          <router-view></router-view>    
        </el-main>
      </el-container>

    </el-container>
  
  </div>
</template>

<script>

import Navigate from "./components/Navigate";
import Header from "./components/Header";





export default {
  name: 'App',
  components: {Navigate,Header},
  data(){
    return{   
      hadLogin:true
    }
  },
  methods:{
    logout(){
      this.hadLogin = !this.hadLogin
      if(this.hadLogin){
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
    background-color: white;
  }
}
 
  

</style>
