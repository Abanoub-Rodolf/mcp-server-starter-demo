import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { echo, textStats } from './tools.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'mcp-server-starter-demo',
    version: '1.0.1'
  });

  server.registerTool(
    'echo',
    {
      title: 'Echo',
      description: 'Return a validated text value unchanged. No filesystem, network, or subprocess access.',
      inputSchema: {
        message: z.string().min(1).max(2000).describe('Text to return unchanged.')
      }
    },
    async ({ message }) => ({
      content: [{ type: 'text' as const, text: echo(message) }]
    })
  );

  server.registerTool(
    'text_stats',
    {
      title: 'Text statistics',
      description: 'Count words and characters in memory. No filesystem, network, or subprocess access.',
      inputSchema: {
        text: z.string().max(20_000).describe('Text to measure.')
      }
    },
    async ({ text }) => {
      const stats = textStats(text);
      return {
        content: [{ type: 'text' as const, text: `${stats.words} words, ${stats.characters} characters.` }]
      };
    }
  );

  return server;
}
