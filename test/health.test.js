"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("../src/server");
(0, vitest_1.describe)('GET /healthz', () => {
    (0, vitest_1.it)('returns ok true', async () => {
        const app = (0, server_1.buildServer)();
        const res = await app.inject({ method: 'GET', url: '/healthz' });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = res.json();
        (0, vitest_1.expect)(body.ok).toBe(true);
        (0, vitest_1.expect)(typeof body.uptime).toBe('number');
    });
});
