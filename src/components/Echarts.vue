<template>
  <!-- 这是echarts的展示区域 需要定义一个宽高 -->

  <div ref="echartsArea"></div>
</template>

<script>
// 需要npm安装或者用CDN在线引入echarts 注意引入方式是别名引入
import * as echarts from "echarts";

export default {
  name: "MyEcharts",
  // 用props接收一下父组件传来的数据
  props: {
    // 鉴定一下是不是barChart(柱状图) 柱状图和折线图都有x、y轴，它俩数据类型相似
    isBarChart: {
      type: Boolean,
      // 默认为真，pie饼状图时应传入值为假
      default: true,
    },
    // 图表的数据源 类型应是对象 这里只有两个数据就行了  图表的样式数据由下面的barChartOption定义
    chartData: {
      type: Object,
      default() {
        // 至少要传过来一个xAxis对象和series数组 并由对象将他们俩包裹
        return {
          xAxis: {
            type:"false",
            data: ["x轴名称1", "x轴名称2"],
          },
          yAxis:{
            type:"false"
          },
          series: [
            {
              name: "我是描述信息",
              type: "我是图表种类",
              data: ["我是x轴对应的数值1", "number类型"],
            },
          ],
        };

      },
    },
  },
  // 存放柱状图和饼状图的配置数据 option
  data() {
    return {
      // 柱状图/折线图Option种类类型定义
      barChartOption: {
        // 标题名称
        title: {
          text: "积分周表",
          
        },
        // hover提示
        tooltip: {},
        // x轴数据 这个数据应该是由其他组件传过来
        xAxis: { type:null ,data:[]},
        // y轴数据
        yAxis: { type:null},
        // 图表种类数据 有几种柱子/有几种折线 (一种就一个对象) 数值分别是多少 应该由其他组件传过来
        series: [{type: "pie",
                  data: [],}],
      },
     
      // 饼状图Option示例
      pieChartOption: {
        title: {
          text: "积分占比",
        //   left: "center",
        },

        series: [
          {
            type: "pie",
            data: [],
            // 内半径和外半径 也可以是px单位，当内半径为0时就是一个普通的饼状图
            radius: ["40%", "10%"],
          },
        ],
      },
      //  用于判断echarts有没有被初始化过
      myEcharts: null,
    };
  },
  computed: {
    // 如果是柱状图返回柱状图数据，否则返回饼状图数据 chartData是数据源
    // 但是可能没有样式标题等属性 所以不直接用chartData 而是把里面的值传入到barChartOption里
    options() {
      return this.isBarChart ? this.barChartOption : this.pieChartOption;
    },
  },
  watch: {
    // 如果传入的chartData的值改变了 那么就重选绘制echarts图表
    chartData: {
      immediate: true,
      deep: true,
      handler: function () {
        
        // 如果数据发生变化了，再绘制一遍图表
        // 新建一个promise对象 防止在Dom出现之前 echarts就已经执行了初始化操作
        let p = new Promise((resolve) => {
          resolve();
        });
        //然后异步执行echarts的初始化函数
        p.then(() => {
          this.paintChart();
        });
      },
    },
  },
  methods: {
    paintChart() {
      // 渲染绘制echarts图表之前先准备好数据
      this.initChartData();
        
      //  再判断一下有没有被初始化过
      if (this.myEcharts) {
        // 如果echarts已经被初始化过了，就直接进行渲染
        this.myEcharts.setOption(this.options);
      } else {
        // echarts没有初始化过，那么就先初始化再进行绘制
        this.myEcharts = echarts.init(this.$refs.echartsArea);
        this.myEcharts.setOption(this.options);
      }
    },

    // 初始化数据 把得到的chartData的数据放到真正要使用的数据里面
    initChartData() {
      if (this.isBarChart) {
        this.barChartOption.title = this.chartData.title;
        this.barChartOption.xAxis.data = this.chartData.xAxis.data;

        
        this.barChartOption.series = this.chartData.series;
      } else {
        this.pieChartOption.series = this.chartData.series;
      }
    },
  },
};
</script>
    初始化数据中，没有把所有的属性给过去 有的默认的使用的是barChartOption里面的
    而且这个组件也不是利用方法传递给Echarts组件的 只能是父子之间props通信
<style scoped>
div {
  width: 380px;
  height: 400px;
}
</style>