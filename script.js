const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputDateDepart = document.querySelector('.input__date-depart'),
    cheapestTicket = document.getElementById('cheapest-ticket'),
    otherCheapTickets = document.getElementById('other-cheap-tickets');
    
    
let city = [];


const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/';


//функции


const getData = (url, callback, reject = console.error) => {
    const request = new XMLHttpRequest(); //объект для запроса

    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) { 
            callback(request.response);   
        }else {
            reject(request.status);
        }
    })
    request.send();// отправляем запрос
}

const showCity = (input, list) => {

    list.textContent = '';

    if (input.value !== '') {
        const filterCity = city.filter((item) => {
            
            const fixItem = item.name.toLowerCase();
            return fixItem.startsWith(input.value.toLowerCase());
            
        });
    
        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li)
        });
    }
}

const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
};

    

// обработчики событий
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
})

dropdownCitiesFrom.addEventListener('click', (event) => {
    selectCity(event,inputCitiesFrom, dropdownCitiesFrom)
})

dropdownCitiesTo.addEventListener('click', (event) => {
    selectCity( event,inputCitiesTo, dropdownCitiesTo)
})

//вызов функций
getData( proxy + citiesApi, (data) => {
    city = JSON.parse(data).filter((item) => item.name); 
    city.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
    });
});