const flagImg = document.getElementById("flag");
const guessInput = document.getElementById("guess");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const msg = document.getElementById("message");
const progress = document.getElementById("progress");
const resetText = document.getElementById("reset");

const todayKey = new Date().toDateString();
let state = JSON.parse(localStorage.getItem("flagle"));

if(!state || state.date !== todayKey){
  const shuffled=[...FLAGS].sort(()=>0.5-Math.random()).slice(0,5);
  state={date:todayKey,flags:shuffled,index:0,score:0,finished:false};
  localStorage.setItem("flagle",JSON.stringify(state));
}

function loadFlag(){
  if(state.index>=state.flags.length){
    finish();
    return;
  }
  const f=state.flags[state.index];
  flagImg.src=f.img;
  msg.textContent="";
  guessInput.value="";
  progress.textContent=`Flag ${state.index+1} of 5`;
}

function finish(){
  msg.textContent=`🎉 Finished! Score: ${state.score}/5`;
  progress.textContent="Come back tomorrow for new flags!";
  nextBtn.classList.add("hidden");
  state.finished=true;
  localStorage.setItem("flagle",JSON.stringify(state));
}

submitBtn.onclick=()=>{
  if(state.finished) return;

  const guess=guessInput.value.trim().toLowerCase();
  const answer=state.flags[state.index].country.toLowerCase();

  if(!guess) return;

  if(guess===answer){
    msg.textContent="✅ Correct!";
    state.score++;
    nextBtn.classList.remove("hidden");
  }else{
    msg.textContent="❌ Try again";
  }
  localStorage.setItem("flagle",JSON.stringify(state));
};

nextBtn.onclick=()=>{
  state.index++;
  nextBtn.classList.add("hidden");
  localStorage.setItem("flagle",JSON.stringify(state));
  loadFlag();
};

function countdown(){
  const now=new Date();
  const tomorrow=new Date(now);
  tomorrow.setHours(24,0,0,0);
  const diff=tomorrow-now;
  const h=Math.floor(diff/1000/60/60);
  const m=Math.floor(diff/1000/60)%60;
  resetText.textContent=`New flags in ${h}h ${m}m`;
}

setInterval(countdown,60000);
countdown();
loadFlag();
