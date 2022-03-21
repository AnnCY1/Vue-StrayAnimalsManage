<template>
  <div class="main">
    <!-- 整个main区域二行，第一行三列，第二行两列 -->
    <el-row :gutter="40" class="row1">
      <!-- 个人用户中心信息 -->
      <el-col :span="8">
       <user-info></user-info>
      </el-col>

      <!--柱状图  周积分-->
      <el-col :span="6">
          <el-card shadow="hover" class="barCard">
            <my-echarts
              :chartData="this.weekPoints"
              :isBarChart="true"
            ></my-echarts>
          </el-card>
        
      </el-col>

      <!-- 饼状图  现有积分占比 -->
      <el-col :span="6"> 
          <el-card shadow="hover">
            <my-echarts
              :chartData="this.piePoints"
              :isBarChart="false"
            ></my-echarts>
          </el-card> 
      </el-col>
    </el-row>

    <el-row :gutter="40" class="row2">
      <!-- 表格 -->
      <el-col :span="8">
        <common-table />
      </el-col>

      <!-- 折线图 -->
      <el-col :span="12">
         <el-card shadow="hover">
            <my-echarts
                :chartData="this.monthPoints"
                class="lineChart"
              ></my-echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyEcharts from '../components/Echarts.vue';
import CommonTable from "../components/CommonTable.vue";
import UserInfo from '../components/UserInfo';

// 柱状图 4周的数据源  写在data里echarts读不出来，不知道是不是执行顺序的原因 
// 写在外面的缺点就是不能存储也不能响应式，通过localStorage可以存储，但是只有刷新才能响应
let firstWeek = {
  // 每个月的1-7号算第一周，7-14是第二周 xData就是series的data值 积分有变化就添加到这里面
        date:7,
        xData:JSON.parse(localStorage.getItem("xData1"))
     },
     secondWeek = {
        date:14,
        xData:JSON.parse(localStorage.getItem("xData2"))
     },
     thirdWeek = {
        date:21,
        xData:JSON.parse(localStorage.getItem("xData3"))
     },
     lastWeek = {
        xData:JSON.parse(localStorage.getItem("xData4"))
     }
     

export default {
  components: { CommonTable ,MyEcharts,UserInfo, },
  data() {
    return {
      name:"userCenter",
      // 周积分
       weekPoints:{
            // 标题名称
            title: {
                    text: '积分周表'
                    },
 
            // x轴数据
            xAxis: {
                       data: ['第一周', '第二周', '第三周', '第四周']
                    },
            // 图表种类数据 有几种柱子/有几种折线 (一种就一个对象) 数量分别是多少
            series: [
              {
                name: '积分',
                type: 'bar',
                data: [firstWeek.xData, secondWeek.xData,thirdWeek.xData, lastWeek.xData]
              }
                    ]
            },
      // 积分占比
        piePoints:{
            title: {
                    text: '积分占比'
                    },
            series: [
                {
                type: 'pie',
                data: [
                    { value: 20,name: '义工护理'}, 
                    { value: 15,name: '上传轨迹'},
                    { value: 3,name: '其他'}, 
                    { value: 3,name: '其他'} 
                ],
                radius: ['20%', '50%']
               }
             ]
        },
      // 积分月报
        monthPoints:{
            title: {
                    text: '积分月报'
                    },
            xAxis: {
              data: ['一月', '二月', '三月']
            },
           
            series: [
              {
                data: [12, 20, 15],
                type: 'line'
              }
            ]
          
        }
    };
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
  .el-card {
    width: 100%;
    height: 100%;
  }

  .lineChart{
    width: 100%;
    height: 400px;
  }


</style>
