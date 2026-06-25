/**
 * 颜色选择器组件
 * Word 风格颜色面板
 */

export interface ColorPickerOptions {
  colors?: string[]
  onColorSelect?: (color: string) => void
}

export class ColorPicker {
  private container: HTMLElement
  private options: ColorPickerOptions
  private element: HTMLElement | null = null

  private defaultColors = [
    '#FFFFFF', '#000000', '#EEECE1', '#1F497D', '#4F81BD', '#C0504D', '#9BBB59', '#8064A2',
    '#4BACC6', '#F79646', '#F2F2F2', '#7F7F7F', '#DDD9C3', '#C6D9F0', '#DBE5F1', '#F2DCDB',
    '#EBF1DD', '#E5E0EC', '#DBEEF3', '#FDE9D9', '#D8D8D8', '#595959', '#C4BD97', '#8DB3E2',
    '#B8CCE4', '#E5B9B7', '#D7E3BC', '#CCC1D9', '#B7DDE8', '#FBD5B5', '#BFBFBF', '#3F3F3F',
    '#938953', '#548DD4', '#95B3D7', '#D99694', '#C3D69B', '#B2A2C7', '#92CDDC', '#FAC08F',
    '#A5A5A5', '#262626', '#494429', '#17365D', '#366092', '#953734', '#76923C', '#5F497A',
    '#31859B', '#E36C09', '#7F7F7F', '#0C0C0C', '#1D1B10', '#0F243E', '#244061', '#632423',
    '#4F6128', '#3F3151', '#205867', '#974806', '#1F1F1F'
  ]

  constructor(container: HTMLElement, options: ColorPickerOptions = {}) {
    this.container = container
    this.options = {
      colors: options.colors || this.defaultColors,
      onColorSelect: options.onColorSelect
    }
  }

  show(anchorElement: HTMLElement): void {
    if (this.element) {
      this.element.remove()
    }

    this.element = document.createElement('div')
    this.element.className = 'ce-color-picker'
    
    const gridHtml = this.options.colors!.map(color => 
      `<div class="ce-color-item" style="background-color: ${color}" data-color="${color}"></div>`
    ).join('')

    this.element.innerHTML = `
      <div class="ce-color-grid">
        ${gridHtml}
      </div>
      <div class="ce-color-more">
        <button class="ce-color-more-btn">更多颜色...</button>
      </div>
    `

    this.container.appendChild(this.element)
    this.bindEvents()
    this.position(anchorElement)
  }

  hide(): void {
    if (this.element) {
      this.element.remove()
      this.element = null
    }
  }

  private position(anchor: HTMLElement): void {
    const rect = anchor.getBoundingClientRect()
    const scrollY = window.scrollY || window.pageYOffset
    
    if (this.element) {
      this.element.style.position = 'absolute'
      this.element.style.left = `${rect.left}px`
      this.element.style.top = `${rect.bottom + scrollY + 2}px`
      this.element.style.zIndex = '10000'
    }
  }

  private bindEvents(): void {
    if (!this.element) return

    // 颜色选择
    this.element.addEventListener('click', (e) => {
      const colorItem = (e.target as HTMLElement).closest('.ce-color-item')
      if (colorItem) {
        const color = colorItem.getAttribute('data-color')
        if (color && this.options.onColorSelect) {
          this.options.onColorSelect(color)
        }
        this.hide()
      }
      
      const moreBtn = (e.target as HTMLElement).closest('.ce-color-more-btn')
      if (moreBtn) {
        // TODO: 打开系统颜色选择器
        this.hide()
      }
    })

    // 点击外部关闭
    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick)
    }, 0)
  }

  private handleOutsideClick = (e: MouseEvent): void => {
    if (!this.element) return
    if (!this.element.contains(e.target as Node)) {
      this.hide()
      document.removeEventListener('click', this.handleOutsideClick)
    }
  }

  destroy(): void {
    this.hide()
    document.removeEventListener('click', this.handleOutsideClick)
  }
}
