import { deepClone } from '@/utils'

function makeDataObject () {
  // 深入数据对象：
  // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true
  }
}
function buildDataObject (confClone, dataObject) {
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
  Object.keys(confClone).forEach(key => {
    const val = confClone[key]
    if (key === ' __vModel__') {
      // formItem上的属性

    } else if (dataObject[key] !== undefined) {

    } else {
      dataObject.attrs[key] = val
    }
  })

  // 清理属性
  clearAttrs(dataObject)
}

function clearAttrs (dataObject) {
  delete dataObject.attrs.__config__
  delete dataObject.attrs.__slot__
  delete dataObject.attrs.__methods__
}
export default {
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  render (h) {
    const dataObject = makeDataObject()
    const confClone = deepClone(this.conf)
    const children = this.$slots.default || []

    buildDataObject.call(this, confClone, dataObject)

    return h(this.conf.__config__.tag, dataObject, children)
  }
}
