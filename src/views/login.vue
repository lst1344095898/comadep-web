<template>
  <div>

    <div id="back_img_div">
      <img src="../assets/img/login_back.jpg">
    </div>
    <h1>欢迎登录疫情社区管理页面</h1>
    <div id="login_div">
      <h3>登录</h3>
      <el-form :model="loginData" status-icon :rules="rules" ref="loginFrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="telephoneNumber">
          <el-input  v-model="loginData.telephoneNumber"  placeholder="请输入电话号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginData.password" ></el-input>
        </el-form-item>
        <el-form-item class="button_div">
          <el-button type="primary" @click="submitForm('loginFrom')">登录</el-button>
          <el-button type="info" @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
      return {
        loginData:{
          telephoneNumber:'',
          password:'',
        },
        rules:{
          telephoneNumber:[{required:true,message:'电话号不能为空',trigger:'blur'},
                    {min:11,max:11,message:'长度应该为11位',trigger:'blur'}
                  ],
          password:[{required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                    ],
        }
      }
  },
  methods: {
        ...mapMutations(['changeLogin','changePowerCode','changUser']),
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios.post('/login',this.loginData)
            .then(res => {
              //返回用户状态
              if (res.data.code===200){
                console.log(res.data.data)
                this.$message({
                  type:'success',
                  message:'用户登录成功'
                })
                // localStorage.setItem(tokenId,res.data.token);
                //将token存入
                this.changeLogin({Authorization:res.data.token});
                //将用户权限存入vuex
                this.changePowerCode(res.data.data.powerCode);
                //将用户信息存入vuex
                this.changUser(res.data.data);
                if (res.data.data.powerCode === 0) {
                  this.$router.push('/home');
                }else if (res.data.data.powerCode === 3){
                  this.$router.push('/userHome');
                }
              }else{
                this.$message({
                  type:'error',
                  message:res.data.message
                })
              }

            })
            .catch(err => {
              console.error(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    toRegister(){
          this.$router.push('/register')
    },
      }
}
</script>
<style scoped>
    h1{
      position: absolute;
      font-size: 50px;
      left: 35%;
      color: #409EFF;
      text-shadow: 5px 1px 6px #fcfffe;
    }
    h3{
      text-align: center;
    }
    .el-input{
      width: 92%;
    }
    .item-button button{
      width: 120px;
      margin: 0 auto;
    }
    #back_img_div{
      position: absolute;
      width: 1790px;
      height: 900px;
      left: 0px;
      top: 0px;
      z-index: -11;
    }
    #back_img_div img{
      width: 1920px;
      height: 937px;
    }
    #login_div{
      position: relative;
      width: 500px;
      height: 300px;
      top: 160px;
      margin: 100px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 5px #eee;
      background: aliceblue;
    }
    .button_div{
      position: relative;
      left: 15%;
    }
</style>
