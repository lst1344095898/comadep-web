<template>
  <div id="main">
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
                {{sysNew.content}}
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
          title: "今天是个好日子",
          releaseTime: "2021-3-24 12:20",
          content: "G.E.M.邓紫棋、韩红、黄龄、郎朗、刘柏辛、洛天依、毛不易、撒贝宁、五条人、" +
            "五月天、谢霆锋、周深等多位嘉宾陪你跨年！《EVA》、《指环王》、“漫威宇宙”主题节目倾情演绎！" +
            "直播间戳→" +"",
          id: 1

        },{
          title: "今天是个好日子",
          releaseTime: "2021-3-24 12:40",
          content: "我爱你",
          id: 2
        }
      ]
    }
  }

}
</script>

<style scoped src="../../assets/css/userCss/systemMessage.css">

</style>
