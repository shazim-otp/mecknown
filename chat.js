// API key is handled securely on the backend

const sendBtn =
document.getElementById("sendBtn");

const chatInput =
document.getElementById("chatInput");

const chatMessages =
document.getElementById("chatMessages");

/* SEND MESSAGE */

async function sendMessage(){

  const text = chatInput.value.trim();

  if(!text) return;

  /* USER */

  const userDiv =
  document.createElement("div");

  userDiv.className = "user-message";

  userDiv.innerText = text;

  chatMessages.appendChild(userDiv);

  chatInput.value = "";

  chatMessages.scrollTop =
  chatMessages.scrollHeight;

  /* LOADING */

  const loadingDiv =
  document.createElement("div");

  loadingDiv.className = "bot-message";

  loadingDiv.innerText = "Thinking...";

  chatMessages.appendChild(loadingDiv);

  try{
    const response = await fetch(
      "/api/chat",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message: text
        })
      }
    );

    const data = await response.json();
    loadingDiv.innerText = data.response || data.error || "Error connecting to AI.";

  }catch(err){

    loadingDiv.innerText =
    "Error connecting to AI.";

    console.error(err);

  }

  chatMessages.scrollTop =
  chatMessages.scrollHeight;

}

sendBtn.onclick = sendMessage;

chatInput.addEventListener(
"keypress",
(e)=>{
  if(e.key === "Enter"){
    sendMessage();
  }
});

/* TOGGLE */

const chatToggle =
document.getElementById("chatToggle");

const chatbotBox =
document.getElementById("chatbotBox");

chatToggle.onclick = ()=>{

  if(chatbotBox.style.display === "flex"){

    chatbotBox.style.display = "none";

  }else{

    chatbotBox.style.display = "flex";

  }

};
