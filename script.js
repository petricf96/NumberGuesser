const msgEl = document.getElementById("msg");

const randomNum = Math.floor(Math.random() * 100) + 1;
console.log(randomNum);
const writeMessage = (msg) => {
  msgEl.innerHTML = `<div id="msg" class="msg"> You said: 
	<span class="box"> ${msg} </span></div>`;
};

const checkNumber = (msg) => {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML = "<div> That is not a valid number </div>";
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div> Number must be between 1 and 100 </div>";
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML += `<h2> Congrats you guessed the number! <br> <br> It Was ${randomNum} </h2>
		<button class="play-btn" id="play-btn" > Play again </button>`;
  }

  if (num > randomNum) {
    msgEl.innerHTML += "<div> GO LOWER! </div>";
  }

  if (num < randomNum) {
    msgEl.innerHTML += "<div> GO HIGHER! </div>";
  }
};

const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
};

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => {
  recognition.start();
});

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-btn") {
    window.location.reload();
  }
});
