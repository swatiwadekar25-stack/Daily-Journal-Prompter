import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("../frontend"))

const ai = new GoogleGenAI({
    apiKey: process.env.API
});

app.post("/journal-prompt", async (req, res) => {

    try {

        const { mood } = req.body;
        console.log("Mood received:",mood);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write a short, encouraging journal prompt for someone feeling ${mood}. and - Do NOT use asterisks (*) anywhere.`
        });

        const prompt = response.text;

        res.json({
            prompt: prompt
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});