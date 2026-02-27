# Cursor 云端 Computer Use 能力调研总结

调研时间：2026-02-27
调研分支：cursor/cursor-9102

---

## 一、执行环境概况

| 项目 | 值 |
|------|----|
| 运行方式 | Docker 容器（每次任务新容器）|
| OS | Ubuntu (Linux 6.12.58+, glibc 2.39) |
| CPU | 4 核 |
| 内存 | 16 GB |
| 磁盘 | 135 GB SSD（IO ~1.6 GB/s）|
| 用户 | ubuntu (uid=1000, NOPASSWD sudo) |
| 网络出口 | AWS us-east-2 公网 IP |
| 预装语言 | Python 3.12 / Node.js v22 / Go 1.22 / Rust 1.82 |
| 预装工具 | git 2.43 / gh CLI / curl / apt / pip / npm / nvm |

---

## 二、能力地图

### 文件与代码操作 ✅ 完整

- 专属工具：Read / Write / StrReplace / Delete / Glob / Grep
- 批量写入 100 个 1KB 文件仅需 6.4ms，10MB 读写 <20ms
- 支持符号链接、权限修改、二进制文件
- StrReplace 的精确替换设计避免了正则替换的副作用

### 终端执行 ✅ 完整（有合理限制）

- 可执行任意 Shell 命令，支持 sudo，sudo 无密码
- 支持后台进程（is_background=true），但不可运行永久阻塞进程
- Shell 单次调用默认超时 30s，最长可设 600s
- 不支持 Docker-in-Docker

### Git 操作 ✅ 完整

- 身份：`Cursor Agent <cursoragent@cursor.com>`
- Token 自动注入到 remote URL，无需手动配置
- 覆盖：branch / commit / push / stash / log / remote
- 通过 `gh` CLI 可操作 PR、Issue、Actions

### 网络访问 ✅ 完全开放

- HTTP/HTTPS 外网访问无限制
- pip / npm / apt-get 均可直接使用
- 内置 WebSearch 工具可实时搜索信息
- AWS 元数据端点 (169.254.169.254) 被屏蔽（防凭证泄露）

### 多 Agent 协作 ✅ 完整

- 父 Agent 可并行启动多个子 Agent（Task 工具）
- 子 Agent 类型：`explore`（代码库探索）/ `generalPurpose`（通用任务）
- 模型可选：`fast`（低成本）或默认更强模型
- 共享同一 /workspace 文件系统，天然数据交换通道
- 子 Agent 可通过 ID resume，保留完整上下文

### 安全边界 ✅ 隔离到位

- Docker 容器隔离，无法访问宿主机文件系统
- /proc/1/root 访问被拒，容器边界有效
- GitHub Token 内嵌于 remote URL 而非环境变量
- 环境变量中仅 CURSOR_AGENT=1 标识 Agent 身份
- 每次 Agent 运行使用全新容器，无持久化状态（workspace 代码除外）

---

## 三、关键发现

### 亮点
1. **环境即代码**：预装了主流语言运行时和工具链，任务开箱即用
2. **全 sudo 权限**：容器内可执行任何系统操作，无权限障碍
3. **多 Agent 并行**：真正的并行子 Agent，适合大规模工程任务
4. **网络完全开放**：可安装任意包、调用任意 API
5. **Git 深度集成**：Token 自动注入，Agent 可完整管理代码生命周期

### 限制
1. **无 Docker**：无法在 Agent 内启动容器服务（如数据库、中间件）
2. **无持久化计算状态**：容器每次重建，只有 /workspace 代码持久化
3. **长任务风险**：超过 600s 的单步操作会超时
4. **无图形界面交互**：DISPLAY=:1 存在但无法真正 computer-use GUI
5. **子 Agent 无父上下文**：需在 prompt 中写全所有背景信息

---

## 四、适用场景评估

| 场景 | 适合度 | 说明 |
|------|--------|------|
| 代码生成与重构 | ★★★★★ | 核心强项 |
| 自动化测试执行 | ★★★★★ | 可运行任意测试框架 |
| CI/CD 脚本编写 | ★★★★☆ | 无 Docker 稍有限制 |
| 依赖管理与升级 | ★★★★★ | pip/npm/apt 全支持 |
| 多模块并行开发 | ★★★★★ | 多 Agent 并行天然支持 |
| 数据分析脚本 | ★★★★★ | Python 生态完整 |
| 基础设施配置 | ★★★☆☆ | 无 Docker，K8s 等受限 |
| GUI 自动化测试 | ★★☆☆☆ | DISPLAY 存在但能力有限 |
| 长时间运行任务 | ★★★☆☆ | 600s 上限，需拆分 |

---

## 五、最佳实践建议

1. **拆分长任务**：将耗时 >5min 的操作拆成多个 commit 点，每步提交一次
2. **善用并行 Agent**：文件生成、测试执行、代码审查可并行，节省时间
3. **文件系统作为消息总线**：子 Agent 间通过写文件 + 主 Agent 读取来传递数据
4. **用 fast 模型做轻量任务**：简单的文件操作、脚本生成用 fast 模型显著降本
5. **环境初始化脚本**：在 cursor.com/onboard 配置 env setup，避免重复安装依赖
6. **Secrets 管理**：敏感 token 通过 Cursor Dashboard > Cloud Agents > Secrets 注入，不要硬编码
