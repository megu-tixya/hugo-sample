
window.addEventListener("load", function(){
  submit=document.getElementById("submit");
  submit.addEventListener("click",createIssue,false);
},false)

const createIssue = () => {
  const uri = "https://api.github.com/repos/kazuo278/hugo-sample/issues";
  let pat = document.getElementById("pat");
  let title = document.getElementById("title");
  let body = document.getElementById("body");

  if(!pat) {
    throw new Error("PATが未入力です");
  }
  if(!title) {
    throw new Error("タイトルが未入力です");
  }
  if(!body) {
    throw new Error("本文が未入力です");
  }

  fetch(uri, {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "token " +  pat.value
    },
    body: createIssueJson(title.value, body.value)

  }).then(response => {
    console.log(response);
    if(response.ok){
      pat.value = "";
      title.value = "";
      body.value = "";
      return response.json().then(resJson => {
        console.log(JSON.stringify(resJson));
      });
    }
    throw new Error("ISSUE登録に失敗しました");
  }).catch(error => {
    console.error(error);
  })
}

const createIssueJson = (title, body) => {
  let data = {
    "title": title,
    "body": body
  }
  return JSON.stringify(data);
}
