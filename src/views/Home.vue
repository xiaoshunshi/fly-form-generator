<template>
  <div class="container">
    <div class="left-board">
      <!-- logo 部分 -->
       <div class="logo-wrapper">
        <div class="logo">
          <img :src="logo" alt="logo"> fly-form-generator
          <!-- <a class="github" href="https://github.com/JakHuang/form-generator" target="_blank">
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt>
          </a> -->
        </div>
      </div>
      <!-- 拖拽菜单 -->
       <el-scrollbar class="left-scrollbar">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
             <div class="components-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div>
          </div>
       </el-scrollbar>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      logo,
      leftComponents: [
        {
          title: '输入型组件'
          // list: inputComponents
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
@import '@/styles/home';
</style>
