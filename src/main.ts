/**
 * main.ts - 重构后的入口文件
 * 使用 UIManager 自动挂载 Ribbon UI，移除手动事件绑定
 */

import { commentList, data, options } from './mock'
import './style.css'
import prism from 'prismjs'
import Editor, {
  BlockType,
  Command,
  ControlState,
  ControlType,
  EditorMode,
  EditorZone,
  ElementType,
  IBlock,
  ICatalogItem,
  IElement,
  KeyMap,
  ListStyle,
  ListType,
  PageMode,
  PaperDirection,
  RowFlex,
  TextDecorationStyle,
  TitleLevel,
  splitText
} from './editor'
import { Dialog } from './components/dialog/Dialog'
import { formatPrismToken } from './utils/prism'
import { Signature } from './components/signature/Signature'
import { debounce, nextTick, scrollIntoView } from './utils'
import { UIManager } from './ui'

window.onload = function () {
  // 1. 初始化编辑器
  const container = document.querySelector<HTMLDivElement>('.editor')!
  const instance = new Editor(
    container,
    {
      header: [
        {
          value: '第一人民医院',
          size: 32,
          rowFlex: RowFlex.CENTER
        },
        {
          value: '\n门诊病历',
          size: 18,
          rowFlex: RowFlex.CENTER
        },
        {
          value: '\n',
          type: ElementType.SEPARATOR
        }
      ],
      main: <IElement[]>data,
      footer: [
        {
          value: 'canvas-editor',
          size: 12
        }
      ]
    },
    options
  )
  
  console.log('实例：', instance)
  // cypress 使用
  Reflect.set(window, 'editor', instance)
  // canvas-editor-devtools 使用
  Reflect.set(window, '__CANVAS_EDITOR_INSTANCE__', instance)

  // 2. 初始化 UI 管理器（自动挂载 Ribbon 工具栏）
  const uiManager = new UIManager(instance)
  uiManager.init()

  // 3. 监听超链接插入事件（由 RibbonToolbar 触发）
  window.addEventListener('insert-hyperlink', (evt: Event) => {
    const customEvent = evt as CustomEvent<{ defaultText: string }>
    const rangeText = customEvent.detail.defaultText
    
    new Dialog({
      title: '超链接',
      data: [
        {
          type: 'text',
          label: '文本',
          name: 'name',
          required: true,
          placeholder: '请输入文本',
          value: rangeText
        },
        {
          type: 'text',
          label: '链接',
          name: 'url',
          required: true,
          placeholder: '请输入链接'
        }
      ],
      onConfirm: payload => {
        const name = payload.find(p => p.name === 'name')?.value
        if (!name) return
        const url = payload.find(p => p.name === 'url')?.value
        if (!url) return
        instance.command.executeHyperlink({
          url,
          valueList: splitText(name).map(n => ({
            value: n,
            size: 16
          }))
        })
      }
    })
  })

  // 4. 状态栏功能保留（简化版）
  const pageScaleMinusDom = document.querySelector<HTMLDivElement>('.page-scale-minus')
  const pageScaleAddDom = document.querySelector<HTMLDivElement>('.page-scale-add')
  const pageScalePercentageDom = document.querySelector<HTMLSpanElement>('.page-scale-percentage')
  
  if (pageScaleMinusDom) {
    pageScaleMinusDom.onclick = () => {
      instance.setScale(instance.getScale() - 0.1)
    }
  }
  
  if (pageScaleAddDom) {
    pageScaleAddDom.onclick = () => {
      instance.setScale(instance.getScale() + 0.1)
    }
  }
  
  if (pageScalePercentageDom) {
    pageScalePercentageDom.onclick = () => {
      instance.setScale(1)
    }
    
    // 监听缩放变化
    instance.onScaleChange = (scale: number) => {
      pageScalePercentageDom.textContent = `${Math.round(scale * 100)}%`
    }
  }

  // 5. 菜单弹窗销毁（全局点击处理）
  window.addEventListener(
    'click',
    evt => {
      const visibleDom = document.querySelector('.visible')
      if (!visibleDom || visibleDom.contains(<Node>evt.target)) return
      visibleDom.classList.remove('visible')
    },
    {
      capture: true
    }
  )

  console.log('Editor initialized with Ribbon UI')
}
