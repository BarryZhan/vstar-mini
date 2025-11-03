# 设计稿转换与代码规范

> **目标**: 确保从 Figma 设计稿到代码实现的一致性、可维护性和高质量

## 📐 设计稿转换规范

### 1. 设计稿分析流程

#### Step 1: 获取设计稿

```bash
# 使用 Figma MCP 获取设计上下文
- 在 Figma 中选中目标页面/组件
- 使用 figma mcp 工具提取设计信息
- 记录设计稿的断点（Mobile/Tablet/Desktop）
```

#### Step 2: 设计元素提取

**必须提取的信息：**

| 元素     | 提取内容                   | 处理方式                                    |
| -------- | -------------------------- | ------------------------------------------- |
| **颜色** | 所有主题色、文字色、背景色 | 提取到 `tailwind.config.js` 的 `colors`     |
| **字体** | 字体家族、字重、行高       | 提取到 `tailwind.config.js` 的 `fontFamily` |
| **字号** | 各断点下的字体大小         | 创建响应式类到 `global.css`                 |
| **间距** | padding, margin, gap       | 使用 Tailwind 标准间距或自定义              |
| **圆角** | border-radius              | 提取到 `global.css` 响应式类                |
| **阴影** | box-shadow                 | 提取到 `tailwind.config.js`                 |
| **布局** | flex/grid、对齐方式        | 直接使用 Tailwind 类                        |
| **图片** | 尺寸、圆角、object-fit     | 记录并实现                                  |

#### Step 3: 响应式断点识别

**标准断点：**

```javascript
{
  // 移动端 (默认)
  default: '< 768px',

  // 平板
  md: '>= 768px',

  // 桌面
  lg: '>= 1024px',

  // 大屏
  xl: '>= 1280px',
}
```

**设计稿对应关系：**

- Figma 设计稿 375px → 代码 mobile (default)
- Figma 设计稿 768px → 代码 tablet (md)
- Figma 设计稿 1440px → 代码 desktop (lg)

### 2. 颜色转换规范

#### 2.1 颜色提取原则

**❌ 错误示例：**

```html
<!-- 直接使用设计稿的颜色值 -->
<div class="bg-[#2649ff]"></div>
<p class="text-[rgba(255,255,255,0.64)]"></p>
```

**✅ 正确示例：**

**Step 1: 提取到 `tailwind.config.js`**

```javascript
colors: {
  primary: {
    DEFAULT: '#2649ff',
    dark: '#1a3acc',
  },
  dark: {
    DEFAULT: '#000000',
    900: '#111827',
  },
  light: {
    bg: '#f0f0f0',
    text: 'rgba(255, 255, 255, 0.64)',
    footer: 'rgba(255, 255, 255, 0.76)',
  },
}
```

**Step 2: 在代码中使用**

```html
<div class="bg-primary"></div>
<p class="text-light-text"></p>
```

#### 2.2 颜色命名规范

| 用途     | 命名格式                           | 示例                       |
| -------- | ---------------------------------- | -------------------------- |
| 品牌主色 | `primary`, `primary-{variant}`     | `primary`, `primary-dark`  |
| 语义色   | `{semantic}`, `{semantic}-{shade}` | `success-500`, `error-600` |
| 功能色   | `{function}-{property}`            | `light-bg`, `dark-text`    |
| 透明度   | `{color}/{opacity}`                | `white/60`, `black/10`     |

### 3. 字体转换规范

#### 3.1 字体大小转换

**原则：使用响应式类，避免固定像素**

**❌ 错误示例：**

```html
<!-- 每次都写一遍响应式 -->
<h1 class="text-[32px] md:text-[48px] lg:text-[60px]">标题</h1>
<h2 class="text-[28px] md:text-[42px] lg:text-[58px]">标题</h2>
```

**✅ 正确示例：**

**Step 1: 在 `global.css` 创建语义化类**

```css
.text-heading-hero {
  @apply text-[32px] font-normal leading-tight md:text-[48px] lg:text-[60px];
}

.text-heading-1 {
  @apply text-[28px] font-medium md:text-[42px] lg:text-[58px];
}
```

**Step 2: 使用语义化类**

```html
<h1 class="text-heading-hero">标题</h1>
<h2 class="text-heading-1">标题</h2>
```

#### 3.2 字体转换对照表

