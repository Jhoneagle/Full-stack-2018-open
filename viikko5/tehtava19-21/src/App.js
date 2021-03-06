import React from 'react'

class App extends React.Component {
  vote(anecdote) {
    return () => {
      this.props.store.dispatch({
        type: 'VOTE',
        data: {anecdote}
      })
    }
  }

  create = (event) =>{
    event.preventDefault()
    
    this.props.store.dispatch({
      type: 'CREATE',
      data: {content: event.target.content.value}
    })
    
    event.target.content.value = ''
  }
  
  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort((one, two) => two.votes - one.votes)
    
    return (
      <div>
        <h2>Anecdotes</h2>
	
	{anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
	
        <h2>create new anecdote</h2>
	
        <form onSubmit={this.create}>
          <div>
	    <input name="content"/>
	  </div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App