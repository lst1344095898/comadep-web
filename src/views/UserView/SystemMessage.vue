<template>
  <div id="main_systemMessage">
    <div id="content_div" class="content_div">
        <div v-for="sysNew in sysNewList" :key="sysNew.id" class="sysNew_div">
          <div class="sysNew_subject">
            <div class="sysNew_Title">
              <span >
              {{sysNew.title}}
            </span>
            </div>
            <span class="sysNew_Date">
              {{sysNew.releaseTime}}
            </span>
            <div class="sysNew_content_div">
              <span class="sysNew_content">
                <a href="#">{{sysNew.content}}</a>
              </span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SystemMessage",
  data(){
    return{
      sysNewList: ''
    }
  },
  mounted() {
    this.getSystemNews();
  },
  methods:{
    /**
     * 得到所有系统消息
     */
    getSystemNews(){
      this.sysNewList=[
        {
          title: "社区通知",
          releaseTime: "2021-3-24 12:20",
          content: "社区即将进行社区体育比赛想要报名的请找楼长进行报名→" +"",
          id: 1

        },{
          title: "社区通知",
          releaseTime: "2021-3-24 12:40",
          content: "社区即将进行社区体育比赛",
          id: 2
        }
      ]
    }
  }

}
</script>

<style scoped src="../../assets/css/userCss/systemMessage.css">

</style>