| Figma 标注   | CSS 类名             | 移动端 | 平板 | 桌面 |
| ------------ | -------------------- | ------ | ---- | ---- |
| Heading/Hero | `.text-heading-hero` | 32px   | 48px | 60px |
| Heading/H1   | `.text-heading-1`    | 28px   | 42px | 58px |
| Heading/H2   | `.text-heading-2`    | 20px   | 26px | 32px |
| Heading/H3   | `.text-heading-3`    | 20px   | 28px | 36px |
| Body/Large   | `.text-body-lg`      | 16px   | 18px | 20px |
| Body/Medium  | `.text-body-md`      | 14px   | 16px | 18px |
| Body/Small   | `.text-body-sm`      | 12px   | 14px | 16px |

#### 3.3 行高转换规范

| 内容类型 | 行高值  | Tailwind 类       |
| -------- | ------- | ----------------- |
| 标题     | 1.2-1.3 | `leading-tight`   |
| 正文     | 1.6     | `leading-relaxed` |
| 密集文本 | 1.5     | `leading-normal`  |

### 4. 间距转换规范

#### 4.1 Figma → Tailwind 间距对照

| Figma (px) | Tailwind | 实际值  |
| ---------- | -------- | ------- |
| 4px        | `1`      | 0.25rem |
| 8px        | `2`      | 0.5rem  |
| 12px       | `3`      | 0.75rem |
| 16px       | `4`      | 1rem    |
| 20px       | `5`      | 1.25rem |
| 24px       | `6`      | 1.5rem  |
| 32px       | `8`      | 2rem    |
| 40px       | `10`     | 2.5rem  |
| 48px       | `12`     | 3rem    |
| 64px       | `16`     | 4rem    |
| 80px       | `20`     | 5rem    |

#### 4.2 响应式间距

**对于不同断点的间距：**

```html
<!-- ✅ 推荐：使用响应式类 -->
<div class="mb-12 md:mb-16 lg:mb-20">...</div>
<div class="px-6 md:px-12 lg:px-20">...</div>

<!-- 或创建专用类 -->
<div class="spacing-section">...</div>
<div class="spacing-block">...</div>
```

### 5. 圆角转换规范

| Figma (px) | 用途         | CSS 类                               |
| ---------- | ------------ | ------------------------------------ |
| 15-22-33px | 图片圆角     | `.rounded-image`                     |
| 18-22px    | 卡片圆角     | `.rounded-card`                      |
| 40-60-72px | 页面区块圆角 | `.rounded-header`, `.rounded-footer` |
| 全圆       | 按钮、标签   | `rounded-full`                       |

### 6. 布局转换规范

#### 6.1 常见布局模式

**栅格布局：**

```html
<!-- 响应式栅格 -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  <!-- 移动端：单列 -->
  <!-- 平板：两列 -->
  <!-- 桌面：三列 -->
</div>
```

**Flexbox 布局：**

```html
<!-- 水平居中对齐 -->
<div class="flex items-center justify-center gap-4">...</div>

<!-- 响应式方向切换 -->
<div class="flex flex-col gap-4 md:flex-row">...</div>
```

**左右交替布局：**

```html
<!-- 奇数行：图片在左 -->
<!-- 偶数行：图片在右 -->
{items.map((item, index) => (
  <div class={`flex gap-8 ${
    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
  }`}>
    <div class="image">...</div>
    <div class="content">...</div>
  </div>
))}
```

#### 6.2 容器规范

| 容器类型 | 最大宽度 | Padding            | 类名                 |
| -------- | -------- | ------------------ | -------------------- |
| 主容器   | 1440px   | 6/12/20            | `.content-container` |
| 页面主体 | 1440px   | 6/12/20 + 垂直间距 | `.page-main`         |
| 窄内容   | 1024px   | -                  | `max-w-4xl`          |
| 文本内容 | 768px    | -                  | `max-w-3xl`          |

---

## 💻 代码编写规范

### 1. 组件开发规范

#### 1.1 组件文件结构

```astro
---
// 1. 类型定义
interface Props {
  title: string;
  description?: string;
}

// 2. Props 解构
const { title, description = '默认值' } = Astro.props;

// 3. 数据定义
const items = [...];

// 4. 辅助函数
function helperFunc() { ... }
---

<!-- 5. 模板 -->
<div class="component">
  ...
</div>

<!-- 6. 样式（如需要） -->
<style>
  .component { ... }
</style>

<!-- 7. 脚本（如需要） -->
<script>
  ...
</script>
```

