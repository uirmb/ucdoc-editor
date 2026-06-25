/**
 * UI 组件与核心编辑器交互的接口定义
 */

import type Editor from '../../editor'

export interface IUIManager {
  editor: Editor
  init(): void
  destroy(): void
}

export interface IToolbarProps {
  editor: Editor
  onUndo?: () => void
  onRedo?: () => void
  onPainter?: () => void
  onFormat?: () => void
  onFontChange?: (font: string) => void
  onSizeChange?: (size: number) => void
  onSizeAdd?: () => void
  onSizeMinus?: () => void
  onBold?: () => void
  onItalic?: () => void
  onUnderline?: (style?: any) => void
  onStrikeout?: () => void
  onSuperscript?: () => void
  onSubscript?: () => void
  onColorChange?: (color: string) => void
  onHighlightChange?: (color: string) => void
  onTitleChange?: (level: any) => void
  onRowFlexChange?: (flex: any) => void
  onRowMarginChange?: (margin: number) => void
  onListChange?: (type: any, style: any) => void
  onTableInsert?: (rows: number, cols: number) => void
  onImageInsert?: (image: any) => void
  onHyperlinkInsert?: (data: any) => void
  onSeparatorInsert?: (pattern: number[]) => void
  onPageBreak?: () => void
  onWatermarkInsert?: (data: any) => void
  onCodeBlockInsert?: () => void
  onControlInsert?: (type: any) => void
  onCheckboxInsert?: () => void
  onRadioInsert?: () => void
  onLatexInsert?: () => void
  onDateInsert?: (format: string) => void
  onSearch?: (options: any) => void
  onPrint?: () => void
}

export interface IRibbonTab {
  id: string
  label: string
  groups: IRibbonGroup[]
}

export interface IRibbonGroup {
  id: string
  label?: string
  items: IRibbonItem[]
}

export interface IRibbonItem {
  id: string
  type: 'button' | 'dropdown' | 'colorpicker' | 'toggle' | 'separator'
  icon?: string
  label?: string
  tooltip?: string
  command?: string
  params?: any
  children?: IRibbonItem[]
  visible?: boolean
  enabled?: boolean
}
