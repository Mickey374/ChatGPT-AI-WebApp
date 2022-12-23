import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello from Pisa",
    })
});

//Get Data from the frontend
app.post('/', async (req, res)=>{
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",      //The chat GPT model to use
            prompt: `${prompt}`,            //The response we are passing in
            temperature: 0.5,               //The model takes more risk
            max_tokens: 3000,               //The max tokens in a completion
            top_p: 1,                       
            frequency_penalty: 0.5,         //It does not repeat similar answers
            presence_penalty: 0
        });
    } catch (error) {
        
    }
})