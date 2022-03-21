<template>
<div class="tableWrap">
    <!-- table不显示可能是因为版本问题 或者是因为宽高未定义，我这里是因为父容器使用了absolute定位 table就不见了 -->
    <!-- 如果父组件给common-table传值了，那么就用props里面的，如果没有 那么就用自己的 -->
  <el-table :data="propsTableData||tableData" >

      <!-- v-for循环一个对象，value对应属性值，key对应键名（属性名） -->
      <!-- v-for循环一个数组 value对应属性值,index对应下标 -->
          <el-table-column  align="center"  show-overflow-tooltip
          v-for="(item,index) in (propsTableLabel || tableLabel)" 
          :key= "index" :prop="item.prop" 
          :label="item.label" :width="item.width || '180px'">

          <!-- 这里使用作用域插槽 是为了方便拿到数据并进行展示 这里的父子关系是 el-table是父组件,el-table-cloumun是子组件 -->
            <template slot-scope="scope">
            <!-- toSting是为了更好的展示数组 ，数组直接展示是 ['...','...']  把它转换成String形式的就好了-->
                <span>{{ (scope.row[item.prop]).toString()   }}</span>
            </template> 

          </el-table-column>

      <!-- 是否可以操作  在isOperate是false的情况下 不允许操作 默认是false -->
          <el-table-column label="操作" align="center" min-width="180px" v-if="tableConfig.isOperate">
              <template slot-scope="scope">
                <el-button type="primary" @click="upgradeData(scope.row)" >更新</el-button>
                <el-button type="danger"  @click="deleteData(scope.row)" >删除</el-button>
              </template> 
          </el-table-column>
    </el-table>

    <!-- 分页  在total是0的情况下 不显示 默认是0-->
    <el-pagination class="pager" v-if="tableConfig.total"
                   layout="prev,pager,next"
                   :total="tableConfig.total"
                   :current-page.sync ="tableConfig.page"
                   @current-change="changePage"
                   :page-size="20">
    </el-pagination>
</div>

</template>


// Table组件无法引入的原因可能是table组件名和html标签名重复了，如果是的话会有报错提醒，或者是components拼错了，
// 可以选择让页面父组件传入数据， 也可以在表格组件里面直接使用默认数据

<script>

    export default {
    name: "CommonTable",
    props:{
        propsTableData:{
            type:Array,
            default(){
                return this.tableData
            }
        },
        propsTableLabel:{
            type:Array,
            default(){
                return this.tableLabel
            }
        },
        tableConfig:{
            type:Object,
            default(){
                return {
                    total:0,
                    isOperate:false,
                    page:0
                }
            }
        }
    },
    data() {
        return {
           
           tableData: [
               {
                date: "2022-05-02",
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
            ],
            // 每一列的列名    prop是el-table需要的一个属性，el-table通过键名来获取到相应的数据  所以prop要与真实数据的键名一致            
            tableLabel:[{label:"日期",prop:"date"},
                        {label:"详情",prop:"detail"},
                        {label:"积分",prop:"points"}]
        };
    }, 
    methods:{
        upgradeData(row){
            this.$bus.$emit("upgradeTable",row)
        },
        deleteData(row){
             this.$bus.$emit("deleteTable",row)
        },
        changePage(){
            console.log(1);
        },
    }
   
};
</script>

<style lang= "less" scoped>

/* 这一句只有在index.html里面才能生效  */
    .el-table--scrollable-x  div.el-table__body-wrapper{
        overflow: hidden ;
    }

</style>