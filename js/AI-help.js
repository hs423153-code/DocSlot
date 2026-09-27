/* =========================================================
   DOCSLOT AI HEALTH ASSISTANT
   BACKEND-BASED FRONTEND
========================================================= */

const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const specialistContainer = document.getElementById("specialistContainer");

const API_URL = "http://localhost:3000/api/symptom-check";

const allowedSpecializations = [
    "Cardiologist", "Neurologist", "Orthopedic", "Dermatologist",
    "General Physician", "Pediatrician", "Gynecologist", "Dentist"
];

const conversationHistory = [];

const aiDoctors =
    window.darzciDoctors || [
        { id: "DR001", image: "image/doctor-01.jpg", name: "Dr. Aarav Sharma", specialization: "Cardiologist", city: "Kanpur" },
        { id: "DR002", image: "image/doctor-02.jpg", name: "Dr. Gyan Bhushan Raman", specialization: "General Physician", city: "Patna" },
        { id: "DR003", image: "image/doctor-02.jpg", name: "Dr. Manish Jain", specialization: "Dermatologist", city: "Jaipur" },
        { id: "DR004", image: "image/doctor-03.jpg", name: "Dr. Babita", specialization: "Dermatologist", city: "Jaipur" },
        { id: "DR005", image: "image/doctor-04.jpg", name: "Dr. Purshottam Gupta", specialization: "General Physician", city: "Jaipur" },
        { id: "DR006", image: "image/doctor-05.jpg", name: "Dr. Yogesh Gupta", specialization: "Neurologist", city: "Jaipur" },
        { id: "DR007", image: "image/doctor-06.jpg", name: "Dr. Arushi Solanki", specialization: "Dermatologist", city: "Jaipur" },
        { id: "DR008", image: "image/doctor-06.jpg", name: "Dr. Deepak Sharma", specialization: "Gastroenterologist", city: "Jaipur" }
    ];

    /* =========================================================
   FALLBACK RULE-BASED ENGINE (used when Gemini API fails)
========================================================= */

const fallbackRules = [
    { keywords: ["chest pain", "breathless", "can't breathe", "severe bleeding", "unconscious"],
      level: "URGENT", specialist: "General Physician",
      reasoning: "These symptoms can indicate a serious emergency.",
      advice: "Please seek immediate medical/emergency care right away." },

    { keywords: ["joint pain", "knee pain", "back pain", "bone pain", "fracture"],
      level: "SEE_DOCTOR", specialist: "Orthopedic",
      reasoning: "This pattern is often related to bones, joints, or muscles.",
      advice: "An Orthopedic specialist can properly evaluate this." },

    { keywords: ["chest discomfort", "palpitation", "heart"],
      level: "SEE_DOCTOR", specialist: "Cardiologist",
      reasoning: "This may be related to heart health.",
      advice: "A Cardiologist can evaluate this further." },

    { keywords: ["severe headache", "dizziness", "numbness", "memory loss", "seizure"],
      level: "SEE_DOCTOR", specialist: "Neurologist",
      reasoning: "This pattern may be neurological in nature.",
      advice: "A Neurologist can properly assess this." },

    { keywords: ["skin rash", "itching", "acne", "allergy"],
      level: "SEE_DOCTOR", specialist: "Dermatologist",
      reasoning: "This appears to be a skin-related concern.",
      advice: "A Dermatologist can evaluate this." },

    { keywords: ["child fever", "child cough", "baby"],
      level: "SEE_DOCTOR", specialist: "Pediatrician",
      reasoning: "This concerns a child's health.",
      advice: "A Pediatrician is best suited for this." },

    { keywords: ["tooth", "toothache", "gum"],
      level: "SEE_DOCTOR", specialist: "Dentist",
      reasoning: "This appears to be a dental concern.",
      advice: "A Dentist can properly evaluate this." },

    { keywords: ["pregnancy", "period", "menstrual"],
      level: "SEE_DOCTOR", specialist: "Gynecologist",
      reasoning: "This is best evaluated by a specialist in this area.",
      advice: "A Gynecologist can help with this." },

    { keywords: ["cold", "mild fever", "cough", "sneezing", "headache"],
      level: "SELF_CARE", specialist: "None",
      reasoning: "This looks like a common, mild condition.",
      advice: "Rest, stay hydrated, and monitor your symptoms. See a doctor if it worsens or lasts more than 3 days." }
];

