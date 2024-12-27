# webpro_06
10/29_2024
## app5.jsについて

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
janken.html | じゃんけんの開始画面
coin.html | コインの開始画面
saikoro.html | サイコロの開始画面
janken.ejs | じゃんけんのテンプレートファイル
coin.ejs | コインのテンプレートファイル
saikoro.ejs | サイコロのテンプレートファイル




## 使用方法
1. ターミナルで app5.js のあるフォルダに移動する
1.  node app5.jsをターミナルで実行しポートに接続する
1. ブラウザで http://localhost:8080/機能名　にアクセスする
4. jankenは入力欄にグー・チョキ・パーのうち一つを,coinは裏表のどちらかを,saikoroは1~6のうちの一つを入力する.

## janken
ポート接続後ブラウザに http://localhost:8080/janken と入力することでじゃんけんを開始する.表示される入力欄にはグー,チョキ,パーのうち１つを入力する.入力欄に入力された手にを参照し,cpuがランダムで出す手と比較し,両者が同じ手の場合は「あいこ」を表示,プレイヤーとcpuの手の組み合わせが,グー・チョキ,チョキ・パー,パー・グーの場合は「勝ち」と表示を行う.反対に,プレイヤーとcpuの手がチョキ・パー,パー・チョキ,チョキ・グーの場合は「負け」と表示する.その後じゃんけんの結果が「負け」,または「あいこ」の場合は試合数のみを1回増やし,結果が「勝ち」だった場合は試合数と勝数を1回増加させる.

``` mermaid
flowchart TD;

start["開始(出す手を入力)"];
end1["終了"]
if1{"じゃんけんの勝敗を
判定"}
win["勝ちと表示"]
loose["負けと表示"]
aiko["あいこと表示"]
toatal["total+1"]
kati["win+1
total+1"]

start --> if1
if1 -->win
win -->kati
kati-->end1
if1-->aiko
aiko-->toatal
toatal-->end1
if1-->loose
loose-->toatal

```
## coin
ポート接続後ブラウザに http://localhost:8080/coin と入力することでコインを開始する.表示される入力欄には表か裏のどちらかを入力する.入力欄に表示された面がcpuが提示した面と同じであれば,「あたり」と表示し,異なっていれば「はずれ」と表示する.この結果が「あたり」であった場合は,合計のゲーム数とあたり数を1回増やし,「はずれ」の場合はゲーム数だけを増やす.

``` mermaid
flowchart TD;

start["開始(裏表を入力)"];
end1["終了"]
if1{"コインの面の予想
があっているか"}
win["あたりと表示"]
loose["はずれと表示"]
toatal["total+1"]
kati["win+1
total+1"]

start --> if1
if1 -->|Yes|win
win -->kati
kati-->end1
if1-->|No|loose
loose-->toatal
toatal-->end1

```

## saikoro
ポート接続後ブラウザに http://localhost:8080/saikoro と入力することでサイコロを開始する.表示される入力欄には1から6までのうち一つの数字を入力する.入力した数字とcpuがランダムで出した数字を比較し,その値が等しければ「あたり！！」異なれば「はずれ」と表示する.この結果が「あたり！！」であった場合は,合計のゲーム数とあたり数を1回増やし,「はずれ」の場合はゲーム数だけを増やす.

``` mermaid
flowchart TD;

start["開始(サイコロの目を入力)"];
end1["終了"]
if1{"目の予想
があっているか"}
win["あたりと表示"]
loose["はずれと表示"]
toatal["total+1"]
kati["win+1
total+1"]

start --> if1
if1 -->|Yes|win
win -->kati
kati-->end1
if1-->|No|loose
loose-->toatal
toatal-->end1

```