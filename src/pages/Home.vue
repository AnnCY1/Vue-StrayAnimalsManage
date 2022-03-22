<template>
    <div class="home">
      <el-row>
          <el-col :span="20">
            <div class = 'headerContainer' >
              <img  width="100%" height="300px"  src="../assets/CSAPA.png">
            </div>
          </el-col>
      </el-row>
        <el-row :gutter="10" >
                <el-col :span="5" v-for="(item,index) in animalShow" :key="item.id">
                  <el-card shadow="hover">
                    <div class="imgContainer">
                      <img :src='animalShow[index].src' alt="动物萌照">
                      <p>{{animalShow[index].name}}</p>
                      </div>
                    </el-card>
                </el-col>
              
        </el-row>
    </div>
</template>

<script>

    export default {
        name:"Home",
        data(){
          return{
            // 负责存放展示出来的照片 最多存放20张
              animalShow:[
              {id:1,name:'汤圆',src:require("../assets/ty01.jpeg")},{id:2,name:'汤圆',src:require("../assets/ty01.jpeg")},
              {id:3,name:'汤圆',src:require("../assets/ty01.jpeg")},{id:4,name:'汤圆',src:require("../assets/ty01.jpeg")},
              {id:5,name:'米线',src:require("../assets/ty04.jpeg")},{id:6,name:'米线',src:require("../assets/ty04.jpeg")},
              {id:7,name:'米线',src:require("../assets/ty04.jpeg")},{id:8,name:'米线',src:require("../assets/ty04.jpeg")},
              {id:9,name:'糯米',src:require("../assets/mx02.jpeg")},{id:10,name:'糯米',src:require("../assets/mx02.jpeg")},
              {id:11,name:'糯米',src:require("../assets/mx02.jpeg")},{id:12,name:'糯米',src:require("../assets/mx02.jpeg")}]
          }
        }
    }
</script>

<style lang = "less" scoped>
 .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 40px;
  }
  .home{
    background: url(../assets/bg1.webp);
     padding-left: 200px;
     .headerContainer{
       border-radius:10px;
        overflow:hidden;
     }
     .imgContainer{
        padding-top: 10px;
        text-align: center;
        
        img{
           width: 90%;
        }
     }
  }
</style>