import {useState} from 'react';
import './BMICalculator.css'

export default function BMICalculator(){
    const [weight,setWeight] = useState(-1);
    const [height,setHeight] = useState(-1);

    return(
    <>
    <h2>Exercise 9.1: BMI Calculator</h2>
        <form className='BMICalculator'>
            <div className="item">
                <label htmlFor="height">Height in meters: </label>
                <input type="text" name="height" id="height" onChange={():void => setHeight(+(event?.target.value))}/>
            </div>
            <div className="item">
                <label htmlFor="weight">Weight in kilograms: </label>
                <input type="text" name="weight" id="weight" onChange={():void => setWeight(+(event?.target.value))}/>
            </div>
            <button onClick={() => {console.log(`You are: ${calculateBMI(height,weight)}`)}}>Calculate</button>
        </form>
    </>
        
    )
}

function calculateBMI(height:number, weight:number){
    event?.preventDefault();
    console.log(typeof(height),height);
    
    if(weight < 0 || height < 0 || typeof(weight) !== 'number' || typeof(height) !== 'number'){
        throw new Error('Enter a valid height/weight');
    }
    const bmi:number = (weight)/(height/100);
    if(bmi <= 18.4){
        return 'Underweight';
    } else if(bmi <= 24.9){
        return 'Normal Weight'
    } else if(bmi <= 39.9){
        return 'Overweight'
    } else if(bmi >= 40){
        return 'Obese';
    } else {
        throw new Error('Something went wrong during bmi calculation');
    }
}