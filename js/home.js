const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const postsContainer = document.getElementById("postsContainer");
const postInput = document.getElementById("postContent");
const postBtn = document.getElementById("btnPost");

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

postBtn.addEventListener("click", () => {
  const content = postInput.value.trim();
  if (!content) return alert("Please write something before posting!");
  createPost(content);
});

getPosts();
