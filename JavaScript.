<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BBS Client</title>
    <script>
        "use strict";

        const apiUrl = "http://localhost:3000/api";

        async function postData(endpoint, data) {
            const response = await fetch(`${apiUrl}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }

        async function createPost() {
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            const data = { title, content, timestamp: new Date().toISOString() };
            const result = await postData("createPost", data);
            alert("新規投稿が作成されました: " + JSON.stringify(result));
        }

        async function fetchPosts() {
            const posts = await postData("getPosts", {});
            const output = document.getElementById("output");
            output.innerHTML = JSON.stringify(posts, null, 2);
        }
    </script>
</head>
<body>
    <h1>BBS Client</h1>
    <div>
        <h2>新規投稿</h2>
        <input type="text" id="title" placeholder="タイトル">
        <textarea id="content" placeholder="内容"></textarea>
        <button onclick="createPost()">投稿</button>
    </div>
    <div>
        <h2>投稿一覧</h2>
        <button onclick="fetchPosts()">更新</button>
        <pre id="output"></pre>
    </div>
</body>
</html>
