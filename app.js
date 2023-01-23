module.exports = (app, { getRouter }) => {
  // Your code here

  const router = getRouter("/");

  router.post("/api/github/webhooks", (req, res) => {
    // Handle webhook event
    console.log(req.body);
    res.status(200).end();
  });

  app.route(router);

  app.onAny(async (context) => {
    // app.log({event: context.name, action: context.payload[0]})
    app.log.info({ event: context.name, action: context.payload });
    await axios.post(
      "https://probot-slugb0t.vercel.app/api/github/webhooks",
      context.payload
    );
  });

  app.log.info("Yay, the app was loaded!");
};
