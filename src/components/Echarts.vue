<template>
  <div ref = "echartsArea" width:100% height:100%>
      <!-- 这是echarts的展示区域 需要定义一个宽高 -->
  </div>
</template>

<script>

// 需要npm安装或者用CDN在线引入echarts 注意引入方式
import * as echarts from 'echarts';

export default {
    name:"Echarts",
    // 用props接收一下数据
    props:{
        // 鉴定一下是不是barChart(柱状图) 柱状图和折线图都有x、y轴，它俩数据类型相似
        isBarChart:{
            type:Boolean,
            // 默认为真，pie饼状图时应传入值为假
            default:true
        },
        // 图表的数据 类型应是对象
        chartData:{
            type:Object,
            default(){
                return{
                    xData:[],
                    series:[],
                }
            }
        },
    },
    // 存放柱状图和饼状图的配置数据 option
    data(){
        return{
            // 柱状图/折线图Option示例
        barChartOption:{
            // 标题名称
            title: {
                    text: 'ECharts 入门示例'
                    },
            // hover提示
            tooltip: {},
            // x轴数据
            xAxis: {
                       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
            // y轴数据
            yAxis: {},
            // 图表种类数据 有几种柱子/有几种折线 (一种就一个对象) 数量分别是多少
            series: [
                    {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            },
            // 饼状图Option示例
        pieChartOption:{
            title: {
                text: '圆环图的例子',
                left: 'center',
                top: 'center'
            },
            series: [
                {
                type: 'pie',
                data: [
                    {
                    value: 335,
                    name: 'A'
                    },
                    {
                    value: 234,
                    name: 'B'
                    },
                    {
                    value: 1548,
                    name: 'C'
                    }
                ],
                // 内半径和外半径 也可以是px单位，当内半径为0时就是一个普通的饼状图
                radius: ['40%', '70%']
                }
            ]
          },
        //  用于判断echarts有没有被渲染过
          hadRender:null
        }
    },
    computed:{
        // 如果是柱状图返回柱状图数据，否则返回饼状图数据
        options(){
            return this.isBarChart ? this.barChartOption : this.pieChartOption
        }
    },
    watch:{
        chartData:{
            immediately:true,
            deep:true,
            handler(){
                // 如果数据发生变化了，初始化图表
                this.initChart(); 
            }
        }
    },
    methods:{
        initChart(){
            this.initChartData()
            // 渲染echarts
            if(this.hadRender){
                // 如果echarts已经被渲染过了，就再次进行渲染
                this.echarts.setOption(this.options)
            }
            else{
                this.hadRender = echarts.init(this.$refs.echarts)
                this.hadRender.setOption(this.options)
            }
        },
        initChartData(){
            if(this.isBarChart){
                this.barChartOption.xAxis.data = this.chartData.xData
                this.barChartOption.series = this.chartData.series
            }
            else{
                this.pieChartOption.series = this.chartData.series
            }
        }
    }
}
</script>

<style>

</style>