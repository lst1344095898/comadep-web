<template>
  <div id="mapStyle_div">
<!--    初始化地图-->
      <el-dialog  class="mapStyle_div_el_dialog" title="初始化地图" :visible.sync="mapSettingList.mapSettingShow"
                  :close-on-click-modal= "false" :close-on-press-escape="false" width="14%"
      >
        <el-form :model="initMapForm" class="is-center">
          <el-form-item label="选择地图的大小">
            <el-select v-model="initMapForm.mapStyle" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择楼的栋数">
            <el-input class="mapStyle_div_input" v-model="initMapForm.mapNumber" placeholder="请输入栋数" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="mapSettingList.mapSettingShow = false">取 消</el-button>
          <el-button type="primary" @click="mapSettingList.mapSettingShow = false">确 定</el-button>
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
        mapStyle: '',
        mapNumber: '',
      },
    }
  }
}
</script>

<style scoped src="../../assets/css/homeCss/mapSetting.css">
</style>
