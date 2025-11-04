import Fastify from 'fastify';

export function buildServer() {
  const app = Fastify({ logger: true });

  app.get('/healthz', async (req) => {
    console.log('Health check requested');
    req.log.info({ url: req.url, id: req.id });
    return {
      ok: true,
      uptime: process.uptime(),
      env: process.env.NODE_ENV || 'dev',
    };
  });

  return app;
}

if (require.main === module) {
  const app = buildServer();
  const port = Number(process.env.PORT) || 3000;
  app.listen({ port, host: '0.0.0.0' }).catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
}
