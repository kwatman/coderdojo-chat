let username = null

function onClick() {
    username = document.getElementById("username").value
    console.log("Logging in as:", username);
    document.querySelector("#chat-container").classList.remove("hidden")
    document.querySelector("#login-container").classList.add("hidden")

    document.querySelector("#username-indicator").innerHTML = username
}
async function chat() {
    let message = document.querySelector("#chatbox").value
    let response = await fetch('/api/chat',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            message: message
        })
    })
    loadChat()
}

async function loadChat() {
    let chatResponse = await fetch('/api/chat',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let messages = await chatResponse.json()
    let chatContainer = document.getElementById('chat')
    chatContainer.innerHTML = ''
    for(let message of messages) {
        let messageEl = document.createElement('p')
        messageEl.innerHTML = `<b>${message.user}:</b> ${message.message}`
        chatContainer.appendChild(messageEl)
     }
}

setInterval(loadChat, 1000)


document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("login-button").onclick = onClick
    document.getElementById("chat-submit").onclick = chat

    loadChat()
})
