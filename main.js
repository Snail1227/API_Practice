const url = 'https://api.punkapi.com/v2/beers';
console.log(url);
fetch(url)
    .then((rep) => rep.json())
    .then ((data) => {
        const beerList = document.getElementById('beers');
        data.slice(0, 30).forEach((beer) => {

            const itemList = document.createElement('li');
            
            const beerName = document.createElement('h2');
            beerName.textContent = beer.name;

            const beerImg = document.createElement('img');
            beerImg.setAttribute('src', beer.image_url);

            const beerDescription = document.createElement('p');
            beerDescription.textContent = beer.description;

            itemList.appendChild(beerName);
            itemList.appendChild(beerImg);
            itemList.appendChild(beerDescription);

            beerList.appendChild(itemList);
        });
    })
    .catch((err) => console.error(err));