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
  </div>
</template>

<script>
export default {
  name: "Message",
  data(){
    return{
      activeIndex: '3',
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

    }
  }
}
</script>

<style scoped src="../assets/css/messages.css">

</style>
