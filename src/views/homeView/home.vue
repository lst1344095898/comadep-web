<template>
  <div>
<!--    导航栏-->
    <div>
     <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="data_menu" index="1" @click="dataSt">数据统计</el-menu-item>
      <el-menu-item class="userMan_menu" index="2" @click="userMan">用户管理</el-menu-item>
      <el-menu-item class="info_menu" index="3" disabled>消息中心</el-menu-item>
      <div class="my_info_div">
        <el-row class="block-col-2">
            <el-dropdown>
            <span class="el-dropdown-link">
              我的
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" >
                  <span @click="loginOut">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-row>
      </div>
<!--       刷新-->
       <el-menu-item  @click="RefreshDemo">刷新</el-menu-item>
     </el-menu>
    </div>
<!--    数据统计内容部分-->
    <div v-show="isDatePanel">
<!--      图片统计选项-->
      <div class="imgChange_button_div">
        <el-col :span="12">
          <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                   @select="handleSelect2">
            <el-submenu index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>出入频率</span>
              </template>
              <el-menu-item-group>
                <template slot="title">小项</template>
                <el-menu-item index="1-1" @click="localFrequency">本地</el-menu-item>
                <el-menu-item index="1-2" @click="ootFrequency">外地</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="getAgeView">
              <i class="el-icon-menu"></i>
              <span slot="title">年龄化</span>
            </el-menu-item>
            <el-menu-item index="3" >
              <i class="el-icon-document"></i>
              <span slot="title">出入安全提醒</span>
            </el-menu-item>
            <el-menu-item index="4"  @click="MapImport">
              <i class="el-icon-setting"></i>
              <span slot="title">地图设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
<!--      日期选择-->
<!--      <div class="block date_div">-->
<!--&lt;!&ndash;        <span class="demonstration">月</span>&ndash;&gt;-->
<!--        <span>选择时间</span>-->
<!--        <el-date-picker-->
<!--          v-model="valueMonth"-->
<!--          type="month"-->
<!--          placeholder="选择月">-->
<!--        </el-date-picker>-->
<!--        <el-button type="info" plain @click="changeDate">确定</el-button>-->
<!--      </div>-->
<!--      对话框-->
      <div class="mapSetting_div">
        <map-setting v-show="mapSettingList.mapSettingShow" v-bind:mapSettingList = "mapSettingList"></map-setting>
      </div>
<!--      图片展示-->
      <div class="data_img_div">
        <div>
          <Echarts  v-show=showDateController[0] :key="timer" v-bind:echartsList="echartsList" ></Echarts>
        </div>
<!--        展示出入频率-->
        <div>
          <div id="freTime_div" style="position: absolute; top: 20%;right: 8%; display: none">
            <el-date-picker
              v-model="freTime"
              type="month"
              placeholder="选择月">
            </el-date-picker>
            <el-button type="info" plain @click="changeFreTime">确定</el-button>
          </div>
        <access-frequency v-show=showDateController[1]  :key="timer" v-bind:accessFrequencyList="accessFrequencyList"></access-frequency>
        </div>
<!--        年龄比例-->
        <age-view v-show=showDateController[2] :key="timer" v-bind:ageViewList="ageViewList"></age-view>
        <div>

        </div>
      </div>
    </div>
<!--    用户管理界面-->
    <div v-show="isUserPanel">
<!--      搜索框-->
      <div class="search_div">
        <div style="float: left">
          <el-input  style="display: block" class="search_input" placeholder="username/telephone" v-model="search" ></el-input>
        </div>
        <div style="float: left">
          <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
        </div>
      </div>
<!--      导航栏-->
      <div class="userChange_button_div">
        <el-col :span="12">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @select="changeBuilding"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">一号楼</span>
            </el-menu-item>
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
<!--        用户信息-->
        <user-manage  :key="timer" v-bind:userInfoList="userInfoList" ></user-manage>
<!--        分页-->
        <div class="page_div">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="this.pageParameter.currPage"
            :total="this.pageParameter.total"
            :page-size="this.pageParameter.pageSize"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Echarts from "../showDateBy3D/Echarts";
