const express = require("express");
const dotenv = require("dotenv");
const hospitals = require("./routes/hospitals");
const connectDB = require('./config/db');

//connect to mongoDB
connectDB();

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use("/api/v1/hospitals", hospitals);

app.get("/", (req, res) => {
  //   res.send("<h1>Hello from express</h1>");
  //   res.send({ name: "Brad" });
  //   res.json({ name: "Brad" });
  //   res.sendStatus(400);
  //   res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: { id: 1 } });
});

console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log("Server running in ", process.env.PORT, " mode on port ", PORT)
);
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});