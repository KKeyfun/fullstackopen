import { useState } from 'react'

const Display = ({text,value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button 
      onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAllReviews] = useState(0);
  const [average, setAverage] = useState();
  const [positive, setPositive] = useState(100);

  const increaseGoodByOne = () => {
    let updatedGood = good+1;
    let updatedAllReviews = allReviews+1;

    setGood(updatedGood);
    setAllReviews(updatedAllReviews);

    updateAverage(updatedGood,bad,updatedAllReviews);
    updatePercentage(updatedGood,updatedAllReviews);
  }

  const increaseNeutralByOne = () => {
    let updatedNeutral = neutral+1;
    let updatedAllReviews = allReviews+1;

    setNeutral(updatedNeutral);
    setAllReviews(updatedAllReviews);

    updateAverage(good,bad,updatedAllReviews);
    updatePercentage(good,updatedAllReviews);
  }

  const increaseBadByOne = () => {
    let updatedBad = bad+1;
    let updatedAllReviews = allReviews+1;

    setBad(updatedBad);
    setAllReviews(updatedAllReviews);

    updateAverage(good,updatedBad,updatedAllReviews);
    updatePercentage(good,updatedAllReviews);
  }

  const calculateScore = (good, bad) => {
    return (good * 1) + (bad * -1);
  }

  const updateAverage = (good,bad,allReviews) => {
    console.log('good',good)
    console.log('neutral',neutral)
    console.log('bad',bad)
    console.log('allReviews',allReviews)
    if(allReviews > 0){
      let average = calculateScore(good,bad)/allReviews;
      setAverage(average);
    }
  }

  const updatePercentage = (goodReviews,allReviews) => {
    if(allReviews!==0){
      setPositive((goodReviews/(allReviews))*100);
    }
  }

  return (
    <div>
      <Header text='Give Feedback' />
      <Button handleClick={increaseGoodByOne} text='Good'/>
      <Button handleClick={increaseNeutralByOne} text='Neutral'/>
      <Button handleClick={increaseBadByOne} text='Bad'/>

      <Header text='Statistics' />
      <Display text='Good' value={good}/>
      <Display text='Neutral' value={neutral}/>
      <Display text='Bad' value={bad}/>
      <Display text='All' value={allReviews}/>
      <Display text='Average' value={average}/>
      <Display text='Positive' value={positive + '%'}/>
    </div>
  )
}

export default App