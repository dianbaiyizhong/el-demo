<template>


  <grid-layout
      v-model:layout="layout"
      :col-num="10"
      :row-height="height"
      :is-draggable="draggable"
      :is-resizable="resizable"
  >
    <template #default="{ gridItemProps }">

      <grid-item
          v-for="item in layout"
          :key="item.i"
          v-bind="gridItemProps"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          @container-resized="containerResizedEvent"
          :h="item.h"
          :i="item.i"
      >

        <v-chart :ref="'pie_' + item.i" :loading="loading" :style="divStyle" :option="option"/>
      </grid-item>
    </template>
  </grid-layout>


</template>
<script>

export default {

  data() {
    return {
      divStyle: {
        width: "200px",
        height: "200px"
      },
      height: 300,
      draggable: true,
      resizable: true,
      layout: [
        {x: 0, y: 0, w: 2, h: 1, i: 0},
        {x: 2, y: 0, w: 2, h: 1, i: 1},
        {x: 4, y: 0, w: 2, h: 1, i: 2},
        {x: 6, y: 0, w: 2, h: 1, i: 3},
        {x: 8, y: 0, w: 2, h: 1, i: 4},
        {x: 8, y: 0, w: 2, h: 1, i: 5},
        {x: 0, y: 5, w: 2, h: 1, i: 6},
        {x: 2, y: 5, w: 2, h: 1, i: 7},
        {x: 4, y: 5, w: 2, h: 1, i: 8},
        {x: 6, y: 3, w: 2, h: 1, i: 9}
      ],
      cards: [{}, {}, {}, {}, {}, {}],
      loading: true,
      backgroundColor: '#f5f5f5',
      option: {},
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
    }
  },
  methods: {
    containerResizedEvent: function (param) {
      console.log(param);
      this.height = param.width
      this.divStyle = {
        width: param.width + "px",
        height: param.width + "px"
      }
    },
    handleResize() {
      const that = this
      for (let i = 0; i < 10; i++) {
        that.$refs['pie_' + i][0].resize();
      }

    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);

    const that = this
    setTimeout(() => {
      that.option = {
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
      that.loading = false
      that.handleResize()

    }, 500)












  }
}
</script>
<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 0 auto;
  min-width: 500px;
  max-width: calc(20% - 2rem);
  cursor: pointer;
}


</style>