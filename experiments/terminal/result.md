# 实验2：终端与命令执行

## 测试时间
2026-02-27

## 系统环境

| 项目 | 值 |
|------|----|
| OS | Linux 6.12.58+ x86_64 (Ubuntu, glibc 2.39) |
| CPU 核心数 | 4 |
| 内存 | 16 GB (可用 ~15.7 GB) |
| 磁盘总量 | 135.2 GB (空闲 120.2 GB) |
| Python | 3.12.3 |
| Node.js | v22.21.1 |
| npm | 10.9.4 |
| Go | 1.22.2 |
| Rust | 1.82.0 |
| 出口公网 IP | 3.134.224.3 / 18.189.79.70 (AWS us-east) |

## 命令执行能力

| 测试项 | 结果 | 备注 |
|--------|------|------|
| 任意 Shell 命令执行 | OK | — |
| sleep 2s 阻塞等待 | OK (2002ms 实际) | 工具有 30s 默认超时，最长 600s |
| 后台进程 (is_background=true) | 支持 | 不可交互，进程持续存在 |
| sudo 无密码访问 | OK | ubuntu 用户有完整 sudo 权限 |
| pip install | ~931ms | 网络加速，包缓存预热快 |
| npm install (axios) | ~786ms | — |
| apt-get install (jq) | OK | — |
| docker | 未安装 | 容器内无 docker-in-docker |
| 磁盘写入速度 | 1.6 GB/s | 内存盘级别 |

## 限制

- 不可运行永久阻塞的前台进程（会导致对话挂起）
- 每次 Shell 调用有超时上限（最大 600s/10min）
- Docker 不可用（无 docker-in-docker）
- 可见进程数极少（~9 个），说明是隔离容器
