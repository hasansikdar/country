function apiLoaded(name) {
    const url  = `https://restcountries.com/v3.1/name/${name}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayUi(data))
}
function allLoaded() {
    const url  = `https://restcountries.com/v3.1/all`
    fetch(url)
    .then(response => response.json())
    .then(data => displayUi(data))
}
const displayUi = objects => {
    const mainSection = document.getElementById("main-section");
    mainSection.innerHTML = "";
    for(const object of objects){
        // for(const keys in object){
        //     console.log(keys, object[keys]);
        // }
        const {name, cca2, flags, capital} = object;
        const {common} = name;
        const {png} = flags;
        const div = document.createElement("div");
        div.classList.add("country");
        div.innerHTML = `
            <img width="100%" height="100"  src="${png}" alt="country image" />
            <h4>Country Name: ${common}</h4>
            <h4>Capital: ${capital[0]}</h4>
            <button class="btn btn-primary" id="modal-buton" data-bs-toggle="modal" data-bs-target="#modal" onclick="countryUrl('${cca2}', '${common}', '${png}', '${capital[0]}')">Details</button>
        `
        mainSection.appendChild(div);
        
    }
}
const countryUrl = (code, common, png, capital) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    fetch(url)
    .then(response => response.json())
    .then(data => countryCode(data[0]));

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <img width="100%" src="${png}" alt="country image" />
        <h3>Name: ${common}</h3>
        <h3>Capital: ${capital}</h3>
        <h5>Code: ${code}</h5>
    `
    console.log(code)
}
const countryCode = data => {
    console.log(data);
    const {name, flags } = data;
    const {common} = name;
    const {png} = flags;
    const details = document.getElementById("details");
    details.innerHTML = `
        <h3>Name: ${common}</h3>
        <img height="100" width="100" src="${png}" alt="flags"/>
    `
}
// search by country name
const searchCountry = () => {
    const search = document.getElementById("search");
    const value = search.value;
    search.value = "";
    apiLoaded(value);
}
allLoaded()