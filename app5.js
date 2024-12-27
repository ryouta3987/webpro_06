const express = require("express");
const app = express();

app.set("view engine", "ejs");

// ミドルウェア設定
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); // フォームデータを解析

// 各種ルート
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render("show", { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render("show", { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render("icon", { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = "";
  if (num === 1) luck = "大吉";
  else if (num === 2) luck = "中吉";
  else if (num === 3) luck = "小吉";
  else if (num === 4) luck = "吉";
  else luck = "凶";
  console.log("あなたの運勢は" + luck + "です");
  res.render("luck", { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand || "未選択";
  let win = Number(req.query.win || 0); // 初期値設定
  let total = Number(req.query.total || 0); // 初期値設定
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = num === 1 ? "グー" : num === 2 ? "チョキ" : "パー";

  let judgement = "引き分け";
  if ((hand === "グー" && cpu === "チョキ") || (hand === "チョキ" && cpu === "パー") || (hand === "パー" && cpu === "グー")) {
    judgement = "勝ち";
    win++;
  } else if (hand !== "未選択" && hand !== cpu) {
    judgement = "負け";
  }
  total++;

  res.render("janken", { your: hand, cpu: cpu, judgement: judgement, win: win, total: total });
});

app.get("/guess", (req, res) => {
  const userGuess = Number(req.query.guess || 0); // 初期値設定
  const correctNumber = Math.floor(Math.random() * 100) + 1;

  let message = "";
  if (userGuess === correctNumber) {
    message = "おめでとうございます！正解です！";
  } else if (userGuess > correctNumber) {
    message = "高すぎます。";
  } else {
    message = "低すぎます。";
  }

  res.render("guess", { message, correctNumber });
});

// 名言表示
const quotes = {
  人生: ["生きるとは、自分自身を発見することだ。", "過去を振り返るな。未来に向かって進め。", "人生は挑戦の連続だ。"],
  成功: ["成功は失敗から学ぶことだ。", "挑戦なくして成功なし。", "夢なきものには成功なし"],
  挑戦: ["何事も挑戦することに意味がある。", "失敗を恐れるな、挑戦こそが未来を創る。", "挑戦する者に道は開かれる。"],
};

app.get("/quote", (req, res) => {
  res.render("quote", { theme: null, quote: null });
});

app.post("/quote", (req, res) => {
  const theme = req.body.theme; // フォームデータ取得
  const themeQuotes = quotes[theme];
  let quote = null;

  if (themeQuotes) {
    quote = themeQuotes[Math.floor(Math.random() * themeQuotes.length)];
    console.log(`テーマ: ${theme}, 名言: ${quote}`); // デバッグ情報
  } else {
    console.log(`不明なテーマ: ${theme}`);
  }

  res.render("quote", { theme, quote });
});

// 体脂肪率計算機能
app.get("/body-fat", (req, res) => {
  res.render("bodyFat", { result: null });
});

app.post("/body-fat", (req, res) => {
  const weight = parseFloat(req.body.weight); // 体重（kg）
  const fatMass = parseFloat(req.body.fatMass); // 体脂肪量（kg）
  const gender = req.body.gender; // 性別（男性 or 女性）

  if (!weight || !fatMass || !gender) {
    return res.render("bodyFat", { result: "すべての値を入力してください。" });
  }

  const bodyFatPercentage = ((fatMass / weight) * 100).toFixed(2); // 体脂肪率計算
  let category = "";

  if (gender === "男性") {
    if (bodyFatPercentage < 10) category = "低め";
    else if (bodyFatPercentage <= 20) category = "普通";
    else category = "高め";
  } else if (gender === "女性") {
    if (bodyFatPercentage < 20) category = "低め";
    else if (bodyFatPercentage <= 30) category = "普通";
    else category = "高め";
  }

  const result = `体脂肪率: ${bodyFatPercentage}% (${category})`;
  res.render("bodyFat", { result });
});

// サーバー起動
app.listen(8080, () => console.log("アプリがポート8080で起動しました！"));
