<script>
import render from '@/components/render/render'

const layouts = {
  /**
   * @Tip: xiaoshunshi  | V 1.0.0.0
   * @Date: 2022-08-01 16:37:03
   * @Description: 通过render函数生成的组件
   * @param {*} h  vue的creatElement
   * @param {*} currentItem 当前的item
   * @param {*} index 索引值
   * @param {*} list 总list
   * @return {*}
   */
  colFormItem (h, currentItem, index, list) {
    //  {
    //   __config__: {
    //     label: "单行文本",
    //     labelWidth: null,
    //     showLabel: true,
    //     changeTag: true,
    //     tag: "el-input",
    //     tagIcon: "input",
    //     required: true,
    //     layout: "colFormItem",
    //     span: 24,
    //     document: "https://element.eleme.cn/#/zh-CN/component/input",
    //     regList: [
    //       { pattern: "/^1(3|4|5|7|8|9)\\d{9}$/", message: "手机号格式错误" },
    //     ],
    //   },
    //   __slot__: { prepend: "", append: "" },
    //   __vModel__: "mobile",
    //   placeholder: "请输入手机号",
    //   style: { width: "100%" },
    //   clearable: true,
    //   "prefix-icon": "el-icon-mobile",
    //   "suffix-icon": "",
    //   maxlength: 11,
    //   "show-word-limit": true,
    //   readonly: false,
    //   disabled: false,
    // };
    // console.log(JSON.stringify(currentItem), index, list)
    // console.log(this.$listeners)
    const { activeItem } = this.$listeners
    const config = currentItem.__config__
    const child = renderChildren.apply(this, arguments)

    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return <el-col span={config.span} class={className}
      nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
      <el-form-item label-width={labelWidth}
        label={config.showLabel ? config.label : ''} required={config.required}>
        <render key={config.renderKey} conf={currentItem}
          onInput={ val => {
            this.$set(config, 'defaultValue', val)
          }}>{child}</render>
      </el-form-item>
    </el-col>
  }
}
function renderChildren (h, currentItem, index, list) {
  const config = currentItem.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}
function layoutIsNotFound () {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`)
}
export default {
  components: {
    render
  },
  props: ['currentItem', 'index', 'drawingList', 'activeId', 'formConf'],
  render (h) {
    const layout = layouts[this.currentItem.__config__.layout]
    if (layout) {
      return layout.call(
        this,
        h,
        this.currentItem,
        this.index,
        this.drawingList
      )
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
