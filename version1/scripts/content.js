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
var final_transcript=''

//When it starts listening
recognition.onstart = ()=>{
    console.log("START speaking!")
    final_transcript=''
    recognition.lang = "en-IN"
}

showPopup = ()=>{
    Popup = new Popup({
        id:"curious-popup",
        title:"This is what you said-",
        content:final_transcript,
        sideMargin: "1.5em",
        fontSizeMultiplier: "1.2",
        backgroundColor: "#FFFEE3",
    })
    Popup.show()
    hideCallback: () => {
        console.log("Popup closed!");
    }
}

//When it ends listening
recognition.onend = ()=>{
    showPopup()
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
};


function doListen(){
    if(image.hasAttribute("listening") == false){
        image.setAttribute("listening", true)
        recognition.start()
    }
    else{
        image.removeAttribute("listening")
        recognition.stop()
    }
}
