<template>
  <v-chart style="width: 100%;height: 500px" class="chart" :option="option"/>
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
  mounted() {
    this.option = {
      // 有两个标题，所以给title设为数组
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
      // 饼图不需要坐标系，直接写series
      // series也是个数组
      series: [
        {
          type: 'pie',
          data: this.mockData,
          // 设置饼图的伸出的小线条的对应文字
          label: {
            normal: {
              show: false,
              //  position: 'outter'，就是把每个饼对应的文字放在饼外面
              // position: 'inner',就是把每个饼对应的文字放在饼里
              formatter: function (params) {
                return `${params.data.label} | ${params.data.value}`
                // return出去就显示了每个饼对应的文字
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
      // legend是旁边的彩色小方框,点击可以隐藏对应的饼,需要每个饼的对应数据中有name属性
      legend: {
        // 小方块可以滑动
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
              '数量：' + params.data.value + '<br />' +
              '占比：' + params.data.percent + '%'
          return str
        }
      }
    }
  }
}
</script>
<style scoped>

</style>