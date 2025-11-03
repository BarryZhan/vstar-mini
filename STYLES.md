# 样式系统使用指南

## 📚 全局 CSS 类说明

所有可复用的样式类都定义在 `src/styles/global.css` 中。

## 🎨 字体类

### 标题类

| 类名                 | 用途       | 移动端 | 平板 | PC端 | 示例               |
| -------------------- | ---------- | ------ | ---- | ---- | ------------------ |
| `.text-heading-hero` | 页面主标题 | 32px   | 48px | 60px | 联系我们           |
| `.text-heading-1`    | 区块标题   | 28px   | 42px | 58px | 联系方式           |
| `.text-heading-2`    | 子区块标题 | 20px   | 26px | 32px | 尊敬的访客，您好！ |
| `.text-heading-3`    | 卡片标题   | 20px   | 28px | 36px | 媒体问询           |
| `.text-heading-4`    | 小卡片标题 | 16px   | 26px | 38px | 全球总部           |

### 正文类

| 类名            | 用途     | 移动端 | 平板 | PC端 | 示例             |
| --------------- | -------- | ------ | ---- | ---- | ---------------- |
| `.text-body-lg` | 大正文   | 16px   | 18px | 20px | 澳大利亚，墨尔本 |
| `.text-body-md` | 中等正文 | 14px   | 16px | 18px | 说明文字         |
| `.text-body-sm` | 小正文   | 12px   | 14px | 16px | 辅助文字         |
| `.text-body-xs` | 超小正文 | 12px   | 14px | 16px | 注释说明         |

### 特殊用途类

| 类名                | 用途     | 说明                           |
| ------------------- | -------- | ------------------------------ |
| `.text-description` | 描述文字 | 带透明度的白色文字，用于英雄区 |
| `.text-link`        | 链接文字 | 用于可点击链接                 |
| `.text-address`     | 地址文字 | 带透明度，用于地址信息         |

### 组合类

| 类名             | 包含样式            | 用途       |
| ---------------- | ------------------- | ---------- |
| `.page-title`    | 字体+颜色+居中+间距 | 页面主标题 |
| `.section-title` | 字体+居中+间距      | 区块标题   |
| `.card-title`    | 字体+间距           | 卡片标题   |

## 📦 布局类

### 容器类

```html
<!-- 内容容器 - 最大宽度 1440px，响应式内边距 -->
<div class="content-container">...</div>

<!-- 页面主容器 - 内容容器 + 响应式垂直间距 -->
<main class="page-main">...</main>
```

### 间距类

```html
<!-- 区块间距 - 16/20/32 -->
<section class="spacing-section">...</section>

<!-- 小区块间距 - 12/16/20 -->
<div class="spacing-block">...</div>
```

## 🎯 圆角类

| 类名              | 移动端 | 平板 | PC端 | 用途         |
| ----------------- | ------ | ---- | ---- | ------------ |
| `.rounded-card`   | 18px   | 22px | 22px | 卡片圆角     |
| `.rounded-image`  | 15px   | 22px | 33px | 图片圆角     |
| `.rounded-header` | 40px   | 60px | 72px | 头部底部圆角 |
| `.rounded-footer` | 40px   | 50px | 60px | 页脚顶部圆角 |

## 💡 使用示例

### 1. 页面标题

```astro
<!-- ❌ 之前 -->
<h1 class="text-[32px] md:text-[48px] lg:text-[60px] font-normal text-white mb-6 md:mb-8 leading-tight text-center">
  联系我们
</h1>

<!-- ✅ 现在 -->
<h1 class="page-title">
  联系我们
</h1>
```

### 2. 区块标题

```astro
<!-- ❌ 之前 -->
<h2 class="text-[28px] md:text-[42px] lg:text-[58px] font-medium text-center mb-12 md:mb-16 lg:mb-20">
  联系方式
</h2>

<!-- ✅ 现在 -->
<h2 class="section-title">
  联系方式
</h2>
```

### 3. 正文内容

```astro
<!-- ❌ 之前 -->
<p class="text-sm md:text-base lg:text-lg leading-relaxed">
  本网站为品牌展示...
</p>

<!-- ✅ 现在 -->
<p class="text-body-md">
  本网站为品牌展示...
</p>
```

### 4. 卡片组件

```astro
<!-- ❌ 之前 -->
<div class="bg-light-bg rounded-[18px] md:rounded-[22px] p-6">
  <h4 class="text-xl md:text-[28px] lg:text-[36px] font-medium mb-3 md:mb-4 lg:mb-6">
    标题
  </h4>
  <p class="text-base md:text-lg lg:text-xl">
    内容
  </p>
</div>

<!-- ✅ 现在 -->
<div class="bg-light-bg rounded-card p-6">
  <h4 class="card-title">
    标题
  </h4>
  <p class="text-body-lg">
    内容
  </p>
</div>
```

### 5. 完整页面示例

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="新页面">
  <!-- 头部 -->
  <header class="bg-dark rounded-header pb-16">
    <h1 class="page-title">页面标题</h1>
    <p class="text-description">描述文字</p>
  </header>

  <!-- 主要内容 -->
  <main class="page-main">
    <!-- 区块 1 -->
    <section class="spacing-section">
      <h2 class="section-title">区块标题</h2>
      <div class="spacing-block">
        <h3 class="text-heading-2">小标题</h3>
        <p class="text-body-md">正文内容</p>
      </div>
    </section>

    <!-- 区块 2 -->
    <section class="spacing-section">
      <div class="bg-light-bg rounded-card p-6">
        <h4 class="card-title">卡片标题</h4>
        <p class="text-body-lg">卡片内容</p>
      </div>
    </section>
  </main>

  <!-- 页脚 -->
  <footer class="rounded-footer">
    ...
  </footer>
</Layout>
```

## 🎨 自定义扩展

如果需要添加新的样式类，在 `src/styles/global.css` 中添加：

```css
@layer components {
  .your-custom-class {
    @apply text-lg font-bold text-primary;
  }
}
```

## 📝 注意事项

1. **优先使用语义化类名**
   - ✅ `.section-title`
   - ❌ `.big-text`

2. **保持一致性**
   - 项目中所有相同用途的文字都应该使用相同的类

3. **响应式自动处理**
   - 所有字体类都已包含响应式断点，无需额外添加

4. **组合使用**
   - 可以和 Tailwind 原生类一起使用
   - 例如：`<h1 class="section-title text-primary">标题</h1>`

5. **避免覆盖**
   - 如果已有合适的类，不要用内联样式覆盖
   - 需要特殊样式时，考虑创建新的组件类

## 🔍 快速查找

**需要设置标题？** → `.text-heading-*` 或组合类
**需要设置正文？** → `.text-body-*`
**需要设置间距？** → `.spacing-*`
**需要设置圆角？** → `.rounded-*`
**需要容器？** → `.content-container` 或 `.page-main`

更多问题请查看 `COMPONENTS.md`

