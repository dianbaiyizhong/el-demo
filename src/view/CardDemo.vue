<template>


  <el-button @click="exportImg">导出图片</el-button>
  <div class="card-container">
    <div
        :ref="card.id"
        class="card"
        v-for="(card, index) in cards"
        :key="card.id"
        :style="{ backgroundColor: card.color }"
        @click="selectCard(index)"
    >
      <v-chart :loading="loading" style="width: 100%;height: 300px" class="chart" :option="option"/>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas"

export default {

  data() {
    return {
      cards: [{
        id: "card1"
      }, {id: "card2"}, {id: "card3"}, {id: "card4"}, {id: "card5"}, {id: "card6"}],
      loading: true,
      backgroundColor: '#f5f5f5',
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
      option: {},
      options2: {
        xAxis: {
          type: 'category',
          data: ['这是星期一', '这是星期二', '这是星期三', '这是星期四', '这是星期五', '这是星期六', '这是星期日'],
          axisLabel: {
            rotate: 90 // 将文字旋转90度
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
    }
  },
  methods: {
    exportImg() {
      html2canvas(this.$refs.card1[0]).then(canvas => {
        // 转成图片，生成图片地址
        let base64 = canvas.toDataURL("image/png");
        console.info(base64)
        // 创建一个a标签
        const link = document.createElement('a');

        // 设置a标签的属性
        link.href = base64;
        link.setAttribute('download', "fileName.png");
        link.style.display = 'none';

        // 将a标签添加到文档中，并模拟点击
        document.body.appendChild(link);
        link.click();

        // 移除a标签
        document.body.removeChild(link);
      });
    },


    handleResize() {
    },
    selectCard() {

    }
  },
  mounted() {

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