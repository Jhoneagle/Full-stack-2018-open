import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }
  
  newValue = () => {
    return () => {
      this.setState({ 
        selected: Math.round(Math.random() * 5)
      })
    }
  }
  
  voteFor = () => {
    const copy = this.state.votes.slice()
    copy[this.state.selected] += 1
    
    return () => {
      this.setState({ 
        votes: copy
      })
    }
  }
  
  render() {
    return (
      <div>
        <p>
	  {this.props.anecdotes[this.state.selected]}
	</p>
	
	<p>
	  {this.state.votes[this.state.selected]}
	</p>
	
	<Button
          handleClick={this.voteFor()}
          text="vote"
	/>
	
	<Button
          handleClick={this.newValue()}
          text="next anecdote"
	/>
	
	<Highest
	  votes={this.state.votes}
	  anecdotes={this.props.anecdotes}
	/>
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Highest = ({ votes, anecdotes }) => {
  let biggest = votes[0]
  let which = 0
  
  if (biggest < votes[1]) {
    biggest = votes[1]
    which = 1
  }
  if (biggest < votes[2]) {
    biggest = votes[2]
    which = 2
  }
  if (biggest < votes[3]) {
    biggest = votes[3]
    which = 3
  }
  if (biggest < votes[4]) {
    biggest = votes[4]
    which = 4
  }
  if (biggest < votes[5]) {
    biggest = votes[5]
    which = 5
  }
  
  return (
    <div>
      {biggest} votes to {anecdotes[which]}
    </div>
  )
  
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
