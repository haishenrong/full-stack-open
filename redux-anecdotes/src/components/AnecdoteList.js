import { useSelector, useDispatch } from 'react-redux'
import { voteInFavor } from '../reducers/anecdoteReducer'
import { votedFor, clear } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()


  const vote = (id) => {
      dispatch(voteInFavor(id))
  }

  return(
    <div>
      {
      anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .sort((a,b) => b.votes-a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              vote(anecdote.id)

              dispatch(votedFor(anecdote.content))
              setTimeout(() => {
                dispatch(clear())
              }, 5000)
            }}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

export default AnecdoteList