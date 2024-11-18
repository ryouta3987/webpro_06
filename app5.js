const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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
  else if( num==2 ) luck = '吉';
  else if( num==3 ) luck = '中吉';
  else if( num==4 ) luck = '小吉';
  else if( num==5 ) luck = '末吉';
  else if( num==6 ) luck = '凶';
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ')||
    (hand === 'チョキ' && cpu === 'パー')||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total +=1 ;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


app.get("/coin", (req, res) => {
  let yosou = req.query.yosou;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {yosou, win, total});
  const num = Math.floor( Math.random() * 2 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '表';
  else if( num==2 ) cpu = '裏';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (yosou === cpu) {
    judgement = 'あたり';
    win += 1;
  } 
  else {
    judgement = 'はずれ';
  }
  total +=1 ;

  const display = {
    your: yosou,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'coin', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));


app.get("/saikoro", (req, res) => {
  let me = req.query.me;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {me, win, total});
  const num = Math.floor( Math.random() * 6 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '1';
  else if( num==2 ) cpu = '2';
  else if( num==3 ) cpu = '3';
  else if( num==4 ) cpu = '4';
  else if( num==5 ) cpu = '5';
  else cpu = '6';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (me === cpu) {
    judgement = 'あたり！！';
    win += 1
  }
  else  {
    judgement = 'はずれ';
  }
  total +=1 ;

  const display = {
    your: me,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'saikoro', display );
});