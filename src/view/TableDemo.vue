<template>

  <el-dialog title="弹窗" v-model="dialogVisible">
    <h1>弹窗内容</h1>
  </el-dialog>
  <el-button @click="exportTable">导出excel</el-button>
  <el-button @click="openDialog">打开弹窗</el-button>

  <el-button
      @click="openLoading">
    全局加载
  </el-button>

  <el-table ref="grid" :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150"/>
    <el-table-column prop="name" label="Name" width="120"/>
    <el-table-column prop="state" label="State" width="120"/>
    <el-table-column prop="city" label="City" width="120"/>
    <el-table-column prop="address" label="Address" width="600"/>
    <el-table-column prop="zip" label="Zip" width="120"/>
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import * as XLSX from 'xlsx';
import {useServerLoadingStore} from "@/store/index.js";

import {httpGet} from "@/request/strategy/No0Handler.ts";
import {ref, reactive, getCurrentInstance} from 'vue';

export default {

  setup() {
    // 使用 ref 创建响应式数据
    const tableData = ref([]);

    // 使用 getCurrentInstance 获取组件实例
    const instance = getCurrentInstance();


    function requestTableData() {
      httpGet('getTableData').then(data => {
        tableData.value = data
      })
    }

    // 返回到模板中使用
    return {tableData, requestTableData};
  },

  data() {
    return {
      fullscreenLoading: false,
      dialogVisible: false
    }
  },

  mounted() {

    this.requestTableData()

  },


  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    exportTable() {

      // 获取表的所有字段



      // const data = [
      //   ["姓名", "年龄", "职业"],
      //   ["Alice", 28, "前端开发"],
      //   ["Bob", 22, "后端开发"]
      // ];
      //
      // 创建工作簿和工作表
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      // 生成Excel文件并导出
      XLSX.writeFile(wb, "export.xlsx");
    },

    handleClick() {
      console.log('click')
    },

    openLoading() {
      const loading = useServerLoadingStore();
      loading.isLoading(true)
    }

  }


}


</script>

<style scoped>

</style>