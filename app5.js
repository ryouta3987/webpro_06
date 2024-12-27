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
    if (bodyFatPercentage < 10) category = "絞れてるね．完成形に近づけるために今日もジムいこ";
    else if (bodyFatPercentage <= 20) category = "もしかして……理想の身体がほしい？ジム行こ";
    else category = "自分に甘いね。ジムに行こ";
  } else {
    if (bodyFatPercentage < 20) category = "たまには一緒に身体を動かしてみるか。ジムに行こ";
    else if (bodyFatPercentage <= 30) category = "普通";
    else category = "……気づいたね。ジム行こ";
  }

  const result = `体脂肪率: ${bodyFatPercentage}% (${category})`;
  res.render("bodyFat", { result });
});

// 訪問販売のネック切り返し機能
const responses = {
  高い: [
    "その価値を実感していただけると思います！具体的にどの部分が気になりますか？",
    "少し高く感じられるかもしれませんが、長期的にはコスト削減になります。",
  ],
  必要ない: [
    "一見そう思われるかもしれませんが、実際に使ってみると便利だと感じるお客様が多いです。",
    "それでは、具体的にどの部分が不要と感じますか？お話を伺えますか？",
  ],
  時間がない: [
    "お忙しい中ありがとうございます。たった5分だけお時間いただければ、重要なポイントをお伝えします。",
    "お時間をいただかずに資料だけでもお渡しできますが、いかがでしょうか？",
  ],
  他社と比較中: [
    "他社様との違いをお伝えしたいのですが、具体的にどの部分を重視されていますか？",
    "競合製品も素晴らしいですが、当社の強みは〇〇です！ぜひ比較いただきたいです。",
  ],
};

app.get("/sales", (req, res) => {
  res.render("sales", { situation: null, response: null });
});

app.post("/sales", (req, res) => {
  const situation = req.body.situation; // フォームデータ取得
  const possibleResponses = responses[situation];
  let response = null;

  if (possibleResponses) {
    response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    console.log(`ネック: ${situation}, 切り返し: ${response}`);
  } else {
    console.log(`不明なネック: ${situation}`);
  }

  res.render("sales", { situation, response });
});

// サーバー起動
app.listen(8080, () => console.log("アプリがポート8080で起動しました！"));
