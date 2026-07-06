# public/vr-demo

> **嵌入 jzerp 主项目的 VR 全景预览独立静态 demo。**
>
> 与 vue-router 完全解耦 — Vite 把 `public/` 整个目录原样拷贝到 `dist/`，所以**整个 dist 目录扔到任何静态 web 服务器即可独立访问**，不依赖 jzerp 的任何路由、API、构建产物。

## 目录结构

```
public/vr-demo/
├── index.html              ← 演示主页面（单文件，含全部 HTML / CSS / JS）
├── README.md               ← 本文件
├── sphere-opt.jpg          ┐
├── sphere-small.jpg        │
├── key-biscayne-1-opt.jpg  │
├── key-biscayne-2-opt.jpg  │ 10 张 PSV demo 图
├── interior-*.jpg × 6      │ 与 jzerp VR 模块 seed data 共享
└──────────────────────────┘ （无副本、零浪费、单一信源）
```

> **关键：图片与 jzerp 主项目 VR 模块共用。** VR 模块的 seed data 已经引用 `/vr-demo/sphere-opt.jpg` 等路径，demo 直接借用，不复制不占空间。

## 访问方式

### Dev server

启动 `npm run dev` 后，访问：

```
http://localhost:5173/vr-demo/
```

（注意是目录形式 `/vr-demo/`，由 `index.html` 接管。）

### 生产构建

```bash
npm run build
```

Vite 把 `public/` 原样拷贝到 `dist/`，所以构建产物里有 `dist/vr-demo/index.html` 和 `dist/vr-demo/*.jpg`。把整个 `dist/` 扔到任何静态 web 服务器（nginx / apache / `npx serve dist`），访问 `/vr-demo/` 即可。

> **关键特性**：接收方只需要拿到 dist 包，**不需要 npm install，不需要启动 vue dev server，不需要 vite preview**。纯静态 HTML，零后端依赖。

## 替换样例

编辑 `index.html` 顶部的 `records` 数组：

```js
const records = [
  {
    id: 1,
    name: '案例名称',
    tags: ['标签1', '标签2'],
    scenes: [
      { id: 's1', name: '场景名', image: 'sphere-opt.jpg', isDefault: true }
    ]
  }
  // ...
]
```

新增图：把 jpg 放进 `public/vr-demo/` 根目录，`image` 字段直接写文件名（同级相对路径）。

## 依赖

唯一外部依赖：PSV 库从 jsdelivr CDN 加载

- `https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5.14.1/index.min.css`
- `https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5.14.1/+esm`

如需完全离线，把这两个文件下载到 `public/vr-demo/` 改路径即可。

## 与 `docs/demo/` 的关系

`docs/demo/` 是「不打 jzerp 构建、零成本分发」场景下的独立副本（HTML 在 `vr-demo.html`、图片在 `vr-demo/` 子目录）。`public/vr-demo/` 是**正式嵌入 jzerp 的版本**，由 Vite 自动打包到 dist。

两份内容基本相同，主要差异是图片路径规则：
- `public/vr-demo/index.html` → 引用 `sphere-opt.jpg`（同级）
- `docs/demo/vr-demo.html` → 引用 `vr-demo/sphere-opt.jpg`（子目录）

维护时改 `public/vr-demo/`，再同步 `docs/demo/`（注意同步改路径）。
