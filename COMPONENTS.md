# 组件架构说明

> 💡 **提示**: 关于可复用的 CSS 类名使用，请查看 [`STYLES.md`](./STYLES.md)

## 📁 项目结构

```
src/
├── layouts/
│   └── Layout.astro          # 基础布局组件（HTML模板、字体加载）
├── components/
│   ├── Navigation.astro      # 导航栏组件（响应式：PC水平菜单 / 移动端汉堡）
│   ├── Footer.astro          # 页脚组件
│   ├── Button.astro          # 可复用按钮组件（3种变体×3种尺寸）
│   └── ContactCard.astro     # 联系卡片组件（媒体/合作/一般问询）
├── pages/
│   ├── index.astro           # 首页
│   └── contact.astro         # 联系我们页面（PC端设计）
└── styles/
    └── global.css            # 全局样式和可复用CSS类（✨ 新增）
```

## 🎨 主题配置

所有颜色和字体都在 `tailwind.config.js` 中统一管理。

> **✨ 新功能**: 现在有专门的可复用 CSS 类！详见 [`STYLES.md`](./STYLES.md)

### 颜色变量

```javascript
primary: '#2649ff'          // 品牌主色
primary-dark: '#1a3acc'     // 主色深色版
dark: '#000000'             // 深色背景
dark-900: '#111827'         // 深色渐变
light-bg: '#f0f0f0'         // 浅色背景
light-text: rgba(255,255,255,0.64)  // 浅色文字
light-footer: rgba(255,255,255,0.76) // 页脚文字
```

### 响应式字体

```javascript
// 标题
heading-xl: clamp(2rem, 5vw, 3.75rem)
heading-lg: clamp(1.5rem, 3vw, 2.5rem)
heading-md: clamp(1.125rem, 2vw, 1.875rem)
heading-sm: clamp(1rem, 1.5vw, 1.5rem)

// 正文
body-lg: clamp(0.875rem, 1vw, 1.125rem)
body-md: clamp(0.75rem, 0.9vw, 1rem)
body-sm: clamp(0.625rem, 0.8vw, 0.875rem)
```

## 🧩 组件使用示例

### Layout 布局

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="页面标题" description="页面描述">
  <!-- 页面内容 -->
</Layout>
```

### Navigation 导航栏

```astro
---
import Navigation from '../components/Navigation.astro';
---

<Navigation transparent />  <!-- 透明背景 -->
<Navigation />              <!-- 默认背景 -->
```

**特点：**

- ✅ PC端：完整的水平导航菜单（白色圆角背景）
- ✅ 移动端：汉堡菜单图标
- ✅ 自动响应式切换（lg 断点）

### Button 按钮

```astro
---
import Button from '../components/Button.astro';
---

<!-- 不同变体 -->
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">边框按钮</Button>

<!-- 不同尺寸 -->
<Button size="sm">小按钮</Button>
<Button size="md">中按钮</Button>
<Button size="lg">大按钮</Button>

<!-- 链接按钮 -->
<Button href="/contact">跳转链接</Button>
```

### ContactCard 联系卡片

```astro
---
import ContactCard from '../components/ContactCard.astro';
---

<ContactCard
  title="媒体问询"
  email="media@vstar.com"
  icon="media"  <!-- media | partner | general -->
/>
```

### Footer 页脚

```astro
---
import Footer from '../components/Footer.astro';
---

<Footer />  <!-- 直接使用即可 -->
```

## 📱 响应式设计

所有组件都遵循移动优先设计：

- **移动端**: 单列布局
- **md (768px+)**: 两列布局
- **lg (1024px+)**: 三列布局

使用 Tailwind 的响应式前缀：

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 内容 -->
</div>
```

## 🎯 最佳实践

### 1. 颜色使用

**✅ 推荐**: 使用主题变量

```html
<div class="bg-primary text-white">
  <div class="text-light-footer"></div>
</div>
```

