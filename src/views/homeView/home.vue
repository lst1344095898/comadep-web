<template>
  <div>
<!--    导航栏-->
    <div>
     <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="data_menu" index="1" @click="dataSt">数据统计</el-menu-item>
      <el-menu-item class="userMan_menu" index="2" @click="userMan">用户管理</el-menu-item>
      <el-menu-item class="info_menu" index="3" disabled>消息中心</el-menu-item>
      <el-menu-item class="my_menu" index="4"><a href="https://www.ele.me" target="_blank">我的</a></el-menu-item>
       <el-menu-item  index="5" @click="testDemo">用户管理</el-menu-item>
     </el-menu>
    </div>
<!--    数据统计内容部分-->
    <div v-show="isDatePanel">
<!--      图片统计选项-->
      <div class="imgChange_button_div">
        <el-col :span="12">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>出入频率</span>
              </template>
              <el-menu-item-group>
                <template slot="title">小项</template>
                <el-menu-item index="1-1">本地图</el-menu-item>
                <el-menu-item index="1-2">外地</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">年龄化</span>
            </el-menu-item>
            <el-menu-item index="3" >
              <i class="el-icon-document"></i>
              <span slot="title">工作分类</span>
            </el-menu-item>
            <el-menu-item index="4"  @click="MapImport">
              <i class="el-icon-setting"></i>
              <span slot="title">地图设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
<!--      对话框-->
      <div class="mapSetting_div">
        <map-setting v-show="mapSettingList.mapSettingShow" v-bind:mapSettingList = "mapSettingList"></map-setting>
      </div>
<!--      图片展示-->
      <div class="data_img_div">
        <Echarts :key="timer" v-bind:echartsList="echartsList" ></Echarts>
      </div>
    </div>
<!--    用户管理界面-->
    <div v-show="isUserPanel">
<!--      搜索框-->
      <div class="search_div">
        <div style="float: left">
          <el-input  style="display: block" class="search_input" placeholder="search" v-model="search" ></el-input>
        </div>
        <div style="float: left">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
<!--      导航栏-->
      <div class="userChange_button_div">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>一号楼</span>
              </template>
              <el-menu-item-group>
                <template slot="title">楼层</template>
                <el-menu-item index="1-1">1F</el-menu-item>
                <el-menu-item index="1-2">2F</el-menu-item>
                <el-menu-item index="1-3">3F</el-menu-item>
                <el-menu-item index="1-4">4F</el-menu-item>
                <el-menu-item index="1-5">5F</el-menu-item>

              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">二号楼</span>
            </el-menu-item>
            <el-menu-item index="3" >
              <i class="el-icon-document"></i>
              <span slot="title">三号楼</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">四号楼</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
<!--      数据表格-->
      <div class="userShowTable_div">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>
<script>
import Echarts from "@/views/showDateBy3D/Echarts";
import mapSetting from "@/views/homeView/mapSetting";
export default {
  components: {Echarts,mapSetting},
  comments: {
    Echarts,
    mapSetting,
  },
  data(){
    return{
      echartsList:{
          hours:['北10', '北9', '北8', '北7', '北6', '北5', '北4',
            '北3', '北2', '原点'
          ],
          //Y轴
          days:['原点', '东2', '东3',
            '东4', '东5', '东6', '东7','东8','东9',"东10"],
          //
          dataTemp:[],
      },
      activeIndex: '1',
      isDatePanel:true,
      isUserPanel:false,
      search:'',
      rules:{},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
      ,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      mapSettingList:{
        mapSettingShow:false,//地图设置的显示
        options: [{
          value: '选项1',
          label: '10*10'
        }, {
          value: '选项2',
          label: '20*20'
        }, {
          value: '选项3',
          label: '30*30'
        }],
        initMapForm: {
          mapStyle: ''
        },
      },
      timer: ''
    }

  },
  mounted() {
    //进行地图数据请求
    this.testDemo();
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    dataSt(){
      this.isUserPanel = false;
      this.isDatePanel = true;
    },
    userMan(){
      this.isDatePanel = false;
      this.isUserPanel = true;
    },
    MapImport(){
      this.mapSettingList.mapSettingShow=true;
    },
    UpdateCoordinates(){

    },
    testDemo(){
      this.$axios.post("/Map/getMap",{})
        .then(res => {
          let dateTemp=res.data.data;
          let arrOutside=[];
          for (let x=0;x<dateTemp.length;x++){
            let arrInside=[];
            arrInside.push(dateTemp[x].buildingWidth);
            arrInside.push(dateTemp[x].buildingLength);
            arrInside.push(dateTemp[x].buildingHeight);
            arrInside.push(dateTemp[x].buildingNumber)
            arrOutside.push(arrInside);
          }
          console.log("testdata",arrOutside)
          this.$store.state.dataTemp=arrOutside;
          this.timer = new Date().getTime()
        })
        .catch()
    }
  }
}
</script>

<style scoped src="../../assets/css/homeCss/home.css">
</style>
