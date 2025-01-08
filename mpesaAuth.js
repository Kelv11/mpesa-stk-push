const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const mpesaAuth = async () => {
  const apiUrl =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    // Return the access token
    return response.data.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
};

module.exports = mpesaAuth;
