<template>
  <div class="header">
      <div class="leftContainer">
              <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadNav">

                <el-breadcrumb-item  
                v-for="item in this.routeLog" 
                :key="item.path" 
                :to="{ name: 'item.name' }">{{item.label}}</el-breadcrumb-item>

            </el-breadcrumb>
        </div>

            <el-dropdown  class="rightContainer">
             <div class="user">  
                <span class="el-dropdown-link">
                    <img :src="userImg"   alt="用户头像">
                </span>
            </div> 
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">登出</el-dropdown-item>
                <el-dropdown-item command="b">个人中心</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>

  </div>
</template>

<script>

    export default {
        data(){
            return{
                // 不用require写法会报错
               userImg: require ("../assets/userIcon1.png"),
                routeLog:[
                    {
                        name:"home",
                        path:"/",
                        label:"首页"
                    },
                    
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
    height: 100%;
    overflow: hidden;
    padding: 0px;
    background-color:  lightskyblue;
    display: flex;
    justify-content:space-between;
    align-items: center;
    .leftContainer{
        display: flex;
        align-items: center;
        .breadNav{
            margin-left: 50px;
            font-size: 20px;
            color: black;
        }
     }
    .rightContainer{
        display: flex;
        align-items: center;
        overflow: hidden;
        div.user{
            border-radius: 50%;
            img{
                    width:40px;
                }
        }
    }
  }
    
</style>