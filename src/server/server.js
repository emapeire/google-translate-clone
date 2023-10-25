import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI(apiKey);
const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", (req, res, next) => {
  const { fromLanguage, toLanguage, text } = req.body;

  openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant capable of translating text from one language to another, like Google Translate.",
        },
        {
          role: "user",
          content: `Translate the following text from ${fromLanguage} to ${toLanguage}: ${text}`,
        },
      ],
    })
    .then((response) => {
      res.json(response.choices[0]?.message?.content);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});
