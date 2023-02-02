const getOwnerAndRepo = async (context) => {
  const owner = context.payload.installation.account.login;
  const repo = context.payload.respositories[0].name;

  return [owner, repo];
};

const getAddedCommits = async (context) => {
  let addedFiles = context.payload.commits[0].added;
  return addedFiles;
};

const getOpenIssues = async (ownerRepo, context) => {
  try {
    const issuesList = await context.octokit.rest.issues.listForRepo({
      owner: ownerRepo[0],
      repo: ownerRepo[1],
    });

    return issuesList;
  } catch (error) {
    console.log(error);
    console.log("Error fetching Github Issues");
  }
};

const checkRepoForLicense = async (ownerRepo, context) => {
  try {
    console.log("Fetching License");
    const license = await context.octokit.rest.licenses.getForRepo({
      owner: ownerRepo[0],
      repo: ownerRepo[1],
    });
    console.log("License was found");
    return true;
  } catch (error) {
    console.log("No License was found");
    return false;
  }
};

module.exports = (app) => {
  // Your code here

  app.on("push", async (context) => {
    // app.log({event: context.name, action: context.payload[0]})
    // app.log.info({ event: context.name, action: context.payload });
    const ownerRepo = getOwnerAndRepo(context);
    await axios.post("https://probot-slugb0t.vercel.app/api/github/webhooks", {
      owner: ownerRepo[0],
      repo: ownerRepo[1],
    });
  });

  app.on("installation.create", async (context) => {
    const ownerRepo = getOwnerAndRepo(context);

    await axios.post("https://probot-slugb0t.vercel.app/api/github/webhooks", {
      owner: ownerRepo[0],
      repo: ownerRepo[1],
    });
  });

  app.log.info("Yay, the app was loaded!");
};
