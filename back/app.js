const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


const helmet = require("helmet");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));



mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Champion, connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;
