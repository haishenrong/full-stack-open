import { connect } from 'react-redux'
import { voteInFavor } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = async (id, content) => {
    props.voteInFavor(id)
    props.setNotification(`you voted ${content}`,5)
  }

  return(
    <div>
      {
      props.anecdotes
        .filter(anecdote => anecdote.content.includes(props.filter))
        .sort((a,b) => b.votes-a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              vote(anecdote.id, anecdote.content)
              
            }}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteInFavor,
  setNotification
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList