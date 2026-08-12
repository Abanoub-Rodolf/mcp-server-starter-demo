import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { afterEach, describe, expect, it } from 'vitest';
import { createServer } from '../src/server.js';

const closeCallbacks: Array<() => Promise<void>> = [];

afterEach(async () => {
  await Promise.all(closeCallbacks.splice(0).map((close) => close()));
});

describe('MCP protocol', () => {
  it('initializes, lists tools, and calls text_stats through the real protocol', async () => {
    const server = createServer();
    const client = new Client({ name: 'demo-test-client', version: '1.0.0' });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);
    closeCallbacks.push(async () => {
      await client.close();
      await server.close();
    });

    const listed = await client.listTools();
    expect(listed.tools.map((tool) => tool.name).sort()).toEqual(['echo', 'text_stats']);

    const result = await client.callTool({
      name: 'text_stats',
      arguments: { text: 'hello secure MCP' }
    });
    expect(result.content).toEqual([
      { type: 'text', text: '3 words, 16 characters.' }
    ]);
  });
});
