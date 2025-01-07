"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    // 削除ボタンを追加
                    let delete_button = document.createElement('button');
                    delete_button.className = 'delete';
                    delete_button.innerText = '削除';
                    delete_button.addEventListener('click', () => {
                      const params = {
                        method: "POST",
                        body: 'id=' + mes.id, // サーバーから受け取った投稿のIDを送信
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                        },
                      };
                      fetch('/delete', params)
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error('Error');
                          }
                          return response.json();
                        })
                        .then((result) => {
                          if (result.success) {
                            mes_area.innerText = "この投稿は削除されました"; // メッセージ内容を変更
                          } else {
                            console.error(result.error);
                          }
                        });
                    });

                    // 編集ボタン
                    let edit_button = document.createElement('button');
                    edit_button.className = 'edit';
                    edit_button.innerText = '編集';
                    edit_button.addEventListener('click', () => {
                      const new_message = prompt("新しいメッセージを入力してください:", mes.message);
                      if (new_message) {
                        const params = {
                          method: "POST",
                          body: 'id=' + mes.id + '&message=' + encodeURIComponent(new_message),
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                          },
                        };
                    
                        fetch('/edit', params)
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error('Error');
                            }
                            return response.json();
                          })
                          .then((result) => {
                            if (result.success) {
                              mes_area.innerText = new_message; // UIを更新
                            } else {
                              console.error(result.error);
                            }
                          });
                      }
                    });
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    cover.appendChild(edit_button);
                    cover.appendChild(delete_button);
                    bbs.appendChild( cover );
                }
            })
        }
    });
});

document.querySelector('#search').addEventListener('click', () => {
  const keyword = document.querySelector('#search_keyword').value.trim();
  if (!keyword) {
      alert("キーワードを入力してください。");
      return;
  }

  const params = {
      method: "POST",
      body: 'keyword=' + encodeURIComponent(keyword),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  };

  fetch('/search', params)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Error');
          }
          return response.json();
      })
      .then((result) => {
          if (result.success) {
              bbs.innerHTML = ''; // 結果表示用にクリア
              for (let mes of result.messages) {
                  let cover = document.createElement('div');
                  cover.className = 'cover';

                  let name_area = document.createElement('span');
                  name_area.className = 'name';
                  name_area.innerText = mes.name;

                  let mes_area = document.createElement('span');
                  mes_area.className = 'mes';
                  mes_area.innerText = mes.message;

                  cover.appendChild(name_area);
                  cover.appendChild(mes_area);
                  bbs.appendChild(cover);
              }
          } else {
              alert("検索結果が見つかりません。");
          }
      })
      .catch((error) => {
          console.error(error);
          alert("エラーが発生しました。");
      });
});