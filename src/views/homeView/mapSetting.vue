<template>
  <div id="mapStyle_div">
    <el-dialog  class="mapStyle_div_el_dialog" title="初始化地图" :visible.sync="mapSettingList.mapSettingShow">
      <el-form :model="initMapForm" >
        <el-form-item label="选择你要导入地图的大小">
          <el-select v-model="initMapForm.mapStyle" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "mapSetting",
  props: ['mapSettingList'],
  data (){
    return {
      mapImportFormVisible: false,
      options: [{
        value: '选项1',
        label: '10*10'
      }, {
        value: '选项2',
        label: '20*20'
      }, {
        value: '选项3',
        label: '30*30'
      }],
      initMapForm: {
        mapStyle: ''
      },
    }
  }
}
</script>

<style scoped src="../../assets/css/homeCss/mapSetting.css">
</style>
