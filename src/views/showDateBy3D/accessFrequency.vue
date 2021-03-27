<template>
  <div id="accessFrequency" :style="{width: '1500px', height: '800px'}">
  </div>
</template>

<script>
//引入Echarts 主模板
let echarts =require('echarts/lib/echarts')
//引入柱状图
require('echarts/lib/chart/bar')
//引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: "accessFrequency",
  props: ['accessFrequencyList'],
  data(){
    return{
      msg: 'Welcome use Echarts',
    }
  },
  mounted() {
    this.drawLine();
  }
  ,
  methods:{
    drawLine(){
      //初始化
      // 基于准备好的dom，初始化echarts实例
      let accessFrequency = echarts.init(document.getElementById('accessFrequency'));
      accessFrequency.setOption({
        title: {
          text: this.accessFrequencyList.name,
        },
        tooltip:{
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        }
        ,
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
        xAxis: [{
          type: 'category',
          data: ['一号楼', '二号楼', '三号楼', '四号楼', '五号楼', '六号楼', '七号楼'
          ,'八号楼','九号楼','十号楼'],
          axisTick: {
            alignWithLabel: true
          }
          }],
        yAxis:[{
          type: 'value'
        }],
        series:[{
          name:'频率 /月',
          data: this.accessFrequencyList.frequency,
          type: 'bar',
        }]
      });
    }
  }
}
</script>
