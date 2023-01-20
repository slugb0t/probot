/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log("Yay! The app was loaded!")

  app.onAny(async (context) => {
    app.log.info({ event: context.name, action: context.payload });
    context.webhook({
      event: context.name,
      data: {
        message: context.payload
      }
    })
  });

};
