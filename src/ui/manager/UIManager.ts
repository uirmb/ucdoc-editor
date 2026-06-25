/**
 * UI 管理器 - 负责 Ribbon 工具栏与编辑器的交互
 * 与核心编辑器解耦，通过接口交互
 */

import type Editor from '../../editor'
import { RibbonToolbar } from '../components/RibbonToolbar'
import type { IUIManager } from '../interface'

export class UIManager implements IUIManager {
  public editor: Editor
  private ribbonToolbar: RibbonToolbar | null = null
  private container: HTMLElement | null = null

  constructor(editor: Editor, container?: HTMLElement) {
    this.editor = editor
    this.container = container || document.querySelector('#ribbon-toolbar')
  }

  init(): void {
    if (!this.container) {
      console.warn('Ribbon toolbar container not found')
      return
    }

    // 初始化 Ribbon 工具栏
    this.ribbonToolbar = new RibbonToolbar(this.container, this.editor)
    this.ribbonToolbar.init()

    console.log('UI Manager initialized')
  }

  destroy(): void {
    if (this.ribbonToolbar) {
      this.ribbonToolbar.destroy()
      this.ribbonToolbar = null
    }
    this.container = null
  }

  /**
   * 更新 UI 状态（例如：当光标位置变化时更新按钮激活状态）
   */
  updateState(): void {
    if (this.ribbonToolbar) {
      this.ribbonToolbar.updateState()
    }
  }
}
