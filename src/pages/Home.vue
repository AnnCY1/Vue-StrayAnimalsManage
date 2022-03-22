<template>
    <div class="home">
        <el-row :gutter="20" >
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
              {id:1,name:'汤圆',src:require("../assets/ty01.jpeg")},{id:1,name:'汤圆',src:require("../assets/ty02.jpeg")},
              {id:1,name:'汤圆',src:require("../assets/ty03.jpeg")},{id:1,name:'汤圆',src:require("../assets/ty04.jpeg")},
              {id:1,name:'米线',src:require("../assets/mx01.jpeg")},{id:1,name:'米线',src:require("../assets/mx02.jpeg")}]
          }
        }
    }
</script>

<style lang = "less" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .home{
     padding: 100px;
     .imgContainer{
        padding:10px;
        text-align: center;
        
        img{
           width: 90%;
        }
     }
  }
</style>