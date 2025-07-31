// 「追加」ボタンがクリックされたときの処理
document.getElementById("addBtn").addEventListener("click", addTask);

// ページ読み込み時にローカルストレージからタスクを読み込む
window.addEventListener("DOMContentLoaded", loadTasks);

// タスクを追加する関数
function addTask() {
  const dateInput = document.getElementById("dateInput"); // <input>要素 日付入力欄
  const taskInput = document.getElementById("taskInput"); // <input>要素 タスク入力欄

  const date = dateInput.value; // .value：<input>要素の入力値（文字列）を取り出す
  const task = taskInput.value.trim(); // .trim：文字列前後の空白を削除

  if (date === "" || task === "") return; // 未入力の場合は無視

  const taskObj = { date, task }; // オブジェクトにまとめる
  saveTask(taskObj);              // ローカルストレージに保存
  renderTask(taskObj);           // 画面に表示

  // 入力欄を空に
  dateInput.value = "";
  taskInput.value = "";
}

// タスクを画面に表示する関数
function renderTask(taskObj) {
  const li = document.createElement("li"); // 

  // 削除ボタン
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    li.remove();               // 画面から削除
    deleteTask(taskObj);       // ローカルストレージからも削除
  });

  // タスクのテキスト表示
  const span = document.createElement("span");
  span.textContent = `【${taskObj.date}】 ${taskObj.task}`;
  span.addEventListener("click", function () { // .addEventListener：指定イベント発生時に関数実行
    this.style.textDecoration = // this：クリックされたspan要素自身。.style.textDecoration：文字の装飾設定用のスタイルプロパティ
      this.style.textDecoration === "line-through" ? "none" : "line-through";
  });

  li.appendChild(deleteBtn);
  li.appendChild(span);
  document.getElementById("taskList").appendChild(li);
}

// ローカルストレージにタスクを保存
function saveTask(taskObj) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // JSON.parse()：文字列→オブジェクト型に変換
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks)); // tasksを文字列に変換、tasksという名前でローカルストレージに保存
}

// ページ読み込み時にタスクを復元
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); 
  tasks.forEach(renderTask); // tasks配列の各要素（オブジェクト）に対し、renderTask関数を1つずつ実行
}

// ローカルストレージからタスクを削除
function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// 指定タスクと一致のものを除いた新配列を作成
  tasks = tasks.filter(task =>
    !(task.date === taskToDelete.date && task.task === taskToDelete.task)
  );
// 新配列を文字列に変換しローカルストレージに再保存
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
