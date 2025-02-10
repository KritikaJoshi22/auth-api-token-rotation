const cron = require("node-cron");
const crypto = require("crypto");
const User = require("../models/User");

function generateNewToken() {
  return crypto.randomBytes(20).toString("hex");
}

async function updateAllTokens() {
  try {
    const users = await User.find();

    for (const user of users) {
      const oldToken = user.token;
      const newToken = generateNewToken();

      user.token = newToken;
      await user.save();

      console.log(`Updated token for ${user.username}:`);
      console.log(`Old Token: ${oldToken}`);
      console.log(`New Token: ${newToken}\n`);
    }
  } catch (error) {
    console.error("Error updating tokens:", error);
  }
}

function scheduleTokenUpdate() {
  // Run every hour at minute 0
  cron.schedule("0 * * * *", () => {
    console.log("Starting token update...");
    updateAllTokens();
  });
}

module.exports = scheduleTokenUpdate;
