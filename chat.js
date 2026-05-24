const API_KEY = "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";

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
      "https://api.groq.com/openai/v1/chat/completions",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${API_KEY}`
        },

        body:JSON.stringify({

          model:"llama-3.3-70b-versatile",

          messages:[

            {
              role:"system",
              content:
              "You are Meck AI, a robotics and AI workshop assistant."
            },

            {
              role:"user",
              content:text
            }

          ]

        })

      }
    );

    const data = await response.json();

    loadingDiv.innerText =
    data.choices[0].message.content;

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
