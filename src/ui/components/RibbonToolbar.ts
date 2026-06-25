/**
 * Word 风格 Ribbon 工具栏组件
 * 与核心编辑器解耦，通过接口交互
 */

import type Editor from '../../editor'
import type { IRibbonTab, IRibbonItem } from '../interface'
import { RIBBON_TABS } from '../config/ribbon'

export class RibbonToolbar {
  private editor: Editor
  private container: HTMLElement
  private activeTabId: string = 'home'
  private tabs: IRibbonTab[] = RIBBON_TABS

  constructor(container: HTMLElement, editor: Editor) {
    this.container = container
    this.editor = editor
  }

  init(): void {
    this.render()
    this.bindEvents()
  }

  destroy(): void {
    this.container.innerHTML = ''
  }

  private render(): void {
    this.container.className = 'ce-ribbon-toolbar'
    this.container.innerHTML = `
      <div class="ce-ribbon-tabs"></div>
      <div class="ce-ribbon-content"></div>
    `

    const tabsContainer = this.container.querySelector('.ce-ribbon-tabs')!
    const contentContainer = this.container.querySelector('.ce-ribbon-content')!

    // 渲染 Tab 页签
    this.tabs.forEach(tab => {
      const tabEl = document.createElement('div')
      tabEl.className = `ce-ribbon-tab ${tab.id === this.activeTabId ? 'active' : ''}`
      tabEl.dataset.tabId = tab.id
      tabEl.textContent = tab.label
      tabsContainer.appendChild(tabEl)
    })

    // 渲染当前 Tab 内容
    this.renderTabContent(contentContainer)
  }

  private renderTabContent(container: Element): void {
    const activeTab = this.tabs.find(t => t.id === this.activeTabId)
    if (!activeTab) return

    container.innerHTML = ''
    const groupsContainer = document.createElement('div')
    groupsContainer.className = 'ce-ribbon-groups'

    activeTab.groups.forEach(group => {
      const groupEl = document.createElement('div')
      groupEl.className = 'ce-ribbon-group'
      groupEl.dataset.groupId = group.id

      if (group.label) {
        const labelEl = document.createElement('div')
        labelEl.className = 'ce-ribbon-group-label'
        labelEl.textContent = group.label
        groupEl.appendChild(labelEl)
      }

      const itemsContainer = document.createElement('div')
      itemsContainer.className = 'ce-ribbon-items'

      group.items.forEach(item => {
        const itemEl = this.renderRibbonItem(item)
        if (itemEl) {
          itemsContainer.appendChild(itemEl)
        }
      })

      groupEl.appendChild(itemsContainer)
      groupsContainer.appendChild(groupEl)
    })

    container.appendChild(groupsContainer)
  }

  private renderRibbonItem(item: IRibbonItem): HTMLElement | null {
    if (item.visible === false) return null

    const itemEl = document.createElement('div')
    itemEl.className = `ce-ribbon-item ce-ribbon-item--${item.type}`
    itemEl.dataset.itemId = item.id

    if (item.enabled === false) {
      itemEl.classList.add('disabled')
    }

    // 渲染图标
    if (item.icon) {
      const iconEl = document.createElement('i')
      iconEl.className = item.icon
      itemEl.appendChild(iconEl)
    }

    // 渲染标签
    if (item.label && item.type !== 'colorpicker') {
      const labelEl = document.createElement('span')
      labelEl.className = 'ce-ribbon-item-label'
      labelEl.textContent = item.label
      itemEl.appendChild(labelEl)
    }

    // 设置 tooltip
    if (item.tooltip) {
      itemEl.title = item.tooltip
    }

    return itemEl
  }

