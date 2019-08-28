import React from 'react';


class NewNote extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="new-note">
        <textarea id="note" name="note" rows="10" cols="50" onChange={this.props.onTextChange} />
        <button className='post-button' type='submit' onClick={this.props.onPostClick}>POST</button>
      </div>
    );
  }
}

export default NewNote;