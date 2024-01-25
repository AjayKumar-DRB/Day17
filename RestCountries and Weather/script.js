for(let i = 0; i < 250; i++){
    fetch('https://restcountries.com/v3.1/all')
    .then(response => {
        return response.json()
    }).then(data => {
        const box = document.getElementById('box');

        const dataBody = document.createElement('div')
        dataBody.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4")
        box.appendChild(dataBody)

        const card = document.createElement('div');
        card.classList.add("card", "h-100");
        dataBody.appendChild(card);

        const cardHeader = document.createElement('div');
        cardHeader.classList.add("card-header");
        card.appendChild(cardHeader);

        const cardBody = document.createElement('div');
        cardBody.classList.add("card-body", "d-flex", "flex-column","justify-content-center", "align-items-center");
        cardBody.setAttribute("id", `card-body${i}`)
        card.appendChild(cardBody);

        const heading = document.createElement('h1');
        heading.classList.add("text-center");
        heading.setAttribute("id", "title")
        heading.textContent = data[i].name.common;
        cardHeader.appendChild(heading)

        const image = document.createElement('img')
        image.classList.add("card-img-top", "d-flex", "justify-content-center")
        image.src = data[i].flags.svg;
        let imgAlt = data[i].flags.alt;
        if (imgAlt === undefined){
            image.alt = `Flag of ${data[i].name.common}`;
        }
        else{
            image.alt = data[i].flags.alt
        }
        cardBody.appendChild(image);


        const cardText = document.createElement('div')
        cardText.classList.add("card-text");
        cardBody.appendChild(cardText);

        const lngID = Object.keys(data[i].name.nativeName)[0];

        cardText.innerText +=
               `Region: ${data[i].region}
               Native Name: ${data[i].name.nativeName[lngID].official}  
               Population: ${data[i].population}`
        ;

        const weather = document.createElement('button')
        weather.classList.add("btn", "btn-primary")
        weather.textContent = "Click for Weather"
        weather.addEventListener('click', () => {getWeatherData(data[i].name.common, i, data[i].latlng[0], data[i].latlng[1])})
        cardBody.appendChild(weather)
    })
}

async function getWeatherData(cityName, i, lat, lng){
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f246f00b74c845432c7ab6b346634de5`);
    const weatherData = await result.json();

    const cardBody = document.getElementById(`card-body${i}`)
        
    cardBody.innerHTML +=
    `<h6>Weather in ${cityName}: ${weatherData.weather[0].description}</h6>`
}