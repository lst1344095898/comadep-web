<template>
  <div id="main_userMessages">
    <div id="category_div" class="category_div">
      <el-menu default-active="1-4" class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="false"
               :router="true"
               >
        <div class="top_select_style">
          <i class="el-icon-s-promotion"></i>
          消息中心</div>
        <el-menu-item index="/user/userMessages/systemMessage" class="menu_button">
          <i class="el-icon-s-order"></i>
          <span slot="title">系统通知</span>
        </el-menu-item>
        <el-menu-item index="/user/userMessages/myMessages" class="menu_button">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">我的消息</span>
        </el-menu-item>
        <el-menu-item index="3" class="menu_button">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4" class="menu_button">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="content_div" class="content_div">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMessages",
  data(){
    return{
    }
  },
  mounted() {
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped src="../../assets/css/userCss/userMessages.css">

</style>
