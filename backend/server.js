const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000


app.use(express.json());

 app.use("/api", require("./routes/userRoutes"));
 app.use("/api", require("./routes/bookingRoutes"));
 app.use("/api", require("./routes/roomRoutes"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});


// // MongoDB connection
// mongoose
//   .connect("mongodb+srv://aliallu3xa:Je0G3RMoB6ix76UU@cluster0.fxaol.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(port, () => {
//       console.log(`Server is running on port: ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });