import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  const model_prompt = `Given the following Postgres database schema and their properties: \n ${req.body.databaseSchema}, \n Write a SQL query to ${req.body.userInput}. Use joins and sub-queries and except clauses if necessary:\nSELECT`;
  const baseCompletion = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt: model_prompt,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
