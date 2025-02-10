import { createSignal } from 'solid-js';
import './App.css';
import {tts} from './tts.ts';
import { getUserAudio } from './getUserAudio.ts';
import { GPTQuestion } from './GPTQuestion.ts';

function readStep(index : number, steps : string[]){
    tts("Step" + (index + 1));
    tts(steps[index]);
}

function Recipe(props: {json: string}) {
    let text: string = JSON.parse(props.json).preparationMethod;

    let steps: string[] = text.split(/\d+\.\s+/).filter(step => step.trim() !== '');

    const [currentStep, setCurrentStep] = createSignal(0); 
    const [GPTResponse, setGPTResponse] = createSignal<string | null>(null);

    readStep(currentStep(), steps);

    const nextStep = () => {
        if (currentStep() < steps.length - 1) {
            setCurrentStep(currentStep() + 1);
        }
        readStep((currentStep()), steps);
    };

    const lastStep = () => {
        if (currentStep() > 0) {
            setCurrentStep(currentStep() - 1);
        }
        readStep((currentStep()), steps);
    };

    const repeat = () => {
        readStep((currentStep()), steps);
    }

    const getGPTResponse = async () => {
        let question: string = await getUserAudio();
        let gptResponse = await GPTQuestion(question)
        setGPTResponse(gptResponse.answer);
    }

    return (
        <>
            <div class="steps">
                {steps.map((step, index) => (
                    <div class={`step ${index === currentStep() ? 'highlight' : 'gray-text'}`}>
                        <p>Step {index + 1}</p>
                        <p>{step}</p>
                    </div>
                ))}
            </div>

            <div class="bottomBar"> 
                <div class="buttons">
                    <button class="btn" onClick={lastStep} disabled={currentStep() === 0}>Last Step</button>
                    <button class="btn" onClick={repeat}>Repeat</button>
                    <button class="btn" onClick={nextStep} disabled={currentStep() === steps.length - 1}>Next Step</button>
                </div>
                <div class="questions">
                    <button class="btn" onClick={getGPTResponse}>Ask a question</button>
                    {GPTResponse() && (
                        <div class="gpt-response">
                            <p><strong>GPT Response:</strong> {GPTResponse()}</p>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

export default Recipe;
