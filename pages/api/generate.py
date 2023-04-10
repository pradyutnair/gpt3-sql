import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

start_sequence = "SELECT"

response = openai.Completion.create(
  model="code-davinci-002",
  prompt="",
  temperature=0,
  max_tokens=150,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0,
  stop=["#", ";"]
)