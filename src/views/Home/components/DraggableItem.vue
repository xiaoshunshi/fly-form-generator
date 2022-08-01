<script>
const layouts = {
  colFormItem (h, currentItem, index, list) {
    console.log(currentItem, index, list)
    console.log(this.$listeners)
    return <div>返回组件</div>
  }
}
function layoutIsNotFound () {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`)
}
export default {
  components: {

  },
  props: [
    'currentItem',
    'index',
    'drawingList',
    'activeId',
    'formConf'
  ],
  render (h) {
    console.log(this.currentItem.__config__.layout)

    const layout = layouts[this.currentItem.__config__.layout]
    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
