<template>
  <div class="box">
      <h3>登录</h3>
    <el-form :model="loginData" status-icon :rules="rules" ref="loginFrom" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="telephoneNumber">
        <el-input  v-model="loginData.telephoneNumber"  placeholder="请输入电话号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginData.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginFrom')">登录</el-button>
        <el-button type="info" @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
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
    .box{
      width: 500px;
      height: 400px;
      margin: 100px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 5px #eee;
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
</style>
