<template>
  <div id="message_main_div" class="message_main_div">
<!--    导航栏-->
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item class="data_menu" index="1" @click="dataSt">数据统计</el-menu-item>
        <el-menu-item class="userMan_menu" index="2" @click="userMan">用户管理</el-menu-item>
        <el-menu-item class="info_menu" index="3" >消息中心</el-menu-item>
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
    <div class="left_navigation_div">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :router="false"
        :collapse="false">
        <el-menu-item index="1" @click="myMessage">
            <i class="el-icon-location"></i>
            <el-badge :value="12" class="item">
              <span>我的消息</span>
            </el-badge>
        </el-menu-item>
        <el-menu-item index="2" @click="getFeedback">
          <i class="el-icon-menu"></i>
          <el-badge :value="14" class="item">
            <span >收到反馈</span>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="3" @click="goNewsRelease">
          <i class="el-icon-document"></i>
          <span slot="title">发布消息</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
<!--    子页面-->
    <div id="subpage_div_message"  class="subpage_div_message" style="display: block">
      <router-view></router-view>
    </div>
    <div id="content_div_message" style="display: none">
      <div id="deliver_ann" class="deliver_ann">
        <div class="message_content" >
          <div class="deliver_title">
             <span style="margin-left: 40%">社区通知</span>
          </div>
          <el-form :model="noticeForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
          style="margin-top: 20px"
          >
            <el-form-item label="通知名称" prop="name">
              <el-input v-model="noticeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="通知区域" prop="region">
              <el-checkbox-group v-model="noticeForm.region">
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
            <el-form-item label="是否置顶" prop="delivery">
              <el-switch v-model="noticeForm.toTop"></el-switch>
            </el-form-item>
            <el-form-item label="通知性质" prop="type">
              <el-checkbox-group v-model="noticeForm.type">
                <el-checkbox label="社区卫生" name="type"></el-checkbox>
                <el-checkbox label="社区活动" name="type"></el-checkbox>
                <el-checkbox label="疫情相关" name="type"></el-checkbox>
                <el-checkbox label="政府通知" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="消息内容" prop="desc">
              <el-input type="textarea" v-model="noticeForm.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sendNotice">发送通知</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data(){
    return{
      activeIndex: '3',
      noticeForm: {
        name: '',
        region: [],
        toTop: false,
        type: [],
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入通知名称', trigger: 'blur' },
          { min: 0, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择通知范围', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个通知性质', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写消息内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {

  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //跳到数据统计
    dataSt(){
      this.$router.push("/home")
    },
    //用户管理页面跳转
    userMan(){
      this.$router.push("/userManagement")
    },
    /**
     * 退出登录
     */
    loginOut(){
      localStorage.removeItem("Authorization")
      // console.log("out")
      this.$router.push('/login');
    },
    /**
     * 刷新
     * @constructor
     */
    RefreshDemo(){

    },
    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('发送成功!');

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 重组表单数据
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 查看我收到的消息
     */
    myMessage(){
      document.getElementById("content_div_message").style.display="none"
      document.getElementById("subpage_div_message").style.display="block"
      this.$router.push("/messages/adminMessages")
    },
    /**
     * 反馈页面
     */
    getFeedback(){
      this.$router.push("/messages/feedBack")
    },
    /**
     * 到消息发布页面
     */
    goNewsRelease(){
      this.$router.push("/messages")
      document.getElementById("subpage_div_message").style.display="none"
      document.getElementById("content_div_message").style.display="block"
    },
    /**
     * 发送社区消息
     */
    sendNotice(){
      this.$axios.post("message/sendNotice",
        {
          noticeName:this.noticeForm.name,
          noticeRegion:this.noticeForm.region.toString(),
          noticeToTop: this.noticeForm.toTop,
          noticeType: this.noticeForm.type.toString(),
          noticeContent: this.noticeForm.content,
          noticeCategory: "community"
        })
        .then(res =>{
          if (res.data.code === 200){
            alert("请求成功")
            this.noticeForm.name="";
            this.noticeForm.region=[];
            this.noticeForm.toTop=false;
            this.noticeForm.type=[];
            this.noticeForm.content="";
          }
        })
        .catch(error =>{
          console.error(error);
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/homeCss/messages.css">

</style>
