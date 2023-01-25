import './style.css'
window.onload = () => {

  const xablau2 = () => {
    const oi = fetch('./src/app-Bookmarks.json')
    .then(response => response.json())
    .then(data => {
      const xablauArray = Object.values(data);
      
      const all = [];
      xablauArray.forEach((element) => {
        element.path = element.path
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
        .replace(`Sisters`,`Sister's`),
        
        all.push({book: element.path,
          text: element.text, key: element.t});
          //V classifica as entradas com base na key dela, que mostra onde que ela está (element.t) dentro do livro, no objeto
          all.sort((a, b) => a.key - b.key);
        });
        return all;
      });
      return oi;
    };
    
    // V pega todos os nomes de livros no arquivo e classifica eles por ordem alfabética
    xablau2().then((response) => {
      const entries = response;
      // console.log(entries);
      
      const nameBooks = async () => {
        const titles = [];
        titles.push(entries[0].book);
        entries.forEach((title) => {
          if(!titles.includes(title.book)) {
            titles.push(title.book);
          }
        });
        titles.sort();
        // console.log(titles);
        return titles;
      };
      
      
      const createMenu = async () => {
        const names = await nameBooks();
        const menuArea = document.querySelector('#summary');
        names.forEach((element) => {
          const h3 = document.createElement('h3');
          h3.className = 'indexTitle hidden';
          const id = element.split(' ').join('_');
          h3.innerHTML = `<a href="#${id}">${element}</a>`;
          menuArea.appendChild(h3);
        })
      }
      
      const putNamesInDOM = async () => {
        const namesHtml = await nameBooks();
        const booksArea = document.querySelector('#books');
        const br = document.createElement('br');
        booksArea.appendChild(br);
        namesHtml.forEach((book) => {
          const h3 = document.createElement('h3');
          h3.id = book.split(' ').join('_'); //criação do id com _ para funcionar no html
          h3.className = 'book';
          const h4 = document.createElement('h4');
          h4.className = 'quote hidden';
          h4.innerHTML = book;
          const br = document.createElement('br');
          //colocando a capa nos livros V
          const div = document.createElement('div');
          div.className = 'container';
          const img = document.createElement('img');
          img.src = `./covers/${book}.jpg`;
          img.className = 'image';
          img.alt = book;
          div.appendChild(img);
          h3.appendChild(div);
          h3.appendChild(h4);
          booksArea.appendChild(h3);
        });
    
    const text = () => {
      const books = document.querySelectorAll('.book');
      entries.forEach((elementName) => {
        books.forEach((element) => {
          if (elementName.book == element.id.replace(/_/g, ' ')){ //substituição do _ por ' ' para que o código funcione
            const h4 = document.createElement('h4');
            h4.innerHTML = `- ${elementName.text}`;
            h4.className = 'quote hidden';
            element.appendChild(h4);
          }
        })
      })
    }
    
    text();
    
  };
  
  createMenu();
  
  // VER SE CONSIGO FAZER ISSO https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_overlay_fade
  
  // Início do código do botão de subir até o topo da página
  // Get the button:
  let mybutton = document.getElementById("myBtn");
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  mybutton.addEventListener('click', topFunction)
  
  // final do código do botão de subir até o topo da página
  
  //para fechar o menu de títulos, caso ele esteja aberto, ao clicar em uma capa. é chamada dentro do elseif na função menuclick
  const hideTitles = () => {
    const booksIndex = document.querySelectorAll('.indexTitle');
    if (booksIndex[0].className === 'indexTitle') {
      booksIndex.forEach((element) => {
        element.classList.add('hidden');
      })
    }
  }
  
  //para fechar o menu de títulos, caso ele esteja aberto, ao clicar em um título. é chamado na última linha da função menuClick; 
  const names = () => {
    const booksIndex = document.querySelectorAll('.indexTitle');
    booksIndex.forEach((element) => {
      element.addEventListener('click', hideTitles);
    })
  }
  
  const menuButton = document.querySelector('#menuButton');
  
  const menuClick = async () => {
    await putNamesInDOM();
    const booksIndexNames = document.querySelectorAll('.image');
    
    const click = (event) => {
      const pai = event.target.parentNode.parentNode;
      const filhos = pai.childNodes;
      
      filhos.forEach((filho) => {
        if(filho.className === 'quote') {
          filho.className = 'quote hidden';
          menuButton.classList.remove('hidden');
          
        } else if(filho.className === 'quote hidden') {
          filho.className = 'quote';
          menuButton.classList.add('hidden');        
        }
      })
      
      const livros = document.querySelectorAll('.book');
      livros.forEach((livro) => {
        if (event.target.className == 'book selected' || livro.className === 'book hidden') {
          livro.className = 'book';
          event.target.className = 'image';
          event.target.parentNode.className = 'book';
        } else if(livro.id.replace(/_/g, ' ') !== event.target.alt) {
          livro.className = 'book hidden';
          event.target.className = 'image-selected';
          event.target.parentNode.className = 'book selected';
        }
      })
    }
    
    booksIndexNames.forEach((element) => {
      element.addEventListener('click', click);
    })
    
    names();
  }
  
  menuClick();
  
  const value = () => {
    const booksIndex = document.querySelectorAll('.indexTitle');
    if (booksIndex[0].className === 'indexTitle hidden') {
      booksIndex.forEach((element) => {
        element.classList.remove('hidden');
      })
    } else if (booksIndex[0].className === 'indexTitle') {
      booksIndex.forEach((element) => {
        element.classList.add('hidden');
      })
    }
  }
  
  menuButton.addEventListener('click', value)
  
  // const getSelectedText = () => {
    //   // console.log(window.getSelection().toString());
    //   const selected = window.getSelection().toString();
    //   console.log(selected);
    //   // return selected;
    // }
    
    // const button = document.querySelector('#copyButton');
    // button.addEventListener('click', getSelectedText);
    
    // ideia: fazer uma caixa de busca pelo texto digitado
    
  });
}