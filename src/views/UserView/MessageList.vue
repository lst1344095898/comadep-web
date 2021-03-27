<template>
  <div id="main_messageList" class="main_messageList">
    <div class="title_div">
      {{messageList.userName}}
    </div>
    <div id="message_div" class="message_div">

    </div>
    <div id="sendMessage_div" class="sendMessage_div">

    </div>
  </div>
</template>

<script>
export default {
  name: "MessageList",
  props: ['messageList'],
  data(){
    return{

    }
  }
  ,
  mounted() {
  },
  methods:{

  }
}
</script>

<style scoped src="../../assets/css/userCss/messageList.css">

</style>
