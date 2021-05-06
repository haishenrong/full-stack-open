import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div>{props.value}</div>
const Heading = props => <h1>{props.value}</h1>
const Statistic = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>
const Statistics = (props) => {
  if(props.all === 0){
    return (
      <div>
        <Heading value = "statistics"/>
        <Display value = "No feedback given"/>
      </div>
    )
  }
  return(
  <div>
    <Heading value = "statistics"/>
    <table><tbody>
    <Statistic text = "good" value = {props.good} />
    <Statistic text = "neutral" value = {props.neutral} />
    <Statistic text = "bad" value = {props.bad} />
    <Statistic text = "all" value = {props.all} />
    <Statistic text = "average" value = {props.average}  />
    <Statistic text = "positive" value = {props.positive}  />
    </tbody></table>
  </div>

  )
}



const App = () => {
  // save clicks of each button to its own state
  const [all, setAll] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  var average = (good-bad)/all
  var positiveFeedback = good/all*100
  return (
    
    <div>
      <Heading value = "give feedback"/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all} average = {average} positive = {positiveFeedback+"%"} />
    </div>
  )
}

export default App