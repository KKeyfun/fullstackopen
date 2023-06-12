import './exerciseCalculator.css'

export default function ExerciseCalculator(){
    const {targetHours, days, trainingDays, average} = generateData();
    const result:Result = {
        periodLength: days,
        trainingDays: trainingDays,
        success: (days === trainingDays && average === targetHours),
        rating: ((targetHours/average)>1.2) ? 1 : 2,
        ratingDescription: ((targetHours/average)>1.2) ? 'You fell short' : 'You did good out there',
        target:targetHours,
        average: average
    }
    console.log(JSON.stringify(result));
    return (
        <div className="results">
            <h2>Exercise 9.2: Exercise Calculator</h2>
            <h3>Results:</h3>
            <div>{`Days of training (goal): ${result.periodLength}`}</div>
            <div>{`Days Trained: ${result.trainingDays}`}</div>
            <div>{`Goal Was Achieved:  ${result.success}`}</div>
            <div>{`Rating: ${result.rating}/3 - ${result.ratingDescription}`}</div>
            <div>{`Target Daily Exercise (hours): ${result.target}`}</div>
            <div>{`Average Daily Hours Exercised: ${result.average}`}</div>
        </div>
    )
}

function randNum(max:number):number {
    return Math.floor(Math.random() * max);
}

function generateData(){
    const targetHours = 6;
    const days = randNum(31);
    const trainingDays:number = days - randNum(5);
    const trainingHours: number[] = [];
    let sum = 0;
    for(let i=0;i<=trainingDays;i++){
        const hours = randNum(targetHours);
        trainingHours.push(hours);
        sum += hours;
    }
    const average = sum/trainingDays;
    return {
        targetHours,days,trainingDays,average
    }
}

interface Result {
    periodLength:number;
    trainingDays:number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}