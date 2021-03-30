<template>
  <div id="main">
    <div id="carousel_div" class="carousel_div">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <div class="img_div">
            <el-image :src="src[item-1]"></el-image>
          </div>
          <h3 class="medium">{{ item}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
<!--    <h3>home</h3>-->
<!--    <button @click="removeTokenById">删除tokenId</button>-->
<!--    <button @click="tokenTest">验证token</button>-->
<!--    <button class="" @click="toHome">前往android</button>-->
    <div id="notice_userHome" class="notice_userHome">
      <div id="notice_title_div">
        <span style="margin-left: 160px">通知公告</span>
      </div>
      <div class="notice_cont">
        <ul>
          <div v-for="notice in noticeList" :key="notice.id" class="notice_li">
            <a >{{notice.content}}</a>
          </div>
        </ul>
      </div>
    </div>
    <div id="activity_userHome" class="activity_userHome">
      <div id="activity_title_div">
        <span style="margin-left: 160px">社区活动</span>
      </div>
      <div class="notice_cont">
        <ul>
          <div v-for="notice in noticeList" :key="notice.id" class="notice_li">
            <a >{{notice.content}}</a>
          </div>
        </ul>
      </div>
    </div>

    <div id="build_userHome" class="build_userHome">
      <div id="build_title_div">
        <span style="margin-left: 160px">社区建设</span>
      </div>
      <div class="notice_cont">
        <ul>
          <div v-for="notice in noticeList" :key="notice.id" class="notice_li">
            <a >{{notice.content}}</a>
          </div>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      src:[
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      ],
      noticeList: [
        {
          id:1,
          content:"2021-2-3日我们将在南广场进行体育比赛"
        },
        {
          id:2,
          content:"2021-2-3日我们将在南广场进行体育比赛"
        },
        {
          id:3,
          content:"2021-2-3日我们将在南广场进行体育比赛"
        },
        {
          id:4,
          content:"2021-2-3日我们将在南广场进行体育比赛"
        },

      ]
    }
  },
  methods:{
    removeTokenById(){
      localStorage.removeItem("Authorization")
    },
    tokenTest(){
      this.$axios.post('/test')
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          console.error(err);
        })
    },
    toHome(){
      this.$router.push('/android');
    }
  }
}
</script>

<style scoped src="../../assets/css/userCss/userHome.css">
</style>
