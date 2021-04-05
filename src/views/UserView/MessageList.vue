<template>
  <div id="main_messageList" class="main_messageList">
    <div class="title_div">
      {{messageList.name}}
    </div>
    <div id="message_div" class="message_div">
      <div  v-for="(message,index) in messageDate" :key="index" style="position: relative" class="outside_message_div">
        <div :class="message.sender===messageList.name?'left_message':'right_message'">
          {{message.sender}}说{{message.messageContent}}
        </div>
      </div>
    </div>
    <div id="sendMessage_div" class="sendMessage_div">
      <el-form>
        <el-form-item label="消息内容" prop="desc">
          <el-input type="textarea" v-model="messageContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "MessageList",
  props: ['messageList'],
  data(){
    return{
      messageDate:[],
      messageContent:"",
      user:"",
      //定义对象
      socket:"",

    }
  }
  ,
  mounted() {
    this.messageDate=[
        {
          messageId:"1",
          sender:"hyz",
          messageContent:"你好",
          recipient:"lst",
          SendTime:"2021-02-01"
        },
        {
          messageId:"2",
          sender:"lst",
          messageContent:"你好",
          recipient:"me",
          SendTime:"2021-02-01"
        },
        {
          messageId:"3",
          sender:"hyz",
          messageContent:"你好",
          recipient:"lst",
          SendTime:"2021-02-01"
        },
        {
          messageId:"4",
          sender:"hyz",
          messageContent:"你好",
          recipient:"lst",
          SendTime:"2021-02-01"
        },
    ]
  },
  methods:{

    /**
     * 发送消息
     */
    sendMessage(){
        //创建json  数据
        let json=JSON.stringify(
          {
            sender:this.user.userName,
            recipient:this.messageList.name,
            messageContent: this.messageContent,
          }
        )
        this.send(json);
        this.$axios.post("/message/sendMessage",
          {
            sender:this.user.userName,
            recipient:this.messageList.name,
            messageContent: this.messageContent,
          })
        .then(res =>{
          if (res.data.code===200){
            console.log(res.data.data);
            // 发送成功
            this.messageDate.push(
              {
                  messageId:res.data.data.messageId,
                  recipient:res.data.data.recipient,
                  sender:res.data.data.sender,
                  messageContent:res.data.data.messageContent,
                  sendTime:res.data.data.sendTime,
                });
            console.log(this.messageDate);
        }else{
          alert("发送失败请检查网络")
        }
      })
      .catch(err =>{
        console.error(err);
      })
    },
    /**
     * 更新消息数据
     */
    upData(data){
      console.log(data);
    },
    /**
     * 如果连接成功,发送确认消息,并且注册id
     */
    registerId(){
      // 得到userName
      //确认json
      //消息类型
      //发送人
      //消息内容
      //消息时间
      //接收者
      let json=JSON.stringify({
        messageType:"82526",
        sender:this.user.userName,
        recipient:null,
        messageContent: "确认id",
      })
      this.send(json);
    },
    /**
     * 发送消息
     * */
    send(json){
      console.log("调用send  函数")
      if(!window.WebSocket){
        alert("该浏览器不支持发送消息")
        return false;
      }
      //判断连接是否打开
      if(this.socket.readyState===WebSocket.OPEN){
        this.socket.send(json);
      }else{
        alert("连接没有建立");
      }
    },
  },
  /**
   * 钩子函数
   *
   **/
  created() {
    const that=this;
    this.user=this.$store.state.user;
    if(!window.WebSocket){
      //有的浏览器里可能没有Websocket对象，window就代表浏览器，就做一下兼容性处理
      window.WebSocket=window.MozWebSocket;
    }
    if(window.WebSocket){
      this.socket=new WebSocket("ws://localhost:8087/chat");  //websocket用的是ws协议。将localhost改成自己的ip，就可以和同一局域网的人进行群聊了
      this.socket.onmessage=function(event){  //收到客户端消息
        that.upData(event.data);
        console.log("收到消息"+event.data);
      }
      //连接
      this.socket.onopen=function(event){
        that.registerId();
        console.log("vue"+"连上服务器"+event);
      }

      this.socket.onclose=function(event){
        console.log(event)
        console.log("vue"+"关闭服务器")
      }
      //socket不断接受服务端传来的数据，然后通过三个事件进行处理
    }
    //客户端想发送数据
  }
}
</script>

<style scoped src="../../assets/css/userCss/messageList.css">

</style>
