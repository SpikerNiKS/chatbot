async function sendMessage() {

    const input = document.getElementById("message");

    const model = document.getElementById("model").value;

    const message = input.value;

    if (!message) return;

    const chatBox = document.getElementById("chat-box");

    // User message
    chatBox.innerHTML += `
        <div class="message user">
            ${message}
        </div>
    `;

    input.value = "";

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

    const data = await response.json();

    // Bot response
    chatBox.innerHTML += `
        <div class="message bot">
            ${data.response}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}