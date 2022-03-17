const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');

//* Routes file
const hospitals = require("./routes/hospitals");
const appointments = require("./routes/appointments");
const auth = require("./routes/auth");

//* Load env vars
dotenv.config({ path: "./config/config.env" });

//* connect to mongoDB
connectDB();
//* instantiate express
const app = express();
app.use(express.json());

app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);

//* Cookie parser
app.use(cookieParser());

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