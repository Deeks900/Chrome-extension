let pgBody = document.querySelector("body");
let image = document.createElement('img');
image.src = chrome.runtime.getURL("../images/icon-16.png");
image.setAttribute("id", "btn-curious")
image.addEventListener("click", doListen)
pgBody.appendChild(image)

// we create the webkitSpeechRecognition object which provides the speech interface, and set some of its attributes and event handlers.
var recognition = new webkitSpeechRecognition();
//recognition will continue even if the user pauses while speaking.
recognition.continuous = true;
//interim results may change
recognition.interimResults = true;
console.log("I am called!")
var final_transcript=""

//When it starts listening
recognition.onstart = ()=>{
    console.log("START speaking!")
    recognition.lang = "en-IN"
}

recognition.onend = function(){
    console.log("I am at the end.")
    Popup()
}

//This will run whenever it will be recognizing even a single word
recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }
    console.log(`t is ${final_transcript}`)
};

function Popup() {
    var myDialog = document.createElement("dialog");
    myDialog.setAttribute("id", "modal")
    document.body.appendChild(myDialog)
    var text1 = document.createElement("div")
    text1.setAttribute("id", "modal-heading")
    text1.innerHTML="This is what you said:-"
    var text2 = document.createElement("p")
    text2.setAttribute("id", "modal-text")
    text2.innerText=final_transcript
    var button = document.createElement("BUTTON");
    var buttonText = document.createTextNode("Okay")
    button.addEventListener("click", ()=>{myDialog.close()})
    button.appendChild(buttonText)
    button.setAttribute("id", "modal-button")
    var docFrag = document.createDocumentFragment()
    docFrag.appendChild(text1)
    docFrag.appendChild(text2)
    docFrag.appendChild(button)
    myDialog.appendChild(docFrag) 
    myDialog.showModal();
  }
  

function doListen(){
    if(image.hasAttribute("listening") == false){
        image.setAttribute("listening", true)
        final_transcript = "";
        recognition.start()
    }
    else{
        image.removeAttribute("listening")
        recognition.stop()
    }
}
