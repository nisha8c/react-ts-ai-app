// openai.ts
import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("REACT_APP_OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
});

export default openai;

export async function complete(prompt: string) {
    try {
        const response = await openai.completions.create({
            model: "ada-code-search-text",
                //"text-embedding-ada-002",
            prompt: prompt,
            // Add any additional parameters as needed
        });

        return response.choices[0]?.text.trim();
    } catch (error) {
        console.error("Error generating completion:", error);
        throw error;
    }
}
