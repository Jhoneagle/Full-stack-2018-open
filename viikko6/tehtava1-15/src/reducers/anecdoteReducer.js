import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)

      return [...old, {...voted, votes: voted.votes + 1}]
    case 'CREATE':
      return [...store, action.anecdote]
    case 'INIT_ANECDOTES':
      return action.anecdotes
    default:
      return store
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    anecdote = await anecdoteService.createNew(anecdote)
	
    dispatch({
      type: 'CREATE',
      anecdote
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote(anecdote)
	
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
	
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  } 
}

export default anecdoteReducer