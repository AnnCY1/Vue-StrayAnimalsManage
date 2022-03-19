<template>
<div>

    <div class="title">
           <h1>阿猫阿狗 ฅ </h1> 
      </div>
  <!-- 导航栏  由数据驱动 elementUI只是起到一个结构和样式的作用 -->
  <el-col :span="12">
      <!-- 没有子节点的用noChildren计算属性遍历 且点击事件传递的参数是Item -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item  
       @click.native = "bounce(item)"
      v-for="(item,index) in noChildren" 
      :index="`${index}`" 
      :key="noChildren[index].path">
        <i :class = "`${noChildren[index].icon}`"></i>
        <span slot="title">{{noChildren[index].label}}</span>
      </el-menu-item>

    <!-- 有子节点的用hasChildren遍历 且点击事件传递的参数是childItem -->
      <el-submenu 
      v-for="(item,index) in hasChildren" 
      :index="`${index}`"  
      :key="hasChildren[index].path">
        <template slot="title">
          <i :class="hasChildren[index].icon"></i>
          <span>{{hasChildren[index].label}}</span>
        </template>

        <el-menu-item-group @click.native = "bounce(childItem)" 
        v-for="(childItem) in hasChildren[index].children"   
        :key="childItem.path">
          <el-menu-item  >{{childItem.label}}</el-menu-item> 
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
      
      menu: [
        {
          name: "Home",
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
      bounce(item){
          this.$router.push({
              name:item.name,
              query:{
                  id:1,
                  name:"温沐春"
              }
              })
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