import React, { useState } from 'react'

const DisplayMax = (props) =>
{
  if(props.val === 0)
  {
    return(
      <div>
      <h1>No votes yet</h1>
      </div>
    )
  }
  return(
    <div>
    <h1>Anecdote with most votes</h1>
    <div>{props.max}</div>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const [max, setMax] = useState(0)

  const [maxVal, setMaxVal] = useState(0)

  const randomAnecdote = () => {
    let rand = Math.floor(Math.random()*6)
    setSelected(rand)
  }

  const vote = () =>
  {
    const copy = [...points];
    copy[selected]+=1;
    setPoints(copy);
    if(copy[selected]+1>maxVal)
    {
      setMax(selected)
      setMaxVal(copy[selected]+1)
    }
    //points[selected] = copy[selected];
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <div>{"has "+points[selected]+" votes"}</div>
      <button onClick = {vote}> vote</button>
      <button onClick = {randomAnecdote}>next anecdote</button>
      <DisplayMax max = {anecdotes[max]} val = {maxVal}></DisplayMax>
    </div>
  )
}

export default App