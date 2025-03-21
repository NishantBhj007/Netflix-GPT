import OpenAI from "openai";
import { OPENAI_KEY } from "../utils/constants";

const openai = new OpenAI({
  maxRetries: 0,
  apiKey: OPENAI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});
export default openai;
