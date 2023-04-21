const url = 'https://api.punkapi.com/v2/beers?page=1&per_page=80';
const skipBeer = ['https://images.punkapi.com/v2/keg.png', 'AB']
console.log(url);
fetch(url)
    .then((rep) => rep.json())
    .then ((data) => {
        const beerList = document.getElementById('collection');
        let displayItems = 0;
        data.forEach((beer) => {
            
            if (beer.image_url != skipBeer[0] && !beer.name.startsWith(skipBeer[1]) && displayItems < 30) {
                const itemList = document.createElement('li');
                itemList.className = "beer";
                itemList.setAttribute('id', displayItems)
            
                const beerName = document.createElement('h2');
                beerName.textContent = beer.name;

                const beerImg = document.createElement('img');
                beerImg.setAttribute('src', beer.image_url);

                const beerDescription = document.createElement('p');
                beerDescription.textContent = beer.description;

                //const button = document.createElement('button');

                itemList.appendChild(beerName);
                itemList.appendChild(beerImg);
                itemList.appendChild(beerDescription);

                beerList.appendChild(itemList);
                displayItems++;
            }
        });
    })
    .catch((err) => console.error(err));


const allBeersList = document.querySelectorAll('.beer');
const collection = document.getElementById('collection');
const favorite = document.getElementById('favorite');



function UpdateCollection(id, direction) {
    const beer = document.getElementById(id)
    if (direction === "toCollection") {
        collection.appendChild(beer);
    } else if (direction === "toFavorite") {
        favorite.appendChild(beer);
    }
}

allBeersList.forEach((beer) => {
    beer.addEventListener('click', () => {
        const parentId = beer.parentNode.id;
        const beerId = Number(beer.id);
        const direction = parentId === 'collection' ? 'toFavorite' : 'toCollection';
        UpdateCollection(beerId, direction);
    });
});

console.log(allBeersList);