function getFallbackResponse(text) {

    const lowerText = String(text || "").toLowerCase();

    const matched = fallbackRules.find(rule =>
        rule.keywords.some(keyword => lowerText.includes(keyword))
    );

    if (matched) {
        return {
            level: matched.level,
            confidence:"LOW",
            reasoning: matched.reasoning,
            specialist: matched.specialist === "None" ? null : matched.specialist,
            advice: matched.advice
        };
    }

    return {
        level: "SEE_DOCTOR",
        reasoning: "I couldn't connect to the full AI system right now, so I can't analyze this in detail.",
        specialist: "General Physician",
        advice: "Please consult a General Physician for a proper evaluation, or try again once your connection is back."
    };
}

/* =========================================================
   PARSE GEMINI RESPONSE
========================================================= */

function parseAIResponse(response) {

    const cleanResponse = String(response || "").trim();

    const levelMatch = cleanResponse.match(/\[LEVEL\]\s*([\s\S]*?)(?=\[CONFIDENCE\]|\[REASONING\]|\[SPECIALIST\]|\[ADVICE\]|$)/i);
    const confidenceMatch = cleanResponse.match(/\[CONFIDENCE\]\s*([\s\S]*?)(?=\[REASONING\]|\[SPECIALIST\]|\[ADVICE\]|$)/i);
    const reasoningMatch = cleanResponse.match(/\[REASONING\]\s*([\s\S]*?)(?=\[SPECIALIST\]|\[ADVICE\]|$)/i);
    const specialistMatch = cleanResponse.match(/\[SPECIALIST\]\s*([\s\S]*?)(?=\[ADVICE\]|$)/i);
    const adviceMatch = cleanResponse.match(/\[ADVICE\]\s*([\s\S]*?)$/i);

    const level = levelMatch ? levelMatch[1].trim() : "SEE_DOCTOR";
    const confidence = confidenceMatch ? confidenceMatch[1].trim().toUpperCase() : "HIGH";
    const reasoning = reasoningMatch ? reasoningMatch[1].trim() : "";
    const specialistRaw = specialistMatch ? specialistMatch[1].trim() : "None";
    const advice = adviceMatch ? adviceMatch[1].trim() : "";

    const specialist =
        allowedSpecializations.find(
            name => name.toLowerCase() === specialistRaw.toLowerCase()
        ) || null;

    return { level, confidence, reasoning, specialist, advice };
}

function formatAIResponse(parsed) {

    const parts = [];

    if (parsed.advice) parts.push(parsed.advice);

    parts.push("This is guidance only, not a medical diagnosis. Please consult a qualified doctor for confirmation.");

    return parts.join("\n\n").trim();
}



function getMatchingDoctors(specialization) {
    if (!specialization) return [];
    return aiDoctors
        .filter(doctor =>
            doctor.specialization &&
            doctor.specialization.toLowerCase() === specialization.toLowerCase()
        )
        .slice(0, 3);
}

