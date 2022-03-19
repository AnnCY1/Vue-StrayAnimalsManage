<template>
  <el-table :data="tableData" style="width: 100% ">

      <!-- v-for循环一个对象，value对应属性值，key对应键名（属性名） -->
      <!-- v-for循环一个数组 value对应属性值,index对应下标 -->
          <el-table-column v-for="(value,key) in tableLabel" 
          :key="key" :prop="key" 
          :label="value" width="180"> </el-table-column>
        </el-table>
</template>


// Table组件无法引入的原因可能是table组件名和html标签名重复了，如果是的话会有报错提醒，或者是components拼错了，
手动把模板结构和数据带到展示页（userInfo.vue）使用 

<script>
    export default {
    name: "CommonTable",
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

/* 这一句只有在index.html里面才能生效  如果是*/
    .el-table--scrollable-x  div.el-table__body-wrapper{
        overflow: hidden !important;
    }
</style>