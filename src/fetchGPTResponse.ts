const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchGPTResponse (prompt: string) {
    const response = await fetch ("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${API_KEY}`, 
      "Content-Type": "application/json"},
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON. DO NOT USE TRIPLE BACKTICKS"
          },
          {
            role: "user",
            content:
            `Generate a food recipe using: ${prompt}.
            The response must be JSON in the format:
            {
              preparationMethod: string
            }`
          }
        ],
      }),
    });
    if (!response.ok) {
      console.error("API request failed:", await response.text());
      throw new Error(`API request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    const assistantMessage = data.choices[0]?.message.content;
  
    if (!assistantMessage) {
      console.error("No message content found in the response.");
      throw new Error("Response content is missing.");
    }
  
    console.log(assistantMessage);
    return JSON.parse(assistantMessage);
  }