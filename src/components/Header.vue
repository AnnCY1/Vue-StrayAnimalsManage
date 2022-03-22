<template>
  <div class="header">
      <div class="leftContainer">
              <!-- 面包屑导航 使用tag标签来实现 -->
            <el-tag class="breadNav"
            v-for="(tag,index) in tags" 
                :key="tag.label"
                :closable="tag.name != 'home'"
                :effect = "$route.name == tag.name ? 'dark':'light'"
                @click="bounce(tag)" 
                @close = "handleClose(tag,index)"
                >
                
                {{tag.label}}

            </el-tag>
        </div>

            <el-dropdown  class="rightContainer">
             <div class="user">  
                <span class="el-dropdown-link">
                    <img :src="userImg"   alt="用户头像">
                </span>
            </div> 
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" @click.native="logout">登出</el-dropdown-item>
                <el-dropdown-item command="b" @click.native="toUserCenter">个人中心</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>

  </div>
</template>

<script>

import { mapState,mapMutations } from "vuex";

    export default {
        data(){
            return{
                // 不用require写法会报错
               userImg: require ("../assets/userIcon1.png"), 
            }    
        },
        computed:{
            ...mapState({
                tags(){ return this.$store.state.routeLog}
            })
        },
        methods:{
            ...mapMutations({
                delete: 'deleteLog'
            }),
            // 登出按钮
            logout(){
                this.$store.commit('logOut')
                this.$message({
                    message:"您已成功登出",
                    type:'info'
                })
            },
            // 个人中心
            toUserCenter(){
                this.$router.push({name:"userCenter"})
            },
            // 点击tag标签 路由跳转
            bounce(tag){
                this.$router.push({ name:tag.name})
            },
            // 点击close 删除标签 需要做两件事，先通过mutation删除state里面的路由记录，再进行页面跳转
            handleClose(tag,index){
                this.delete(index)
                const l = this.tags.length
                // 如果用户只想删除一下历史记录  那么就不要给他跳转页面
                if(tag.name !== this.$route.name){
                    return
                }
                if(index == l ){
                    // 如果用户删除的是最后一个 那么就向左跳转 注意index是用户点击的index 而l是删除之后的长度
                    this.bounce(this.tags[index-1])
                }else{
                    // 如果点击的是中间的 那么就向右跳转
                    this.bounce(this.tags[index])
                }
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
        margin-left: 20px;
        .breadNav{
            margin-left: 8px;
            font-size: 14px; 
        }
        .el-tag{
                cursor: pointer;
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