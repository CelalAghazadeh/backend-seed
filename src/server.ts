import router from "./routes/notes";

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  router.listen({ port, host: '0.0.0.0' }).catch((err) => {
    router.log.error(err);
    process.exit(1);
  });
}
