# 实验5：多 Agent 协作

## 测试时间
2026-02-27

## 实验设计

同时启动 2 个子 Agent，分别独立完成不同语言的代码生成任务：

- **Subagent A (Python)**: 生成 fibonacci + binary_search + LinkedList，验证运行
- **Subagent B (JavaScript)**: 生成 quicksort + debounce + EventEmitter + 性能基准，验证运行

## 结果

### Subagent A 输出 (Python)
```
fib(20) = 6765
binary_search([1,3,5,7,9,11,13], 5) -> 2
LinkedList([0,1,2,3]).to_list() -> [0,1,2,3]
执行时间: ~27ms
```

### Subagent B 输出 (JavaScript)
```
Array size 100:   0.168ms
Array size 1000:  2.457ms
Array size 10000: 7.243ms
```

两个子 Agent 均成功完成任务，文件正确落地到 /workspace/experiments/multi-agent/。

## 能力特征

| 特性 | 观察 |
|------|------|
| 并行启动 | 支持，单条消息可发起多个 Task 工具调用 |
| 子 Agent 类型 | `explore`（快速代码库探索）/ `generalPurpose`（通用多步任务）|
| 模型选择 | 可选 `fast`（低成本）或默认更强模型 |
| 上下文传递 | 通过 prompt 文本传递，无共享内存；需要在 prompt 中写明全部上下文 |
| 结果获取 | 子 Agent 完成后返回文字摘要，主 Agent 需自行读取产物文件验证 |
| Agent ID | 每次调用返回 ID，可用 `resume` 参数续接同一 Agent 上下文 |
| 文件系统共享 | 是，所有 Agent 共享同一个 /workspace 文件系统 |

## 最佳实践

1. 子 Agent prompt 中要写明完整路径、任务细节，子 Agent 没有父级上下文
2. 独立可并行的子任务（如多文件生成、多语言测试）适合并行 Agent
3. 有依赖关系的任务（A 的输出作为 B 的输入）要串行，或父 Agent 传递中间结果
4. 用 `fast` 模型做轻量任务可显著降低成本和延迟

## 结论

多 Agent 并行协作机制完整，共享文件系统是最自然的数据交换方式。
适合大规模代码生成、多模块并行开发、代码审查与测试并行执行等场景。
