export async function tts(rawText: string){
    let text : SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    text.text = rawText
    text.rate = 1.4
    window.speechSynthesis.speak(text);
    console.log(text);
}