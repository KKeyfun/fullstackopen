import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const Header = (props) => {
  return (
    <h2>
      {props.text}
    </h2>
  )
}

const Text = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Generate number from 0-7
  const generateRandom = (num) => {
    for(let i=0;i<num;i++){

    }
    return Math.floor(Math.random() * (num + 1));
  }

  // Generate Vote Object
  const generateVoteObject = () => {
    const voteObject = {};
    for(let i=0;i<anecdotes.length;i++){
      voteObject[i] = 0;
    }
    return voteObject;
  }

  // Set new random Anecdote
  const randomAnecdote = () => {
    let randNum = generateRandom(7);
    setSelected(randNum);
  }

  const vote = () => {
    const copy = {...votes};
    copy[selected] += 1;
    if(copy[selected]>copy[mostVotes]){
      setMostVotes(selected);
    }
    setVotes(copy);
  }
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(generateVoteObject());
  const [mostVotes, setMostVotes] = useState(0);

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <br/>
      <Text text={'Has ' + votes[selected] + ' Votes'} />
      <br/>
      <Button text='Vote' clickHandler={vote} />
      <Button text='Next Anecdote' clickHandler={randomAnecdote} />
      <br/>
      <Header text='Anecdote with the most votes' />
      {anecdotes[mostVotes]}
      <Text text={'Has ' + votes[mostVotes] + ' Votes'} />
    </div>
  )
}

export default App