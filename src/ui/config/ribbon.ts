/**
 * Word 风格 Ribbon 菜单配置
 * 参考 Microsoft Office Fluent UI 设计
 */

import type { IRibbonTab } from '../interface'

export const RIBBON_TABS: IRibbonTab[] = [
  {
    id: 'home',
    label: '开始',
    groups: [
      {
        id: 'clipboard',
        label: '剪贴板',
        items: [
          { id: 'paste', type: 'button', icon: 'ri-clipboard-line', label: '粘贴', tooltip: '粘贴 (Ctrl+V)' },
          { id: 'cut', type: 'button', icon: 'ri-scissors-line', label: '剪切', tooltip: '剪切 (Ctrl+X)' },
          { id: 'copy', type: 'button', icon: 'ri-file-copy-line', label: '复制', tooltip: '复制 (Ctrl+C)' },
          { id: 'formatPainter', type: 'button', icon: 'ri-brush-line', label: '格式刷', tooltip: '格式刷' }
        ]
      },
      {
        id: 'font',
        label: '字体',
        items: [
          { id: 'fontFamily', type: 'dropdown', icon: 'ri-font-family', label: '字体', tooltip: '字体' },
          { id: 'fontSize', type: 'dropdown', icon: 'ri-font-size', label: '字号', tooltip: '字号' },
          { id: 'fontSizeAdd', type: 'button', icon: 'ri-font-size-2', label: '增大字号', tooltip: '增大字号 (Ctrl+Shift+>)' },
          { id: 'fontSizeMinus', type: 'button', icon: 'ri-font-size', label: '减小字号', tooltip: '减小字号 (Ctrl+Shift+<)' },
          { id: 'clearFormat', type: 'button', icon: 'ri-format-clear', label: '清除格式', tooltip: '清除格式' },
          { id: 'bold', type: 'toggle', icon: 'ri-bold', label: '加粗', tooltip: '加粗 (Ctrl+B)' },
          { id: 'italic', type: 'toggle', icon: 'ri-italic', label: '斜体', tooltip: '斜体 (Ctrl+I)' },
          { id: 'underline', type: 'toggle', icon: 'ri-underline', label: '下划线', tooltip: '下划线 (Ctrl+U)' },
          { id: 'strikeout', type: 'toggle', icon: 'ri-strikethrough', label: '删除线', tooltip: '删除线' },
          { id: 'superscript', type: 'toggle', icon: 'ri-superscript', label: '上标', tooltip: '上标 (Ctrl+Shift+=)' },
          { id: 'subscript', type: 'toggle', icon: 'ri-subscript', label: '下标', tooltip: '下标 (Ctrl+=)' },
          { id: 'fontColor', type: 'colorpicker', icon: 'ri-font-color', label: '字体颜色', tooltip: '字体颜色' },
          { id: 'highlightColor', type: 'colorpicker', icon: 'ri-highlight', label: '突出显示颜色', tooltip: '突出显示颜色' }
        ]
      },
      {
        id: 'paragraph',
        label: '段落',
        items: [
          { id: 'bullets', type: 'dropdown', icon: 'ri-list-unordered', label: '项目符号', tooltip: '项目符号' },
          { id: 'numbering', type: 'dropdown', icon: 'ri-list-ordered', label: '编号', tooltip: '编号' },
          { id: 'alignLeft', type: 'toggle', icon: 'ri-align-left', label: '左对齐', tooltip: '左对齐 (Ctrl+L)' },
          { id: 'alignCenter', type: 'toggle', icon: 'ri-align-center', label: '居中对齐', tooltip: '居中对齐 (Ctrl+E)' },
          { id: 'alignRight', type: 'toggle', icon: 'ri-align-right', label: '右对齐', tooltip: '右对齐 (Ctrl+R)' },
          { id: 'alignJustify', type: 'toggle', icon: 'ri-align-justify', label: '两端对齐', tooltip: '两端对齐 (Ctrl+J)' },
          { id: 'lineSpacing', type: 'dropdown', icon: 'ri-line-height', label: '行和段落间距', tooltip: '行和段落间距' },
          { id: 'shading', type: 'colorpicker', icon: 'ri-palette', label: '底纹', tooltip: '底纹' },
          { id: 'borders', type: 'dropdown', icon: 'ri-border-all', label: '边框', tooltip: '边框' }
        ]
      },
      {
        id: 'styles',
        label: '样式',
        items: [
          { id: 'styleNormal', type: 'button', label: '正文', tooltip: '正文样式' },
          { id: 'styleHeading1', type: 'button', label: '标题 1', tooltip: '标题 1' },
          { id: 'styleHeading2', type: 'button', label: '标题 2', tooltip: '标题 2' },
          { id: 'styleHeading3', type: 'button', label: '标题 3', tooltip: '标题 3' }
        ]
      }
    ]
  },
  {
    id: 'insert',
    label: '插入',
    groups: [
      {
        id: 'pages',
        label: '页面',
        items: [
          { id: 'coverPage', type: 'dropdown', icon: 'ri-file-text-line', label: '封面', tooltip: '封面' },
          { id: 'blankPage', type: 'button', icon: 'ri-file-add-line', label: '空白页', tooltip: '空白页' },
          { id: 'pageBreak', type: 'button', icon: 'ri-separator', label: '分页符', tooltip: '分页符 (Ctrl+Enter)' }
        ]
      },
      {
        id: 'tables',
        label: '表格',
        items: [
          { id: 'insertTable', type: 'panel', icon: 'ri-table-line', label: '表格', tooltip: '插入表格' }
        ]
      },
      {
        id: 'illustrations',
        label: '插图',
        items: [
          { id: 'insertPicture', type: 'button', icon: 'ri-image-line', label: '图片', tooltip: '图片' },
          { id: 'insertOnlinePictures', type: 'button', icon: 'ri-global-line', label: '联机图片', tooltip: '联机图片' },
          { id: 'insertShapes', type: 'dropdown', icon: 'ri-shape-line', label: '形状', tooltip: '形状' },
          { id: 'insertIcons', type: 'button', icon: 'ri-emotion-line', label: '图标', tooltip: '图标' },
          { id: 'insertSmartArt', type: 'button', icon: 'ri-layout-grid-line', label: 'SmartArt', tooltip: 'SmartArt' },
          { id: 'insertChart', type: 'button', icon: 'ri-bar-chart-line', label: '图表', tooltip: '图表' }
        ]
      },
      {
        id: 'addIns',
        label: '加载项',
        items: [
          { id: 'getAddIns', type: 'button', icon: 'ri-store-line', label: '获取加载项', tooltip: '获取加载项' },
          { id: 'myAddIns', type: 'button', icon: 'ri-apps-line', label: '我的加载项', tooltip: '我的加载项' }
        ]
      },
      {
        id: 'links',
        label: '链接',
        items: [
          { id: 'insertLink', type: 'button', icon: 'ri-link', label: '链接', tooltip: '链接 (Ctrl+K)' },
          { id: 'insertBookmark', type: 'button', icon: 'ri-bookmark-line', label: '书签', tooltip: '书签' },
          { id: 'insertCrossreference', type: 'button', icon: 'ri-share-line', label: '交叉引用', tooltip: '交叉引用' }
        ]
      },
      {
        id: 'symbols',
        label: '符号',
        items: [
          { id: 'insertEquation', type: 'dropdown', icon: 'ri-function-line', label: '公式', tooltip: '公式' },
          { id: 'insertSymbol', type: 'button', icon: 'ri-omega-line', label: '符号', tooltip: '符号' }
        ]
      }
    ]
  },
  {
    id: 'layout',
    label: '布局',
    groups: [
      {
        id: 'pageSetup',
        label: '页面设置',
        items: [
          { id: 'margins', type: 'dropdown', icon: 'ri-ruler-line', label: '页边距', tooltip: '页边距' },
          { id: 'orientation', type: 'dropdown', icon: 'ri-smartphone-line', label: '纸张方向', tooltip: '纸张方向' },
          { id: 'size', type: 'dropdown', icon: 'ri-crop-line', label: '纸张大小', tooltip: '纸张大小' },
          { id: 'columns', type: 'dropdown', icon: 'ri-columns-line', label: '分栏', tooltip: '分栏' },
          { id: 'breaks', type: 'dropdown', icon: 'ri-separator', label: '分隔符', tooltip: '分隔符' },
          { id: 'lineNumbers', type: 'button', icon: 'ri-list-ordered', label: '行号', tooltip: '行号' }
        ]
      },
      {
        id: 'paragraph',
        label: '段落',
        items: [
          { id: 'indentLeft', type: 'button', icon: 'ri-indent-increase', label: '增加缩进', tooltip: '增加缩进' },
          { id: 'indentRight', type: 'button', icon: 'ri-indent-decrease', label: '减少缩进', tooltip: '减少缩进' },
          { id: 'spacingBefore', type: 'button', icon: 'ri-arrow-up-s-line', label: '段前间距', tooltip: '段前间距' },
          { id: 'spacingAfter', type: 'button', icon: 'ri-arrow-down-s-line', label: '段后间距', tooltip: '段后间距' }
        ]
      },
      {
        id: 'background',
        label: '页面背景',
        items: [
          { id: 'watermark', type: 'dropdown', icon: 'ri-watermark', label: '水印', tooltip: '水印' },
          { id: 'pageColor', type: 'colorpicker', icon: 'ri-palette', label: '页面颜色', tooltip: '页面颜色' },
          { id: 'pageBorders', type: 'button', icon: 'ri-border-outer', label: '页面边框', tooltip: '页面边框' }
        ]
      }
    ]
  },
  {
    id: 'references',
    label: '引用',
    groups: [
      {
        id: 'tableOfContents',
        label: '目录',
        items: [
          { id: 'insertTOC', type: 'dropdown', icon: 'ri-menu-line', label: '目录', tooltip: '目录' }
        ]
      },
      {
        id: 'footnotes',
        label: '脚注',
        items: [
          { id: 'insertFootnote', type: 'button', icon: 'ri-footprint-line', label: '插入脚注', tooltip: '插入脚注' },
          { id: 'insertEndnote', type: 'button', icon: 'ri-book-open-line', label: '插入尾注', tooltip: '插入尾注' }
        ]
      },
      {
        id: 'citations',
        label: '引文与书目',
        items: [
          { id: 'insertCitation', type: 'button', icon: 'ri-booklet-line', label: '插入引文', tooltip: '插入引文' },
          { id: 'manageSources', type: 'button', icon: 'ri-database-line', label: '管理源', tooltip: '管理源' },
          { id: 'bibliography', type: 'dropdown', icon: 'ri-book-read-line', label: '书目', tooltip: '书目' }
        ]
      },
      {
        id: 'captions',
        label: '题注',
        items: [
          { id: 'insertCaption', type: 'button', icon: 'ri-caption-line', label: '插入题注', tooltip: '插入题注' },
          { id: 'insertTOF', type: 'button', icon: 'ri-image-line', label: '插入图表目录', tooltip: '插入图表目录' }
        ]
      }
    ]
  },
  {
    id: 'review',
    label: '审阅',
    groups: [
      {
        id: 'proofing',
        label: '校对',
        items: [
          { id: 'spellCheck', type: 'button', icon: 'ri-spell-check', label: '拼写检查', tooltip: '拼写检查' },
          { id: 'thesaurus', type: 'button', icon: 'ri-book-open-line', label: '同义词库', tooltip: '同义词库' },
          { id: 'wordCount', type: 'button', icon: 'ri-character-recognition-line', label: '字数统计', tooltip: '字数统计' }
        ]
      },
      {
        id: 'comments',
        label: '批注',
        items: [
          { id: 'newComment', type: 'button', icon: 'ri-message-line', label: '新建批注', tooltip: '新建批注' },
          { id: 'deleteComment', type: 'button', icon: 'ri-delete-bin-line', label: '删除批注', tooltip: '删除批注' },
          { id: 'previousComment', type: 'button', icon: 'ri-arrow-up-line', label: '上一条', tooltip: '上一条批注' },
          { id: 'nextComment', type: 'button', icon: 'ri-arrow-down-line', label: '下一条', tooltip: '下一条批注' }
        ]
      },
      {
        id: 'tracking',
        label: '修订',
        items: [
          { id: 'trackChanges', type: 'toggle', icon: 'ri-edit-line', label: '修订', tooltip: '修订' },
          { id: 'showMarkup', type: 'dropdown', icon: 'ri-eye-line', label: '显示标记', tooltip: '显示标记' },
          { id: 'reviewingPane', type: 'button', icon: 'ri-list-check', label: '审阅窗格', tooltip: '审阅窗格' }
        ]
      },
      {
        id: 'changes',
        label: '更改',
        items: [
          { id: 'acceptChange', type: 'button', icon: 'ri-checkbox-circle-line', label: '接受', tooltip: '接受修订' },
          { id: 'rejectChange', type: 'button', icon: 'ri-close-circle-line', label: '拒绝', tooltip: '拒绝修订' },
          { id: 'previousChange', type: 'button', icon: 'ri-arrow-up-line', label: '上一条', tooltip: '上一条修订' },
          { id: 'nextChange', type: 'button', icon: 'ri-arrow-down-line', label: '下一条', tooltip: '下一条修订' }
        ]
      }
    ]
  },
  {
    id: 'view',
    label: '视图',
    groups: [
      {
        id: 'views',
        label: '视图',
        items: [
          { id: 'printLayout', type: 'toggle', icon: 'ri-file-text-line', label: '页面视图', tooltip: '页面视图' },
          { id: 'webLayout', type: 'toggle', icon: 'ri-global-line', label: 'Web 版式视图', tooltip: 'Web 版式视图' },
          { id: 'outline', type: 'toggle', icon: 'ri-list-check', label: '大纲视图', tooltip: '大纲视图' },
          { id: 'draft', type: 'toggle', icon: 'ri-edit-line', label: '草稿', tooltip: '草稿' }
        ]
      },
      {
        id: 'show',
        label: '显示',
        items: [
          { id: 'ruler', type: 'toggle', icon: 'ri-ruler-line', label: '标尺', tooltip: '标尺' },
          { id: 'gridlines', type: 'toggle', icon: 'ri-layout-grid-line', label: '网格线', tooltip: '网格线' },
          { id: 'navigationPane', type: 'toggle', icon: 'ri-menu-search-line', label: '导航窗格', tooltip: '导航窗格' }
        ]
      },
      {
        id: 'zoom',
        label: '缩放',
        items: [
          { id: 'zoom100', type: 'button', icon: 'ri-zoom-in-line', label: '100%', tooltip: '100%' },
          { id: 'zoomOnePage', type: 'button', icon: 'ri-pages-line', label: '单页', tooltip: '单页' },
          { id: 'zoomTwoPages', type: 'button', icon: 'ri-pages-line', label: '双页', tooltip: '双页' },
          { id: 'zoomWidth', type: 'button', icon: 'ri-width-line', label: '页宽', tooltip: '页宽' }
        ]
      },
      {
        id: 'window',
        label: '窗口',
        items: [
          { id: 'newWindow', type: 'button', icon: 'ri-window-line', label: '新建窗口', tooltip: '新建窗口' },
          { id: 'arrangeAll', type: 'button', icon: 'ri-layout-masonry-line', label: '全部重排', tooltip: '全部重排' },
          { id: 'split', type: 'button', icon: 'ri-split-cells-vertical', label: '拆分', tooltip: '拆分' },
          { id: 'switchWindows', type: 'dropdown', icon: 'ri-window-2-line', label: '切换窗口', tooltip: '切换窗口' }
        ]
      }
    ]
  }
]

export default RIBBON_TABS
