<template>
  <div class="box">
    <el-form :model="registerData" status-icon :rules="rules" ref="registerFrom" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="userName">
        <el-input  v-model="registerData.userName" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerData.password" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="registerData.password2" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerFrom')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
      var validatePass = (rule, value, callback) => {
      if (value !== this.registerData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerData:{
          userName:'',
          password:'',
          password2:'',
        },
        rules:{
          userName:[{required:true,message:'账号不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                  ],
          password:[{required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                    ],
          password2:[{required:true,message:'确认密码不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'},
                    {validator: validatePass,trigger:'bular'}
                    ],
        }
      }
  },
  methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios.post('/register',this.registerData)
            .then(res => {
              console.log(res)
              this.$message({
                type:'success',
                message:'用户注册成功'
              })
              this.$router.push('/login')
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
