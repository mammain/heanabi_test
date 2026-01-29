
import { GoogleGenAI } from "@google/genai";

export const generate3DCharacter = async (base64Image: string, age: string, gender: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Refined prompt based on the user's reference image for maximum cuteness
  const prompt = `
    Transform the person in the attached photo into a high-end 3D character with the EXACT aesthetic of the following style:
    
    Style Reference (CRITICAL):
    - Aesthetic: Modern 3D figurine style (Disney/Pixar/PopMart inspired).
    - Proportions: Iconic 'Chibi-Doll' ratio. Large, expressive head (approx 1/3 of total height) with a small, delicate body.
    - Full Body: MUST show the character standing from head to toe, including shoes.
    - Eyes: Very large, glossy, deep-colored eyes with detailed reflections and thick eyelashes.
    - Face: Small, cute nose, soft blush on cheeks, and a gentle, sweet smile.
    - Hair: Voluminous, soft-textured hair with realistic 3D lighting and highlights.
    - Outfit Style: Cute, slightly oversized clothing (like sweaters, pleated skirts, or stylish streetwear) matching the colors from the original photo.
    - Accessories: Include cute details like a small backpack or hair ribbons if appropriate.
    - Stand: Place the character on a simple pastel circular platform to ensure a stable "standing" look.
    
    User Customization:
    - Gender: ${gender === 'female' ? 'Female (sweet doll-like girl)' : 'Male (cute stylish boy)'}.
    - Age Range: ${age === 'child' ? 'Toddler/Child' : age === 'teen' ? 'Teenager' : 'Young Adult'}.
    - Background: Soft, solid pastel pink or lavender background with gentle shadows.
    
    Ensure the final result is extremely lovable, clean, and looks like a professional 3D render.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg',
            },
          },
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4" // Best for showcasing full-body character portraits
        }
      }
    });

    let imageUrl: string | null = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating 3D character:", error);
    return null;
  }
};
