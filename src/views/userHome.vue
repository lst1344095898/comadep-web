<template>
  <div>
    <h3>home</h3>
    <button @click="removeTokenById">删除tokenId</button>
    <button @click="tokenTest">验证token</button>
    <button class="" @click="toHome">前往android</button>
  </div>

</template>

<script>
export default {
  data(){
    return{

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

<style scoped src="../assets/css/userHome.css">
</style>
