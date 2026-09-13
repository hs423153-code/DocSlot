/* =========================================================
   DARZCI HEALTHCARE
   FRONTEND-ONLY AI HEALTH ASSISTANT

   NO API
   NO BACKEND
   NO INTERNET
   PURE JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const chatArea =
    document.getElementById("chatArea");

const userInput =
    document.getElementById("userInput");

const sendButton =
    document.getElementById("sendButton");

const specialistContainer =
    document.getElementById("specialistContainer");


/* =========================================================
   AVAILABLE SPECIALIZATIONS
========================================================= */

const allowedSpecializations = [
    "Cardiologist",
    "Neurologist",
    "Orthopedic",
    "Dermatologist",
    "General Physician",
    "Pediatrician",
    "Gynecologist",
    "Dentist"
];


/* =========================================================
   CONVERSATION MEMORY
========================================================= */

const conversationHistory = [];

let currentContext = {
    topic: null,
    specialization: null,
    urgency: "normal",
    lastIntent: null,
    patientType: "adult"
};


/* =========================================================
   LOCAL HEALTH KNOWLEDGE
========================================================= */

const healthRules = [

    /* =====================================================
       EMERGENCY
    ===================================================== */

    {
        keywords: [
            "severe chest pain",
            "crushing chest pain",
            "chest pain with sweating",
            "chest pain with breathlessness",
            "cannot breathe",
            "can't breathe",
            "difficulty breathing",
            "unconscious",
            "passed out",
            "stroke",
            "face drooping",
            "slurred speech",
            "severe bleeding"
        ],

        type: "emergency",

        response:
            "This symptom can sometimes indicate a serious medical problem. Please seek immediate medical care or contact your local emergency service rather than waiting for an online assessment.",

        specialization: "Cardiologist"
    },


    /* =====================================================
       ORTHOPEDIC
    ===================================================== */

    {
        keywords: [
            "joint pain",
            "knee pain",
            "back pain",
            "bone pain",
            "fracture",
            "broken bone",
            "muscle pain",
            "ankle pain",
            "shoulder pain",
            "elbow pain",
            "wrist pain",
            "hip pain"
        ],

        type: "specialist",

        response:
            "Your symptoms are related to the muscles, joints or bones. An Orthopedic specialist would be appropriate for further evaluation.",

        specialization: "Orthopedic"
    },


    /* =====================================================
       CARDIOLOGIST
    ===================================================== */

    {
        keywords: [
            "chest pain",
            "high blood pressure",
            "hypertension",
            "irregular heartbeat",
            "heart beating fast",
            "heart palpitations",
            "palpitations",
            "breathlessness",
            "shortness of breath"
        ],

        type: "specialist",

        response:
            "Your symptoms may involve the heart or circulation. A Cardiologist would be the appropriate specialist to consult.",

        specialization: "Cardiologist"
    },


    /* =====================================================
       NEUROLOGIST
    ===================================================== */

    {
        keywords: [
            "severe headache",
            "migraine",
            "dizziness",
            "vertigo",
            "seizure",
            "numbness",
            "tingling",
            "memory loss",
            "trembling",
            "tremor",
            "balance problem"
        ],

        type: "specialist",

        response:
            "Your symptoms may involve the nervous system. A Neurologist would be appropriate for further evaluation.",

        specialization: "Neurologist"
    },


    /* =====================================================
       DERMATOLOGIST
    ===================================================== */

    {
        keywords: [
            "skin rash",
            "rash",
            "itching",
            "acne",
            "skin allergy",
            "skin infection",
            "pimples",
            "eczema",
            "dry skin",
            "hair loss"
        ],

        type: "specialist",

        response:
            "This appears to be related to a skin or hair concern. A Dermatologist would be the appropriate specialist.",

        specialization: "Dermatologist"
    },


    /* =====================================================
       PEDIATRICIAN
    ===================================================== */

    {
        keywords: [
            "child fever",
            "child cough",
            "child not eating",
            "baby fever",
            "baby cough",
            "my child",
            "my son",
            "my daughter",
            "infant"
        ],

        type: "specialist",

        response:
            "Because this concern involves a child, a Pediatrician is the most appropriate specialist.",

        specialization: "Pediatrician"
    },


    /* =====================================================
       DENTIST
    ===================================================== */

    {
        keywords: [
            "tooth pain",
            "toothache",
            "gum bleeding",
            "bleeding gums",
            "cavity",
            "tooth sensitivity",
            "dental pain",
            "swollen gums"
        ],

        type: "specialist",

        response:
            "This appears to be a dental concern. A Dentist would be the appropriate specialist.",

        specialization: "Dentist"
    },


    /* =====================================================
       GYNECOLOGIST
    ===================================================== */

    {
        keywords: [
            "pregnancy",
            "pregnant",
            "period pain",
            "period cramps",
            "irregular periods",
            "missed period",
            "menstrual problem",
            "menstrual pain"
        ],

        type: "specialist",

        response:
            "This concern is related to reproductive or menstrual health. A Gynecologist would be the appropriate specialist.",

        specialization: "Gynecologist"
    },


    /* =====================================================
       COMMON COLD / MILD FEVER
    ===================================================== */

    {
        keywords: [
            "fever",
            "mild fever",
            "cold",
            "common cold",
            "cough",
            "sneezing",
            "runny nose",
            "blocked nose"
        ],

        type: "remedy",

        response:
            "This may be consistent with a common cold or mild viral illness. Rest, stay hydrated and use warm fluids; seek medical advice if symptoms become severe, persist, or worsen."
    },


    /* =====================================================
       HEADACHE / FATIGUE
    ===================================================== */

    {
        keywords: [
            "headache",
            "mild headache",
            "tiredness",
            "fatigue",
            "weakness",
            "feeling tired",
            "low energy"
        ],

        type: "remedy",

        response:
            "For mild headache or general fatigue, try adequate rest, hydration and reducing prolonged screen use. If the symptom is severe, recurrent or getting worse, consider consulting a doctor."
    },


    /* =====================================================
       INDIGESTION
    ===================================================== */

    {
        keywords: [
            "indigestion",
            "acidity",
            "gas",
            "mild stomach ache",
            "stomach discomfort",
            "bloating",
            "heartburn"
        ],

        type: "remedy",

        response:
            "This may be mild indigestion or acidity. Try light meals, stay hydrated and avoid foods that clearly worsen the discomfort; seek medical advice if pain becomes severe or persistent."
    },


    /* =====================================================
       SORE THROAT
    ===================================================== */

    {
        keywords: [
            "sore throat",
            "throat pain",
            "mild cough",
            "scratchy throat"
        ],

        type: "remedy",

        response:
            "For a mild sore throat, warm fluids and a warm salt-water gargle may provide comfort. Seek medical advice if symptoms become severe, persistent or are accompanied by breathing difficulty."
    }

];


