// global.d.ts
declare global {
  interface Window {
    SpeechRecognition: any; // or SpeechRecognitionConstructor if you want stricter typing
    webkitSpeechRecognition: any;
    SpeechGrammarList: any;
    webkitSpeechGrammarList : any;
    SpeechRecognitionEvent : any;
    webkitSpeechRecognitionEvent : any;
    SpeechRecognitionEvent : any;
  }
}

export {};
