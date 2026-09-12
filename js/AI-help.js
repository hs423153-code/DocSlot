const chatArea =
    document.getElementById("chatArea");

const userInput =
    document.getElementById("userInput");

const sendButton =
    document.getElementById("sendButton");

const quickQuestions =
    document.querySelectorAll(
        ".quick-questions button"
    );


/* =================================
   BACKEND
================================= */

const API_URL =
    "http://localhost:3000/api/chat";


/* =================================
   CHAT HISTORY
================================= */

const chatHistory = [];


/* =================================
   ADD USER MESSAGE
================================= */

function addUserMessage(message) {

    const messageDiv =
        document.createElement("div");

    messageDiv.className =
        "user-message";

    messageDiv.textContent =
        message;

    chatArea.appendChild(
        messageDiv
    );

    scrollToBottom();
}


/* =================================
   ADD BOT MESSAGE
================================= */

function addBotMessage(message) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "new-bot-message";

    wrapper.innerHTML = `
        <div class="bot-avatar">
            🩺
        </div>

        <div class="message">
            ${message}
        </div>
    `;

    chatArea.appendChild(
        wrapper
    );

    scrollToBottom();
}


/* =================================
   TYPING INDICATOR
================================= */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.id =
        "typingIndicator";

    typing.className =
        "new-bot-message";

    typing.innerHTML = `
        <div class="bot-avatar">
            🩺
        </div>

        <div class="message">

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>
    `;

    chatArea.appendChild(
        typing
    );

    scrollToBottom();
}


/* =================================
   REMOVE TYPING
================================= */

function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );

    if (typing) {
        typing.remove();
    }
}


/* =================================
   SEND MESSAGE TO AI
================================= */

async function sendMessage() {

    const message =
        userInput.value.trim();


    if (!message) {
        return;
    }


    /* Show user message */

    addUserMessage(
        message
    );


    /* Clear input */

    userInput.value = "";


    /* Show typing */

    showTyping();


    try {

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message:
                            message,

                        history:
                            chatHistory

                    })
                }
            );


        const data =
            await response.json();


        removeTyping();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Backend request failed."
            );

        }


        /* Show AI response */

        addBotMessage(
            data.reply
        );


        /* Save conversation */

        chatHistory.push({

            role: "user",

            content:
                message

        });


        chatHistory.push({

            role: "assistant",

            content:
                data.reply

        });


    } catch (error) {

        removeTyping();


        console.error(
            "DocSlot AI Error:",
            error
        );


        addBotMessage(`
            Sorry, I couldn't connect
            to DocSlot AI right now.
            <br><br>
            Please try again in a moment.
        `);

    }

}


/* =================================
   SEND BUTTON
================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =================================
   ENTER KEY
================================= */

userInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =================================
   QUICK QUESTIONS
================================= */

quickQuestions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                userInput.value =
                    button.dataset.question;

                sendMessage();

            }
        );

    }
);


/* =================================
   SCROLL
================================= */

function scrollToBottom() {

    chatArea.scrollTop =
        chatArea.scrollHeight;

}