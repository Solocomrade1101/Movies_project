const leftBtn = document.querySelector('.bi-chevron-left')
const rightBtn = document.querySelector('.bi-chevron-right')
const cards = document.querySelector('.popular__items')
const searchResult = document.querySelector('.navigation__search-result')
const searchInput = document.getElementById('input_search')




leftBtn.addEventListener('click', () => {
  cards.scrollLeft -= 140;
});

rightBtn.addEventListener('click', () => {
  cards.scrollLeft += 140;
})

function showCard(data) {
  data.forEach((el, i) => {
    let { name, imdb, date, sposter, bposter, genre, url } = el;
    let card = `
        <a href="${url}"  id="card_${i}" class="popular__item">
          <img src="${sposter}" alt="${name}" class="popular__img"></img>
          <div class="popular__rest">
            <img src="${bposter}" alt="preview">
            <div class="popular__content">
              <h4 class="popular__content-title">${name}</h4>
              <div class="popular__content-sub">
                <p class="popular__content-text">${genre}, ${date}</p>
                <h3 class="popular__content-subtitle"><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
              </div>
            </div>
          </div>
        </a>
    `
    cards.innerHTML += card;
  });
}

fetch('./movie.json')
  .then(response => response.json())
  .then((data) => {

    showCard(data)
    document.querySelector('.header__content-title').innerText = data[0].name;
    document.getElementById('gen').innerText = data[0].genre;
    document.getElementById('date').innerText = data[0].date;
    document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}`

    // search

    data.forEach(element => {
      let { name, imdb, date, sposter, genre, url } = element;

      let card = `
        <a href="${url}"  class="navigation__search-result-card card">
              <img src="${sposter}" alt="avatar">
              <div class="card__description">
                <h3 class="card__title">${name}</h3>
                <p class="card__text">${genre}, ${date}, <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
              </div>
        </a>
      `
      searchResult.innerHTML += card
    });

    // search filter

    searchInput.addEventListener('click', () => {
      searchResult.style.display = 'block'
    })
    document.addEventListener('click', (e) => {
      if (e.target.id !== 'input_search') {
        searchResult.style.display = 'none'
        searchInput.value = ''
      }
    })
    searchInput.addEventListener('keyup', () => {
      let filter = searchInput.value.toUpperCase()
      let a = searchResult.getElementsByTagName('a');

      for (let i = 0; i < a.length; i++) {
        let b = a[i].querySelector('.card__description')
        let textValue = b.textContent || b.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = 'flex'
          searchResult.style.visibility = 'visible';
          searchResult.style.opasity = 1;
          searchResult.style.zIndex = 10
        } else {
          a[i].style.display = 'none'
        }
        if (searchInput.value == 0) {
          searchResult.style.visibility = 'hidden';
          searchResult.style.opasity = 0;
        }
      }
    })

    let video = document.getElementsByTagName('video')[0];
    let play = document.getElementById('play')

    play.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        play.innerHTML = `<span>Pause</span> <i class="bi bi-pause-fill"></i>`
      } else {
        video.pause()
        play.innerHTML = `Watch <i class="bi bi-play-fill"></i>`
      }
    })

    // -----------------series
    let series = document.querySelector('#series');
    series.addEventListener('click', () => {
      cards.innerHTML = '';

      let seriesArray = data.filter(el => {
        return el.type === 'series'
      })

      showCard(seriesArray)
    })

    // --------------------movies
    let movies = document.querySelector('#movies');
    movies.addEventListener('click', () => {
      cards.innerHTML = '';

      let moviesArray = data.filter(el => {
        return el.type === 'movie'
      })

      showCard(moviesArray)
    })

    // ----------------kids
    let newFilm = document.querySelector('#new');
    newFilm.addEventListener('click', () => {

      cards.innerHTML = '';

      let newFilmArray = data.filter(el => {
        return el.date === "2022"
      })

      showCard(newFilmArray)
    })
  })