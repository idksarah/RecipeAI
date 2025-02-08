const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchGPTResponse (prompt: string) {
  console.log(API_KEY)
    const response = await fetch ("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${API_KEY}`, 
      "Content-Type": "application/json"},
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON."
          },
          {
            role: "user",
            content:
            `Generate a food receipe based on these ingredients: ${prompt}.
            The response must be JSON in the format:
            {
              preparationMethod: string,
              nutritionalInformations: string
            }`
          }
        ],
      }),
    });
  
    return JSON.parse((await response.json()).choices[0].messages.content);
  }