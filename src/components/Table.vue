<template>
  <el-table :data="tableData" style="width: 100%">

      <!-- v-for循环一个对象，value对应属性值，key对应键名（属性名） -->
      <!-- v-for循环一个数组 value对应属性值,index对应下标 -->
          <el-table-column v-for="(value,key) in tableLabel" 
          :key="key" :prop="key" 
          :label="value" width="180"> </el-table-column>
        </el-table>
</template>


// Table组件无法引入，只能是手动把模板结构和数据带到展示页（userInfo.vue）使用 所以这个组件其实是没有用上的


<script>
    export default {
    name: "Table",
    data() {
        return {
           tableData: [
                {
                date: "2016-05-02",
                detail: "上传轨迹",
                points: "+1",
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
            tableLabel:{
                date:"日期",
                detail:"详情",
                points:"积分"
              }       
        };
    }, 
};
</script>

<style lang= "less" scoped>
    .el-table__body-wrapper{
        overflow: hidden;
    }
</style>