<template>
  <div class="container">
    <!-- 双飞翼 左侧 -->
    <div class="left-board">
      <!-- logo 部分 -->
      <div class="logo-wrapper">
        <div class="logo">
          <img :src="logo" alt="logo" /> fly-form-generator
          <!-- <a class="github" href="https://github.com/JakHuang/form-generator" target="_blank">
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt>
          </a> -->
        </div>
      </div>
      <!-- 拖拽菜单 -->
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div>
            <!-- sort 拖动换位置 -->
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div
                class="components-item"
                v-for="(element, index) in item.list"
                :key="index"
                 @click="addComponent(element)"
              >
                <div class="components-body">
                  <svg-icon :icon-class="element.__config__.tagIcon" />
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 中间部分 -->
    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text"> 运行 </el-button>
        <el-button icon="el-icon-view" type="text"> 查看json </el-button>
        <el-button icon="el-icon-download" type="text"> 导出vue文件 </el-button>
        <el-button
          class="copy-btn-main"
          icon="el-icon-document-copy"
          type="text"
        >
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text">
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable
              class="drawing-board"
              :list="drawingList"
              :animation="340"
              group="componentsGroup"
            >
              <draggable-item
                v-for="(item, index) in drawingList"
                :key="item.renderKey"
                :drawing-list="drawingList"
                :current-item="item"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import logo from '@/assets/logo.png'
// vue的拖拽组件
import draggable from 'vuedraggable'
// 左侧便利的按钮
import { inputComponents, formConf } from '@/components/generator/config'
import drawingDefalut from '@/components/generator/drawingDefalut'
import DraggableItem from './components/DraggableItem'
// import RightPanel from './components/RightPanel'
import { deepClone } from '@/utils/index'
import { getIdGlobal } from '@/utils/db'

let tempActiveData
const idGlobal = getIdGlobal()
export default {
  name: 'Home',
  components: {
    draggable,
    DraggableItem
  },
  data () {
    return {
      idGlobal,
      drawingList: drawingDefalut,
      drawingData: {},
      activeId: drawingDefalut[0].formId,
      activeData: drawingDefalut[0],
      formConf,
      inputComponents,
      logo,
      leftComponents: [
        {
          title: '输入型组件',
          list: inputComponents
        }
        // {
        //   title: '选择型组件'
        //   // list: selectComponents
        // },
        // {
        //   title: '布局型组件'
        //   // list: layoutComponents
        // }
      ]
    }
  },
  methods: {
    /**
     * @Tip: xiaoshunshi  | V 1.0.0.0
     * @Date: 2022-08-02 10:55:57
     * @Description: 点击添加input
     * @param {*} item
     * @return {*}
     */
    addComponent (item) {
      const clone = this.cloneComponent(item)
      this.fetchData(clone)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    /**
     * @Tip: xiaoshunshi  | V 1.0.0.0
     * @Date: 2022-08-02 10:56:19
     * @Description: 复制
     * @param {*} item
     * @param {*} list
     * @return {*}
     */
    drawingItemCopy (item, list) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete (index, list) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    /**
     * @Tip: xiaoshunshi  | V 1.0.0.0
     * @Date: 2022-08-01 15:51:20
     * @Description:  Native传入返回的点击事件
     * @param {*} currentItem
     * @return {*}
     */
    activeFormItem (currentItem) {
      // console.log('Native传入返回的点击事件')
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
    },
    cloneComponent (origin) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.span = this.formConf.span // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone)
      clone.placeholder !== undefined && (clone.placeholder += config.label)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey (item) {
      const config = item.__config__
      console.log(config)
      console.log(this.drawingList)
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}`
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    onEnd (obj) {
      if (obj.from !== obj.to) {
        console.log('拖动结束！')
        this.fetchData(tempActiveData)
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
    },
    fetchData (component) {
      console.log(component)
      const { dataType, method, url } = component.__config__
      if (dataType === 'dynamic' && method && url) {
        this.setLoading(component, true)
        this.$axios({
          method,
          url
        }).then(resp => {
          this.setLoading(component, false)
          this.setRespData(component, resp.data)
        })
      }
    }
  }
}
</script>
<style lang='scss'>
@import "@/styles/home";
</style>
