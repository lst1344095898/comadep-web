<template>
  <div :style="{width: '1500px',height: '800px'}">
    <div id="ageView" :style="{width: '1500px',height: '800px'}">
    </div>
    <div class="buildSel_div">
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        选择楼号<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">1号楼</el-dropdown-item>
            <el-dropdown-item command="2">2号楼</el-dropdown-item>
            <el-dropdown-item command="3">3号楼</el-dropdown-item>
            <el-dropdown-item command="4">4号楼</el-dropdown-item>
            <el-dropdown-item command="5">5号楼</el-dropdown-item>
            <el-dropdown-item command="5">6号楼</el-dropdown-item>
            <el-dropdown-item command="5">7号楼</el-dropdown-item>
            <el-dropdown-item command="5">8号楼</el-dropdown-item>
            <el-dropdown-item command="5">9号楼</el-dropdown-item>
            <el-dropdown-item command="5">10号楼</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>

</template>

<script>
let echarts = require('echarts/lib/echarts')
//引入
require('echarts/lib/chart/pie')
//引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/timeline')
export default {
  name: "ageView",
  props: ["ageViewList"],
  data(){
    return{
      msg: 'Welcome use Echarts',
    }
  },
  mounted() {
    this.drawLine();
  },
  methods:{
    /**
     * 绘制图形
     */
    drawLine(){
      //初始化
      let ageView = echarts.init(document.getElementById("ageView"))
      ageView.setOption({
        title: {
          text: this.ageViewList.name,
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: this.ageViewList.averageAge.babyNumber, name: '婴儿'},
              {value: this.ageViewList.averageAge.juvenileNumber, name: '少年'},
              {value: this.ageViewList.averageAge.youthNumber, name: '青年'},
              {value: this.ageViewList.averageAge.adultNumber, name: '成人'},
              {value: this.ageViewList.averageAge.elderlyNumber, name: '老年'}
            ]
          }
        ]
      })

    },
    /**
     * 选择楼号
     */
    handleCommand(command) {
      this.$axios.post('/viewData/getAgeView',{
        buildingNumber : command,
      })
        .then(res=>{
          if (res.data.code===200){
            this.ageViewList.averageAge={};
            this.ageViewList.averageAge=res.data.data;
          }
        })
        .catch(err=>{
          console.error(err);
        })
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .buildSel_div{
    position: absolute;
    width: 300px;
    height: 400px;
    top: 10%;
    right:300px;
  }

</style>
