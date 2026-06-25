/**
 * 表格网格选择器组件
 * Word 风格表格插入面板（行列选择）
 */

export interface TableGridOptions {
  maxRows?: number
  maxCols?: number
  onTableSelect?: (rows: number, cols: number) => void
}

export class TableGrid {
  private container: HTMLElement
  private options: TableGridOptions
  private element: HTMLElement | null = null
  private currentHoverRow: number = 0
  private currentHoverCol: number = 0

  private readonly DEFAULT_MAX_ROWS = 8
  private readonly DEFAULT_MAX_COLS = 10

  constructor(container: HTMLElement, options: TableGridOptions = {}) {
    this.container = container
    this.options = {
      maxRows: options.maxRows || this.DEFAULT_MAX_ROWS,
      maxCols: options.maxCols || this.DEFAULT_MAX_COLS,
      onTableSelect: options.onTableSelect
    }
  }

  show(anchorElement: HTMLElement): void {
    if (this.element) {
      this.element.remove()
    }

    this.element = document.createElement('div')
    this.element.className = 'ce-table-grid'

    const gridHtml = this.renderGrid()
    
    this.element.innerHTML = `
      <div class="ce-table-grid-container">
        ${gridHtml}
      </div>
      <div class="ce-table-grid-info">
        <span id="table-grid-dimension">1×1 表格</span>
      </div>
      <div class="ce-table-grid-more">
        <button class="ce-table-insert-btn" id="table-insert-confirm">插入表格</button>
        <button class="ce-table-more-btn" id="table-insert-more">更多表格...</button>
      </div>
    `

    this.container.appendChild(this.element)
    this.bindEvents()
    this.position(anchorElement)
  }

  private renderGrid(): string {
    let html = '<table class="ce-table-grid-table">'
    
    for (let row = 0; row < this.options.maxRows!; row++) {
      html += '<tr>'
      for (let col = 0; col < this.options.maxCols!; col++) {
        html += `<td data-row="${row}" data-col="${col}"></td>`
      }
      html += '</tr>'
    }
    
    html += '</table>'
    return html
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

    const gridContainer = this.element.querySelector('.ce-table-grid-container')
    const dimensionSpan = this.element.querySelector('#table-grid-dimension')
    const insertBtn = this.element.querySelector('#table-insert-confirm')
    const moreBtn = this.element.querySelector('#table-insert-more')

    // 鼠标悬停预览
    gridContainer?.addEventListener('mouseover', (e) => {
      const cell = (e.target as HTMLElement).closest('td')
      if (cell) {
        const row = parseInt(cell.getAttribute('data-row') || '0')
        const col = parseInt(cell.getAttribute('data-col') || '0')
        
        this.currentHoverRow = row
        this.currentHoverCol = col
        
        // 更新高亮
        this.highlightGrid(row, col)
        
        // 更新尺寸显示
        if (dimensionSpan) {
          dimensionSpan.textContent = `${row + 1}×${col + 1} 表格`
        }
      }
    })

    // 点击插入
    gridContainer?.addEventListener('click', () => {
      if (this.options.onTableSelect) {
        this.options.onTableSelect(this.currentHoverRow + 1, this.currentHoverCol + 1)
      }
      this.hide()
    })

    // 确认按钮
    insertBtn?.addEventListener('click', () => {
      if (this.options.onTableSelect) {
        this.options.onTableSelect(this.currentHoverRow + 1, this.currentHoverCol + 1)
      }
      this.hide()
    })

    // 更多表格按钮
    moreBtn?.addEventListener('click', () => {
      // TODO: 打开详细表格对话框（可指定具体行列数）
      this.hide()
    })

    // 点击外部关闭
    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick)
    }, 0)
  }

  private highlightGrid(row: number, col: number): void {
    const cells = this.element?.querySelectorAll('td')
    if (!cells) return

    cells.forEach(cell => {
      const cellRow = parseInt(cell.getAttribute('data-row') || '0')
      const cellCol = parseInt(cell.getAttribute('data-col') || '0')
      
      if (cellRow <= row && cellCol <= col) {
        cell.classList.add('highlight')
      } else {
        cell.classList.remove('highlight')
      }
    })
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
