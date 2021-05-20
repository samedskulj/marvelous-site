const btnPokreni = document.querySelector(".btn-pokreni");
const btnTest = document.querySelector(".btn-test");
const colHeroes = document.querySelector(".row-heroes");
const input = document.querySelector("#formControlDefault");

let podaci = [];

class FetchApi {
  constructor() {
    this.loadingAPI;
    this.filteredAPI;
    this.filteredNiz = [];
  }
  testFetcha = async () => {
    const res = await fetch(
      "https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=100&apikey=219d6c078d5b6a252a1a45d83cc19cfb"
    );
    podaci = await res.json();

    this.insertDiv(podaci);
  };
  insertDiv = (heroji) => {
    heroji.data.results.map((hero) => {
      this.loadingAPI = `
      <div class = "col-12 mb-5 col-heroes" key=${hero.id}>
        <div class="first-part-col-heroes"> 
        <h3 id = "hero-name-id">${hero.name}</h3>
        <div class = "img-col-heroes">
          <img src="${hero.thumbnail.path}/portrait_uncanny.jpg"/>
        </div> 
       </div>   
       <div class="second-part-col-heroes"> 
       <h2>Description:</h2>
       <p id = "hero-desc">${
         hero.description || "Description is not provided for this character"
       }</p>
        <h2>Series:</h2>
            <p id="series-id">
              ${hero.series.items.map((item) => {
                return `${item.name}`;
              })}
            </p>
            <h3>Comics:</h3>
            <p id="comics-id">
              ${hero.comics.items.map((item) => {
                return `${item.name}`;
              })}
            </p>
       </div>
       </div>
      `;
      colHeroes.innerHTML += this.loadingAPI;
    });
  };
  fetchByNameAPI = async (e) => {
    colHeroes.innerHTML = "";
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${e.target.value}&orderBy=name&limit=20&apikey=219d6c078d5b6a252a1a45d83cc19cfb`
    );
    this.filteredNiz = await res.json();

    this.insertDiv(this.filteredNiz);
  };
}

const objFetchApi = new FetchApi();
objFetchApi.testFetcha();
input.addEventListener("keyup", objFetchApi.fetchByNameAPI);