/* =========================================================
   TEXT NORMALIZATION
========================================================= */

function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* =========================================================
   KEYWORD MATCHING
========================================================= */

function containsKeyword(text, keyword) {

    const normalizedKeyword =
        normalizeText(keyword);

    return text.includes(normalizedKeyword);

}


/* =========================================================
   FIND HEALTH RULE
========================================================= */

function findHealthRule(text) {

    const normalizedText =
        normalizeText(text);


    /* Emergency gets highest priority */

    const emergencyRule =
        healthRules.find(rule =>
            rule.type === "emergency" &&
            rule.keywords.some(keyword =>
                containsKeyword(
                    normalizedText,
                    keyword
                )
            )
        );

    if (emergencyRule) {
        return emergencyRule;
    }


    /* Specialist rules */

    const specialistRule =
        healthRules.find(rule =>
            rule.type === "specialist" &&
            rule.keywords.some(keyword =>
                containsKeyword(
                    normalizedText,
                    keyword
                )
            )
        );

    if (specialistRule) {
        return specialistRule;
    }


    /* Remedy */

    const remedyRule =
        healthRules.find(rule =>
            rule.type === "remedy" &&
            rule.keywords.some(keyword =>
                containsKeyword(
                    normalizedText,
                    keyword
                )
            )
        );

    return remedyRule || null;

}


/* =========================================================
   CONTEXT DETECTION
========================================================= */

