export function getUserAudio(){
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  // const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
  //     " | ",
  //   )};`;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  // speechRecognitionList.addFromString(grammar, 1);

  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const startRecognition =() => {
    recognition.start();

    recognition.onresult = (event : any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Recognized Speech:', transcript); // Output the recognized speech to the console

      // You can use the recognized speech here, like updating UI or triggering actions based on the words spoken
    };
  };

  return(
    <>
      <button onClick={startRecognition}>uwu</button>
    </>
  )
}


export default getUserAudio;