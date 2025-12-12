import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { nanoid } from "nanoid";
import Url from "./models/Url.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) return res.status(400).json({ message: "URL is required" });

    const shortCode = nanoid(6);

    try {
        const newUrl = await Url.create({ longUrl, shortCode });
        console.log("Saved document:", newUrl);
        res.json({
            shortUrl: `${process.env.BASE_URL}/${shortCode}`,
            longUrl,
            shortCode,
        });
    } catch (err) {
        console.error("Error saving URL:", err);
        res.status(500).json({ message: "Failed to save URL" });
    }
});


app.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;

    const urlData = await Url.findOne({ shortCode });

    if (!urlData) return res.status(404).json({ message: "URL not found" });

    return res.redirect(urlData.longUrl);
});


app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
