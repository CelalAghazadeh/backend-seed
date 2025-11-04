import { describe, it, expect } from 'vitest';
import { buildServer } from '../src/server';

describe('GET /healthz', () => {
  it('returns ok true', async () => {
    const app = buildServer();
    const res = await app.inject({ method: 'GET', url: '/healthz' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.ok).toBe(true);
    expect(typeof body.uptime).toBe('number');
  });
});
