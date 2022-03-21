<template>
  <div class="wrap">
    <el-card :body-style="{ padding: '20px' }" shadow="hover" class="userCard">
      <img :src="userImg" class="image" />
      <div style="padding: 4px" class="middle">
        <h3>{{ userName }}</h3>
        <el-button type="text" font-size:18px>Lv3 爱猫人士</el-button>
        <i class="el-icon-arrow-down"></i>
        <el-button type="text" font-size:18px>Lv4 善良小伙</el-button>
      </div>

      <div class="right">
        <el-progress type="circle" :percentage="5"></el-progress>
      </div>

      <el-button type="primary" class="changeName" @click="changeName"
        >修改昵称</el-button
      >
      <el-button type="primary" class="changePassword" @click="changePassword"
        >修改密码</el-button
      >
      <el-button type="primary" class="changeEmail" @click="changeEmail"
        >绑定邮箱</el-button
      >

      <el-dialog
        :title="dialogDecoration.title"
        :visible.sync="dialogFormVisible"
        width="400px"
        height="400px"
      >
        <el-form :model="form">
          <el-form-item
            v-for="(item, index) in dialogDecoration.label"
            :key="index"
            :label="item.name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form[item.formKey]"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <div class="bottom clearfix">
        <el-divider></el-divider>
        <time class="time">登录时间：{{ date }}</time>
      </div>
    </el-card>
  </div>
</template>

<script>
let myDate = new Date();
let currentDate = myDate.toLocaleDateString() + " - " + myDate.toLocaleTimeString();
  

export default {
  name: "UserInfo",
  data() {
    return {
      formRules:{
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value) == false) {
                callback(new Error("请输入邮箱"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password:[]
    },  

      // 个人信息数据
      userImg: require("../assets/userIcon1.png"),
      // 应该从服务器端获取 这里用浏览器的内存作为服务器了
      userName: localStorage.getItem("userName")
        ? JSON.parse(localStorage.getItem("userName"))
        : "默认昵称",
      date: currentDate,
      dialogDecoration: {
        title: "undefined",
        label: [],
      },
      dialogFormVisible: false,
      // 这个form表单与输入框双向联系，也就是说用户的任何输入都会立即反馈到form里面，同样每一次刷新页面里面的数据都会消失
      // 所以这个表单应该只是一个临时存储数据的地方，用户做出修改之后，只有表单数据发送到数据库里了，才能算是真正的修改了，否则就算无效修改
      form: {
        newName: "",
        oldPassword: "",
        newPassword: "",
        Email: localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) :"",
      },
      formLabelWidth: "60px",

    };
  },
  computed: {
    tableDataKeys() {
      return Object.keys(this.tableData);
    },
  },
  methods: {

  // 清空一下表单数据 防止多次修改个人信息时其他数据影响到本次修改
    clearForm(){
       this.form = {
        newName: "",
        oldPassword: "",
        newPassword: "",
        Email: localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) :"",
      }
    },
    // 修改昵称的表单
    changeName() {
      // 打开表单之前清空一下数据 
      this.clearForm()

      // 因为input框的渲染是push进数组的，所以要先清空一下label
      this.dialogDecoration.label = [];
      this.dialogDecoration.title = "修改昵称";
      this.dialogDecoration.label.push({
        name: "新昵称",
        formKey: "newName",
      });
      //   打开表单组件
      this.dialogFormVisible = true;
    },

    // 修改密码的表单
    changePassword() {
     this.clearForm()
      
      this.dialogDecoration.label = [];
      this.dialogDecoration.title = "修改密码";

      // 打开表单之前把新旧密码给清空掉，这里清空的只是临时的数据
      // 其他的不用清空是因为其他的可以允许有记忆功能 密码则是需要安全功能
    
      this.dialogDecoration.label.push({
        name: "旧密码",
        formKey: "oldPassword",
      });
      this.dialogDecoration.label.push({
        name: "新密码",
        formKey: "newPassword",
      });
      this.dialogFormVisible = true;
    },

    // 修改邮箱的表单
    changeEmail() {
      this.clearForm()
      this.dialogDecoration.label = [];
      this.dialogDecoration.title = "绑定邮箱";
      
      this.dialogDecoration.label.push({
        name: "邮箱",
        formKey: "Email",
      });
      this.dialogFormVisible = true;
    },

    // 点击确定会提交表单 触发这个事件
    submitForm() {
      if (this.form.newName) {
        // 1.提交表单数据到数据库中
        // 2.数据库数据变化 vue响应式进行改变
            localStorage.setItem("userName", JSON.stringify(this.form.newName));
            this.userName = this.form.newName;
            this.dialogFormVisible = false;
            this.$alert('修改成功!',{type :'success'})

      }else if(this.form.oldPassword && this.form.newPassword) {
            let oldPassword = JSON.parse(localStorage.getItem("oldPassword"));

            if (this.form.oldPassword === oldPassword) {
              localStorage.setItem("password", this.form.newPassword);
              this.dialogFormVisible = false;
              this.$alert('修改成功!',{type :'success'})
            }else {
               
              this.$alert("输入旧密码有误",{type :'error'});
            }
      }else if(this.form.Email){
           let reg = /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/
            if(reg.test(this.form.Email)){
               localStorage.setItem("email", JSON.stringify(this.form.Email));
               this.dialogFormVisible = false;
               this.$alert('绑定成功',{type :'success'})
            }else{
               this.$alert('邮箱输入有误',{type :'warn'})
            }
      }else{
           this.dialogFormVisible = false;
           this.$alert('无效的修改',{type :'info'})
      }
    },
  },
};
</script>

<style lang = "less" scoped>
.wrap {
  width: 520px;
  height: 400px;
  .userCard {
    width: 100%;
    height: 100%;
    .el-button + .el-button {
      margin: 0;
    }
    .el-icon-arrow-down {
      display: block;
    }
    div.middle {
      width: 150px;
      height: 150px;
      text-align: center;
    }
    .changeName {
      grid-area: change1;
    }
    .changePassword {
      grid-area: change2;
    }
    .changeEmail {
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
      grid-area: date;
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
</style>