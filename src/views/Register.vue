<template>
  <div>
    <div id="back_img_div">
      <img src="../assets/img/login_back.jpg">
    </div>
    <div id="register_div">
      <el-form :model="registerData" status-icon :rules="rules" ref="registerFrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input  v-model="registerData.userName" ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephoneNumber">
          <el-input  v-model="registerData.telephoneNumber" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerData.password" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="registerData.password2" ></el-input>
        </el-form-item>
        <el-form-item class="button_div">
          <el-button type="primary" @click="submitFormCheck('registerFrom')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
<!--    弹出框-->
    <div>
      <el-dialog title="请确认基本消息" class="el-dialog--center" :visible.sync="dialogFormVisible">
        <el-form  :model="formcheck">
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="formcheck.telephoneNumber" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="formcheck.userName" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="formcheck.sex" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年纪" :label-width="formLabelWidth">
            <el-input v-model="formcheck.age" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="楼号" :label-width="formLabelWidth">
            <el-input v-model="formcheck.buildingNumber" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门牌号" :label-width="formLabelWidth">
            <el-input v-model="formcheck.floor" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <p class="el-dialog--center">如果确认无误请点击确定，如果与你的信息不符合请关联此楼负责人</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('registerFrom')">确 定</el-button>
        </div>
      </el-dialog>
    </div>

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
          telephoneNumber:'',
          password:'',
          password2:'',
        },
        formcheck: {
          id:'',
          userName: '',
          password:'',
          address:'',
          telephoneNumber: '',
          powerCode:'',
          sex: '',
          age: '',
          buildingNumber: '',
          floor: '',
        },
        rules:{
          userName:[{required:true,message:'账号不能为空',trigger:'blur'},
                    {min:2,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                  ],
          telephoneNumber:[{required:true,message:'手机号不能为空',trigger:'blur'},
            {min:11,max:11,message:'手机号长度不对',trigger:'blur'}
          ],
          password:[{required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'}
                    ],
          password2:[{required:true,message:'确认密码不能为空',trigger:'blur'},
                    {min:3,max:32,message:'长度应该在3~32之间',trigger:'blur'},
                    {validator: validatePass,trigger:'blur'}
                    ],
        },
        dialogFormVisible: false,

        formLabelWidth: '120px'
      }
  },
  methods: {
        submitFormCheck(formName) {
          this.$refs[formName].validate((valid) => {
                if (valid){
                  // alert('submit!');
                  this.$axios.post('/registerCheck',this.registerData)
                    .then(res => {
                      console.log(res);
                      if (res.data.code === 200){
                        //弹出确认框、、并且赋值
                        let temp=res.data.data;
                        this.formcheck.id=temp.id;
                        this.formcheck.userName=temp.userName;
                        this.formcheck.password=this.registerData.password;
                        this.formcheck.address=temp.address;
                        this.formcheck.telephoneNumber=temp.telephoneNumber;
                        this.formcheck.powerCode=temp.powerCode;
                        this.formcheck.sex=temp.sex;
                        this.formcheck.age=temp.age;
                        this.formcheck.buildingNumber=temp.buildingNumber;
                        this.formcheck.floor=temp.floor;
                        this.dialogFormVisible = true;
                      }else{
                        this.$message({
                          type:'error',
                          message:res.data.message
                        })
                        // 返回错误消息
                      }
                    })
                    .catch(err => {
                      console.error(err);
                    })
                }
              });
        },
    //正式注册
        submitForm() {
              console.log('触发注册，传输的值是',this.formcheck);
              this.$axios.post('/register',this.formcheck)
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
        },
      }
}
</script>
<style scoped>
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
    #register_div{
      width: 500px;
      height: 350px;
      margin: 100px auto;
      padding-top: 50px;
      border-radius: 8px;
      background: aliceblue;
      box-shadow: 0 0 5px #eee;
    }
    .button_div{
      position: relative;
      left: 18%;
    }
</style>
