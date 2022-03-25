<template>
  <div class="main" v-if="this.$store.state.userInfo.hadLogin">
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
        <common-table   
        :propsTableData="currentUserPoints"
        :propsTableLabel="tableLabel" />
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

     

export default {
  components: { CommonTable ,MyEcharts,UserInfo, },
  data() {
    return {
      currentUserPoints: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).points : [],
      tableLabel:[{label:"日期",prop:"date"},
                  {label:"详情",prop:"detail"},
                  {label:"积分",prop:"points"}],
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
                data: [10,5 ,8, 8]
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
                data: [{value:1,name:'注册'},{value:10,name:'上传轨迹'}],
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
              data: [1, 2, 3]
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
  mounted(){
    this.$bus.$on('userLogin',this.getCurrentUserInfo)
    // data里面的数据不能调用data的数据，但是可以提前给它赋值


    // 先获取当前用户的信息
    

    // 表格数据的展示 在data里面已经准备好了 
   

    // 积分月报 的时间调整
    let currentDate = new Date()
    let month = currentDate.getMonth() + 1
    this.monthPoints.xAxis.data = [month-1+'月',month+'月',month+1+'月']

    // 积分周报的数据调整  localStorage中有xData1234 这4个数据 存放的是 当前用户的积分

    // 得到当前用户的总积分
    let totalPoints = this.currentUserPoints

    // 修改xData 1234 让其与用户行为一一对应

     // xData1 是第一周的总积分  xData2 是第二周的总积分
    let xData1 = 0
    let xData2 = 0
    let xData3 = 0
    let xData4 = 0

    for (let item of totalPoints){
       if(item.date.substring(7) <=7){
             xData1 += item.points
       }
       else if(item.date.substring(7) <=13){
             xData2 += item.points
       }
       else if(item.date.substring(7) <=19){
             xData3 += item.points
       }
       else{
             xData4 += item.points
       }
    }
    // console.log(xData4)  从sessionStorage中得到的数据 来修正xData的值 并传给柱状图和饼状图
   
   

    // 让柱状图通过props接收这个数据
    this.weekPoints.series[0].data[0] = xData1
    this.weekPoints.series[0].data[1] = xData2
    this.weekPoints.series[0].data[2] = xData3
    this.weekPoints.series[0].data[3] = xData4


    // 积分占比数据调整  还未调整
   

   
  },
  methods:{
      getCurrentUserInfo(){
        this.currentUserPoints = JSON.parse(sessionStorage.getItem('userInfo')).points
      }
  }
 
 
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
