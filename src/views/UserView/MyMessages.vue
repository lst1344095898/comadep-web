<template>
  <div id="main_myMessage">
    <div id="top_div" class="top_div">
      <span>
        我的消息
      </span>
    </div>
    <div id="left_div" class="left_div">
      <span class="title_span">
        近期消息
      </span>
      <div id="myMessages" >
        <div v-for="myMessage in myMessagesList" :key="myMessage.userId"
             class="myMessage_div"
              v-on:click="getTheMessageList(myMessage)">
            <div style="float: left">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div id="right_title_div">
              <div>
              <span>{{myMessage.userName}}</span>
              </div>
              <div>
                <span>{{myMessage.lastMessage}}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div id="right_div" class="right_div">
      <MessageList :key="timer" v-bind:messageList="messageList">

      </MessageList>
    </div>
  </div>
</template>

<script>
import MessageList from "./MessageList";
export default {
  components: { MessageList },
  comments: {
    MessageList,
  },
  name: "MyMessages",
  data (){
    return{
      myMessagesList:'',
      messageList:"",
      timer:""
    }
  },
  mounted() {
    this.getMyMessages();
  },
  methods:{
    /**
     * 得到你的未删除的通话记录
     */
      getMyMessages(){
        this.myMessagesList=[
          {
            userId: 1,
            userName: "李四",
            lastMessage: "你好",
          },
          {
            userId: 2,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 3,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 4,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 5,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 6,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 7,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 8,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 9,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 10,
            userName: "张三",
            lastMessage: "你好",
          },
          {
            userId: 11,
            userName: "hyz",
            lastMessage: "你好",
          }
        ]
      },
    /**
     * 得到这个人的消息列表
     */
      getTheMessageList(e){
        this.messageList={
          userName: e.userName,
        }
    }
  }

}
</script>

<style scoped src="../../assets/css/userCss/myMessages.css">

</style>
