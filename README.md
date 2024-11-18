# webpro_06
10/29_2024
## app5.jsについて

## 機能
機能名 | 説明
-|-
hello1 | ２言語の挨拶を表示します
hello2 | ２言語の挨拶を表示します
icon   | 大きなリンゴのアイコンを表示します
luck   | 凶から大吉まで6つの運勢から１つを表示します
janken | cpuとじゃんけんを行います
coin   | コインの裏表の予想するゲームを行います
saikoro| サイコロの出目を予想するゲームを行います



## 使用方法
1. ターミナルで app5.js のあるフォルダに移動する
1.  node app5.jsをターミナルで実行しポートに接続する
1. ブラウザで http://localhost:8080/機能名　にアクセスする
4. jankenは入力欄にグー・チョキ・パーのうち一つを,coinは裏表のどちらかを,saikoroは1~6のうちの一つを入力する.

## janken
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