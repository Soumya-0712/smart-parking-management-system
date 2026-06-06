import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Smart Parking Backend Running 🚀");
});

export default app;
