// メッセージ表示領域(div)のID
const messageAreaId = "msg-area";
// メッセージ表示List(ul)のID
const messageListId = "msg-list";

// 画面ロード時にEventListenerを定義
window.addEventListener("load", function(){
  //　id=subbmit ボタン押下時に、createIssue()が呼ばれるように設定
  submit=document.getElementById("submit");
  submit.addEventListener("click",createIssue,false);
},false)

// ISSUE登録関数
const createIssue = () => {
  // 初期化処理
  // すでに表示されているメッセージをクリア
  clearMassage();
  // 各種変数定義
  // ISSUE作成APIのURI
  const uri = "https://api.github.com/repos/kazuo278/hugo-sample/issues";
  // inputからPATを取得
  let pat = document.getElementById("pat");
  // inputからタイトルを取得
  let title = document.getElementById("title");
  // inputから内容を取得
  let body = document.getElementById("body");

  // バリデーションチェック
  // エラーメッセージを格納する配列
  let msgList = [];
  // タイトルが入力されているか確認
  if(!title.value) {
    msgList.push("タイトルが未入力です");
  }
  // PATが入力されているか確認
  if(!pat.value) {
    msgList.push("PATが未入力です");
  }
  // 内容が入力されているか確認
  if(!body.value) {
    msgList.push("本文が未入力です");
  }
  // 一つでも未入力項目がある場合
  if(msgList.length !== 0) {
    // エラーメッセージを表示
    displayMassage(msgList, "alert alert-danger");
    // コンソールにも表示
    throw new Error(msgList);
  }

  // API呼び出し
  fetch(uri, {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "token " +  pat.value
    },
    body: createIssueJson(title.value, body.value)
  }).then(response => {
    // 成功した場合
    if(response.ok){
      // 入力欄の初期化
      pat.value = "";
      title.value = "";
      body.value = "";
      // 登録完了メッセージの表示
      msgList.push("ISSUE登録が完了しました")
      displayMassage(msgList, "alert alert-success");
      return response.json().then(resJson => {
        console.log(JSON.stringify(resJson));
      });
    }
    // 失敗した場合
    // エラーメッセージを表示
    msgList.push("ISSUE登録に失敗しました");
    // エラーを発生させ、catch処理に進む
    throw new Error(msgList);
  }).catch(error => {
    // 失敗した場合
    // エラーメッセージを表示
    displayMassage(msgList, "alert alert-danger");
    console.error(error);
  })
}

// タイトルと文字列をJSON形式に変換する関数
const createIssueJson = (title, body) => {
  let data = {
    "title": title,
    "body": body
  }
  return JSON.stringify(data);
}

// メッセージを表示する関数
const displayMassage = (errorMassageList, className) => {
  // メッセージ表示領域を取得
  let target = document.getElementById(messageAreaId);
  // メッセージ表示領域にCSSクラスを適用
  target.className = className;
  // メッセージ表示用List(ul)を作成
  let ul = document.createElement("ul");
  // ulを特定できるようにidをセット
  ul.setAttribute("id", messageListId);
  // メッセージ表示領域にメッセージ表示用リストを追加
  target.appendChild(ul);
  // メッセージ表示用リストにメッセージを追加
  for(const msg of errorMassageList){
    // リスト要素(li)を作成
    let item = document.createElement("li");
    // liに表示メッセージを設定
    item.textContent = msg;
    // ulにliをセット
    ul.appendChild(item);
  }
}

//　メッセージをクリアする関数
const clearMassage  = () => {
  let target = document.getElementById(messageAreaId);
  let ul = document.getElementById(messageListId);
  // メッセージ表示用リストが存在する場合
  if(ul !== null){
    // メッセージ表示用リストを削除
    ul.remove();
  }
  // メッセージ表示領域のCSSクラスを削除
  target.className = "";
}