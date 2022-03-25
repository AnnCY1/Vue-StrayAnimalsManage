<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
         <div class="big-contain" v-if="isLogin">
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username" />
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="text" placeholder="账号" v-model="form.useract" />
            <input type="password" placeholder="密码" v-model="form.userpwd" />
          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="text" placeholder="账号" v-model="form.useract" />
            <!-- <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span> -->
            <input type="password" placeholder="密码" v-model="form.userpwd" />
            <span class="errTips" v-if="emailError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>
       
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      isLogin: false,
      emailError: false,
      passwordError: false,
      existed: false,
      form: {
        username: "",
        useract: "",
        userpwd: "",
      },
    };
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.username = "";
      this.form.useract = "";
      this.form.userpwd = "";
    },
    login() {
      const self = this;
    
      if (self.form.useract != "" && self.form.userpwd != "") {
        // every 或者 some find  方法不能返回自定义的值  forEach无返回值 map始终返回的是一个数组     而且想要获取它们的结果需要 return arr.some(...return XX...) 写两个return ！！！
        // for in 循环和 for of 循环固然可以自定义返回值 ，但是for循环是不能用变量直接接收的 必须要封装成一个函数，而且要万万小心：
        //  for循环return 是会终止函数运行的 一般情况用break 和continue就行了 不要在for里面用return
        // 其他组件调用mutation 语法是 this.$store.commit('mutationName',参数) mutation调用mutation是 this.commit(...)!
        // mutations 的所有方法只能接收除state之外一个参数！ 多余的参数必须要用数组或者对象传过去！
        // action 可以有返回值 而mutation不允许有返回值！！！ 
        // JSON.stringify 不要乱用 在放到localStorage 的时候用一次就够了  在此之前最好不要用 
       
       let result =  this.confirmPwd()
       if(result){
         let res
          let userInfo = JSON.parse(localStorage.getItem('userInfo'))
          let adminInfo = this.$store.state.adminAccount
          for(let i=0;i<adminInfo.length;i++){
              if(adminInfo[i].name == result)
              {
                 res = adminInfo[i]
                 this.$store.commit('adminLogin')
              }
          }
          for(let i=0;i<userInfo.length;i++){
              if(userInfo[i].name == result)
              {
                 res =userInfo[i]
              }
          }
         this.$store.commit('userRegister',res)
         this.$bus.$emit('userLogin')

          this.$notify({
          title: "登录成功",
          message: "欢迎您，" + result,
          offset: 100,
        });
        
       }else{
         this.$message({
          message: "账号或密码错误！",
          type: "warning",
        });
       }
      }else {
        alert("填写不能为空！");
      }
    },
    register() {
      const self = this;
      if (
        self.form.username != "" &&
        self.form.useract != "" &&
        self.form.userpwd != ""
      ) {
        let userInput = {id:'',name:self.form.username,account:self.form.useract,password:self.form.userpwd,email:'',
                         points:[{date:new Date().toLocaleDateString(),detail:'注册成功',points:1}]}
        let userInfo =  []
        if(!localStorage.getItem('userInfo')){
          console.log('没有用户注册')
          
        }else{
           userInfo = JSON.parse(localStorage.getItem('userInfo'))
        }
        if(userInfo.length){
          userInput.id = userInfo.length+1 
        }else{
          userInput.id = 1
        }
        
        userInfo.push(userInput)
        
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        this.$alert("注册成功！",{type:'success'});
        this.$store.commit('userRegister',userInput)
      } else {
        this.$alert("填写不能为空",{type:'warning'});
      }
    },
     confirmPwd(){
      //  先验证是不是管理员
        let res1 = this.confirmAdmin()
 
        if(res1){
            this.$store.isAdmin = true
            return res1
        }else{
          // 再验证是不是用户
           let res2 = this.confirmUser()
           if(res2){
               this.$store.isAdmin = false
               return res2
           }else{
               return false
           }
        }
    },
    confirmAdmin(){
        let adminName = ''
        let res =  this.$store.state.adminAccount.some((item)=>{
                 adminName = item.name      
                 return item.account == this.form.useract && item.password == this.form.userpwd
        })
        if(!res){ adminName = ''}
       
        return adminName
    },
    confirmUser(){
        let theUserInfo = JSON.parse(localStorage.getItem('userInfo'))
        
        let userName = ''
        if(theUserInfo){
                let res = theUserInfo.some(user =>{
                        userName = user.name
                        return user.account == this.form.useract && user.password == this.form.userpwd
                })
            if(!res){ userName = '' }
            return userName
        }else{
             return false
        }
    }


  },
  mounted() {
    console.log()
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>