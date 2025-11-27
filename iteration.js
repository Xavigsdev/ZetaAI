// iteration.js
// Este modelo público no tiene API privada, solicita una en hugging face y a funcionar.
const HF_TOKEN = "Pon aquí tu token de Hugging Face";
const API_URL = "https://router.huggingface.co/v1/chat/completions";

// Historial estilo OpenAI
const conversation = [
  {
    role: "system",
    content:
      "You are Zeta-V.1 Assistant, a concise, helpful and friendly chatbot. Respond in Spanish by default unless the user uses another language."
  }
];

function initChat() {
  const messagesEl = document.getElementById("chatMessages");
  const inputEl = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!messagesEl || !inputEl || !sendBtn) {
    console.error("Faltan elementos requeridos en interface.html");
    return;
  }

  function createMessageRow(role, initialText = "") {
    const isUser = role === "user";

    const row = document.createElement("div");
    row.className = "msg-row " + (isUser ? "user" : "bot");

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    avatar.innerHTML = isUser
      ? '<i class="bi bi-person"></i>'
      : '<i class="bi bi-robot"></i>';

    const wrapper = document.createElement("div");

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = initialText;

    const meta = document.createElement("div");
    meta.className = "msg-meta";
    meta.textContent = (isUser ? "Tú" : "Bot") + " · ahora";

    wrapper.appendChild(bubble);
    wrapper.appendChild(meta);

    row.appendChild(avatar);
    row.appendChild(wrapper);

    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    return { row, bubble };
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Mensaje usuario
    createMessageRow("user", text);
    conversation.push({ role: "user", content: text });
    inputEl.value = "";
    inputEl.focus();

    // Burbuja del bot (rellenada por streaming)
    const { bubble } = createMessageRow("assistant", "");
    let fullResponse = "";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:groq",
          messages: conversation,
          stream: true
        })
      });

      if (!response.ok) {
        bubble.textContent = `Error HTTP ${response.status}`;
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Procesar formato tipo OpenAI (SSE con "data: {}")
        const lines = chunk
          .split("\n")
          .map(l => l.trim())
          .filter(l => l.startsWith("data:"));

        for (const line of lines) {
          const jsonStr = line.replace("data:", "").trim();
          if (!jsonStr || jsonStr === "[DONE]") continue;

          let payload;
          try {
            payload = JSON.parse(jsonStr);
          } catch (e) {
            console.error("Error parseando chunk:", jsonStr);
            continue;
          }

          const delta = payload.choices?.[0]?.delta?.content || "";
          if (delta) {
            fullResponse += delta;
            bubble.textContent = fullResponse;
            messagesEl.scrollTop = messagesEl.scrollHeight;
          }
        }
      }

      if (!fullResponse) {
        bubble.textContent = "No se ha recibido contenido del modelo.";
        return;
      }

      conversation.push({
        role: "assistant",
        content: fullResponse
      });
    } catch (error) {
      console.error(error);
      bubble.textContent =
        "Error al conectar con el modelo. Puede ser CORS o el token.";
    }
  }

  // Eventos
  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Prompts rápidos si existen
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      inputEl.value = btn.textContent.trim();
      inputEl.focus();
    });
  });
}

// Inicializar cuando el DOM está listo
document.addEventListener("DOMContentLoaded", initChat);
