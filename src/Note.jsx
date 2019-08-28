import React from 'react';


class Note extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='note'>
        <p>{this.props.text}</p>
        <button className='delit-button' onClick={() => this.props.onDeleteClick(this.props.id)}>DELETE</button>
      </div >
    );
  }
}

export default Note;