#### 1.2 组件命名规范

| 类型         | 命名格式                  | 示例                                     |
| ------------ | ------------------------- | ---------------------------------------- |
| **布局组件** | `{Name}Layout.astro`      | `Layout.astro`, `DashboardLayout.astro`  |
| **页面组件** | `{name}.astro` (小写)     | `index.astro`, `contact.astro`           |
| **UI 组件**  | `{Name}.astro` (大写开头) | `Button.astro`, `Card.astro`             |
| **特性组件** | `{Feature}{Type}.astro`   | `ContactCard.astro`, `HeroSection.astro` |

#### 1.3 组件抽取原则

**何时抽取组件：**

- ✅ 代码重复 3 次以上
- ✅ 有明确的功能边界
- ✅ 可以独立测试
- ✅ 有复用价值

**何时不抽取：**

- ❌ 只使用 1-2 次
- ❌ 过度抽象导致复杂度增加
- ❌ 耦合度太高

**示例：**

```astro
<!-- ❌ 错误：重复代码 -->
<div class="bg-light-bg rounded-card p-6">
  <h4 class="card-title">标题1</h4>
  <p class="text-body-lg">内容1</p>
</div>
<div class="bg-light-bg rounded-card p-6">
  <h4 class="card-title">标题2</h4>
  <p class="text-body-lg">内容2</p>
</div>

<!-- ✅ 正确：抽取为组件 -->
---
import Card from '../components/Card.astro';
---
<Card title="标题1" description="内容1" />
<Card title="标题2" description="内容2" />
```

### 2. 样式规范

#### 2.1 CSS 类使用优先级

1. **全局语义化类** (最优先)

   ```html
   <h1 class="page-title">标题</h1>
   <div class="content-container">...</div>
   ```

2. **Tailwind 原生类**

   ```html
   <div class="flex items-center gap-4">...</div>
   ```

3. **自定义任意值** (最后选择)
   ```html
   <div class="w-[115px]">...</div>
   ```

#### 2.2 类名顺序规范

**推荐顺序：** 布局 → 尺寸 → 间距 → 字体 → 颜色 → 效果

```html
<!-- ✅ 良好的顺序 -->
<div
  class="flex h-12 w-full items-center justify-between rounded-lg bg-primary px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-primary-dark"
>
  按钮
</div>

<!-- 布局: flex items-center justify-between -->
<!-- 尺寸: w-full h-12 -->
<!-- 间距: px-6 py-3 -->
<!-- 字体: text-lg font-medium -->
<!-- 颜色: text-white bg-primary -->
<!-- 效果: rounded-lg hover:bg-primary-dark transition-colors -->
```

#### 2.3 响应式类写法

**原则：移动优先，渐进增强**

```html
<!-- ✅ 正确：从小到大 -->
<div class="text-sm md:text-base lg:text-lg">文字</div>

<!-- ❌ 错误：使用 max-width -->
<div class="text-sm md:text-base lg:text-lg">文字</div>
```

### 3. 命名规范

#### 3.1 变量命名

| 类型           | 格式               | 示例                                 |
| -------------- | ------------------ | ------------------------------------ |
| **常量**       | UPPER_SNAKE_CASE   | `MAX_WIDTH`, `API_URL`               |
| **变量**       | camelCase          | `userName`, `isActive`               |
| **组件 Props** | camelCase          | `title`, `isOpen`                    |
| **数组**       | 复数形式           | `items`, `users`, `contactCards`     |
| **布尔值**     | is/has/should 开头 | `isOpen`, `hasError`, `shouldUpdate` |

#### 3.2 CSS 类命名

| 用途         | 格式        | 示例                                     |
| ------------ | ----------- | ---------------------------------------- |
| **组件类**   | kebab-case  | `.contact-card`, `.hero-section`         |
| **状态类**   | is/has 开头 | `.is-active`, `.has-error`               |
| **响应式类** | 描述性名词  | `.text-heading-hero`, `.spacing-section` |

### 4. 注释规范

#### 4.1 组件注释

