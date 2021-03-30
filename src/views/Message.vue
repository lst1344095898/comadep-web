<template>
  <div>
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
        default-active="2"
        class="el-menu-vertical-demo"
        :router="false"
        :collapse="false">
        <el-menu-item index="1" @click="myMessage">
            <i class="el-icon-location"></i>
            <el-badge :value="12" class="item">
              <span>我的消息</span>
            </el-badge>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <el-badge :value="10" class="item">
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
    <div id="subpage_div_message" style="display: none">
      <router-view></router-view>
    </div>
    <div id="content_div_message">
      <div id="deliver_ann" class="deliver_ann">
        <div class="deliver_title">
          发布消息
        </div>
        <div class="message_content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="通知名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="通知区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="一号楼" value="shanghai"></el-option>
                <el-option label="二号楼" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效时间" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="是否置顶" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="通知性质" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="社区卫生" name="type"></el-checkbox>
                <el-checkbox label="社区活动" name="type"></el-checkbox>
                <el-checkbox label="疫情相关" name="type"></el-checkbox>
                <el-checkbox label="政府通知" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="消息内容" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发送通知</el-button>
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
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入通知名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
     * 到消息发布页面
     */
    goNewsRelease(){
      document.getElementById("subpage_div_message").style.display="none"
      document.getElementById("content_div_message").style.display="block"
    }
  }
}
</script>

<style scoped src="../assets/css/messages.css">

</style>
