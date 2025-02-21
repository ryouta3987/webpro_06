"use strict";

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors"); // CORSエラー回避のため

const app = express();
const PORT = 3000;

// データベースのセットアップ
const db = new sqlite3.Database(":memory:");

// データベース初期化
db.serialize(() => {
    db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT, timestamp TEXT)");
    db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY, postId INTEGER, comment TEXT, timestamp TEXT)");
    db.run("CREATE TABLE likes (id INTEGER PRIMARY KEY, postId INTEGER)");
});

app.use(cors()); // フロントエンドと連携するためCORSを許可
app.use(bodyParser.json());
app.use(express.static("public")); // 静的ファイル提供

// **新規エンドポイント: 推論**
app.get("/推論", (req, res) => {
    res.json({ message: "推論API: GETリクエスト受信" });
});

app.post("/推論", (req, res) => {
    const { input } = req.body;
    if (!input) {
        return res.status(400).json({ error: "入力が必要です" });
    }

    // ダミー推論処理
    const result = `推論結果: ${input}を処理しました`;
    res.json({ result });
});

// エンドポイント: 新規投稿
app.post("/api/createPost", (req, res) => {
    const { title, content, timestamp } = req.body;
    const query = "INSERT INTO posts (title, content, timestamp) VALUES (?, ?, ?)";
    db.run(query, [title, content, timestamp], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, content, timestamp });
    });
});

// エンドポイント: コメント追加
app.post("/api/addComment", (req, res) => {
    const { postId, comment, timestamp } = req.body;
    const query = "INSERT INTO comments (postId, comment, timestamp) VALUES (?, ?, ?)";
    db.run(query, [postId, comment, timestamp], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, postId, comment, timestamp });
    });
});

// エンドポイント: いいね追加
app.post("/api/likePost", (req, res) => {
    const { postId } = req.body;
    const query = "INSERT INTO likes (postId) VALUES (?)";
    db.run(query, [postId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, postId });
    });
});

// エンドポイント: 投稿リスト取得
app.post("/api/getPosts", (req, res) => {
    const query = "SELECT * FROM posts";
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// サーバー開始
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
