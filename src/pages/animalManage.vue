<template>
  <div class="animalManage">
    <!-- 头部 -->
    <div class="manage-header">
          <el-button type="primary" @click="addBtn" icon="el-icon-edit" class="addBtn">新增</el-button>
          <el-button type="primary" @click="searchBtn" icon="el-icon-search" class="searchBtn">搜索</el-button>
          <el-input v-model = "keyword" class="search"></el-input>

    </div>
    <!-- 主体 是一个表格 -->
    <el-card class="tableWrap" shadow="hover">
      <common-table  :propsTableData="tableData"
                     :propsTableLabel="tableLabel"
                     :tableConfig="tableConfig"/>
    </el-card>

    <!-- 新建按钮时又出现一个表单 dialogFormVisible 是一个属性 用于控制表单的显示与否 -->
      <el-dialog :title="operateType == 'add' ? '新增数据':'更新数据' "
                :visible.sync = 'dialogFormVisible'>

        <common-form 
                :inline = "true"
                ref="commonForm"
                :model="operateForm"
                />

          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue';

let result = false;

export default {
  components: { CommonForm, CommonTable },
    name:"AnimalManage",
    data(){
        return{
            
         // 表单相关数据 
            operateType:"add",
            dialogFormVisible: false,
            // 用户操作完表格之后所输入的内容 存放在这里
            operateForm :{
                id:'',
                name:"",
                sex:'',
                registerDate:'',
                feature:[],
                info:""
              },

          // 表格相关数据
            keyword:'',
            userSelect:'',
            // 数据库里面的信息 是不会变化的
            animalInfo : JSON.parse(localStorage.getItem("animalInfo")) || [],
            // 展示在表格里面的数据 可能会因为条件、排序等产生变化
            tableData : JSON.parse(localStorage.getItem("animalInfo")) || [],

            tableLabel: [{label:"登记时间",prop:"registerDate"},{label:"昵称",prop:"name"},
                         {label:"性别",prop:"sex"},{label:"特征",prop:"feature",width:220},
                         {label:"备注信息",prop:"info",width:220}],
            // 表格的配置属性，由父组件来决定表格是否允许操作 有没有分页
            tableConfig:{ total:0,isOperate:true,page:0}
       };
    },
    methods:{
      addBtn(){
        this.dialogFormVisible = true
        this.operateType = "add"
        this.operateForm = {
            id:'',
            name:"",
            sex:'',
            registerDate:'',
            feature:[],
            info:""
        }
      },
      searchBtn(){
        this.tableData = this.animalInfo
        this.tableData = this.tableData.filter(item =>{
            return item.name.indexOf(this.keyword) !== -1
        })
      },
      // 验证数据是否通过  也可以放在CommonForm组件 发送form信息之前 进行验证，
      // 验证数据不对数据进行修改 而是修改result成功与否
      confirmInput(theOperateForm){
        if(!theOperateForm.name){
           result = false
           this.$confirm("昵称不能为空，可以以食物名称先起一个哦")
        }else if(this.animalInfo.length){
          try{
          this.animalInfo.forEach(item =>{
              if(item.name === theOperateForm.name){
                result = false;
                alert("输入昵称已存在")
                throw "昵称重复"
              }else{
                result = true;
              }
           })
          }catch(e){
              console.log(e)
         }   
      }
      else{
            result = true
         }
    },
      // 用户提交表单后 先给CommonForm组件通信要求它把form数据发过来 再看验证是否通过
      submitForm(){
        if(this.operateType == 'add'){
           // sendForm 发送用户填写的表单数据给其他组件  这里是要common-form发送form属性
          this.$bus.$emit("sendForm")
           // console.log('要回数据') 此时operateForm已经是用户填写的数据了 验证一下这个数据是否合法
            this.confirmInput(this.operateForm);   
        if(result){
           this.operateForm.id = this.animalInfo.length ? (this.animalInfo.length+1) : 1
            this.animalInfo.push(this.operateForm)
            let newData = JSON.stringify(this.animalInfo)
            localStorage.setItem("animalInfo",newData)
            this.$alert("登记成功!",{type:'success'})
            this.dialogFormVisible = !this.dialogFormVisible
            this.operateType == ''
         }//不合法的情况在confirm里面已经进行过了
        }else if(this.operateType == 'upgrade'){
          let count = 0
             this.animalInfo.forEach(item =>{
                if(item.id == this.userSelect.id){
                  this.$bus.$emit('sendForm')
                   
                   item.name = this.operateForm.name
                   item.sex = this.operateForm.sex
                   item.feature = this.operateForm.feature
                   item.info = this.operateForm.info
                   item.registerDate = this.operateForm.registerDate

                   this.$alert("登记成功!",{type:'success'})
                   this.dialogFormVisible = !this.dialogFormVisible
                }else{
                  count++
                  if(count == this.animalInfo.length){
                    this.$alert("找不到数据",{type:'error'})
                  }else{
                    return
                  }
                }
             })
 
             let newData = JSON.stringify(this.animalInfo)
             localStorage.setItem('animalInfo',newData)
          

        }
       
      },
      receiveForm(formData){
        // 用户输入的数据用formData接收 然后赋值给operateForm 准备上传到数据库
        this.operateForm = formData;
      },
      upgradeTable(row){
          this.userSelect = row
          this.operateType ="upgrade"
          let theTableData  = {...row}
          this.$bus.$emit("changeForm",theTableData)
          this.dialogFormVisible = true

      },
      deteleTable(row){

      }

    },
    mounted(){
       this.$bus.$on('receiveForm',this.receiveForm)
       this.$bus.$on('upgradeTable',this.upgradeTable)
       this.$bus.$on('deteleTable',this.deteleTable)
               
    }
}
</script>

<style lang = "less" scoped>
.animalManage{
  width: 1650px;
  height: 100%;
  margin: 0 30px;
  .manage-header{
    margin-top: 50px;
    height: 50px;
    .search{
      width:200px;
      float: right;
    }
    .searchBtn{
      float: right;
    }
  
  }

  .tableWrap{
    width: 100%;
    height: auto;
  }
}
</style>