<template>
  <div class="box">
      <h3>登录</h3>
    <el-form :model="registerData" status-icon :rules="rules" ref="registerFrom" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="userName">
        <el-input  v-model="registerData.userName" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerData.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerFrom')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
      return {
        registerData:{
          userName:'',
          password:'',
        },
        rules:{
          userName:[{required:true,message:'账号不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                  ],
          password:[{required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                    ],
        }
      }
  },
  methods: {
        ...mapMutations(['changeLogin']),
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios.post('/login',this.registerData)
            .then(res => {
              console.log(res);
              this.$message({
                type:'success',
                message:'用户登录成功'
              })
              // localStorage.setItem(tokenId,res.data.token);
              //将token存入
              this.changeLogin({Authorization:res.data.token});

              this.$router.push('/home')
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
