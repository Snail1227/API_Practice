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
                itemList.className = 'beer';
                itemList.setAttribute('id', beer.id);
            
                const beerName = document.createElement('h2');
                beerName.textContent = beer.name;

                const beerImg = document.createElement('img');
                beerImg.setAttribute('src', beer.image_url);

                const beerDescription = document.createElement('p');
                beerDescription.textContent = beer.description;
                beerDescription.className = 'text-item';

                const showMore = document.createElement('button');
                showMore.className = 'show-more';
                showMore.textContent = "Show More";

                const showLess = document.createElement('button');
                showLess.className = 'show-less';
                showLess.textContent = "Show Less";

                itemList.appendChild(beerName);
                itemList.appendChild(beerImg);
                itemList.appendChild(beerDescription);

                itemList.appendChild(showMore);
                itemList.appendChild(showLess);


                beerList.appendChild(itemList);
                displayItems++;
            }
        });

            // move-items by lists

        const allBeersList = document.querySelectorAll('.beer');
        const collection = document.getElementById('collection');
        const favorite = document.getElementById('favorite');

        function UpdateCollection(id, direction) {
            const beer = document.getElementById(id)
            console.log(id);
            console.log(beer);
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

        // show more and show less

        const showMoreButtons = document.querySelectorAll('.show-more');
        const showLessButtons = document.querySelectorAll('.show-less');
        const hiddenTexts = document.querySelectorAll('.text-item');

        for (let i = 0; i < showMoreButtons.length; i++) {
            showMoreButtons[i].addEventListener('click', function() {
            hiddenTexts[i].style.height = 'auto';
            showMoreButtons[i].style.display = 'none';
            showLessButtons[i].style.display = 'inline';
            });

            showLessButtons[i].addEventListener('click', function() {
            hiddenTexts[i].style.height = '50px';
            showMoreButtons[i].style.display = 'inline';
            showLessButtons[i].style.display = 'none';
            });
        }

        

    })
    .catch((err) => console.error(err));


