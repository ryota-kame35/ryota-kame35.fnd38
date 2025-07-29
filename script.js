// ローカルストレージから記録と種目リストを取得（なければ初期値を使う）
var records = JSON.parse(localStorage.getItem('trainingRecords')) || [];
var exercises = JSON.parse(localStorage.getItem('exerciseList')) || ["ベンチプレス", "スクワット", "デッドリフト"];

// 入力フォームや表示エリアの要素を取得
var datePicker = document.getElementById("datePicker");
var exerciseSelect = document.getElementById("exerciseSelect");
var weightInput = document.getElementById("weightInput");
var repsInput = document.getElementById("repsInput");
var setsInput = document.getElementById("setsInput");
var recordSection = document.getElementById("recordSection");

// 種目リストをプルダウンに表示
function renderExerciseOptions() {
  exerciseSelect.innerHTML = ""; // 一旦クリア

  for (var i = 0; i < exercises.length; i++) {
    var option = document.createElement("option");
    option.value = exercises[i];
    option.textContent = exercises[i];
    exerciseSelect.appendChild(option);
  }
}

// 記録を保存する関数
function saveRecord() {
  var date = datePicker.value;
  var exercise = exerciseSelect.value;
  var weight = weightInput.value;
  var reps = repsInput.value;
  var sets = setsInput.value;

  // 未入力がある場合は処理をやめる
  if (!date || !exercise || !weight || !reps || !sets) return;

  // 新しい記録を追加
  records.push({
    date: date,
    exercise: exercise,
    weight: weight,
    reps: reps,
    sets: sets
  });

  // 保存する
  localStorage.setItem('trainingRecords', JSON.stringify(records));

  // 表示更新
  renderRecords();

  // 入力欄をリセット
  weightInput.value = "";
  repsInput.value = "";
  setsInput.value = "";
}

// 記録を画面に表示する（削除ボタンなし）
function renderRecords() {
  recordSection.innerHTML = ""; // 一度空にする

  if (records.length === 0) {
    recordSection.textContent = "記録がありません。";
    return;
  }

  var ul = document.createElement("ul");
  ul.className = "record-list";

  for (var i = 0; i < records.length; i++) {
    var rec = records[i];

    var li = document.createElement("li");
    li.innerHTML = 
      "<strong>" + rec.date + "</strong> / 種目: " + rec.exercise + 
      " / 重さ: " + rec.weight + "kg / 回数: " + rec.reps + 
      " / セット: " + rec.sets;

    ul.appendChild(li);
  }

  recordSection.appendChild(ul);
}

// 初期表示処理
renderExerciseOptions();
renderRecords();
