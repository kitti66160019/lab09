document.addEventListener("DOMContentLoaded", async () => {
    const postsList = document.getElementById("posts-list");
    const userName = document.getElementById("user-name");
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    if (!userId) return;

    try {
        // ดึงข้อมูลผู้ใช้
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const user = await userResponse.json();
        userName.textContent = user.name || "ไม่พบชื่อผู้ใช้";

        // ดึงโพสต์ของผู้ใช้
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const posts = await postsResponse.json();

        // ตรวจสอบว่ามีโพสต์หรือไม่
        if (!Array.isArray(posts) || posts.length === 0) {
            postsList.innerHTML = "<p>ไม่มีโพสต์ที่จะแสดง</p>";
            return;
        }

        // แสดงโพสต์
        postsList.innerHTML = posts.map(post => `
            <div class="post-item">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="btn btn-success" data-post-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments" id="comments-${post.id}" style="display: none;"></div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching data:", error);
        postsList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
});