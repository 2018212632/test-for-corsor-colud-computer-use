# 实验3：Git 操作

## 测试时间
2026-02-27

## Git 身份

| 项目 | 值 |
|------|----|
| user.name | Cursor Agent |
| user.email | cursoragent@cursor.com |
| git 版本 | 2.43.0 |

## 能力测试

| 测试项 | 结果 |
|--------|------|
| 查看当前分支 | OK |
| 创建新分支 | OK |
| stash / stash pop | OK |
| commit & push | OK |
| 查看远程信息 | OK（token 注入在 remote URL 中）|
| 切换分支 | OK |
| 删除本地分支 | OK |

## 认证机制

Git 远程 URL 中直接注入了 `x-access-token:<github_token>` 的形式：
```
origin  https://x-access-token:ghs_xxx@github.com/...
```
Token 由 Cursor 平台自动注入，无需手动配置，Agent 可直接 push/pull。

## PR 管理

Agent 不主动创建 PR，但可通过 `gh` CLI 操作。
平台会在 push 新分支后自动展示 PR 创建提示。

## 结论

Git 操作能力完整，覆盖日常工程所需全部操作。
身份为专属 `Cursor Agent` 账户，token 自动注入，开箱即用。
