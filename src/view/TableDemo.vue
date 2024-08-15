<script setup>

import * as XLSX from 'xlsx';
const handleClick = () => {
  console.log('click')
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]


const exportTable = () => {
  const data = [
    ["姓名", "年龄", "职业"],
    ["Alice", 28, "前端开发"],
    ["Bob", 22, "后端开发"]
  ];

  // 创建工作簿和工作表
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  // 生成Excel文件并导出
  XLSX.writeFile(wb, "export.xlsx");
}
</script>

<template>
  <el-button @click="exportTable"></el-button>
  <el-table :data="tableData" style="width: 100%">
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

<style scoped>

</style>