```astro
---
/**
 * 联系卡片组件
 *
 * @description 显示联系方式信息，包含图标、标题、邮箱和发送链接
 * @example
 * <ContactCard
 *   title="媒体问询"
 *   email="media@vstar.com"
 *   icon="media"
 * />
 */
interface Props {
  /** 卡片标题 */
  title: string;
  /** 联系邮箱 */
  email: string;
  /** 图标类型：media | partner | general */
  icon: 'media' | 'partner' | 'general';
}
---
```

#### 4.2 代码块注释

```astro
<!-- 导航栏 -->
<Navigation transparent />

<!-- 英雄区域 -->
<header class="hero">
  <h1>标题</h1>
</header>

<!-- 主要内容 -->
<main>
  <!-- 联系方式区块 -->
  <section>
    ...
  </section>

  <!-- 办公室信息区块 -->
  <section>
    ...
  </section>
</main>

<!-- 页脚 -->
<Footer />
```

### 5. 性能优化规范

#### 5.1 图片优化

```html
<!-- ✅ 推荐 -->
<img
  src="{image}"
  alt="{altText}"
  loading="lazy"
  class="h-full w-full object-cover"
/>

<!-- 🚀 更好：使用 Astro Image -->
--- import { Image } from 'astro:assets'; ---
<image
  src="{image}"
  alt="{altText}"
  width="{800}"
  height="{600}"
  format="webp"
  loading="lazy"
/>
```

#### 5.2 字体加载优化

```html
<head>
  <!-- 预连接 -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- 字体加载 -->
  <link
    href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Noto+Sans+SC:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</head>
```

### 6. 可访问性规范

#### 6.1 语义化 HTML

```html
<!-- ✅ 正确 -->
<header>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h2>标题</h2>
    <p>内容</p>
  </section>
</main>

<footer>...</footer>

<!-- ❌ 错误 -->
<div class="header">
  <div class="nav">
    <div class="link">首页</div>
  </div>
</div>
```

#### 6.2 ARIA 标签

```html
<!-- 按钮 -->
<button aria-label="打开菜单">
  <svg>...</svg>
</button>

<!-- 图片 -->
<img src="..." alt="办公室外观图" />

<!-- 链接 -->
<a href="mailto:support@vstar.com" aria-label="发送邮件到客服"> 联系我们 </a>
```

---

## 🔍 代码审查清单

### 设计还原度

- [ ] 颜色使用主题变量，无硬编码
- [ ] 字体使用全局类，无重复响应式代码
- [ ] 间距符合设计稿规范
- [ ] 圆角使用统一类名
- [ ] 移动端、平板、桌面三个断点都正确实现

### 代码质量

- [ ] 重复代码已抽取为组件
- [ ] 组件有清晰的 Props 类型定义
- [ ] 变量命名清晰、符合规范
- [ ] 有适当的注释说明
- [ ] 无 Linter 错误

### 性能优化

- [ ] 图片使用 lazy loading
- [ ] 字体使用 preconnect
- [ ] 无不必要的重渲染
- [ ] CSS 类数量合理

### 可访问性

- [ ] 使用语义化 HTML
- [ ] 图片有 alt 属性
- [ ] 按钮有 aria-label
- [ ] 颜色对比度符合 WCAG AA 标准

### 响应式

- [ ] 移动端优先
- [ ] 三个断点都测试通过
- [ ] 无横向滚动条
- [ ] 触摸目标至少 44x44px

---

## 📚 相关文档

- [STYLES.md](./STYLES.md) - 全局样式使用指南
- [COMPONENTS.md](./COMPONENTS.md) - 组件架构说明
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Astro 文档](https://astro.build/)

---

## 🚀 快速开始

### 1. 获取设计稿

```bash
# 在 Figma 中选中目标页面
# 使用 figma mcp 工具获取设计上下文
```

### 2. 分析并提取

```
- 提取颜色 → tailwind.config.js
- 提取字体 → global.css
- 识别组件 → src/components/
- 确认布局 → 响应式设计
```

### 3. 编码实现

```
- 使用全局样式类
- 遵循命名规范
- 移动优先开发
- 逐步添加响应式
```

### 4. 测试验证

```
- 三个断点测试
- 浏览器测试
- 性能检查
- 可访问性检查
```

---

**更新日期**: 2025-10-28  
**维护者**: VS TRADER 开发团队

