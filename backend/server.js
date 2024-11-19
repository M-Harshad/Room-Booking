const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const PORT = 3000



// CORS setup with credentials allowed
app.use(cors({
  origin: 'https://room-booking-fyg5.onrender.com', // The frontend's URL
  credentials: true, // Allow cookies and other credentials
}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


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
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });