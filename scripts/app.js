const btnPokreni = document.querySelector(".btn-pokreni");
const testFetcha = async () => {
  const res = await fetch(
    "https://gateway.marvel.com:443/v1/public/characters?apikey=219d6c078d5b6a252a1a45d83cc19cfb"
  );
  const data = await res.json();
  console.log(data);
};
btnPokreni.addEventListener("click", testFetcha);
console.log("poyy");
