import React, { Component } from 'react'

export default class IndexButton extends Component {
  state = {
    clicked: false,
    names: [],
  }

  objectFromJSON = require('../app-Bookmarks.json');
  arrayOfEntries = Object.entries(this.objectFromJSON);
  
  componentDidMount() {
    const bookNames = [];
    
    this.arrayOfEntries.forEach((element) => {
      const path = element[1].path
      .replace('/storage/5ED2-D96E/Novels/','')
      .replace('/storage/08B4-A5BD/Novels/','')
      .replace(' [Yen Press]', '')
      .replace(' [Seven Seas]', '')
      .replace(' [J-Novel Club]','')
      .replace('[Kobo_LNWNCentral]','')
      .replace('.pdf','')
      .replace(`Banished from the Hero's Party, I Decided to Live a Quiet Life/`,'')
      .replace(`Chillin' in Another World With Level 2 Super Cheat Powers/`,'')
      .replace('[Premium_LNWNCentral]','')
      .replace(`Spy Classroom/`,'')
      .replace(`[Kindle-Kobo_Kitzoku]`,'')
      .replace(`[Kobo_Kitzoku]`,'')
      .replace(`internal-storage:/Librera/Books/`,'')
      .replace(`Sisters`,`Sister's`);
      
      if(!bookNames.includes(path) || bookNames === undefined) {
        bookNames.push(path);
      }
      bookNames.sort();
      });

      this.setState({
        names: bookNames,
      })
  }

  clickMenu = () => {
    const { clicked } = this.state 
    if(clicked === false) {
      this.setState({
        ...this.state,
        clicked: true,
      })
    } else {
      this.setState({
        ...this.state,
        clicked: false,
      })
    }
  }

  clickItem = () => {
    const { clicked } = this.state
    if(clicked === true)
    this.setState({
      ...this.state,
      clicked: false,
    })
  }

  render() {
    const { clicked, names } = this.state;
    return (
      <div>
        
          {
            names && (
              
              <button type='button' className='indexButton' onClick={this.clickMenu}>Índice</button>
              )
            }
      <h2 id='summary'>
      {
        clicked && names.map((element) => (
          <h3 className='indexTitle'>
            <a href={`#${element.replace(/ /g,'_').replace(/'/g,'')}`} onClick={ this.clickItem }>{element}</a>
          </h3>
        ))
      }
      </h2>
      </div>
    )
  }
}



