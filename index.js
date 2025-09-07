const counterDiv = document.getElementById("countdown");
const soundsFileNames = [
    "helicopter.mp3",
    "ib-ringtone.mp3",
    "jet2holiday.mp3",
    "linging.mp3",
    "no-skibidi.mp3"
];
const sounds = [];
for (const sound of soundsFileNames){
    sounds.push(new Audio(`sfx/${sound}`));
}

function startCountdown(){
    const mins = Number(document.getElementById("mins").value);
    const secs = Number(document.getElementById("secs").value);
    const endTime = Date.now() / 1000 + mins * 60 + secs;
    timer = setInterval(() => {
        const remainingTime = Math.floor(endTime - Date.now() / 1000);
        const ss = String(remainingTime % 60).padStart(2, "0");
        const mm = String(Math.floor(remainingTime / 60))
        .padStart(2, "0");
        counterDiv.textContent = `${mm}:${ss}`;
        if (remainingTime < 1){
            playRandomSound();
            clearInterval(timer);
            flashTimer(25)
        }
    }, 25);
}

function flashTimer(repeatCount, count = 0){
    setTimeout(() => {
        if (document.body.classList.contains("inverted")){
            document.body.classList.remove("inverted");
            counterDiv.classList.remove("inverted");
        } else {
            document.body.classList.add("inverted");
            counterDiv.classList.add("inverted");
        }
        if (count < repeatCount){
            flashTimer(repeatCount, count + 1);
        } else {
            document.body.classList.remove("inverted");
            counterDiv.classList.remove("inverted");
        }
    }, 10 + count * 5 + (count % 10 == 8) * 500);
}

async function playRandomSound(){
    sounds[Math.floor(Math.random() * sounds.length)].play()
}

document.getElementById("startBtn").onclick = startCountdown