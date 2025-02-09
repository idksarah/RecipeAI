interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

export async function getUserAudio(): Promise<string>{
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return new Promise<string>((resolve, reject) => {
    recognition.start();

    recognition.onresult = (event : SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript)
    };
  })
}