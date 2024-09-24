<template>
  <div class="tinymce-box">
    <editor v-model="textContent" :init="init" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>

<script>
//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'

//引入node_modules里的tinymce相关文件文件
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入则不显示编辑器
import 'tinymce/themes/silver'  //编辑器主题，不引入则报错
import 'tinymce/icons/default'  //引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/models/dom'
// 引入编辑器插件（基本免费插件都在这儿了）
import 'tinymce/plugins/advlist'  //高级列表
import 'tinymce/plugins/anchor'  //锚点
import 'tinymce/plugins/autolink'  //自动链接
import 'tinymce/plugins/autoresize'  //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autosave'  //自动存稿
import 'tinymce/plugins/charmap'  //特殊字符
import 'tinymce/plugins/code'  //编辑源码
import 'tinymce/plugins/codesample'  //代码示例
import 'tinymce/plugins/directionality'  //文字方向
import 'tinymce/plugins/emoticons'  //表情
import 'tinymce/plugins/fullscreen'  //全屏
import 'tinymce/plugins/help'  //帮助
import 'tinymce/plugins/image'  //插入编辑图片
import 'tinymce/plugins/importcss'  //引入css
import 'tinymce/plugins/insertdatetime'  //插入日期时间
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/nonbreaking' //插入不间断空格
import 'tinymce/plugins/pagebreak' //插入分页符
import 'tinymce/plugins/preview'//预览
import 'tinymce/plugins/quickbars'  //快速工具栏
import 'tinymce/plugins/save'  //保存
import 'tinymce/plugins/searchreplace'  //查找替换
// import 'tinymce/plugins/spellchecker'  //拼写检查，暂未加入汉化，不建议使用
import 'tinymce/plugins/table'  //表格
import 'tinymce/plugins/visualblocks'  //显示元素范围
import 'tinymce/plugins/visualchars'  //显示不可见字符
import 'tinymce/plugins/wordcount'  //字数统计

export default {
  name: "Tinymce",
  components: {Editor},
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      // default: 'code lists image media table wordcount save preview'
      // 插件需要import进来
      default: 'wordcount visualchars visualblocks   searchreplace save quickbars  preview  pagebreak  nonbreaking media insertdatetime importcss  image   fullscreen  directionality codesample code charmap link code table lists advlist anchor autolink autoresize autosave'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | lists image media table | codesample code removeformat save preview basicDateButton'
    }
  },
  data() {
    return {
      init: {
        license_key: 'gpl',
        // width: 720,
        promotion: false,
        height: 300,
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        // 皮肤：这里引入的是public下的资源文件
        skin_url: '/tinymce/skins/ui/oxide',
        // skin_url: 'tinymce/skins/ui/oxide-dark',//黑色系
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        // 隐藏菜单栏
        menubar: true,
        // 是否显示底部状态栏
        statusbar: true,
        // convert_urls: false,
        // 初始化完成
        init_instance_callback: (editor) => {
          console.log("初始化完成：", editor)
          // editor.ui.registry.addButton('mycustombutton', {
          //   text: '插入HTML',
          //   icon: true,
          //   onclick: function () {
          //     // 插入HTML代码
          //     editor.execCommand('mceInsertContent', false, '<div class="ss">这是插入的HTML代码</div>');
          //   }
          // });


        },

        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          console.log("图片上传处理：", img)
          success(img)
        },
        setup: function (editor) {
          // https://blog.csdn.net/gdgztt/article/details/135282950
          editor.ui.registry.addButton('basicDateButton', {
            text: 'Insert Date',
            tooltip: 'Insert Current Date',
            onAction: (_) => {
              editor.execCommand('mceInsertContent', false, '<div class="ss">这是插入的HTML代码</div>');
            }
          });
        }
      },
      textContent: this.value
    }
  },
  watch: {
    value(newValue) {
      this.textContent = newValue
    },
    textContent(newValue) {
      // 自定义事件给父组件传递数据
      this.$emit('input', newValue)
    }
  },
  // 实例创建完成
  created() {
  },
  // 组件挂载完毕
  mounted() {
    // 初始化 tinymce
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      // 自定义事件给父组件传递数据
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.textContent = ''
    }
  },

}
</script>

<style scoped>
.tinymce-box {
  margin: 20px;
}
</style>