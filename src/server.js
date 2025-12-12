require("reflect-metadata");
require("dotenv").config();
const express = require("express");
const { AppDataSource } = require("./data-source");

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const registrationRoutes = require("./routes/registration.routes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "🎉 Welcome to the Event Registration API!",
    info: "Use the /api routes to interact with the system.",
    routes: {
      auth: "/api/auth",
      events: "/api/events",
      registration: "/api/registration"
    }
  });
});


const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log("MongoDB connected via TypeORM ✔");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("DB Connection Error: ", err);
    });


