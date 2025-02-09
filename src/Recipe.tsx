import { createSignal } from 'solid-js';
import './App.css';
import {tts} from './tts.ts';
import { getUserAudio } from './getUserAudio.ts';
import { GPTQuestion } from './GPTQuestion.ts';

function readStep(index : number, steps : string[]){
    tts("Step" + (index + 1));
    tts(steps[index]);
}

async function getGPTResponse(){
    let question: string = await getUserAudio();
    console.log(question);
    let gptResponse = await GPTQuestion(question)
    console.log(gptResponse);
}

function showRecipe(json: string) {
    let text: string = JSON.parse(json).preparationMethod;

    let steps: string[] = text.split(/\d+\.\s+/).filter(step => step.trim() !== '');

    const [currentStep, setCurrentStep] = createSignal(0); 

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

    return (
        <>
            <div class="steps">
                {steps.map((step, index) => (
                    <div
                        class={`step ${index === currentStep() ? 'highlight' : ''}`}
                    >
                        <p>Step {index + 1}</p>
                        <p>{step}</p>
                    </div>
                ))}
            </div>
            <div class="buttons">
                <button onClick={lastStep} disabled={currentStep() === 0}>Last Step</button>
                <button onClick={repeat}>Repeat</button>
                <button onClick={nextStep} disabled={currentStep() === steps.length - 1}>Next Step</button>
            </div>
            <div class="questions">
                <button onClick={getGPTResponse}>Ask a question</button>
            </div>
        </>
    );
}

export default showRecipe;
