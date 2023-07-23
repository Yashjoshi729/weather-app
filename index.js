const temperatureField = document.querySelector('.weather1')
const cityField = document.querySelector('.weather2 p')
const dateField = document.querySelector('.weather2 span')
const emojiField = document.querySelector('.weather3 img')
const weatherField = document.querySelector('.weather3 span')
const searchField = document.querySelector('.searchfield')
const form = document.querySelector('form')

let target = "new delhi"

const fetchData = async () => {
try {
    
    const url = `https://api.weatherapi.com/v1/current.json?key=e82b2476e89643d786463910232506&q=${target}`

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    const {
        current: {
            temp_c,
            condition: { text, icon },
        },
        location: { name, localtime }
    } = data
    updateDom(temp_c +'°', name, localtime, icon, text)

} catch (error) {
    alert("Enter correct location")
}
}

function updateDom(temperature, city, time, emoji, text) {
    temperatureField.innerText = temperature
    cityField.innerText = city

    const exactTime = time.split(' ')[1]
    const exactDate = time.split(' ')[0]
    const exactDay = new Date().getDay()
    dateField.innerText = `${exactTime} - ${getDayName(exactDay)} ${exactDate}`

    emojiField.src = emoji
    weatherField.innerText = text
}

fetchData()

function getDayName(key) {
    switch (key) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thrusday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"

        default:
            break;
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    target=searchField.value

    fetchData(target)
})