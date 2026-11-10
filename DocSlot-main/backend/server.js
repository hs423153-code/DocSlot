import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const SYSTEM_INSTRUCTION = `
You are DocSlot AI Health Assistant.

You are NOT a doctor and you must NOT provide a definitive medical diagnosis.

Your job is to help the user understand their health concern
and guide them toward an appropriate level of care.

You must:

1. Understand the user's symptoms or health concern.
2. Ask one short follow-up question if important information is missing.
3. Provide general, low-risk health information.
4. Recommend an appropriate DocSlot doctor specialization when needed.
5. Clearly identify potentially urgent situations and advise the user
   to seek urgent/emergency medical care rather than waiting for a normal appointment.
6. Never claim certainty about a diagnosis.
6a. Never use phrases like "you have [condition]", "this confirms",
    "your diagnosis is", or "I diagnose". Instead always use phrases
    like "this could indicate", "this pattern is often associated with",
    or "a doctor can confirm whether this is...".
7. Never prescribe prescription medicines.
8. Never tell the user to replace professional medical care with this AI assistant.

AVAILABLE DOCSLOT SPECIALIZATIONS:

- Cardiologist
- Neurologist
- Orthopedic
- Dermatologist
- General Physician
- Pediatrician
- Gynecologist
- Dentist


RESPONSE FORMAT:

Every response MUST contain these four sections:

[LEVEL]
One of:
- SELF_CARE
- SEE_DOCTOR
- URGENT

[CONFIDENCE]
One of:
- HIGH  (symptoms are clear and specific enough to guide confidently)
- LOW   (symptoms are vague, could indicate multiple very different
         things, important information is missing, or this is a
         borderline/ambiguous case)

[REASONING]
Brief explanation of why this level is appropriate.

[SPECIALIST]
One DocSlot specialization from the available list above,
or None if a specialist recommendation is not appropriate yet.

[ADVICE]
Simple, general and low-risk advice.

Keep the answer understandable and avoid unnecessary medical jargon.

If important information is missing, ask ONE short follow-up question.

For potentially emergency symptoms, use:

[LEVEL]
URGENT

and clearly tell the user to seek urgent/emergency medical care immediately.
Do not tell them to wait for a normal appointment.
`;

const languageNames = {
    "en-IN": "English",
    "hi-IN": "Hindi",
    "bn-IN": "Bengali",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "mr-IN": "Marathi",
    "gu-IN": "Gujarati",
    "kn-IN": "Kannada",
    "pa-IN": "Punjabi",
    "ur-IN": "Urdu"
};



app.post("/api/symptom-check", async (req, res) => {

    try {

        const { messages, imageBase64, language } = req.body;

const languageName = languageNames[language] || "English";

const dynamicInstruction = `${SYSTEM_INSTRUCTION}

The patient's preferred language is ${languageName}. Write the text inside
[REASONING] and [ADVICE] in ${languageName}. Do NOT translate the [LEVEL]
value or the [SPECIALIST] value — those must remain exactly one of the
English words already specified above, since the app parses them
programmatically.`;


        console.log("Incoming request:", {
            messagesCount: Array.isArray(messages) ? messages.length : 0,
            hasImage: !!imageBase64
        });

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: "messages array is required."
            });
        }

        const lastMessage = messages[messages.length - 1];

        if (
            (!lastMessage || !lastMessage.text || !lastMessage.text.trim()) &&
            !imageBase64
        ) {
            return res.status(400).json({
                error: "Message text or image is required."
            });
        }

        /* =========================================
           BUILD GEMINI-FORMAT CONVERSATION
        ========================================= */

        function extractImageParts(dataUrl) {
            const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl || "");
            if (match) {
                return { mimeType: match[1], data: match[2] };
            }
            return { mimeType: "image/jpeg", data: dataUrl };
        }

        const contents = messages.map((m, idx) => {
            const role = m.role === "assistant" ? "model" : "user";
            const parts = [{ text: m.text || "" }];

            if (idx === messages.length - 1 && imageBase64) {
                const img = extractImageParts(imageBase64);
                parts.push({
                    inlineData: {
                        mimeType: img.mimeType,
                        data: img.data
                    }
                });
            }

            return { role, parts };
        });

        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: contents,

            config: {
                systemInstruction: dynamicInstruction,
                thinkingConfig: {
                    thinkingLevel: "minimal"
                },
                maxOutputTokens: 2200,
                temperature: 0.2
            }
        });

        const reply = response.text;

        if (!reply) {
            return res.status(500).json({
                error: "Gemini returned an empty response."
            });
        }

        res.json({ reply });

    } catch (error) {

        console.error("Gemini error:", error);

        res.status(500).json({
            error: "Something went wrong while contacting Gemini."
        });

    }

});



app.get("/api/health", (req, res) => {

    res.json({
        status: "DocSlot AI backend is running"
    });

});


app.listen(PORT, () => {

    console.log(
        `DocSlot AI backend running at http://localhost:${PORT}`
    );

});