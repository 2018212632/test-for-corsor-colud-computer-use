## Cursor Cloud specific instructions

This is a research/investigation repository (`test-for-corsor-colud-computer-use`) for studying Cursor Cloud Agent capabilities. It contains no application code, no build system, and no runtime dependencies.

### Repository state

- The repo is intentionally minimal — only a `README.md` exists on `main`.
- There are no lint configs, test frameworks, build scripts, or services to run.
- The planned directory structure (`experiments/`, `notes/`) has not been created yet.

### Available tools in the Cloud VM

| Tool    | Version |
|---------|---------|
| Git     | 2.43    |
| Node.js | 22.x    |
| Python  | 3.12    |
| Go      | 1.22    |
| Rust    | 1.83    |
| pnpm    | 10.x    |
| npm     | 10.x    |
| gh CLI  | 2.81    |

### Notes for future agents

- No `npm install`, `pip install`, or other dependency steps are needed — there are no dependencies.
- Git is the primary tool used in this repo. Ensure you are on the correct branch before making changes.
- The `cursor/cursor-9102` branch contains a detailed Chinese-language README outlining the research plan and investigation dimensions.