function showDoctorCards(specialization, botWrapper) {

    const matchingDoctors = getMatchingDoctors(specialization);
    if (!botWrapper || matchingDoctors.length === 0) return;

    const doctorSection = document.createElement("div");
    doctorSection.className = "ai-doctor-section";

    const heading = document.createElement("div");
    heading.className = "ai-doctor-heading";
    heading.textContent = `Recommended ${specialization}s`;
    doctorSection.appendChild(heading);

    const doctorList = document.createElement("div");
    doctorList.className = "ai-doctor-list";

    matchingDoctors.forEach(doctor => {

        const card = document.createElement("article");
        card.className = "ai-doctor-card";

        const image = document.createElement("img");
        image.src = doctor.image;
        image.alt = doctor.name;
        image.className = "ai-doctor-image";

        const info = document.createElement("div");
        info.className = "ai-doctor-info";

        const name = document.createElement("h4");
        name.textContent = doctor.name;

        const specializationText = document.createElement("p");
        specializationText.textContent = doctor.specialization;

        const city = document.createElement("p");
        city.textContent = `📍 ${doctor.city}`;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "ai-doctor-button";
        button.textContent = "View Details";

        button.addEventListener("click", () => {
            if (typeof openDoctorDetails === "function") {
                openDoctorDetails(doctor.id);
            } else {
                window.location.href = `see-doctor.html?specialization=${encodeURIComponent(doctor.specialization)}`;
            }
        });

        info.appendChild(name);
        info.appendChild(specializationText);
        info.appendChild(city);
        info.appendChild(button);

        card.appendChild(image);
        card.appendChild(info);

        doctorList.appendChild(card);
    });

    doctorSection.appendChild(doctorList);
    botWrapper.appendChild(doctorSection);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function showUrgencyBadge() {
    const badge = document.createElement("div");
    badge.className = "ai-urgent-badge";
    badge.textContent = "⚠️ Seek immediate medical care if symptoms are severe or worsening.";
    chatArea.appendChild(badge);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function addUserMessage(text) {
    const wrapper = document.createElement("div");
    wrapper.className = "message user-message";
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    wrapper.appendChild(paragraph);
    chatArea.appendChild(wrapper);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function addBotMessage(text, tierLevel = null, reasoning = null, confidence = "HIGH") {

    const wrapper = document.createElement("div");
    wrapper.className = "new-bot-message";

    const avatar = document.createElement("div");
    avatar.className = "bot-avatar";
    avatar.textContent = "🩺";

    const message = document.createElement("div");
    message.className = "message bot-message";

     if (confidence === "LOW") {

        const escalationBox = document.createElement("div");
        escalationBox.className = "escalation-notice";

        const icon = document.createElement("span");
        icon.className = "escalation-icon";
        icon.textContent = "🧑‍⚕️";

        const escalationText = document.createElement("span");
        escalationText.textContent =
            "I'm not fully confident about this assessment. Please confirm with a local health worker or doctor before deciding your next step.";

        escalationBox.appendChild(icon);
        escalationBox.appendChild(escalationText);

        message.appendChild(escalationBox);
    }

    if (tierLevel) {

        const badgeConfig = {
            SELF_CARE: { className: "self-care", label: "🟢 Self-Care" },
            SEE_DOCTOR: { className: "see-doctor", label: "🔵 See a Doctor" },
            URGENT: { className: "urgent", label: "🔴 Urgent" }
        };

        const config = badgeConfig[tierLevel];

        if (config) {
            const badge = document.createElement("div");
            badge.className = `tier-badge ${config.className}`;
            badge.textContent = config.label;
            message.appendChild(badge);
        }
    }

    if (reasoning) {

        const reasoningBox = document.createElement("div");
        reasoningBox.className = "reasoning-trail";

        const icon = document.createElement("span");
        icon.className = "reasoning-icon";
        icon.textContent = "🧠";

        const content = document.createElement("div");
        content.className = "reasoning-content";

        const label = document.createElement("span");
        label.className = "reasoning-label";
        label.textContent = "Why this suggestion?";

        const reasoningText = document.createElement("span");
        reasoningText.textContent = reasoning;

        content.appendChild(label);
        content.appendChild(reasoningText);

        reasoningBox.appendChild(icon);
        reasoningBox.appendChild(content);

        message.appendChild(reasoningBox);
    }

    const paragraph = document.createElement("p");
    paragraph.style.whiteSpace = "pre-line";
    paragraph.textContent = text;

    message.appendChild(paragraph);
    wrapper.appendChild(avatar);
    wrapper.appendChild(message);
    chatArea.appendChild(wrapper);
    chatArea.scrollTop = chatArea.scrollHeight;

    return wrapper;
}



function showThinking() {
    const wrapper = document.createElement("div");
    wrapper.className = "new-bot-message ai-thinking";

    const avatar = document.createElement("div");
    avatar.className = "bot-avatar";
    avatar.textContent = "🩺";

    const message = document.createElement("div");
    message.className = "message bot-message";

    const paragraph = document.createElement("p");
    paragraph.textContent = "Thinking...";

    message.appendChild(paragraph);
    wrapper.appendChild(avatar);
    wrapper.appendChild(message);
    chatArea.appendChild(wrapper);
    chatArea.scrollTop = chatArea.scrollHeight;

    return wrapper;
}

/* =========================================================
   SEND TO BACKEND
========================================================= */

async function handlePatientInput({ text, imageBase64 = null }) {

    const cleanText = String(text || "").trim();

    if (!cleanText && !imageBase64) return;

    if (cleanText) {
        addUserMessage(cleanText);
    } else {
        addUserMessage("📷 Image uploaded");
    }

    conversationHistory.push({ role: "user", text: cleanText });

    const thinkingElement = showThinking();

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: conversationHistory,
                imageBase64: imageBase64,
                language: preferredLanguage ? preferredLanguage.value : "en-IN"
})

        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.reply) {
            throw new Error("Backend returned an empty response.");
        }

        thinkingElement.remove();

        const parsed = parseAIResponse(data.reply);
        const visibleText = formatAIResponse(parsed);

        const botWrapper = addBotMessage(
    visibleText || "I couldn't generate a useful response. Please try again.",
    parsed.level,
    parsed.reasoning,
    parsed.confidence
);


        conversationHistory.push({ role: "assistant", text: data.reply });

        if (parsed.specialist) {
            showDoctorCards(parsed.specialist, botWrapper);
        }

        if (parsed.level === "URGENT") {
            showUrgencyBadge();
        }

    }  catch (error) {

    console.error("DocSlot AI Error (using fallback):", error);

    thinkingElement.remove();

    const parsed = getFallbackResponse(cleanText);
    const visibleText = formatAIResponse(parsed);

    const botWrapper = addBotMessage(
        `[Offline mode] ${visibleText}`,
        parsed.level,
        parsed.reasoning,
        "LOW"
    );

    if (parsed.specialist) {
        showDoctorCards(parsed.specialist, botWrapper);
    }

    if (parsed.level === "URGENT") {
        showUrgencyBadge();
    }
}
}

