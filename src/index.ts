import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
dotenv.config();

async function main() {
  console.log(process.env.GOOGLE_API_KEY);
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent([
    "explain the video from 0:00 to 1:00",
    {
      fileData: {
        mimeType: "video/mp4",
        fileUri: "https://www.youtube.com/watch?v=UYySvyc4M68",
      },
    },
  ]);
  console.log(result.response.text());
}
// main();

async function main1() {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const base64VideoFile = fs.readFileSync("clip2.mp4", {
    encoding: "base64",
  });

  const contents = [
    {
      inlineData: {
        mimeType: "video/mp4",
        data: base64VideoFile,
      },
    },
    { text: "Please summarize the video in 3 sentences." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
  });
  console.log(response.text);
}
main1();
