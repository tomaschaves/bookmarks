import React, { Component } from 'react';
import Covers from '../data';
import IndexButton from './IndexButton';

export default class Books extends Component {
  state = {
    entries: [],
    entriesFilter: [],
    bookTitles: [],
    clicked: '',
  }

  objectFromJSON = require('../app-Bookmarks.json');
  arrayOfEntries = Object.entries(this.objectFromJSON);
  
  componentDidMount() {
    const allEntries = [];
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
      
      allEntries.push({book: path,
        text: element[1].text, key: element[1].t, image: `./covers/${path}.jpg`});
      
      if(!bookNames.includes(path) || bookNames === undefined) {
        bookNames.push(path);
      }
      bookNames.sort();
      });

      this.setState({
        entries: allEntries,
        bookTitles: bookNames,
      })
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

  //usar essa função abaixo para filtrar as quotes do botão que clicarmos com base em seu nome e passar pro componente da frente como props 
  //fazer ela no componente de quotes?
  filterQuotes = (nameOfTheBook) => {
    const { entries } = this.state;
    const { history } = this.props;
    
    const filteredEntries = entries.filter((stateEntries) => stateEntries.book === nameOfTheBook);
    this.setState({
      entriesFilter: filteredEntries,
      clicked: nameOfTheBook,
    })

    history.push(`${nameOfTheBook}`);

  }

  topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  scrollFunction = () =>  {
    let mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  render() {
    const { 
      bookTitles,
    } = this.state;
    return (
      <div>
      <IndexButton />
      <h2 id='books'>
        {bookTitles.map((element) => {
          return(
            <h3 className='book' key={element} id={element.replace(/ /g,'_').replace(/'/g,'')}>
              <div className='container'>
              <img src={ this.findImage(element) } className='image' alt={ element } onClick={ () => this.filterQuotes(element)}/>
              
              </div>
            </h3>
          )
        })
      }
      <button type='button' id='myBtn' onClick={this.topFunction}>Topo</button>
      </h2>
      </div>
    )
  }
}
