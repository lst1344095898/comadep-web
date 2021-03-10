<template>
    <div>
      <el-table
        :data="userInfoList"
        :cell-style="{height: '30px'}"
        :row-style="{height: '30px'}"
        style="width: 100%" id="table_div">
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年纪">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="telephoneNumber"
          label="电话号码">
        </el-table-column>
        <el-table-column

          label="操作"
          width="100">
          <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="user_details_div">
        <el-popover
          placement="right"
          width="400"
          trigger="manual"
          v-model="visible">
          <el-form :label-position="labelPosition" label-width="80px" :model="userDetails">
            <el-form-item label="id">
              <el-input v-model="userDetails.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="名字">
              <el-input v-model="userDetails.userName"></el-input>
            </el-form-item>
            <el-form-item label="年纪">
              <el-input v-model="userDetails.age"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="userDetails.sex"></el-input>
            </el-form-item>
            <el-form-item label="创建日期">
              <el-input v-model="userDetails.createTime"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="userDetails.telephoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userDetails.password"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="userDetails.address"></el-input>
            </el-form-item>
            <el-form-item label="权限">
              <el-input v-model="userDetails.powerCode"></el-input>
            </el-form-item>
            <div class="el-dialog--center">
            <el-button type="primary" @click="Yes">确定</el-button>
            <el-button @click="No">取消</el-button>
            </div>
          </el-form>
        </el-popover>
      </div>
      <div id="back_div" class="back_div"></div>
    </div>
</template>

<script>
export default {
  name: "userManage",
  props: ['userInfoList'],
  data(){
    return{
      tableData: [],
      userDetails:{},
      visible: false,
      labelPosition: 'left'
    }
  },
  mounted() {
    console.log( '子组件'+this.userInfoList)
    },
  methods:{
      handleClick(temp){
          console.log(temp)
          let back_div=document.getElementById('back_div')
          back_div.style.display='block';
          this.visible=true;
          this.userDetails=temp;
      },
      deleteUser(temp){
        console.log(temp)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      Yes(){
        this.$confirm('你确定要修改用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      No(){
          this.visible=false;
          let back_div=document.getElementById('back_div')
          back_div.style.display='none';
      }
    }
  }
</script>

<style scoped src="../../assets/css/homeCss/userManage.css">

</style>
