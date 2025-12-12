require("reflect-metadata");
const { DataSource } = require("typeorm");
require("dotenv").config();

const User = require("./entities/User");
const Event = require("./entities/Event");
const Registration = require("./entities/Registration");

const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: [User, Event, Registration]
});

module.exports = { AppDataSource };

