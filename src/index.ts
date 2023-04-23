/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import { OpenAI } from "langchain/llms/openai";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const getResonseForQuestion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const res = await model.call(
    "What's a good idea for an application to build with GPT-3?"
  );

  response.status(200).json(res);
};

app.get("/ask", getResonseForQuestion);

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
