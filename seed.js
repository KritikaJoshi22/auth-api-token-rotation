const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const config = require("./config/db");

async function seedDatabase() {
  await mongoose.connect(config.uri, config.options);

  // Clear existing data
  await User.deleteMany();

  // Seed test users with hashed passwords
  const users = [
    {
      username: "john_doe",
      password: await bcrypt.hash("password123", 10),
      token: "initial_token_1",
    },
    {
      username: "jane_smith",
      password: await bcrypt.hash("securepass", 10),
      token: "initial_token_2",
    },
  ];

  await User.insertMany(users);
  console.log("Database seeded successfully");
  mongoose.disconnect();
}

seedDatabase();
