<template>
  <div id="myChart" :style="{width: '1500px', height: '800px'}">
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
  name: 'Echarts',
  props: ['echartsList'],
  data () {
    return {
      msg: 'Welcome use Echarts',


    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
      //初始化
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'));
      //X坐标轴
      let hours=this.echartsList.hours;
      console.log('hours',hours);
      //Y坐标轴
      let days = this.echartsList.days;
      //Z坐标轴
      let  dataTemp = this.echartsList.dataTemp;
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#bdcfd0',
        //提示框
        tooltip: {},
        visualMap: {
          max: 20,
          inRange: {
            color: ['#58e830','#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1',]
          }
        },
        //3DX轴
        xAxis3D: {
          type: 'category',
          data: hours,
        },
        yAxis3D: {
          type: 'category',
          data: days
        },
        zAxis3D: {
          type: 'value'
        },
        //长宽高
        grid3D: {
          boxWidth: 200,
          boxDepth: 200,
          viewControl: {
            // projection: 'orthographic'
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [{
          type: 'bar3D',
          name:'安全系数',
          data: dataTemp.map(function (item) {
            return {
              value: [item[1], item[0], item[2],item[2]],
              name: item[1]+'号楼'
            }
          }),
          shading: 'lambert',
          // 标注字的的颜色
          label: {
            textStyle: {
              fontSize: 16,
              borderWidth: 1
            }
          },
          // 标注字的的颜色
          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#900'
              }
            },
            //选中后
            itemStyle: {
              color: '#4e7eba'
            }
          }
        }]
      });
    }
  }
}
</script>