function updateContext(rule, text) {

    if (!rule) return;


    currentContext.topic =
        rule.keywords[0];

    currentContext.lastIntent =
        rule.type;


    if (rule.specialization) {

        currentContext.specialization =
            rule.specialization;

    }


    if (rule.type === "emergency") {

        currentContext.urgency =
            "urgent";

    } else {

        currentContext.urgency =
            "normal";

    }


    const normalized =
        normalizeText(text);


    if (
        normalized.includes("child") ||
        normalized.includes("baby") ||
        normalized.includes("son") ||
        normalized.includes("daughter") ||
        normalized.includes("infant")
    ) {

        currentContext.patientType =
            "child";

    }

}


/* =========================================================
   FOLLOW-UP / CONTINUATION DETECTION
========================================================= */

function isFollowUp(text) {

    const normalized =
        normalizeText(text);


    const followUpWords = [

        "what should i do",
        "what can i do",
        "what do i do",
        "is it serious",
        "is this serious",
        "should i worry",
        "what about",
        "then what",
        "and then",
        "how long",
        "how much",
        "why",
        "what if",
        "can i",
        "should i",
        "is it normal",
        "will it go away",
        "tell me more",
        "more information",
        "explain",
        "okay",
        "ok",
        "yes",
        "no",
        "thanks",
        "thank you"
    ];


    return followUpWords.some(
        phrase =>
            normalized === phrase ||
            normalized.includes(phrase)
    );

}


/* =========================================================
   FOLLOW-UP RESPONSE
========================================================= */

function generateFollowUpResponse(text) {

    const normalized =
        normalizeText(text);


    /* Emergency context */

    if (
        currentContext.urgency ===
        "urgent"
    ) {

        return {
            text:
                "Because you mentioned a potentially serious symptom, it is safer not to rely on home advice. Please seek urgent medical evaluation, especially if the symptom is severe or worsening.",
            specialist:
                currentContext.specialization
        };

    }


    /* Asking about seriousness */

    if (
        normalized.includes("serious") ||
        normalized.includes("worry")
    ) {

        return {
            text:
                "The seriousness depends on the severity, duration and other symptoms. If it is persistent, severe or getting worse, a qualified doctor should evaluate it rather than relying only on general advice.",
            specialist:
                currentContext.specialization
        };

    }


    /* Asking what to do */

    if (
        normalized.includes("what should") ||
        normalized.includes("what can i do") ||
        normalized.includes("what do i do")
    ) {

        if (
            currentContext.lastIntent ===
            "remedy"
        ) {

            return {
                text:
                    "For now, focus on rest, hydration and avoiding anything that clearly worsens the symptom. If it does not improve or becomes more severe, consider consulting a doctor.",
                specialist: null
            };

        }


        if (
            currentContext.specialization
        ) {

            return {
                text:
                    `Since your concern is related to ${currentContext.topic}, the next useful step would be an evaluation by a ${currentContext.specialization}.`,
                specialist:
                    currentContext.specialization
            };

        }

    }


    /* Asking duration */

    if (
        normalized.includes("how long")
    ) {

        return {
            text:
                "The expected duration varies depending on the cause. If the symptom persists longer than expected, repeatedly returns, or becomes worse, it is better to consult a qualified healthcare professional.",
            specialist:
                currentContext.specialization
        };

    }


    /* Yes / okay */

    if (
        normalized === "yes" ||
        normalized === "ok" ||
        normalized === "okay"
    ) {

        return {
            text:
                "Sure. Tell me what has changed, how severe the symptom is, or how long you have had it, and I can guide you using the information available in this assistant.",
            specialist:
                currentContext.specialization
        };

    }


    /* Generic contextual response */

    return {
        text:
            `I understand. Based on what you've told me about ${currentContext.topic || "your concern"}, I can continue helping with general information. Tell me about the severity, duration, or any new symptom you noticed.`,
        specialist:
            currentContext.specialization
    };

}


/* =========================================================
   UNKNOWN QUERY
========================================================= */

function generateUnknownResponse() {

    return {
        text:
            "I can help with common symptoms and guide you toward the appropriate doctor. Tell me the main symptom, how long you have had it, and whether it is mild, moderate or severe.",
        specialist: null
    };

}


/* =========================================================
   DOCTOR DATABASE
========================================================= */

/*
   AI-help page can use the same database exposed by
   see-doctor.js.

   If see-doctor.js is loaded on this page:
   window.darzciDoctors will be available.

   Otherwise this fallback database is used.
*/

