<template>
  <div >
    <div class="button_type">
      <el-button  type="primary" @click="inputOutInfo">填写信息</el-button>
      <el-button  type="primary" @click="into">进门</el-button>
      <el-button  type="info" @click="back">返回</el-button>

    </div>
    <div v-show="isShow" class="box">
      <el-form ref="InfoForm" :model="OutInfoForm" label-width="80px" size="mini">
        <el-form-item label="出入事宜">
          <el-select v-model="OutInfoForm.eventType" placeholder="请选择活动区域">
            <el-option label="医院" value="医院"></el-option>
            <el-option label="上班" value="上班"></el-option>
            <el-option label="吃饭" value="吃饭"></el-option>
            <el-option label="买菜" value="买菜"></el-option>
            <el-option label="上学" value="上学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="OutInfoForm.actionRegion" placeholder="请选择活动区域">
            <el-option label="沙河口" value="shahekou"></el-option>
            <el-option label="甘井子" value="ganjinzhi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计时间">
          <el-date-picker v-model="OutInfoForm.estimateTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间描述">
          <el-input type="textarea"  v-model="OutInfoForm.eventDescription"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      isShow: false,
      OutInfoForm:{
        eventType: '', //事件类型
        actionRegion: '', // 活动区域
        estimateTime:'', //预计回来时间
        eventDescription:'', //事件描述
        userId:this.$store.state.user.id, //userid;
      },
      InInfo:{
        userId:this.$store.state.user.id, //userid;
        inAddress: '北门'
      }
    }
  },
  methods:{
    inputOutInfo(){
          this.isShow=true;
      },
    onSubmit(){
      console.log(this.OutInfoForm);
          this.$axios.post('/infoManagement/InputOutInfoById',this.OutInfoForm)
          .then(res=>{
            console.log(res);
            if (res.data.code===200){
              this.$message({
                type: 'success',
                message:'申请成功',
              })
            }
          })
          .catch(err =>{
            console.log(err);
          })
    },
    cancel(){
      for (let i=0;i<this.inputOutInfo.size();i++){
        this.OutInfoForm[i]='';
      }
      this.isShow=false;
    },
    into(){
      this.$axios.post('/infoManagement/intoByUserId',this.InInfo)
        .then(res=>{
          console.log(res);
          if (res.data.code===200){
            this.$message({
              type: 'success',
              message:'成功',
            })
          }
        })
        .catch(err =>{
          console.log(err);
        })
    },
    back(){
      this.$router.push('/userHome');
    }

  }
}
</script>
<style scoped src="../assets/css/android.css"></style>

