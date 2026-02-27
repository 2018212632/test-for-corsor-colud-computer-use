# 实验4：网络与外部资源

## 测试时间
2026-02-27

## 网络能力

| 测试项 | 结果 | 延迟 |
|--------|------|------|
| curl 外部 HTTP | OK (httpbin.org) | ~100ms |
| GitHub API (未认证) | OK (rate_limit=60/h) | 51ms |
| pip install httpx | OK | 931ms |
| npm install axios | OK | 786ms |
| apt-get install jq | OK | — |
| httpx GET | 200 OK | ~103ms |
| httpx POST (JSON) | 200 OK，echo 正确 | — |
| AWS EC2 元数据端点 | 无响应 | 已屏蔽 |
| 公网出口 IP | 3.134.224.3 / 18.189.79.70 | AWS us-east-2 区域 |

## Web Search 工具

Agent 内置 `WebSearch` 工具，可直接搜索实时信息，不需要手动 curl。
底层使用搜索引擎抓取并返回摘要 + URL，适用于查文档、技术资料等场景。

## 限制

- AWS EC2 实例元数据服务 (169.254.169.254) 被屏蔽，无法获取云凭证
- DNS 解析 `google.com` 测试显示无结果（python socket 层面），但 curl 正常，可能是沙箱 DNS 策略

## 结论

对外网络访问完全开放（HTTP/HTTPS），包管理器（pip/npm/apt）可正常使用。
云厂商元数据端点被屏蔽，无法横向获取主机凭证，安全隔离到位。
