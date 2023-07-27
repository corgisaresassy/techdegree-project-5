// Global constants
const gallery = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
let userData = [];
let searchData = {
    'results' : []
};


// Adding in the search bar

searchDiv.innerHTML = `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;

const searchBar = document.getElementById('search-input')

// Setting up a more robust and clean fetch function

function cleanFetch (url){
    return fetch(url)
        .then(data => data.json())
        .catch(error => console.log(Error(error)))

}

// This function will build our users and add them to the HTML

function userBuilder(data){
    data.results.forEach((el,index) => {
        let string = `
        <div class="card" id="${index}">
        <div class="card-img-container">
            <img class="card-img" src="${el.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${el.name.first} ${el.name.last}</h3>
            <p class="card-text">${el.email}</p>
            <p class="card-text cap">${el.location.city}, ${el.location.state}</p>
        </div>
    </div>`
        gallery.insertAdjacentHTML('beforeend',string)
    })
}

function userDestroyer (){
    gallery.innerHTML='';
}

//Adding the modal creation function

function createModal (event){
    let card = event.target;
    while (card.className !== 'card'){
        card = card.parentNode;
    }
    let idNumber = card.id;
    return postModal(idNumber);
}

function search (query, data=userData){
    let array = data.results;
    let newArray = array.filter(el=> {
        let fullname = el.name.first.toLowerCase() + ' ' + el.name.last.toLowerCase();
        return (fullname.includes(query.toLowerCase()))
    })
    let newObject = {
        'results' : newArray
    }
    userDestroyer();
    userBuilder(newObject);
    searchData = newObject;
}

function birthdayCalculator (obj){
    let birthday = '';
    let dob = obj.dob.date;
    birthday = `${dob.slice(5,7)}/${dob.slice(8,10)}/${dob.slice(0,4)}`
    return birthday;
}


function stateAbbreviator (state){
    // stateArray courtesy of mshafrir github.com/mshafrir/2656763
    let stateArray =
    [
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ]
    let abbreviation = '';
    stateArray.forEach(el => {
        if(el.name === state){
            abbreviation = el.abbreviation;
        }
    })

    return abbreviation;
    
}

// This function actually constructs and posts the modal

function postModal(idNumber){
    console.log(idNumber)
    let data = {};
    let workingData = {};
    console.log(searchData.results.length);
    if (searchData.results.length>0){
        console.log('hit')
        data = searchData.results[idNumber];
        workingData = searchData;
    } else {
        data = userData.results[idNumber];
        workingData = userData;
    }
    console.log(data);
    // Need to build a function for the state abbreviations. ugh...
    // And for birthdays...
    let html = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.cell}</p>
                    <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${stateAbbreviator(data.location.state)} ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthdayCalculator(data)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `
    let body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend',html)

    // Adding event listeners to modal
    let modal = document.querySelector('.modal-container');
    let modalClose = document.querySelector('#modal-close-btn');
    let modalNext = document.querySelector('#modal-next');
    let modalPrev = document.querySelector('#modal-prev');


    modalClose.addEventListener('click', () => modal.remove())

    if(idNumber<workingData.results.length-1){
        modalNext.addEventListener('click', () => {
            modal.remove();
            postModal(++idNumber);
        })
    }

    if(idNumber>0){
        modalPrev.addEventListener('click', () => {
            modal.remove();
            postModal(--idNumber);
        })
    }
}   



// Fetching the data

cleanFetch('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
        userBuilder(data);
        userData = data;
    })




// Adding the event listener for the gallery
gallery.addEventListener('click', e => {
    if(e.target.className !== 'gallery'){
        createModal(e);
    }
})

// Adding the event listener for the search bar

searchBar.addEventListener('keyup',e=>search(e.target.value));