const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const postsContainer = document.getElementById("postsContainer");
const postInput = document.getElementById("postContent");
const postBtn = document.getElementById("btnPost");

/*chat bot */
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

const GEMINI_API_KEY = "AIzaSyAS0uSxL6yeZO5_1oLH3Rzet7RZQIu5mgQ";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const chatHistory = [];

// Listen to Enter key
chatInput.addEventListener("keypress", async function (e) {
  if (e.key === "Enter") {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage("user", userMessage);
    chatInput.value = "";

    const botReply = await generateResponse(userMessage);
    addMessage("bot", botReply);
  }
});

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.href = "../index.html";
}

userName.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
});

postBtn.addEventListener("click", () => {
  const content = postInput.value.trim();
  if (!content) return alert("Please write something before posting!");
  createPost(content);
});
/*url*/
const API_BASE = "https://legendary-spring-archeology.glitch.me";

async function getPosts() {
  postsContainer.innerHTML = "";

  const res = await fetch(`${API_BASE}/posts?_sort=id&_order=desc`);
  const posts = await res.json();

  for (const post of posts) {
    const userRes = await fetch(`${API_BASE}/users/${post.userId}`);
    const user = await userRes.json();

    displayPost(post, user);
  }
}

function displayPost(post, user) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  postElement.innerHTML = `
    <div class="post-header">
      <img src="../images/profile.jpg" alt="User" />
      <strong>${user.firstName} ${user.lastName}</strong>
    </div>
    <p>${post.content}</p>
    <div class="post-actions">
      <button><i class="fas fa-thumbs-up"></i> Like</button>
      <button><i class="fas fa-comment-dots"></i> Comment</button>
      <button><i class="fas fa-share-nodes"></i> Share</button>
    </div>
  `;

  postsContainer.appendChild(postElement);
}

async function createPost(content) {
  const postData = {
    userId: loggedInUser.id,
    content,
    createdAt: new Date().toISOString(),
  };

  await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  postInput.value = "";
  getPosts();
}

getPosts();

/*chat bot */
function addMessage(sender, message) {
  const messageEl = document.createElement("p");
  messageEl.classList.add(sender === "bot" ? "bot-msg" : "user-msg");
  messageEl.textContent = sender === "bot" ? `🤖 ${message}` : `🧑 ${message}`;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Gemini API integration
async function generateResponse(userMessage) {
  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory }),
    });

    if (!response.ok) {
      throw new Error("Network error: " + response.statusText);
    }

    const data = await response.json();

    const geminiReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    chatHistory.push({
      role: "model",
      parts: [{ text: geminiReply }],
    });

    return geminiReply;
  } catch (err) {
    console.error(err);
    return "Sorry, there was an error.";
  }
}
