import React, { Component } from 'react'

export default class Quote extends Component {
  render() {
    const { text } = this.props;
    return (
      <h4 className='quote'>{ text }</h4>
    )
  }
}
