<template>
    <div class="main">
        <el-row :gutter="20" class="row1">
          <el-col :span="6"><div class="grid-content bg-purple r1c1" ></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple r1c2"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple r1c3"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple r1c4"></div></el-col>
        </el-row>

        <el-row :gutter="20" class="row2">
          <el-col :span="8"><div class="grid-content bg-purple r2c1"></div></el-col>
          <el-col :span="10">
            <el-row :gutter="20" class="row3">
              <div class="grid-content bg-purple r3c1"></div>
            </el-row>
            <el-row :gutter="20" class="row3">
              <div class="grid-content bg-purple r3c2"></div>
            </el-row>
          </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        data(){
          return{
            userImg:require("../assets/userIcon1.png")
          }
        }
        
    }
</script>

<style lang = "less" scoped>
    .main{
      margin-top: 100px;
      margin-left: 100px;
     
    }
    
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
 
  .bg-purple {
    background: #d3dce6;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .r1c1{
    background-color: #bfa;
    height:400px;
  }
   .r1c2{
    background-color: #bfa;
    height:400px;
  }
   .r1c3{
    background-color: #bfa;
    height:400px;
  }
  .r1c4{
    background-color: #bfa;
    height:400px;
  }
   .r2c1{
    background-color: #bfa;
    height:400px;
  }
   .r3c1{
    background-color: gray;
    height:400px;
  }
  .r3c2{
    background-color: gray;
    height:400px;
  }

</style>
