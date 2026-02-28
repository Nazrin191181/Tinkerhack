// Cleaned script: tasks, quotes, plans, AI proxy usage, timer

// Task handling
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return; // don't add empty tasks

  const li = document.createElement("li");
  li.textContent = text;

  const span = document.createElement("span");
  span.textContent = "\u00D7";
  li.appendChild(span);

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

document.getElementById("taskList").addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
});

// Quotes
const quotes = [
  "Keep going.",
  "Small progress is still progress.",
  "Future you is watching.",
  "Focus now, flex later."
];

function newQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[random];
}

// Background
function changeBackground(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Offline plan
function generatePlan() {
  const days = Number(document.getElementById("days").value);
  const chapters = Number(document.getElementById("chapters").value);
  if (!days || days <= 0 || !chapters || chapters <= 0) {
    document.getElementById("plan").innerText = "Please enter valid positive numbers.";
    return;
  }
  const perDay = Math.ceil(chapters / days);
  document.getElementById("plan").innerText =
    `Study ${perDay} chapters daily.\nFocus on important topics first.\nRevise final day.`;
}

async function askAI(){

let days=document.getElementById("days").value;
let chapters=document.getElementById("chapters").value;
let hours=document.getElementById("hours").value;

let prompt=`Create a realistic last-minute study survival plan.
Exam in ${days} days.
Total chapters ${chapters}.
Available study hours ${hours}.
Give short actionable steps.`;

const response=await fetch(
"https://openrouter.ai/api/v1/chat/completions",
{
method:"POST",
headers:{
"Authorization":"Bearer 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",
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"openrouter/free",
messages:[
{role:"user",content:prompt}
]
})
});

const data=await response.json();

document.getElementById("plan").innerText=
data.choices[0].message.content;
}

// Simple timer (Focus session)
function startTimer() {
  let time = 25 * 60; // 25 minutes
  const timerEl = document.getElementById("timer");
  timerEl.innerText = "Focus: 25:00";

  const interval = setInterval(() => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    timerEl.innerText = `Focus: ${min}:${sec.toString().padStart(2, "0")}`;
    time--;
    if (time < 0) {
      clearInterval(interval);
      alert("Break Time!");
    }
  }, 1000);
}