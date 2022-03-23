<template>
  <el-form ref="myForm" label-width="100px" :model="form" :inline= "inline">
      <el-form-item v-for="item in propsFormLabel || formLabel " :key="item.name" :label="item.label">
            <el-input 
                        v-if="item.type == 'input'"   
                        :placeholder = "`请输入${item.label}`"
                        :class="`${item.model}`"
                        v-model="form[item.model]" >
            </el-input>

            <el-select 
                        v-if="item.type == 'select'"
                        v-model="form[item.model]" 
                        :placeholder = "`请输入${item.label}`"
                        >
                        <el-option v-for="i in item.opts" :key = "i.value"
                                    :label="i.label" :value="i.label" >
                        </el-option>
            </el-select>

            <el-date-picker 
                        v-if="item.type == 'date'"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :placeholder = "`请输入${item.label}`"
                        v-model="form[item.model]">
            </el-date-picker>

            <el-checkbox-group 
                        v-if="item.type == 'checkbox'"
                        v-model="form[item.model]" 
                        >
                    <el-checkbox
                        v-for="i in item.opts"  :key="i.id" 
                        :label="i.label"></el-checkbox>
            </el-checkbox-group>

      </el-form-item>
  </el-form>
</template>

<script>
export default {
    name:"CommonForm",
    props:{
        inline:Boolean,

            // 如果一个页面有两个及以上的表单，表单的内容差别也很大，那么应该让那个页面给这个组件传入数据来决定表单呈现什么内容 
            // 如果有props传入属性的话就用props的，如果没有那么就用自己的 默认是用自己的form遍历
        propsFormLabel:{
            type:Array,
            default(){
                return this.formLabel
            }
        },
        //指定用户输入的内容应该与什么样的数据绑定，因为子组件不应该去修改propsForm的值，
        // 所以如果传值进来，那么需要让form里面的数据跟propsForm对应
        propsForm:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            // 这个数据是表单里面显示什么样的内容 value和id一般是用于 v-for循环时指定key值的 
            formLabel:[{model:"name",label:"昵称",type:"input"},
                       {model:"sex",label:"性别",type:"select",
                            opts:[{label:"公",value:1},{label:"母",value:0}]},
                       {model:"registerDate",label:"发现日期",type:"date"},
                       {model:"feature",label:"体貌特征",type:"checkbox",
                            opts:[{label:"小型猫",id:0},
                                   {label:"小型犬",id:1},
                                   {label:"大型犬",id:2},
                                   {label:"幼年型",id:3},
                                   {label:"成年型",id:4},
                                   {label:"主体白色",id:5},
                                   {label:"主体黄色",id:6},
                                   {label:"主体黑色",id:7}]  },
                        {model:"info",label:"其他信息",type:"input"}
                      ], 

            // 用户输入的内容 与下面的form属性双向绑定 如果有propsForm 那么就用父组件传过来的
            form: {
                    name:"",
                    sex:'',
                    registerDate:'',
                    feature:[],
                    info:""
                }
            };
    },
   methods:{
    //    把form这个与用户双向绑定的数据发送出去 由receiveForm函数接收
           sendForm(){
               this.$bus.$emit('receiveForm',this.form)
            //    清空数据
               this.form = {name:"",sex:'',registerDate:'',feature:[],info:""}
           }, 

        //    用户想修改表格里面的数据，先弹出来一个表单，表单的内容是表格的内容
           changeForm(theTableData){    

            this.form = theTableData
        }

   },
   mounted(){
       this.$bus.$on('sendForm',this.sendForm)    
       this.$bus.$on('changeForm',this.changeForm)

   }
  


   

}
</script>

<style >

</style>