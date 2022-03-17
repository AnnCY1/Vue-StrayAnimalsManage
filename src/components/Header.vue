<template>
  <div class="header">
      <div class="leftContainer">
          <div>
              <el-button type ="primary" icon ="el-icon-d-arrow-left" class="btn"></el-button>
          </div>
      </div>
       <div class="navContainer">
              <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadNav">
                <el-breadcrumb-item  v-for="item in this.routeLog" :key="item.path" :to="{ name: 'item.name' }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rightContainer">
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <img src="C:\Users\Administrator\Desktop\前端学习资料\Project\vue_animals\src\assets\userIcon1.png">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">登出</el-dropdown-item>
                <el-dropdown-item command="b">个人中心</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
  </div>
</template>

<script>

    export default {
        data(){
            return{
               
                routeLog:[
                    {
                        name:"home",
                        path:"/",
                        label:"首页"
                    },
                    {
                        name:"home",
                        path:"/",
                        label:"首页"
                    }
                ]
            }
            
        },
        methods:{
            routelog(name,path,label){
                this.routeLog.push({name,path,label})
            }
        }
    }
</script>

<style lang="less" scoped>

.header{
    width: 100%;
    height: 150px;
    overflow: hidden;
    padding: 0px;
    background-color:  lightskyblue;
    .leftContainer{
        width: 50px;
    }
    .breadNav{
           
            font-size: 20px;
            color: black;
        }
  }
    
</style>