/* =========================================================
   MULTIMODAL — VOICE INPUT
========================================================= */


const micButton = document.getElementById("micButton");
const preferredLanguage = document.getElementById("preferredLanguage");
let recognition = null;
let isListening = false;

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognitionAPI && micButton) {

    recognition = new SpeechRecognitionAPI();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micButton.addEventListener("click", () => {
        if (isListening) {
            recognition.stop();
            return;
        }
        recognition.lang = preferredLanguage ? preferredLanguage.value : "en-IN";
        try {
            recognition.start();
        } catch (e) {
            console.error("Speech recognition start error:", e);
        }
    });

    recognition.addEventListener("start", () => {
        isListening = true;
        micButton.classList.add("listening");
        userInput.placeholder = "Listening...";
    });

    recognition.addEventListener("end", () => {
        isListening = false;
        micButton.classList.remove("listening");
        userInput.placeholder = "Describe your health concern...";
    });

    recognition.addEventListener("result", (event) => {
        userInput.value = event.results[0][0].transcript;
    });

    recognition.addEventListener("error", (event) => {
        console.error("Speech recognition error:", event.error);
        isListening = false;
        micButton.classList.remove("listening");
        userInput.placeholder = "Describe your health concern...";

        if (event.error === "not-allowed") {
            addBotMessage("I need microphone permission to use voice input. Please allow it and try again.");
        }
    });

} else if (micButton) {

    micButton.addEventListener("click", () => {
        addBotMessage("Voice input isn't supported on this browser. Please type instead.");
    });

}


/* =========================================================
   MULTIMODAL — IMAGE UPLOAD
========================================================= */

const uploadButton = document.getElementById("uploadButton");
const imageInput = document.getElementById("imageInput");
const imagePreviewArea = document.getElementById("imagePreviewArea");
const imagePreviewThumb = document.getElementById("imagePreviewThumb");
const removeImageBtn = document.getElementById("removeImageBtn");

let selectedImageBase64 = null;

if (uploadButton && imageInput) {

    uploadButton.addEventListener("click", () => {
        imageInput.click();
    });

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            selectedImageBase64 = reader.result;
            imagePreviewThumb.src = selectedImageBase64;
            imagePreviewArea.hidden = false;
        };

        reader.onerror = () => {
            console.error("Failed to read image file.");
            addBotMessage("I couldn't read that image. Please try a different photo.");
        };

        reader.readAsDataURL(file);
    });
}

if (removeImageBtn) {
    removeImageBtn.addEventListener("click", () => {
        selectedImageBase64 = null;
        imageInput.value = "";
        imagePreviewArea.hidden = true;
    });
}

/* =========================================================
   UNIFIED SEND (TEXT + VOICE-FILLED TEXT + IMAGE)
========================================================= */

function submitCurrentInput() {

    const text = userInput.value.trim();

    if (!text && !selectedImageBase64) return;

    userInput.value = "";

    const imageToSend = selectedImageBase64;
    selectedImageBase64 = null;
    imagePreviewArea.hidden = true;
    imageInput.value = "";

    handlePatientInput({ text, imageBase64: imageToSend });
}

if (sendButton) {
    sendButton.addEventListener("click", submitCurrentInput);
}

if (userInput) {
    userInput.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitCurrentInput();
        }
    });
}

/* =========================================================
   QUICK QUESTIONS
========================================================= */

document.querySelectorAll(".quick-questions button").forEach(button => {
    button.addEventListener("click", () => {
        const question = button.dataset.question;
        if (!question) return;
        userInput.value = question;
        submitCurrentInput();
    });
});

/* =========================================================
   INITIAL LOG
========================================================= */

console.log("DocSlot AI: Backend-based AI assistant loaded.");
