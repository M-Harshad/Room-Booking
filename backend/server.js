const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
require('dotenv').config()

const app = express();
const PORT = 3000



// CORS setup with credentials allowed
app.use(cors({
  origin: '*', // The frontend's URL
  credentials: true, // Allow cookies and other credentials
}));

// // Serve static files from the React app's build directory (adjust the path accordingly)
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// // Fallback to index.html for routes handled by React Router
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
// });


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