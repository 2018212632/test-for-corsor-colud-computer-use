# Cursor 云端 Computer Use 能力调研

本仓库用于系统性调研和测试 [Cursor](https://cursor.com) 云端 Agent（Cloud Agent）的 Computer Use 能力边界。

## 调研目标

- 评估 Cursor Cloud Agent 在真实工程任务中的自主执行能力
- 探索 Cloud Agent 对文件系统、终端、网络、Git 等基础设施的操控范围
- 记录典型场景下的任务完成情况、局限性与最佳实践

## 调研维度

### 1. 文件与代码操作
- 文件读写、创建、删除
- 跨文件重构与批量修改
- 代码生成与补全

### 2. 终端与命令执行
- Shell 命令执行（编译、测试、构建）
- 依赖安装与环境配置
- 后台进程管理限制

### 3. Git 操作
- 分支创建、提交、推送
- PR/MR 生命周期管理
- 多分支协同开发

### 4. 网络与外部资源
- Web 搜索与信息检索
- 包管理器（npm、pip、apt 等）调用
- API 调用与外部服务集成

### 5. 多 Agent 协作
- 并行子 Agent 启动与结果汇总
- Agent 上下文传递与任务拆解
- explore / generalPurpose 子 Agent 对比

### 6. 安全与权限边界
- Secrets 注入与环境变量管理
- 敏感操作限制（force push、生产环境写入等）
- 沙箱隔离范围

## 快速开始

```bash
git clone <repo-url>
cd test-for-corsor-colud-computer-use
```

每个调研场景建议新建独立分支，便于对比追踪：

```bash
git checkout -b experiment/<场景名称>
```

## 目录结构（规划）

```
.
├── README.md
├── experiments/        # 各场景调研脚本与记录
│   ├── file-ops/
│   ├── terminal/
│   ├── git-ops/
│   ├── web-search/
│   └── multi-agent/
└── notes/              # 调研笔记与结论汇总
```

## 参考资料

- [Cursor Cloud Agents 官方文档](https://docs.cursor.com/cloud-agents)
- [cursor.com/onboard](https://cursor.com/onboard) — 云端环境初始化