import mapSetting from "./mapSetting";
import userManage from "./userManage";
import accessFrequency from "../showDateBy3D/accessFrequency";
import ageView from "../showDateBy3D/ageView";
export default {
  components: {Echarts,mapSetting,userManage,accessFrequency,ageView},
  comments: {
    Echarts,
    mapSetting,
    userManage,
    accessFrequency,
    ageView,
  },
  data(){
    return{
      showDateController: [true,false],
      echartsList:{
          hours:['北10', '北9', '北8', '北7', '北6', '北5', '北4',
            '北3', '北2', '原点'
          ],
          //Y轴
          days:['原点', '东2', '东3',
            '东4', '东5', '东6', '东7','东8','东9',"东10"],
          //
          dataTemp:[],
          mapValue:[],
      },
      accessFrequencyList:{
        name: '',
        frequency:[],
      },
      ageViewList:{
        averageAge: [],
      },
      activeIndex: '1',
      isDatePanel:true,
      isUserPanel:false,
      search:'',
      rules:{},
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
      timer: '',
      userInfoList:[],
      pageParameter:{
        currPage: 1,
        total: 1,
        pageSize: 8,
        buildingNumber: 0,
        floorNumber: 0,
      },
      //频率时间
      freTime:new Date(),
      //判断是外地还是本地
      LolOrFor: 0,
    }

  },
  mounted() {
    //进行地图数据请求
    this.RefreshDemo();
    //得到用户数据
    this.getUserInfoByParameter();
  },
  methods:{
    //切换显示的图片
    showDateChange(key){
      for (let i=0;i<this.showDateController.length;i++){
        this.showDateController[i]=false;
      }
      this.showDateController[key]=true;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect2(key, keyPath) {
      console.log(key, keyPath);
    }
    ,
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
    RefreshDemo(){
      this.$axios.post("/Map/getMap",{})
        .then(res => {
          let dateTemp={'tea':'12'}
          dateTemp=res.data.data;
          let arrOutside=[];
          for (let x=0;x<dateTemp.length;x++){
            let arrInside=[];
            arrInside.push(dateTemp[x].buildingWidth);
            arrInside.push(dateTemp[x].buildingLength);
            arrInside.push(dateTemp[x].buildingHeight);
            arrInside.push(dateTemp[x].buildingNumber)
            arrOutside.push(arrInside);
          }
          //得到分数
          //发出分数请求
          this.$store.state.dataTemp=arrOutside;
          this.timer = new Date().getTime()
        })
        .catch();
      this.getUserInfoByParameter();
    },
    Refresh(){
      this.timer = new Date().getTime()
    }
    ,
    loginOut(){
      localStorage.removeItem("Authorization")
      // console.log("out")
      this.$router.push('/login');
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageParameter.currPage=val
      this.getUserInfoByParameter();
      console.log(this.pageParameter);
    },
    getUserInfoByParameter(){
      //通过参数得到用户数据
      this.$axios.post('/user/getUserByParameter',{
        currPage: this.pageParameter.currPage,
        total: this.pageParameter.total,
        pageSize: this.pageParameter.pageSize,
        buildingNumber :this.pageParameter.buildingNumber,
        floorNumber :this.pageParameter.floorNumber,
      }).then(res => {
        if (res.data.code === 200){
          this.pageParameter.total=res.data.intResponse
          this.userInfoList=res.data.data;
        }else{
          alert("url: /user/getUserByParameter-->服务器错误")
        }
      }).catch(err => {
        console.error(err)
      })
    },
    changeBuilding(key){
      //选择楼层
      // console.log(key+'楼')
      this.pageParameter.buildingNumber=key;
      this.getUserInfoByParameter()
    },
    searchUser(){
      /**
       * 模糊查询
       */
      this.$axios.post('/user/searchUser',{
        currPage: this.pageParameter.currPage,
        total: this.pageParameter.total,
        pageSize: this.pageParameter.pageSize,
        searchParameter: this.search
      }).then(res=>{
        if (res.data.code===200){
          this.pageParameter.total=res.data.intResponse
          this.userInfoList=res.data.data;
        }else{
          alert("500:服务器错误");
        }
      }).catch(err=>{
        console.error(err);
      })
    },
    /**
     * 改变选中的频率时间
     */
    changeFreTime(){
      //遍历页面展示数组
      this.showDateChange()
      if (this.LolOrFor === 0){
        this.localFrequency();
      }else{
        this.ootFrequency();
      }
      // console.log(this.valueMonth);
      // let y = dataTest.getFullYear();
      // let m = dataTest.getMonth() + 1;
      // m = m < 10 ? '0' + m : m;
      // let d = dataTest.getDate();
      // d = d < 10 ? ('0' + d) : d;
      // let dateTime=y + '-' + m + '-' + d
      // console.log(dateTime);
    },
    /**
     * 选择本地规定月 出入频率
     */
    localFrequency(){
      this.$axios.post('/Map/getAccessFrequencyLocal',{
        "selectedTime" : this.freTime})
      .then(res=>{
        if (res.data.code === 200){
            document.getElementById('freTime_div').style.display = 'block'
            this.LolOrFor=0;
            //页面展示控制
            this.showDateChange(1);
            console.log(this.showDateController)
            //更新
            this.Refresh();
            //出入频率集合
            this.accessFrequencyList.name = '本地出入频率';
            this.accessFrequencyList.frequency={};
            this.accessFrequencyList.frequency=res.data.data;
            console.log(this.accessFrequencyList.frequency);
        }else{
          this.$message({
            type: 'error',
            message: '数据错误!'
          })
        }
      })
      .catch(err=>{
        console.error(err);
      })
    },
    /**
     * 外地频率
     * @constructor
     */
    ootFrequency(){
      this.$axios.post('/Map/getAccessFrequencyOot',{
        "selectedTime" : this.freTime
      })
        .then(res=>{
          document.getElementById('freTime_div').style.display = 'block'
          this.LolOrFor=1;
          this.showDateChange(1);
          console.log(this.showDateController)
          this.Refresh();
          this.accessFrequencyList.name = '外地出入频率';
          this.accessFrequencyList.frequency={};
          this.accessFrequencyList.frequency=res.data.data;
          console.log(this.accessFrequencyList.frequency)
        })
        .catch(err=>{
          console.error(err);
        })
    },
    getAgeView(){
      this.$axios.post('/viewData/getAgeView')
      .then(res=>{
        this.showDateChange(2);
        this.Refresh();
        this.ageViewList.averageAge={};
        this.ageViewList.averageAge=res.data.data;
      })
      .catch(err=>{
        console.error(err);
      })
    }
  }
}
</script>
<style scoped src="../../assets/css/homeCss/home.css">
</style>