const aiDoctors =
    window.darzciDoctors || [

        {
            id: "DR001",
            image: "image/doctor-01.jpg",
            name: "Dr. Aarav Sharma",
            specialization: "Cardiologist",
            gender: "male",
            city: "Kanpur",
            bestDoctor: false
        },

        {
            id: "DR002",
            image: "image/doctor-02.jpg",
            name: "Dr. Gyan Bhushan Raman",
            specialization: "General Physician",
            gender: "male",
            city: "Patna",
            bestDoctor: true
        },

        {
            id: "DR003",
            image: "image/doctor-02.jpg",
            name: "Dr. Manish Jain",
            specialization: "Dermatologist",
            gender: "male",
            city: "Jaipur",
            bestDoctor: true
        },

        {
            id: "DR004",
            image: "image/doctor-03.jpg",
            name: "Dr. Babita",
            specialization: "dermatologist",
            gender: "female",
            city: "Jaipur",
            bestDoctor: true
        },

        {
            id: "DR005",
            image: "image/doctor-04.jpg",
            name: "Dr. Purshottam Gupta",
            specialization: "General Physician",
            gender: "male",
            city: "Jaipur",
            bestDoctor: false
        },

        {
            id: "DR006",
            image: "image/doctor-05.jpg",
            name: "Dr. Yogesh Gupta",
            specialization: "Neurologist",
            gender: "male",
            city: "Jaipur",
            bestDoctor: true
        },

        {
            id: "DR007",
            image: "image/doctor-06.jpg",
            name: "Dr. Arushi Solanki",
            specialization: "Dermatologist",
            gender: "female",
            city: "Jaipur",
            bestDoctor: false
        },

        {
            id: "DR008",
            image: "image/doctor-06.jpg",
            name: "Dr. Deepak Sharma",
            specialization: "Gastroenterologist",
            gender: "male",
            city: "Jaipur",
            bestDoctor: false
        }

    ];


/* =========================================================
   FIND MATCHING DOCTORS
========================================================= */

function getMatchingDoctors(
    specialization
) {

    if (!specialization) return [];


    return aiDoctors
        .filter(doctor =>
            doctor.specialization
                .toLowerCase() ===
            specialization.toLowerCase()
        )
        .slice(0, 3);

}


/* =========================================================
   CREATE DOCTOR CARDS
========================================================= */

function showDoctorCards(specialization, botWrapper) {

    const matchingDoctors =
        getMatchingDoctors(specialization);

    if (!botWrapper || matchingDoctors.length === 0) {
        return;
    }


    const doctorSection =
        document.createElement("div");

    doctorSection.className =
        "ai-doctor-section";


    /* Heading */

    const heading =
        document.createElement("div");

    heading.className =
        "ai-doctor-heading";

    heading.textContent =
        `Recommended ${specialization}s`;

    doctorSection.appendChild(
        heading
    );


    /* Doctor List */

    const doctorList =
        document.createElement("div");

    doctorList.className =
        "ai-doctor-list";


    matchingDoctors.forEach(doctor => {

        const card =
            document.createElement("article");

        card.className =
            "ai-doctor-card";


        /* Image */

        const image =
            document.createElement("img");

        image.src =
            doctor.image;

        image.alt =
            doctor.name;

        image.className =
            "ai-doctor-image";


        /* Info */

        const info =
            document.createElement("div");

        info.className =
            "ai-doctor-info";


        const name =
            document.createElement("h4");

        name.textContent =
            doctor.name;


        const specializationText =
            document.createElement("p");

        specializationText.textContent =
            doctor.specialization;


        const city =
            document.createElement("p");

        city.textContent =
            `📍 ${doctor.city}`;


        /* View Details */

        const button =
            document.createElement("button");

        button.type =
            "button";

        button.className =
            "ai-doctor-button";

        button.textContent =
            "View Details";


        button.addEventListener(
            "click",
            () => {

                if (
                    typeof openDoctorDetails ===
                    "function"
                ) {

                    openDoctorDetails(
                        doctor.id
                    );

                } else {

                    console.error(
                        "openDoctorDetails() not found."
                    );

                }

            }
        );


        info.appendChild(name);
        info.appendChild(specializationText);
        info.appendChild(city);
        info.appendChild(button);


        card.appendChild(image);
        card.appendChild(info);


        doctorList.appendChild(card);

    });


    doctorSection.appendChild(
        doctorList
    );


    /*
       IMPORTANT:
       Add cards INSIDE the bot message
       so they appear after AI's response.
    */

    botWrapper.appendChild(
        doctorSection
    );


    /* Keep chat at latest message */

    chatArea.scrollTop =
        chatArea.scrollHeight;

}


