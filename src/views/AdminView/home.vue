<template>
  <div id="home_main_div">
    <div id="backgroundMask" class="background_mask" style="display: none">
    </div>
<!--    导航栏-->
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="data_menu" index="1" @click="dataSt">数据统计</el-menu-item>
      <el-menu-item class="userMan_menu" index="2" @click="userMan">用户管理</el-menu-item>
      <el-menu-item class="info_menu" index="3"  @click="message">消息中心</el-menu-item>
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
            <el-menu-item index="3"  @click="accSecurityInfo">
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
      <div id="accSecurityInfo" class="accSecurityInfo" style="display: none">
        <h3 style="margin-left: 180px">出入安全提醒</h3>
        <el-form ref="form" :model="accSecurityInfoForm" label-width="80px">
          <el-form-item label="通知名">
            <el-input v-model="accSecurityInfoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="通知地点">
            <el-checkbox-group v-model="accSecurityInfoForm.region">
              <el-checkbox label="1号楼" name="type"></el-checkbox>
              <el-checkbox label="2号楼" name="type"></el-checkbox>
              <el-checkbox label="3号楼" name="type"></el-checkbox>
              <el-checkbox label="4号楼" name="type"></el-checkbox>
              <el-checkbox label="5号楼" name="type"></el-checkbox>
              <el-checkbox label="6号楼" name="type"></el-checkbox>
              <el-checkbox label="7号楼" name="type"></el-checkbox>
              <el-checkbox label="8号楼" name="type"></el-checkbox>
              <el-checkbox label="9号楼" name="type"></el-checkbox>
              <el-checkbox label="10号楼" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否置顶">
            <el-switch v-model="accSecurityInfoForm.toTop"></el-switch>
          </el-form-item>
          <el-form-item label="通知类别">
            <el-checkbox-group v-model="accSecurityInfoForm.type">
              <el-checkbox label="天气" name="type"></el-checkbox>
              <el-checkbox label="事故" name="type"></el-checkbox>
              <el-checkbox label="疫情" name="type"></el-checkbox>
              <el-checkbox label="社区" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input type="textarea" v-model="accSecurityInfoForm.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendNotice">发起通知</el-button>
            <el-button @click="cancelAcc">取消</el-button>
          </el-form-item>
        </el-form>

      </div>
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
          <div id="freTime_div" style="position: absolute; top: 20%;right: 2%; display: none">
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
      </div>
    </div>
  </div>

</template>
<script>
import Echarts from "../showDateBy3D/Echarts";
import mapSetting from "./mapSetting";
import accessFrequency from "../showDateBy3D/accessFrequency";
import ageView from "../showDateBy3D/ageView";
export default {
  components: {Echarts,mapSetting,accessFrequency,ageView},
  comments: {
    Echarts,
    mapSetting,
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
      //出入安全提醒消息
      accSecurityInfoForm: {
        name: '',
        region: [],
        toTop: false,
        type: [],
        content: ''
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
      //频率时间
      freTime:new Date(),
      //判断是外地还是本地
      LolOrFor: 0,
    }

  },
  mounted() {
    //进行地图数据请求
    this.RefreshDemo();
  },
  methods:{
    /**
     * 跳转到消息页面
     */
    message(){
      this.$router.push("/messages")
    },
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
    /**
     * 跳转到用户管理界面
     */
    userMan(){
      this.$router.push("/userManagement");
    },
    MapImport(){
      this.mapSettingList.mapSettingShow=true;
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
        .catch(err => {
          // length bug
          let x= err;
          x="";
          console.log(x);
        });
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
          this.Refresh();
          this.accessFrequencyList.name = '外地出入频率';
          this.accessFrequencyList.frequency={};
          this.accessFrequencyList.frequency=res.data.data;
        })
        .catch(err=>{
          console.error(err);
        })
    },
    /**
     * 得到年龄视图
     */
    getAgeView(){
      this.$axios.post('/viewData/getAgeView',{
        buildingNumber : 1,
      })
      .then(res=>{
        if (res.data.code===200){
            this.hiddenTime();
            this.showDateChange(2);
            this.Refresh();
            this.ageViewList.averageAge={};
            this.ageViewList.averageAge=res.data.data;
        }
      })
      .catch(err=>{
        console.error(err);
      })
    },
    /**
     * 隐藏频率时间选择器
     */
    hiddenTime(){
      document.getElementById("freTime_div").style.display="none"
    },
    /**
     * 编写给用户提醒的消息
     * 出入安全提醒
     */
    accSecurityInfo(){
        document.getElementById("accSecurityInfo").style.display="block";
        document.getElementById("backgroundMask").style.display="block";


    },
    /**
     * 取消
     * 安全出入提醒说明
     */
    cancelAcc(){
      document.getElementById("accSecurityInfo").style.display="none";
      document.getElementById("backgroundMask").style.display="none";
    },
    /**
     * 发起通知
     */
    sendNotice(){

      this.$axios.post("message/sendNotice",
        {
          noticeName:this.accSecurityInfoForm.name,
          noticeRegion:this.accSecurityInfoForm.region.toString(),
          noticeToTop: this.accSecurityInfoForm.toTop,
          noticeType: this.accSecurityInfoForm.type.toString(),
          noticeContent: this.accSecurityInfoForm.content,
          noticeCategory: "security"
        })
      .then(res =>{
        if (res.data.code === 200){
          alert("请求成功")
          document.getElementById("accSecurityInfo").style.display="none";
          document.getElementById("backgroundMask").style.display="none";
        }
      })
        .catch(error =>{
          console.error(error);
        })
    }
  }
}
</script>
<style scoped src="../../assets/css/homeCss/home.css">
</style>
