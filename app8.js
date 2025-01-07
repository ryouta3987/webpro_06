"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える
let nextId = 0; // 投稿を指定するための一意のIDを生成するためのカウンター

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  console.log("read -> " + start);

  if (start === 0) {
    res.json({ messages: bbs });
  } else {
    res.json({ messages: bbs.slice(start) });
  }
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log([name, message]);

  const post = { id: nextId++, name: name, message: message };
  bbs.push(post);
  res.json({ number: bbs.length });
});

app.post("/delete", (req, res) => {
  const id = Number(req.body.id);
  const index = bbs.findIndex((post) => post.id === id); // IDで投稿を検索

  if (index !== -1) {
    bbs[index].message = "この投稿は削除されました"; // メッセージを更新
    console.log( bbs[index]);
    res.json({ success: true, number: bbs.length });
  } else {
    res.json({ success: false, error: "Invalid ID" });
  }
});

app.post("/edit", (req, res) => {
  const id = Number(req.body.id);
  const newMessage = req.body.message;
  const index = bbs.findIndex((post) => post.id === id);

  if (index !== -1) {
    bbs[index].message = newMessage; // メッセージを更新
    console.log("メッセージが変更されました:", bbs[index]);
    res.json({ success: true, message: bbs[index] });
  } else {
    res.json({ success: false, error: "Invalid ID" });
  }
});

app.post("/search", (req, res) => {
  const keyword = req.body.keyword.toLowerCase();
  if (!keyword) {
      res.json({ success: false, error: "キーワードが空です。" });
      return;
  }

  // 投稿を検索
  const results = bbs.filter(post => 
      post.name.toLowerCase().includes(keyword) || 
      post.message.toLowerCase().includes(keyword)
  );

  if (results.length > 0) {
      res.json({ success: true, messages: results });
  } else {
      res.json({ success: false, messages: [] });
  }
});

app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
