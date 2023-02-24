import React, { Component } from 'react'
import Covers from '../data';
import Quote from './Quote';

export default class Quotes extends Component {
  homeComing = () => {
    const { history } = this.props;
    history.push('/');
    this.topFunction();
  }

  state = {
    entries: [],
    entriesFilter: [],
    src: '',
  }

  objectFromJSON = require('../app-Bookmarks.json');
  arrayOfEntries = Object.entries(this.objectFromJSON);
  
  componentDidMount() {
    const allEntries = [];
    
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
      
      allEntries.push({book: path,
        text: element[1].text, key: element[1].t, image: `./covers/${path}.jpg`});

      this.setState({
        entries: allEntries,
      }, () => this.filterQuotes())
      });
      this.topFunction();
      window.addEventListener('scroll', this.scrollFunction);
    }
    
  findImage = (element) => {
    let path = '';
    Covers.forEach((book) => {
      if(element === book.name) {
        path = book.image;
      }
    })
    return path;
  }

  filterQuotes = () => {
    const { entries } = this.state;
    const { location: { pathname } } = this.props;
    
    const name = pathname.replace('/', '');

    const filteredEntries = entries.filter((stateEntries) => stateEntries.book === name);
    this.setState({
      entriesFilter: filteredEntries,
      src: filteredEntries[0].book,
    })
  }

  topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  // When the user scrolls down 20px from the top of the document, show the button

  scrollFunction = () =>  {
    let mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }



  render() {
  
    const { src, entriesFilter } = this.state;
    return (
      <div className='book'>
        <div className='book selected'>
          <img src={ this.findImage(src) } alt={ src } onClick={ this.homeComing } />
        </div>
        <h4 className='quoteTitle'>{ src }</h4>
        {
          entriesFilter.map((entrie) => (
            <Quote key={ entrie.text } text={ entrie.text } />
          ))
        }
        <button type='button' id='myBtn' onClick={this.homeComing}>Home</button>
      </div>
    )
  }
}
