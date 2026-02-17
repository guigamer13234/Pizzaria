
import { GoogleGenAI } from "@google/genai";

// Fix: Initializing GoogleGenAI following guidelines using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPizzaRecommendation = async (mood: string, preferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O usuário está se sentindo "${mood}" e prefere "${preferences}". Sugira uma pizza do cardápio do Casarão da XV (fictício ou baseado em pizzas clássicas premium) e uma harmonização de vinho ou drink. Responda em português de forma sofisticada e breve.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    // Fix: Accessing .text property directly (not a method) as per guidelines
    return response.text;
  } catch (error) {
    console.error("Erro na recomendação da IA:", error);
    return "Desculpe, nosso sommelier digital está descansando. Que tal uma Margherita clássica?";
  }
};