**❌ 避免**: 硬编码颜色

```html
<div class="bg-[#2649ff]">
  <div class="text-[rgba(255,255,255,0.76)]"></div>
</div>
```

### 2. 字体大小

**✅ 推荐**: 使用全局样式类（见 `STYLES.md`）

```html
<h1 class="page-title">页面标题</h1>
<h2 class="section-title">区块标题</h2>
<h4 class="card-title">卡片标题</h4>
<p class="text-body-md">正文内容</p>
```

**❌ 避免**: 固定像素大小或重复的响应式类

```html
<h1 class="text-[32px] md:text-[48px] lg:text-[60px]">
  <p class="text-sm md:text-base lg:text-lg"></p>
</h1>
```

### 3. 组件复用

**✅ 推荐**: 抽取可复用组件

```astro
<!-- ContactCard.astro -->
{contactCards.map(card => <ContactCard {...card} />)}
```

**❌ 避免**: 重复代码

```astro
<div class="bg-light-bg...">...</div>
<div class="bg-light-bg...">...</div>
<div class="bg-light-bg...">...</div>
```

## 🚀 新建页面流程

1. 在 `src/pages/` 创建新页面文件
2. 导入必要的布局和组件
3. 使用主题变量和响应式字体类
4. 确保移动端适配

```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="新页面">
  <header class="bg-gradient-to-r from-dark via-dark-900 to-dark rounded-b-4xl">
    <Navigation transparent />
    <!-- 页面头部内容 -->
  </header>

  <main class="container mx-auto px-6 py-12 md:py-16 lg:py-20">
    <!-- 页面主要内容 -->
  </main>

  <Footer />
</Layout>
```

## 🔧 开发命令

```bash
# 启动开发服务器（禁用 telemetry）
ASTRO_TELEMETRY_DISABLED=1 npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📐 PC端 vs 移动端设计差异

### 导航栏

- **PC (lg+)**: 白色圆角背景的水平菜单，5个导航项
- **移动端**: 汉堡菜单图标

### 布局

- **PC**: 最大宽度 1440px，大号字体（60px, 68px标题）
- **移动端**: 流式布局，小号字体（38px标题）

### 联系卡片

- **PC**: 三列并排，卡片高度440px
- **移动端**: 单列堆叠，自适应高度

### 办公室信息

- **PC**: 左右交替布局，图片452x452px，大间距
- **移动端**: 上下堆叠，图片300px高

### 圆角设计

- **PC**: 72px 大圆角
- **移动端**: 40px 小圆角

## 🎯 设计系统更新

### 新增固定字体尺寸

```css
/* PC端精确字体 */
text-[60px]  /* 主标题 */
text-[68px]  /* 大标题 */
text-[46px]  /* 副标题 */
text-[40px]  /* 卡片标题 */
text-[22px]  /* 正文 */
text-[26px]  /* 地址文本 */
text-[30px]  /* 位置文本 */
```

### 新增圆角尺寸

```css
rounded-[72px]  /* PC端头部底部圆角 */
rounded-[33px]  /* PC端图片圆角 */
rounded-[22px]  /* PC端卡片圆角 */
```

## 📚 相关文档

- **[STYLES.md](./STYLES.md)** - 全局样式系统使用指南（包含所有可复用的 CSS 类）

## 📝 待优化项

- [x] PC端水平导航菜单（已完成）
- [x] 左右交替的办公室布局（已完成）
- [x] 响应式字体大小（已完成）
- [x] 创建全局样式系统和可复用 CSS 类（✨ 已完成）
- [ ] 添加 Logo SVG 组件
- [ ] 实现移动端菜单展开逻辑
- [ ] 添加页面切换动画
- [ ] 优化图片加载（使用 Astro Image）
- [ ] 添加暗色模式支持
- [ ] 实现国际化（i18n）
- [ ] 添加页面过渡动画
- [ ] 实现滚动动画（AOS）
