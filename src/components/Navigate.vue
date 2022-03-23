<template>
<div>

    <div class="title">
           <h1>阿猫阿狗 ฅ </h1> 
      </div>
  <!-- 导航栏  由数据驱动 elementUI只是起到一个结构和样式的作用 -->
  <el-col :span="12">
      <!-- 没有子节点的用noChildren计算属性遍历 且点击事件传递的参数是Item -->

      <!-- default-active="..." 是用户不点导航栏，默认激活的页面的下标 一般都是首页的下标 我改成个人中心了-->
    <el-menu
      default-active="/userCenter"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item  
       @click.native = "bounce(item)"
      v-for="(item,index) in noChildren"
      :index="noChildren[index].path" 
      :key="noChildren[index].path">
        <i :class = "`${noChildren[index].icon}`"></i>
        <span slot="title">{{noChildren[index].label}}</span>
      </el-menu-item>

    <!-- 有子节点的用hasChildren遍历 且点击事件传递的参数是childItem -->

    <!-- 父节点 -->
      <el-submenu 
      v-for="(item,index) in hasChildren" 
      :index="hasChildren[index].path"
      :key="hasChildren[index].path">
        <template slot="title">
          <i :class="hasChildren[index].icon"></i>
          <span>{{hasChildren[index].label}}</span>
        </template>
    <!-- 子节点 -->
        <el-menu-item-group>
          <el-menu-item v-for="(childItem) in hasChildren[index].children" 
          
          @click.native = "bounce(childItem)" 
          :key="childItem.path"  
          :index = "childItem.label">{{childItem.label}}</el-menu-item> 
        </el-menu-item-group>
      </el-submenu>

    
      
      
    </el-menu>
  </el-col>
</div>
</template>

<script>
export default {
  data() {
    return {
      isShow:this.$store.state.isAdmin,
      menu: [
        {
          name: "home",
          label: "首页",
          path: "/",
          icon:"el-icon-menu",
          url: "",
        },
        {
          name: "animalManage",
          label: "动物管理",
          path: "/animalManage",
          icon:"el-icon-edit-outline",
          url: "",
        },
         {
          name: "userCenter",
          label: "个人中心",
          path: "/userCenter",
          icon:"el-icon-setting",
          url: "",
        },
        {
          name: "animalInfo",
          label: "统计信息",
          path: "/animalInfo",
          icon:"el-icon-document",
          url: "",
        },
        {
          name: "animalPath",
          label: "猫狗轨迹",
          path: "/animalPath",
          icon:"el-icon-location",
          url: "",
          children:[
              {
                  name:"trail",
                  label:"踪迹总览",
                  path:"/trail"
              },
              {
                  name:"trailAnalysis",
                  label:"轨迹分析",
                  path:"/trailAnalysis"
              }
          ]
        },
        {
          name: "doThings",
          label: "我想出力",
          path: "/doThings",
          icon:"el-icon-s-promotion",
          url: "",
          children:[
              {
                  name:"pathUpload",
                  label:"轨迹上传",
                  path:"/pathUpload"
              },
              {
                  name:"pictureUpload",
                  label:"萌照上传",
                  path:"/pictureUpload"
              },
              {
                  name:"infoUpload",
                  label:"信息上报",
                  path:"/infoUpload"
              },
              {
                  name:"volunteer",
                  label:"义工报名",
                  path:"/volunteer"
              },
              {
                  name:"adopt",
                  label:"我要领养",
                  path:"/adopt"
              }
          ]
        },
       
      ],
    };
  },
  computed:{
      noChildren(){
          return this.menu.filter(item =>{ return !item.children })
      },
      hasChildren(){
          return this.menu.filter(item =>{ return item.children })
      }
  },
  methods: {
    // 点击导航除了通过路由访问页面之外，还要记录一下用户访问的历史信息
      bounce(item){
        // 路由跳转
          this.$router.push({
              name:item.name,
              query:{
                  name:"温沐春"
              }
              })

        // 通过vuex 来实现所有页面共用数据 共同操作数据
         this.$store.commit("routeRegister",item) 
      }
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

div.title{
    padding-left: 10px;
    color: #ffd04b;
    font-family: "宋体";
    font-size: 24px;
}

</style>