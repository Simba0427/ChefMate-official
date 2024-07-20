const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

app.post("/api/detect", async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const prompt =
      "Extract and list only food items including, sauces, and seasonings in this image. Provide the names in alphabetical order. Don't include none food-items in the list";

    const imageParts = [fileToGenerativePart(imageBase64, "image/jpeg")];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();

    const detectedObjects = text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join(", ");
    res.json({ detectedObjects });
  } catch (error) {
    console.error("Error during object detection:", error);
    res.status(500).json({ error: "Failed to detect objects" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
