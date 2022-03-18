<template>
  <div class="main">
    <el-row :gutter="20" class="row1">
      <el-col :span="8">
        <div class="grid-content bg-purple r1c1">
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="card">
            <img
              :src="userImg"
              class="image"
            />
            <div style="padding: 4px" class="middle">
              <h3>好吃的汉堡</h3>  
                <el-button type="text" font-size:18px>Lv3  爱猫人士</el-button>
                <i class="el-icon-arrow-down"></i>
                <el-button type="text" font-size:18px>Lv4  善良小伙</el-button>   
            </div>

              <div class="right">
                <el-progress type="circle" :percentage="5"></el-progress>
              </div>

             
                <el-button type="primary" class="changeName" @click="changeName">修改昵称</el-button>
                <el-button type="primary" class="changePassword" @click="changePassword">修改密码</el-button>
                <el-button type="primary" class="changeEmail" @click="changeEmail">绑定邮箱</el-button>

                     <el-dialog :title="dialogDecoration.title"  :visible.sync="dialogFormVisible" width="400px" height="400px">
                      <el-form :model="form">
                        <el-form-item v-for="(item,index) in dialogDecoration.label" :key="index" :label="item.name" :label-width="formLabelWidth">
                          <el-input v-model="form[item.formKey]" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                      </div>
                    </el-dialog>
           

              <div class="bottom clearfix">
                 <el-divider></el-divider>
                <time class="time">登录时间：{{date}}</time>
            </div>

          </el-card>
        </div></el-col
      >
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
let myDate = new Date();
let currentDate = myDate.toLocaleDateString() +" - "+ myDate.toLocaleTimeString();

export default {
  data() {
    return {
      userImg: require("../assets/userIcon1.png"),
      date: currentDate,
      dialogDecoration:{
        title:"undefined",
        label:[]
      },
      dialogFormVisible: false,
        form: {
          newName: '',
          oldPassword:"",
          newPassword:"",
          Email:""
        },
        formLabelWidth: '60px',
    };
  },
  methods:{
     changeName(){
       this.dialogDecoration.label = [];
       this.dialogDecoration.title = "修改昵称";
       this.dialogDecoration.label.push({
          name:"新昵称",
          formKey:"newName"
       })
      this.dialogFormVisible = true;
     },
      changePassword(){
       this.dialogDecoration.label = [];
       this.dialogDecoration.title = "修改密码";
       this.dialogDecoration.label.push(
         {name:"旧密码",formKey:"oldPassword"});
       this.dialogDecoration.label.push(
         {name:"新密码",formKey:"newPassword"});

         console.log(this.dialogDecoration.label)
      this.dialogFormVisible = true;
     },
      changeEmail(){
       this.dialogDecoration.label = [];
       this.dialogDecoration.label.push({
          name:"邮箱：",
          formKey:"Email"
       })
      this.dialogFormVisible = true;
     },
     submitForm(){
       console.log(this.form.newName);
       console.log(this.form.oldPassword)
       console.log(this.form.newPassword)
       console.log(this.form.Email)

       this.dialogFormVisible = false;
     }
  }
};
</script>

<style lang = "less" scoped>
.main {
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
.r1c1 {
  width: 100%;
  height: 400px;
  .card{
    width: 100%;
    height: 100%;
      padding: 0px;
    
  .el-button+.el-button{
    margin:0
  }
  .el-icon-arrow-down{
    display: block;
  }
    div.middle{
      width: 150px;
      height: 150px;
      text-align: center;
    }

    
      .changeName{
        grid-area: change1;
      }
      .changePassword{
        grid-area: change2;
      }
      .changeEmail{
        grid-area: change3;
      }
    
    .time {
      font-size: 13px;
      color: #999;
    }
    .bottom {
      display: block;
      margin-bottom: 20px;
      line-height: 12px;
      grid-area:date;
    }
    .image {
      width: 150px;
      border-radius: 50%;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }

    
  }
}
.r1c2 {
  background-color: #bfa;
  height: 400px;
}
.r1c3 {
  background-color: #bfa;
  height: 400px;
}
.r1c4 {
  background-color: #bfa;
  height: 400px;
}
.r2c1 {
  background-color: #bfa;
  height: 400px;
}
.r3c1 {
  background-color: gray;
  height: 400px;
}
.r3c2 {
  background-color: gray;
  height: 400px;
}
</style>
