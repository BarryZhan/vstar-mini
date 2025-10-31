# VS TRADER - Astro + Tailwind CSS

> 基于 Astro 和 Tailwind CSS 的现代化网站项目，遵循完整的设计系统和代码规范。

## 📚 项目文档

| 文档                                   | 说明                                                    |
| -------------------------------------- | ------------------------------------------------------- |
| **[DESIGN_SPEC.md](./DESIGN_SPEC.md)** | 🎨 **设计稿转换与代码规范** - 从 Figma 到代码的完整流程 |
| **[STYLES.md](./STYLES.md)**           | 💅 **样式系统使用指南** - 所有可复用的 CSS 类           |
| **[COMPONENTS.md](./COMPONENTS.md)**   | 🧩 **组件架构说明** - 组件结构、主题配置、使用示例      |

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 禁用 Astro telemetry（推荐）
ASTRO_TELEMETRY_DISABLED=1 npm run dev

# 或直接启动
npm run dev
```

开发服务器将在 `http://localhost:4321` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
vstar-mini/
├── src/
│   ├── layouts/
│   │   └── Layout.astro              # 基础布局（HTML、字体加载）
│   ├── components/
│   │   ├── Navigation.astro          # 导航栏（响应式）
│   │   ├── Footer.astro              # 页脚
│   │   ├── Button.astro              # 按钮组件
│   │   └── ContactCard.astro         # 联系卡片
│   ├── pages/
│   │   ├── index.astro               # 首页
│   │   └── contact.astro             # 联系我们页面
│   └── styles/
│       └── global.css                # 全局样式和可复用类
├── public/
│   └── favicon.svg
├── tailwind.config.js                # Tailwind 配置（颜色、字体）
├── DESIGN_SPEC.md                    # 设计转换规范 ⭐
├── STYLES.md                         # 样式使用指南 ⭐
└── COMPONENTS.md                     # 组件架构文档 ⭐
```

## 🎨 技术栈

- **框架**: [Astro](https://astro.build/) v5.15.1
- **样式**: [Tailwind CSS](https://tailwindcss.com/) v4.0.0
- **字体**: Raleway + Noto Sans SC (Google Fonts)
- **开发工具**: TypeScript, ESLint

## 💡 开发指南

### 1. 遵循设计规范

查看 [DESIGN_SPEC.md](./DESIGN_SPEC.md) 了解：

- ✅ 如何从 Figma 提取设计元素
- ✅ 颜色、字体、间距转换规范
- ✅ 响应式设计实现方法
- ✅ 代码编写最佳实践

### 2. 使用全局样式类

查看 [STYLES.md](./STYLES.md) 了解：

- ✅ 可复用的字体类（`.page-title`, `.section-title` 等）
- ✅ 布局类（`.content-container`, `.page-main` 等）
- ✅ 间距类（`.spacing-section`, `.spacing-block` 等）
- ✅ 圆角类（`.rounded-card`, `.rounded-image` 等）

### 3. 组件化开发

查看 [COMPONENTS.md](./COMPONENTS.md) 了解：

- ✅ 已有组件的使用方法
- ✅ 主题配置说明
- ✅ 新建页面流程
- ✅ PC 端 vs 移动端设计差异

## 📝 开发规范示例

### ❌ 不推荐

```astro
<h1 class="text-[32px] md:text-[48px] lg:text-[60px] font-normal text-white mb-6">
  标题
</h1>
<div class="bg-[#2649ff] text-[rgba(255,255,255,0.64)]">
  内容
</div>
```

### ✅ 推荐

```astro
<h1 class="page-title">
  标题
</h1>
<div class="bg-primary text-light-text">
  内容
</div>
```

## 🎯 设计系统

### 颜色

- 主色：`primary` (#2649ff)
- 深色：`dark` (#000000)
- 浅色背景：`light-bg` (#f0f0f0)

### 断点

- 移动端：`< 768px` (默认)
- 平板：`>= 768px` (md)
- 桌面：`>= 1024px` (lg)
- 大屏：`>= 1280px` (xl)

### 字体

- 英文/数字：Raleway
- 中文：Noto Sans SC

## 🔧 命令说明

| 命令                                     | 说明                   |
| ---------------------------------------- | ---------------------- |
| `npm install`                            | 安装依赖               |
| `ASTRO_TELEMETRY_DISABLED=1 npm run dev` | 启动开发服务器（推荐） |
| `npm run dev`                            | 启动开发服务器         |
| `npm run build`                          | 构建生产版本           |
| `npm run preview`                        | 预览生产构建           |
| `npm run astro ...`                      | 运行 Astro CLI 命令    |

## 📋 待优化项

- [ ] 添加 Logo SVG 组件
- [ ] 实现移动端菜单展开逻辑
- [ ] 优化图片加载（使用 Astro Image）
- [ ] 添加页面切换动画
- [ ] 添加暗色模式支持
- [ ] 实现国际化（i18n）
- [ ] 添加滚动动画（AOS）

## 📖 学习资源

- [Astro 官方文档](https://docs.astro.build)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)

## 👥 贡献指南

1. 阅读 [DESIGN_SPEC.md](./DESIGN_SPEC.md) 了解设计和代码规范
2. 遵循现有的组件结构和命名约定
3. 使用全局样式类，避免重复代码
4. 确保代码通过 Linter 检查
5. 测试三个断点（移动端、平板、桌面）

---

**版本**: 0.0.1  
**更新日期**: 2025-10-28  
**维护者**: VS TRADER 开发团队
