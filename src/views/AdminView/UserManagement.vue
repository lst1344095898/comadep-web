<template>
  <div id="main_div">
    <!--    导航栏-->
    <div id="menu_div">
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
<!--    用户搜索-->
    <div id="search_div" class="search_div">
      <div style="float: left">
        <el-input  style="display: block" class="search_input" placeholder="username/telephone" v-model="search" ></el-input>
      </div>
      <div style="float: left">
        <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
      </div>
    </div>
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
    <div id="table_operation" class="table_operation">
      <div class="upload_div">
      <el-upload class="" action="" :http-request='uploadUser' :show-file-list="false" multiple>
        <el-button class="custom-btn" size="small">上传</el-button>
      </el-upload>
      </div>
      <div class="download_div">
        <el-button class="custom-btn"  size="small" @click="download">导出
        </el-button>
      </div>
    </div>
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
</template>

<script>
import userManage from "./userManage";
export default {
  components: { userManage },
  comments: {
    userManage
    },
  name: "UserManagement",
  data(){
    return{
      // 头部导航栏索引
      activeIndex: "2",
      search:'',
      timer: '',
      // 用户数据
      userInfoList:[],
      // 页面数据
      pageParameter:{
        currPage: 1,
        total: 1,
        pageSize: 8,
        buildingNumber: 0,
        floorNumber: 0,
        file:''
      },

    }
  },
  mounted() {
    this.getUserInfoByParameter();
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /**
     * 顶部导航栏 索引改变
     * @param key
     * @param keyPath
     */
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //数据页面跳转
    dataSt(){
      this.$router.push("/home");
    },
    /**
     * 用户管理页面跳转
     */
    userMan(){
      this.$router.push("/userManagement")
    },
    /**
     * 信息中心页面跳转
     */
    message(){
      this.$router.push("/messages");
    },
    /**
     * 退出登录
     */
    loginOut (){
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
     * 选择楼层
     */
    changeBuilding(key){
      //选择楼层
      // console.log(key+'楼')
      this.pageParameter.buildingNumber=key;
      this.getUserInfoByParameter()
    },
    /**
     * 得到所有用户数据
     */
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
    /**
     * 改变页数
     * @param val
     */
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageParameter.currPage=val
      this.getUserInfoByParameter();
      console.log(this.pageParameter);
    },
    /**
     * 上传用户
     */
    uploadUser(param){
      const id = 1;
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      alert("上传成功");
      this.$store
        .dispatch("UploadFile", { formData: formData, id: id })
        .then(response => {
          if (Array.isArray(response)) {
            if (response) {
              this.$message({
                showClose: true,
                message: "上传成功。",
                type: "success"
              });
              this.getFileList(id);
            }
          } else {
            alert("上传成功")

            this.$message.error(response.message);
          }
          console.log("response==", response);
        })
        .catch(message => {
          alert("上传成功")
          console.log("message======================", message);
          this.$message.error("上传失败，请联系管理员");
        });
    },
    /**
     * 下载用户信息
     */
    download(){
      // let self = this;
      // let url = self.$store.state.path + "user/downloadUser";
      // let data = JSON.stringify({
      //         user: self.$store.state.username,
      //        file_name: self.plist_file_name
      //    });
        let data;
         console.log("data:", data)
         this.$axios(
             {
               method: "post",
               url:  "/user/downloadUser",
               data: {},
               responseType: "blob",    // 指定获取数据的类型为blob
               }
         ).then(
             function (response) {
               data = response.data.data;
               //创建a标签并点击， 即触发下载
               let url = window.URL.createObjectURL(new Blob([data]));
               let link = document.createElement("a");
               link.style.display = "none";
               link.href = url;
               link.setAttribute("download", "用户表格.xls");
               document.body.appendChild(link);
               link.click()
             }
         ).catch(function (err) {
             console.log(err)
           })
    }
  }
}
</script>

<style scoped src="../../assets/css/userManagement.css">
</style>
