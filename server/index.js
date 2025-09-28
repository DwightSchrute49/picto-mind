const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env");
  process.exit(1);
}

if (!process.env.CLIPDROP_API_KEY) {
  console.error("❌ CLIPDROP_API_KEY is not defined in .env");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const Image = mongoose.model("Image", {
  prompt: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Generate image with ClipDrop
    const response = await axios({
      method: "POST",
      url: "https://clipdrop-api.co/text-to-image/v1",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      data: { prompt },
      responseType: "arraybuffer",
    });

    // Save image locally (optional)
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(__dirname, "uploads", fileName);
    fs.mkdirSync(path.join(__dirname, "uploads"), { recursive: true });
    fs.writeFileSync(filePath, response.data);

    // Return full image URL for frontend compatibility
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    const newImage = new Image({
      prompt,
      imageUrl,
    });
    await newImage.save();

    res.json({ imageUrl });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate image",
      details: error.message,
    });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.get("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
