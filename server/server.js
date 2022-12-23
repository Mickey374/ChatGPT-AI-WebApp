import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});