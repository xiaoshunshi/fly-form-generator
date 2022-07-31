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
            <draggable class="components-draggable" :sort="false">
              <div
                class="components-item"
                v-for="(element, index) in item.list"
                :key="index"
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
        <el-button icon="el-icon-video-play" type="text">
          运行
        </el-button>
        <el-button icon="el-icon-view" type="text">
          查看json
        </el-button>
        <el-button icon="el-icon-download" type="text">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text">
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
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <!-- <draggable-item
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
              /> -->
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
export default {
  name: 'Home',
  components: {
    draggable
  },
  data () {
    return {
      drawingList: drawingDefalut,
      drawingData: {},
      activeId: drawingDefalut[0].formId,
      formConf,
      inputComponents,
      logo,
      leftComponents: [
        {
          title: '输入型组件',
          list: inputComponents
        },
        {
          title: '选择型组件'
          // list: selectComponents
        },
        {
          title: '布局型组件'
          // list: layoutComponents
        }
      ]
    }
  }
}
</script>
<style lang='scss'>
@import "@/styles/home";
</style>
