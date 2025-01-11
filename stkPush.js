const axios = require("axios");
const mpesaAuth = require("./mpesaAuth"); // Import authentication function
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const stkPush = async () => {
  const accessToken = await mpesaAuth(); // Get the access token
  const apiUrl =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const phoneNumber = "254700000000"; // Replace with actual customer phone number

  const body = {
    BusinessShortcode: shortcode,
    LipaNaMpesaOnlineShortcode: shortcode,
    LipaNaMpesaOnlineShortcodePasskey: passkey,
    Amount: 100, // Specify amount here
    PartyA: phoneNumber,
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: "https://your-callback-url.com", // Set the callback URL
    AccountReference: "Test123",
    TransactionDesc: "Payment for testing",
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("STK Push response:", response.data);
  } catch (error) {
    console.error("Error making STK Push request:", error);
  }
};

module.exports = { stkPush };
