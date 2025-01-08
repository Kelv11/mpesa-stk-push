const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mpesaAuth = require("./mpesaAuth"); // Import the mpesaAuth function
const { stkPush } = require("./stkPush"); // Import the stkPush function

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data

// Set up your routes
app.get("/", (req, res) => {
  res.send("Welcome to the M-PESA STK Push API");
});

// Endpoint to trigger STK Push
app.post("/stkpush", async (req, res) => {
  try {
    await stkPush();
    res.status(200).send("STK Push request initiated");
  } catch (error) {
    res.status(500).send("Error initiating STK Push");
  }
});

// Callback URL to receive responses from Safaricom
app.post("/callback", (req, res) => {
  console.log("Callback Response:", req.body);
  // Handle payment success or failure here
  res.status(200).send("Callback received");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
