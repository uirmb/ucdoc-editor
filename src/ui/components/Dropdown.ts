/**
 * 下拉选择器组件
 * 用于字体、字号等选择
 */

export interface DropdownOption {
  label: string
  value: string | number
  icon?: string
}

export interface DropdownOptions {
  options?: DropdownOption[]
  placeholder?: string
  onSelect?: (value: string | number) => void
  width?: number
  maxHeight?: number
}

export class Dropdown {
  private container: HTMLElement
  private options: DropdownOptions
  private element: HTMLElement | null = null
  private selectedValue: string | number | null = null

  constructor(container: HTMLElement, options: DropdownOptions = {}) {
    this.container = container
    this.options = {
      placeholder: options.placeholder || '请选择',
      options: options.options || [],
      onSelect: options.onSelect,
      width: options.width || 150,
      maxHeight: options.maxHeight || 300
    }
  }

  show(anchorElement: HTMLElement, selectedValue?: string | number): void {
    if (this.element) {
      this.element.remove()
    }

    this.selectedValue = selectedValue || null
    this.element = document.createElement('div')
    this.element.className = 'ce-dropdown'
    this.element.style.width = `${this.options.width}px`

    const optionsHtml = this.options.options!.map(opt => {
      const isSelected = opt.value === this.selectedValue
      return `
        <div class="ce-dropdown-option ${isSelected ? 'selected' : ''}" 
             data-value="${opt.value}"
             ${opt.icon ? `data-icon="${opt.icon}"` : ''}>
          ${opt.icon ? `<i class="${opt.icon}"></i>` : ''}
          <span>${opt.label}</span>
        </div>
      `
    }).join('')

    this.element.innerHTML = `
      <div class="ce-dropdown-list" style="max-height: ${this.options.maxHeight}px">
        ${optionsHtml}
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

    // 选项选择
    this.element.addEventListener('click', (e) => {
      const option = (e.target as HTMLElement).closest('.ce-dropdown-option')
      if (option) {
        const value = option.getAttribute('data-value')
        if (value && this.options.onSelect) {
          // 尝试转换为数字
          const numValue = Number(value)
          this.options.onSelect(isNaN(numValue) ? value : numValue)
        }
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
