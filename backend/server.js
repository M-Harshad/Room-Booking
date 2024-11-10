const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 3000


app.use(cookieParser());

// CORS setup with credentials allowed
app.use(cors({
  origin: 'http://localhost:5173', // The frontend's URL
  credentials: true, // Allow cookies and other credentials
}));


app.use(express.json());

 app.use("/api", require("./routes/userRoutes"));
 app.use("/api", require("./routes/bookingRoutes"));
 app.use("/api", require("./routes/roomRoutes"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

// MongoDB connection
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });