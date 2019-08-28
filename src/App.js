import React from 'react';
import logo from './logo.svg';
import './App.css';
import NewNote from './NewNote'
import Note from './Note'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { noteText: '' }
  }

  componentDidMount = () => {
    this.getNotes()
  }

  getNotes = () => {
    fetch('http://localhost:7777/notes')
      .then(data => data.json())
      .then(cardsNotes => this.setState(prevState => ({ ...prevState, cardsNotes }), () => console.log(this.state)))
  }

  onTextChange = (event) => {
    const { value } = event.target
    this.setState(prevState => ({ ...prevState, noteText: value }), () => console.log(this.state))
  }

  onPostClick = () => {
    fetch('http://localhost:7777/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.state.noteText })
    }).then(this.getNotes());
  }

  onDeleteClick = (id) => {
    fetch(`http://localhost:7777/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(setTimeout(() => this.getNotes(), 10))
  }

  render() {
    return (
      <div className="App">
        <div className='note-container'>
          <h2>Notes</h2>
          <button className='refresh-button' onClick={this.getNotes}>Refresh</button>
          <div className='note-inner'>
            {this.state.cardsNotes && this.state.cardsNotes.map((el, index) =>
              <Note key={index} text={el.text} onDeleteClick={this.onDeleteClick} id={el.id} />)}
          </div>
        </div>

        <NewNote onTextChange={this.onTextChange} onPostClick={this.onPostClick} />
      </div>
    );
  }
}

export default App;
