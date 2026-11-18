# 数愈 AI 科研工作台

- [科研工作台](https://zhouhao6620-cmd.github.io/kgcure-workbench/workspace/chats/new/)
- [设计规范](https://zhouhao6620-cmd.github.io/kgcure-workbench/design-system/?view=components)

这是前端演示版。科研模型、账户、支付和真实文件服务由生产环境提供。

## 本地运行

```sh
npm ci
npm run dev
```

## 更新 GitHub Pages

```sh
npm run build:pages -- kgcure-workbench
rsync -a --delete dist/pages/ docs/
```

提交生成结果到 `main`。GitHub Pages 的发布目录为 `main` 分支下的 `/docs`。
