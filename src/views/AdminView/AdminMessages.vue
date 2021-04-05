<template>
  <div id="main_adminMessage">
    <div id="top_div" class="top_div">
      <span>
        我的消息
      </span>
    </div>
    <div id="left_div" class="left_div">
      <span class="title_span">
        近期消息
      </span>
      <div id="adminMessages" >
        <div v-for="adminMessage in adminMessagesList" :key="adminMessage.userId"
             class="adminMessage_div"
              v-on:click="getTheMessageList(adminMessage)">
            <div style="float: left">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div id="right_title_div">
              <div>
              <span>{{adminMessage.userName}}</span>
              </div>
              <div>
                <span>{{adminMessage.lastMessage}}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div id="right_div" class="right_div">
      <MessageList :key="timer" v-bind:messageList="messageList"></MessageList>
    </div>
  </div>
</template>
<script>
import MessageList from "../UserView/MessageList";
export default {
  components: { MessageList },
  comments: {
    MessageList,
  },
  name: "MyMessages",
  data (){
    return{
      adminMessagesList:'',
      messageList:{
        name:"",
        messageLists:[]
      },
      timer:""
    }
  },
  mounted() {
    this.getAdminMessages();
  },
  methods:{
    /**
     * 得到当前用户的未删除的通话记录 连接服务器得到当前userId的消息
     */
      getAdminMessages(){
        this.$axios.post("/message/getMessageListByUserId",
          {
            userId:this.$store.state.user.id
          })
      .then(res =>{
        if (res.data.code===200){
          this.adminMessagesList = res.data.data;
          console.log("返回的数据是"+this.adminMessagesList);
        }else{
          alert("你还没有收到过消息");
        }
      }).catch(error =>{
          console.error(error);
        })
      },
    /**
     * 得到这个人的消息列表
     */
      getTheMessageList(e){
        this.timer = new Date().getTime()
        this.messageList=e;
    }
  },
  created() {
    this.getAdminMessages();
  }

}
</script>
<style scoped src="../../assets/css/homeCss/AdminMessages.css">

</style>
