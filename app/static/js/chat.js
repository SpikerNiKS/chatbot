const input = document.getElementById("message");
const modelSelect = document.getElementById("model");
const chatBox = document.getElementById("chat-box");
const sendButton = document.getElementById("send-btn");

window.onload = loadChatHistory;

// window.onload = function () {
    // console.log("onload running");
    // alert("loaded");
// };

function appendMessage(role, text) {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    div.textContent = text;
    chatBox.appendChild(div);
    return div;
}

function createThinkingBubble() {
    const thinkingBubble = document.createElement("div");
    thinkingBubble.className = "message bot thinking";
    thinkingBubble.textContent = "AI is thinking...";
    chatBox.appendChild(thinkingBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    return thinkingBubble;
}

function formatTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

async function sendMessage() {
    const message = input.value.trim();
    const model = modelSelect.value;
    const modelName = modelSelect.options[modelSelect.selectedIndex].text;

    if (!message) return;

    appendMessage("user", message);
    input.value = "";
    input.disabled = true;
    sendButton.disabled = true;

    const thinkingBubble = createThinkingBubble();
    await fetchResponse(message, model, modelName, thinkingBubble);
}

async function fetchResponse(message, model, modelName, bubble) {
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                model: model
            })
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        const answer = data.response?.trim();

        if (!answer) {
            throw new Error("No response received from the AI.");
        }

        bubble.className = "message bot";
        bubble.textContent = answer;

        const meta = document.createElement("div");
        meta.className = "response-meta";
        meta.textContent = `${modelName} • ${formatTimestamp()}`;
        bubble.appendChild(meta);
    } catch (error) {
        bubble.className = "message bot error";
        bubble.innerHTML = "Failed to get a response. Please try again.";

        const retryButton = document.createElement("button");
        retryButton.className = "retry-button";
        retryButton.textContent = "Retry";
        retryButton.addEventListener("click", async () => {
            bubble.className = "message bot thinking";
            bubble.textContent = "AI is thinking...";
            await fetchResponse(message, model, bubble);
        });

        bubble.appendChild(document.createElement("br"));
        bubble.appendChild(retryButton);
    } finally {
        input.disabled = false;
        sendButton.disabled = false;
        input.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}


async function loadChatHistory() {
    const response = await fetch("/chat-history");

    const data = await response.json();

    const chatBox = document.getElementById("chat-box");

    data.messages.reverse().forEach(chat => {
        const timestamp = chat.created_at
            ? new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            : "";
        const modelName = chat.model || "Unknown model";

        chatBox.innerHTML += `
            <div class="message user">
                ${chat.user_message}
            </div>
        `;

        chatBox.innerHTML += `
            <div class="message bot">
                ${chat.ai_response}
                <div class="response-meta">${modelName}${timestamp ? ` • ${timestamp}` : ""}</div>
            </div>
        `;
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function clearChatHistory() {
    if (!confirm("Are you sure you want to clear the chat history? This action cannot be undone.")) {
        return;
    }

    try {
        const response = await fetch("/chat-history", {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        } else {
            alert("Chat history cleared successfully.");
        }

        chatBox.innerHTML = "";
    } catch (error) {
        alert("Failed to clear chat history. Please try again.");
    }
}