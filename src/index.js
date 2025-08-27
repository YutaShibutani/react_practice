const addText = document.getElementById("add-text");

const onClickAdd = () => {
  // addText が存在すれば値を取り、なければ空文字にする
  const inputText = (addText?.value ?? "").trim();

  // 入力が空ならアラートを出して処理を中断
  if (inputText === "") {
    alert("todoを入力してください");
    return;
  }

  if(addText){
    addText.value = "";
  } //テキストボックスの初期化

  createIncompleteTodo(inputText);
}

const createIncompleteTodo = (todo) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todo;

  const upButton = document.createElement("button");
  upButton.className = "arrow-item";
  upButton.innerText = "⇧";
  upButton.addEventListener("click", () => {
    const target = upButton.closest("li");
    const parent = document.getElementById("incomplete-list");
    const prev = target.previousElementSibling;
    if (prev) parent.insertBefore(target, prev); // 一つ上に移動（swap 相当）
  }) 

  const downButton = document.createElement("button");
  downButton.className = "arrow-item";
  downButton.innerText = "⇩";
  downButton.addEventListener("click", () => {
    const target = downButton.closest("li");
    const parent = document.getElementById("incomplete-list");
    const next = target.nextElementSibling;
    if (next) parent.insertBefore(next, target); // 一つ下に移動（swap 相当）
  });


  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    const completeTarget = completeButton.closest("li");
    completeButton.nextElementSibling.nextElementSibling.nextElementSibling.remove();
    completeButton.nextElementSibling.nextElementSibling.remove();
    completeButton.nextElementSibling.remove();
    completeButton.remove();
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      backButton.closest("li").remove();
    });

    completeTarget.firstElementChild.appendChild(backButton);
    document.getElementById("complete-list").appendChild(completeTarget);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    const deleteTarget = deleteButton.closest("li");
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
　div.appendChild(upButton);
  div.appendChild(downButton);
  li.appendChild(div);
 
  document.getElementById("incomplete-list").appendChild(li);
}

const addButton = document.getElementById("add-button");
addButton?.addEventListener("click", onClickAdd); // 存在する時だけ登録