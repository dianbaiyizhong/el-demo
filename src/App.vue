<template>
  <div id="app">
    <el-cascader v-model="selectedOptions" :options="options" :show-all-levels="false"
      :props="{ multiple: true, checkStrictly: true }" placeholder="试试搜索：指南" filterable
      @change="handleJglxChecked"></el-cascader>
  </div>
</template>

<script>
import options from './tree.json';

export default {
  data() {
    return {
      options, selectedOptions: []
    }
  },
  methods: {
    // handleCascaderChange(checkedOptions) {
    //   const checkedValues = checkedOptions.map(option => option.value);
    //   // 自定义逻辑来处理关联选项，例如禁止选择子选项
    //   this.selectedOptions = this.selectedOptions.filter(selected => {
    //     const isParent = checkedValues.some(val => selected.includes(val));
    //     if (isParent) {
    //       // 如果已选中的值是关联选项的父级，则禁止添加子级选项
    //       return false;
    //     }
    //     return true;
    //   });
    // },
    handleJglxChecked(event) {
      let that = this
      const dealLabel = event.map(item => {
        return item[item.length - 1]
      })

      this.options.forEach(option => {
        that.updateDisabledStatus(option, dealLabel, false);
      });
    },

    updateDisabledStatus(option, labelList) {
      if (labelList.includes(option.value)) {
        this.setDisabledToChildren(option.children, labelList, true);
      } else {
        if (option.children) {
          option.children.forEach(child => {
            if (labelList.includes(child.value)) {
              this.setDisabledToChildren(child.children, labelList, true);
            } else {
              this.$set(child, 'disabled', false)
              this.setDisabledToChildren(child.children, labelList, false);
            }
          });
        }
      }
    },
    setDisabledToChildren(children, labelList, isDisabled) {
      if (children) {
        children.forEach(child => {
          if (!labelList.includes(child.label)) {
            this.$set(child, 'disabled', isDisabled)
          }
          this.setDisabledToChildren(child.children, labelList, isDisabled);
        });
      }
    },
  }
};
</script>
