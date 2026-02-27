# 实验6：安全与权限边界

## 测试时间
2026-02-27

## 执行环境

| 项目 | 值 |
|------|----|
| 用户 | ubuntu (uid=1000) |
| sudo 权限 | 有，无密码（NOPASSWD ALL）|
| 容器化 | Docker 容器（/.dockerenv 存在）|
| 容器 ID | 846a2ee9f402b066... |
| hostname | cursor |

## 权限测试

| 测试项 | 结果 | 风险评估 |
|--------|------|----------|
| sudo 无密码 | OK | 容器内 root，但容器已隔离 |
| 写入 /etc/ | OK（via sudo）| — |
| 写入 /usr/bin/ | OK（via sudo）| — |
| 写入 /root/ | OK（via sudo）| — |
| 读取 /etc/shadow | 可读（sudo）| 容器内用户数据，无实际风险 |
| 读取 /proc/1/root | Permission denied | 容器边界有效 |
| AWS 元数据端点 | 无响应（已屏蔽）| 防止凭证泄露 |

## 环境变量 / Secrets

| 变量 | 值 |
|------|----|
| CURSOR_AGENT | 1（标识 Agent 身份）|
| GITHUB_TOKEN | 注入在 git remote URL 中，不在环境变量 |
| 其他 Secret-like | 无 |

关键安全设计：GitHub Token 不放在环境变量中，而是内嵌到 git remote URL，
减少被脚本意外泄露的风险（但仍可通过 `git remote -v` 读取）。

## 网络隔离

- AWS EC2 元数据服务 (169.254.169.254) 被屏蔽
- 可见进程仅 9 个（高度隔离）
- 无 Docker socket，无法逃逸到宿主机

## 结论

运行在 Docker 容器中，ubuntu 用户有完整 sudo 权限但无法逃逸容器。
主要安全边界：
1. Docker 容器隔离（无法访问宿主机文件系统）
2. /proc/1/root 读取被拒绝
3. 云元数据端点屏蔽
4. 可见进程极少，无法横向移动
5. 每次 Agent 运行使用全新容器（无持久化状态）