  private bindEvents(): void {
    // Tab 切换事件
    const tabsContainer = this.container.querySelector('.ce-ribbon-tabs')!
    tabsContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('ce-ribbon-tab')) {
        const tabId = target.dataset.tabId!
        this.switchTab(tabId)
      }
    })

    // Ribbon 项点击事件
    const contentContainer = this.container.querySelector('.ce-ribbon-content')!
    contentContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const itemEl = target.closest('.ce-ribbon-item') as HTMLElement
      if (itemEl && !itemEl.classList.contains('disabled')) {
        const itemId = itemEl.dataset.itemId!
        this.handleItemClick(itemId)
      }
    })
  }

  private switchTab(tabId: string): void {
    if (tabId === this.activeTabId) return

    this.activeTabId = tabId

    // 更新 Tab 激活状态
    const tabs = this.container.querySelectorAll('.ce-ribbon-tab')
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tabId === tabId)
    })

    // 重新渲染内容
    const contentContainer = this.container.querySelector('.ce-ribbon-content')!
    this.renderTabContent(contentContainer)
  }

  private handleItemClick(itemId: string): void {
    console.log('Ribbon item clicked:', itemId)
    
    // 命令映射表 - 将 Ribbon 项 ID 映射到编辑器命令
    const commandMap: Record<string, () => void> = {
      // 剪贴板
      'paste': () => this.editor.command.executePaste(),
      'cut': () => this.editor.command.executeCut(),
      'copy': () => this.editor.command.executeCopy(),
      'formatPainter': () => this.editor.command.executePainter({ isDblclick: false }),
      
      // 字体格式
      'fontFamily': () => {}, // 需要下拉选择
      'fontSize': () => {}, // 需要下拉选择
      'fontSizeAdd': () => this.editor.command.executeSizeAdd(),
      'fontSizeMinus': () => this.editor.command.executeSizeMinus(),
      'clearFormat': () => this.editor.command.executeFormat(),
      'bold': () => this.editor.command.executeBold(),
      'italic': () => this.editor.command.executeItalic(),
      'underline': () => this.editor.command.executeUnderline(),
      'strikeout': () => this.editor.command.executeStrikeout(),
      'superscript': () => this.editor.command.executeSuperscript(),
      'subscript': () => this.editor.command.executeSubscript(),
      'fontColor': () => {}, // 需要颜色选择器
      'highlightColor': () => {}, // 需要颜色选择器
      
      // 段落排版
      'bullets': () => this.editor.command.executeList('ul', 'disc'),
      'numbering': () => this.editor.command.executeList('ol', 'decimal'),
      'alignLeft': () => this.editor.command.executeRowFlex(1 /* RowFlex.LEFT */),
      'alignCenter': () => this.editor.command.executeRowFlex(2 /* RowFlex.CENTER */),
      'alignRight': () => this.editor.command.executeRowFlex(3 /* RowFlex.RIGHT */),
      'alignJustify': () => this.editor.command.executeRowFlex(4 /* RowFlex.ALIGNMENT */),
      'lineSpacing': () => {}, // 需要下拉选择
      'shading': () => {}, // 需要颜色选择器
      'borders': () => {}, // 需要下拉选择
      
      // 样式
      'styleNormal': () => this.editor.command.executeTitle(null),
      'styleHeading1': () => this.editor.command.executeTitle('first'),
      'styleHeading2': () => this.editor.command.executeTitle('second'),
      'styleHeading3': () => this.editor.command.executeTitle('third'),
      
      // 插入 - 页面
      'coverPage': () => {}, // 需要下拉选择
      'blankPage': () => this.editor.command.executeInsertBlankPage(),
      'pageBreak': () => this.editor.command.executePageBreak(),
      
      // 插入 - 表格
      'insertTable': () => {}, // 需要面板选择行列
      
      // 插入 - 插图
      'insertPicture': () => this.triggerImageUpload(),
      'insertOnlinePictures': () => {}, // 需要实现联机图片
      'insertShapes': () => {}, // 需要下拉选择
      'insertIcons': () => {}, // 需要实现图标库
      'insertSmartArt': () => {}, // 需要实现 SmartArt
      'insertChart': () => {}, // 需要实现图表
      
      // 插入 - 加载项
      'getAddIns': () => {}, // 需要实现插件市场
      'myAddIns': () => {}, // 需要实现我的插件
      
      // 插入 - 链接
      'insertLink': () => this.triggerHyperlinkDialog(),
      'insertBookmark': () => {}, // 需要实现书签
      'insertCrossreference': () => {}, // 需要实现交叉引用
      
      // 插入 - 符号
      'insertEquation': () => {}, // 需要实现公式
      'insertSymbol': () => {}, // 需要实现符号库
      
      // 布局 - 页面设置
      'margins': () => {}, // 需要下拉选择
      'orientation': () => {}, // 需要下拉选择
      'size': () => {}, // 需要下拉选择
      'columns': () => {}, // 需要下拉选择
      'breaks': () => {}, // 需要下拉选择
      'lineNumbers': () => {}, // 需要实现行号
      
      // 布局 - 段落
      'indentLeft': () => {}, // 需要实现缩进
      'indentRight': () => {}, // 需要实现缩进
      'spacingBefore': () => {}, // 需要实现段前间距
      'spacingAfter': () => {}, // 需要实现段后间距
      
      // 布局 - 页面背景
      'watermark': () => {}, // 需要下拉选择
      'pageColor': () => {}, // 需要颜色选择器
      'pageBorders': () => {}, // 需要实现页面边框
      
      // 引用 - 目录
      'insertTOC': () => {}, // 需要下拉选择
      
      // 引用 - 脚注
      'insertFootnote': () => this.editor.command.executeFootnote(),
      'insertEndnote': () => this.editor.command.executeEndnote(),
      
      // 引用 - 引文与书目
      'insertCitation': () => {}, // 需要实现引文
      'manageSources': () => {}, // 需要实现源管理
      'bibliography': () => {}, // 需要下拉选择
      
      // 引用 - 题注
      'insertCaption': () => {}, // 需要实现题注
      'insertTOF': () => {}, // 需要实现图表目录
      
      // 审阅 - 校对
      'spellCheck': () => {}, // 需要实现拼写检查
      'thesaurus': () => {}, // 需要实现同义词库
      'wordCount': () => this.showWordCount(),
      
      // 审阅 - 批注
      'newComment': () => this.editor.command.executeAddComment(),
      'deleteComment': () => this.editor.command.executeDeleteComment(),
      'previousComment': () => this.editor.command.executePreviousComment(),
      'nextComment': () => this.editor.command.executeNextComment(),
      
      // 审阅 - 修订
      'trackChanges': () => this.toggleTrackChanges(),
      'showMarkup': () => {}, // 需要下拉选择
      'reviewingPane': () => {}, // 需要实现审阅窗格
      
      // 审阅 - 更改
      'acceptChange': () => this.editor.command.executeAcceptChange(),
      'rejectChange': () => this.editor.command.executeRejectChange(),
      'previousChange': () => this.editor.command.executePreviousChange(),
      'nextChange': () => this.editor.command.executeNextChange(),
      
      // 视图 - 视图模式
      'printLayout': () => this.editor.setMode(0 /* EditorMode.EDITOR */),
      'webLayout': () => this.editor.setMode(1 /* EditorMode.VIEWER */),
      'outline': () => {}, // 需要实现大纲视图
      'draft': () => {}, // 需要实现草稿视图
      
      // 视图 - 显示
      'ruler': () => this.toggleRuler(),
      'gridlines': () => this.toggleGridlines(),
      'navigationPane': () => this.toggleNavigationPane(),
      
      // 视图 - 缩放
      'zoom100': () => this.editor.setScale(1),
      'zoomOnePage': () => this.editor.setZoomToPage(),
      'zoomTwoPages': () => this.editor.setZoomToTwoPages(),
      'zoomWidth': () => this.editor.setZoomToWidth()
    }

    const command = commandMap[itemId]
    if (command) {
      command()
    } else {
      console.warn(`No command mapped for ribbon item: ${itemId}`)
    }
  }

  /**
   * 触发图片上传
   */
  private triggerImageUpload(): void {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (event) => {
        const value = event.target?.result as string
        const img = new Image()
        img.src = value
        img.onload = () => {
          this.editor.command.executeImage({
            value,
            width: img.width,
            height: img.height
          })
        }
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  /**
   * 触发超链接对话框
   */
  private triggerHyperlinkDialog(): void {
    // 这里应该调用 Dialog 组件，但为了避免循环依赖，使用自定义事件
    const rangeText = this.editor.command.getRangeText()
    const event = new CustomEvent('insert-hyperlink', {
      detail: { defaultText: rangeText }
    })
    window.dispatchEvent(event)
  }

  /**
   * 显示字数统计
   */
  private showWordCount(): void {
    const count = this.editor.command.getWordCount()
    alert(`字数统计：${count} 字`)
  }

  /**
   * 切换修订模式
   */
  private toggleTrackChanges(): void {
    // TODO: 实现修订模式切换
    console.log('Toggle track changes')
  }

  /**
   * 切换标尺显示
   */
  private toggleRuler(): void {
    // TODO: 实现标尺显示切换
    console.log('Toggle ruler')
  }

  /**
   * 切换网格线显示
   */
  private toggleGridlines(): void {
    // TODO: 实现网格线显示切换
    console.log('Toggle gridlines')
  }

  /**
   * 切换导航窗格显示
   */
  private toggleNavigationPane(): void {
    // TODO: 实现导航窗格显示切换
    console.log('Toggle navigation pane')
  }

  updateState(): void {
    // 更新 Ribbon 项的激活/禁用状态
    // 例如：当光标在加粗文本中时，加粗按钮应该显示为激活状态
  }
}
