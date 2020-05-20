const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition) {
    console.log("your browser supports speech recognition");

    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fa fa-microphone"></i></button>');
    const micBtn = searchForm.querySelector("button");
    const micIcon = micBtn.querySelector("i");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    // recognition.lang = "hi-IN";

    micBtn.addEventListener("click", micBtnClick);
    function micBtnClick() {
        if(micIcon.classList.contains("fa-microphone")) { //start speech recognition
            recognition.start();
        } else {
            recognition.stop();
        }
    }

    recognition.addEventListener("start", startSpeechRecognition);
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        searchFormInput.focus();
        console.log("Speech Recognition Active");
    }
    recognition.addEventListener("end", endSpeechRecognition);
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
        searchFormInput.focus();
        console.log("Speech Recognition Disconnected");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition);
    function resultOfSpeechRecognition(event) {
        const currentResultIndex = event.resultIndex;
        const transcript = event.results[currentResultIndex][0].transcript;
       

        if(transcript.toLowerCase().trim()==="stop recording"){
            recognition.stop();
        }
        else if(!searchFormInput.value){
            searchFormInput.value = transcript;
        }
        else {
            if(transcript.toLowerCase().trim()==="open"){
                searchForm.submit();
            }
            else if(transcript.toLowerCase().trim()==="reset everything") {
                searchFormInput.value = "";
            }
            else {
                searchFormInput.value = transcript;
            }
        }

        // setTimeout(() => {
        //     searchForm.submit();
        // }, 750);
    }

} else {
    console.log("your browser does not support speech recognition");
}














// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}

