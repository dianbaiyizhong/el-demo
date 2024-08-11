<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <v-chart ref="pie" style="width: 100%;height: 500px" class="chart" :option="option"/>
    </el-col>
    <el-col :span="18">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>
<script>
export default {

  data() {
    return {
      mockData: [
        {
          label: '覆盖数量',
          value: 80,
          itemStyle: {
            color: '#5085f2'
          },
          name: '覆盖数量 | 97 '
        },
        {
          label: '未覆盖数量',
          value: 20,
          itemStyle: {
            color: '#e7e702 '
          },
          name: '未覆盖数量 | 92 '
        }
      ],
      option: {}

    }
  },
  methods: {

    handleResize() {
      this.$refs.pie.resize();
    }
  },
  mounted() {
    this.option = {
      // 有两个标题
      title: [
        {
          text: '覆盖率',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '覆盖率',
          // subtext是副标题
          subtext: '67%',
          // 调位置到圆环中间
          x: '34.5%',
          y: '42.5%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            color: '#999'
          },
          subtextStyle: {
            fontSize: 28,
            color: '#333'
          }
        }
      ],
      series: [
        {
          type: 'pie',
          data: this.mockData,
          // 设置饼图的伸出的小线条的对应文字
          label: {
            normal: {
              show: false,
              formatter: function (params) {
                return `${params.data.label} | ${params.data.value}`
              }
            }
          },
          // center定义圆心位置,使得饼图位移
          center: ['35%', '50%'],
          // 设置radius让饼图变成空心图,前后数值是内圈半径,外圈半径
          radius: ['45%', '60%'],
          // labelLine设置饼图伸出来的线
          labelLine: {
            normal: {
              length: 5, // 靠近饼图的线是length
              length2: 2, // 靠近文字的线是length2
              // 让线平滑
              smooth: true
            }
          },
          // false就是让饼图按照数据逆时针排序,true就是按照数据顺时针排序
          clockwise: false,
          // 设置每个饼之间的空白
          itemStyle: {
            borderWidth: 4,
            borderColor: '#fff'
          },
          name: '品类分布'
        }
      ],
      legend: {
        type: 'scroll',
        // 垂直排列
        orient: 'vertical',
        // 可以指定高度,小方块排不下会出现箭头
        height: 250,
        left: '70%',
        top: 'middle',
        textStyle: {
          color: '#8c8c8c'
        }

      },
      // tooltip是组件,就是鼠标移动到饼上面的弹层
      tooltip: {
        trigger: 'item', // 默认值,表示鼠标移到item上会触发
        // 可以自定义tooltip组件里面的内容
        formatter: function (params) {
          const str = params.seriesName + '<br />' +
              params.marker + params.data.label + '<br />' +
              '数量：' + params.data.value + '<br />'
          return str
        }
      }
    }

    window.addEventListener('resize', this.handleResize)

    this.$refs.pie.resize();

  }
}
</script>
<style scoped>

</style>