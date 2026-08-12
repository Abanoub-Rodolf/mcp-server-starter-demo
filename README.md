# MCP Server Starter Demo

A free, deliberately small TypeScript MCP server from [ThynkQ](https://thynkq.com). It uses the current official SDK, runs over stdio, validates every input with Zod, and exposes two pure in-memory tools:

- `echo`: returns validated text unchanged;
- `text_stats`: counts words and characters.

It does not read files, call the network, spawn subprocesses, or accept secrets.

## Run it

Requires Node.js 22 or newer.

```bash
npm install
npm run check
npm start
```

Build first, then copy `configs/claude-desktop.example.json` and replace the placeholder with the absolute path to `dist/index.js`.

## Why this repository is limited

This is a public teaching demo, not the paid production starter. It intentionally omits:

- streamable HTTP transport;
- bearer authentication and constant-time comparison;
- rate limiting and DNS rebinding protection;
- structured redacted logging;
- typed safe error handling;
- the 72-test transport and security suite;
- three production client configurations and saved scan proof.

Those hardening layers are part of **MCP Server Starter Pro**, which is in final storefront preparation. Follow [ThynkQ's MCP work](https://thynkq.com/products/mcp-scan) for the release.

If you need a human review of a production MCP deployment, see [ThynkQ's MCP Risk Review](https://thynkq.com/services/mcp-risk-review).

## Related free project

Before connecting a third-party MCP server, run the free [MCP Security Review Preview](https://github.com/Abanoub-Rodolf/mcp-security-review-preview). It is a limited Claude Code preflight that keeps raw scanner evidence outside model-facing output.

## Security model

The client launches this process and communicates over stdin/stdout. All operational logging goes to stderr so stdout remains reserved for JSON-RPC. Both example tools are pure functions with bounded inputs.

## License

MIT. See [LICENSE](LICENSE).

Built by [Abanoub Rodolf Boctor](https://thynkq.com/about) at [ThynkQ](https://thynkq.com).
