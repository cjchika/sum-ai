import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY || "");

export async function generateSummaryFromGeminiAI(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);

    const response = await result.response;

    if (!response.text()) {
      throw new Error("No response from Gemini API");
    }

    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error: ", error);
    throw error;
  }
}
