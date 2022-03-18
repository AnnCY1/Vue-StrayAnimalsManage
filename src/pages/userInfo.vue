<template>
  <div class="main">
    <!-- 整个main区域二行，第一行三列，第二行两列 -->
    <el-row :gutter="40" class="row1">
      <!-- 个人用户中心信息和表格 -->
      <el-col :span="8">
        <div class="grid-content bg-purple r1c1">
          <el-card
            :body-style="{ padding: '20px' }"
            shadow="hover"
            class="card"
          >
            <img :src="userImg" class="image" />
            <div style="padding: 4px" class="middle">
              <h3>好吃的汉堡</h3>
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
            <el-button
              type="primary"
              class="changePassword"
              @click="changePassword"
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
      </el-col>

      <el-col :span="6">
        <div class="grid-content r1c2">
          <el-card shadow="hover"> 仪表盘 </el-card>
        </div></el-col
      >

      <el-col :span="6">
        <div class="grid-content r1c3">
          <el-card shadow="hover"> 仪表盘 </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="40" class="row2">
      <!-- 表格 -->
      <el-col :span="8">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(value, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="value"
            width="180"
          >
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
        <div class="grid-content bg-purple r3c1">折线图</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Table from "../components/Table";

let myDate = new Date();
let currentDate =
  myDate.toLocaleDateString() + " - " + myDate.toLocaleTimeString();

export default {
  compoents: { Table },
  data() {
    return {
      userImg: require("../assets/userIcon1.png"),
      date: currentDate,
      dialogDecoration: {
        title: "undefined",
        label: [],
      },
      dialogFormVisible: false,
      form: {
        newName: "",
        oldPassword: "",
        newPassword: "",
        Email: "",
      },
      formLabelWidth: "60px",
      tableData: [
        {
          date: "2016-05-02",
          detail: "义工护理",
          points: "+5",
        },
        {
          date: "2016-05-02",
          detail: "上传轨迹",
          points: "+2",
        },
        {
          date: "2016-05-02",
          detail: "上传轨迹",
          points: "+2",
        },
        {
          date: "2016-05-02",
          detail: "上传轨迹",
          points: "+2",
        },
        {
          date: "2016-05-02",
          detail: "上传轨迹",
          points: "+2",
        },
        {
          date: "2016-05-02",
          detail: "上传轨迹",
          points: "+2",
        },
        {
          date: "2016-05-02",
          detail: "上传轨迹",
          points: "+2",
        },
      ],
      tableLabel: {
        date: "日期",
        detail: "详情",
        points: "积分",
      },
    };
  },
  computed: {
    tableDataKeys() {
      return Object.keys(this.tableData);
    },
  },
  methods: {
    changeName() {
      this.dialogDecoration.label = [];
      this.dialogDecoration.title = "修改昵称";
      this.dialogDecoration.label.push({
        name: "新昵称",
        formKey: "newName",
      });
      this.dialogFormVisible = true;
    },
    changePassword() {
      this.dialogDecoration.label = [];
      this.dialogDecoration.title = "修改密码";
      this.dialogDecoration.label.push({
        name: "旧密码",
        formKey: "oldPassword",
      });
      this.dialogDecoration.label.push({
        name: "新密码",
        formKey: "newPassword",
      });

      console.log(this.dialogDecoration.label);
      this.dialogFormVisible = true;
    },
    changeEmail() {
      this.dialogDecoration.label = [];
      this.dialogDecoration.title = "绑定邮箱";
      this.dialogDecoration.label.push({
        name: "邮箱",
        formKey: "Email",
      });
      this.dialogFormVisible = true;
    },
    submitForm() {
      console.log(this.form.newName);
      console.log(this.form.oldPassword);
      console.log(this.form.newPassword);
      console.log(this.form.Email);

      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang = "less" scoped>
.main {
  margin-top: 65px;
  margin-left: 65px;
  .el-row {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 6px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}

.r1c1 {
  width: 100%;
  height: 400px;
  .card {
    width: 100%;
    height: 100%;
    padding: 0px;

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

.r1c2 {
  height: 100%;
}
.r1c3 {
  background-color: #bfa;
  height: 100%;
}

.r2c1 {
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
