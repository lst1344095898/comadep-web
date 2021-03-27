<template>
  <div id="main">
    <!--    导航栏-->
    <div id="menu_div">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item class="userHome_menu" index="1" @click="userHome">用户中心</el-menu-item>
        <el-menu-item class="userMessages_menu" index="2" @click="userMessages">消息中心</el-menu-item>
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

    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: "User",
  data(){
    return{
      activeIndex: "1"
    }
  },
  mounted() {
  },
  methods:{
    /**
     * 导航点击
     * @param key
     * @param keyPath
     */
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //用户主页面跳转
    userHome() {
        this.$router.push("/user/userHome");
    },
    /**
     * 用户消息跳转
     */
    userMessages(){
      this.$router.push("/user/userMessages");
    },
    /**
     * 用户退出
     */
    loginOut(){
      localStorage.removeItem("Authorization")
      // console.log("out")
      this.$router.push('/login');
    },
    /**
     * 刷新
     */
    RefreshDemo() {

    }
  }
}
</script>

<style scoped src="../../assets/css/userCss/userCss.css">

</style>
