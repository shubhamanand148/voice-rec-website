const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const colors = [ "up", "down", 
                 /* … */, ];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(" | ")};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const bg = document.querySelector("html");
const hints = document.querySelector(".hints");

let colorHTML = "";
colors.forEach((color, i) => {
  console.log(color, i);
  colorHTML += `<span style="background-color:${color};"> ${color} </span>`;
});

document.body.onclick = () => {
  recognition.start();
  console.log("Ready to receive a command.");
};

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    console.log("Command Inside OnResult Function: ")
    console.log(command);

    if(command == "up" || command == "move up" || command == " scroll up" ) {
        window.scrollBy({ top: -1000, left: 0, behavior: "smooth" });
    } else if (command == "down" || command == "move down" || command == "sroll down") {
        window.scrollBy({ top: 1000, left: 0, behavior: "smooth" });
    }

    //Scroll to the top or bottom //Check this command.
    if(command == "top" || command == "top of page") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (command == "bottom" || command == "bottom of page") {
        window.scrollTo({ top: window.length(), left: 0, behavior: "smooth" });
    }
    console.log(`Confidence: ${event.results[0][0].confidence}`);
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.onnomatch = (event) => {
    diagnostic.textContent = "I didn't recognize that color.";
};

recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
};