/* =========================================================
   EMERGENCY BADGE
========================================================= */

function showUrgencyBadge() {

    const badge =
        document.createElement("div");

    badge.className =
        "ai-urgent-badge";

    badge.textContent =
        "⚠️ Seek immediate medical care if symptoms are severe or worsening.";

    chatArea.appendChild(badge);

}


/* =========================================================
   ADD USER MESSAGE
========================================================= */

function addUserMessage(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message user-message";


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        text;


    wrapper.appendChild(
        paragraph
    );

    chatArea.appendChild(
        wrapper
    );

}


/* =========================================================
   ADD BOT MESSAGE
========================================================= */

function addBotMessage(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "new-bot-message";


    const avatar =
        document.createElement("div");

    avatar.className =
        "bot-avatar";

    avatar.textContent =
        "🩺";


    const message =
        document.createElement("div");

    message.className =
        "message bot-message";


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        text;


    message.appendChild(
        paragraph
    );


    wrapper.appendChild(
        avatar
    );

    wrapper.appendChild(
        message
    );


    chatArea.appendChild(
        wrapper
    );


    chatArea.scrollTop =
        chatArea.scrollHeight;


    /*
       Return wrapper so doctor cards
       can be inserted directly below
       this AI message.
    */

    return wrapper;

}


/* =========================================================
   PROCESS USER MESSAGE
========================================================= */

function processMessage(text) {

    const normalized =
        normalizeText(text);

    /* =========================================
       1. ALWAYS CHECK FOR A NEW HEALTH TOPIC
    ========================================= */

    const rule =
        findHealthRule(normalized);


    if (rule) {

        updateContext(
            rule,
            normalized
        );

        return {
            text: rule.response,
            specialist:
                rule.specialization || null,
            type: rule.type
        };
    }


    /* =========================================
       2. IF NO NEW TOPIC → FOLLOW-UP
    ========================================= */

    if (
        conversationHistory.length > 0 &&
        isFollowUp(normalized)
    ) {

        return generateFollowUpResponse(
            normalized
        );

    }


    /* =========================================
       3. UNKNOWN → GENERAL PHYSICIAN
    ========================================= */

    return {
        text:
            "I can help you understand your concern and guide you to the right doctor. A General Physician is a good starting point when the cause is unclear. You can also tell me the main symptom, how long you have had it, and how severe it is.",
        specialist:
            "General Physician",
        type:
            "specialist"
    };

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendMessage() {

    const text =
        userInput.value.trim();


    if (!text) return;


    /* USER MESSAGE */

    addUserMessage(
        text
    );


    conversationHistory.push({
        role: "user",
        text: text
    });


    userInput.value = "";


    /*
       Local processing.
       No API call.
       No backend.
    */

    setTimeout(() => {

    const result =
        processMessage(text);


    const botWrapper =
        addBotMessage(
            result.text
        );


    conversationHistory.push({
        role: "assistant",
        text: result.text
    });


    if (result.specialist) {

        showDoctorCards(
            result.specialist,
            botWrapper
        );

    }


    if (
        result.type ===
        "emergency"
    ) {

        showUrgencyBadge();

    }


}, 250);

}


/* =========================================================
   SEND BUTTON
========================================================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );

}


/* =========================================================
   ENTER KEY
========================================================= */

if (userInput) {

    userInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


/* =========================================================
   QUICK QUESTIONS
========================================================= */

document
    .querySelectorAll(
        ".quick-questions button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const question =
                    button.dataset.question;

                if (!question) return;

                userInput.value =
                    question;

                sendMessage();

            }
        );

    });


/* =========================================================
   INITIAL GREETING
========================================================= */

console.log(
    "DocSlot AI: Frontend-only AI loaded successfully."
);