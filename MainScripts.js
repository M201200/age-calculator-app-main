function checkBlankFields(inputValues, errorFields) {
    if (inputValues.some(value => value == '')) {
        inputValues.map((value, index) => (value == '') ? errorFields[index].innerText = "Fill this form" : value)
    }
}
function checkYear(yearInput, errorFields) {
    let yearNow= new Date()
    yearNow = yearNow.getFullYear()
    if ((yearInput < 1900 || yearInput > yearNow) && yearInput != '') {
        errorFields[2].innerText = "Invalid year"
    }
}
function checkMonth(monthInput, errorFields) {
    if ((monthInput < 1 || monthInput > 12) && monthInput != '') {
        errorFields[1].innerText = "Invalid month"
    }
}
function checkDay (dayInput, monthInput, yearInput, errorFields) {
    let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((!(yearInput % 4) && yearInput % 100) || !(yearInput % 400)) listOfDays[1] = 29
    if ((dayInput > 31 || dayInput < 0) && dayInput != '') {
        errorFields[0].innerText = "Invalid date"
    } else if (dayInput > listOfDays[monthInput - 1]) {
        errorFields[0].innerText = "Invalid date"
    }
}

let dateField = [...document.getElementsByClassName('date')]
let errFields = [...document.getElementsByClassName('error')]
dateField.forEach(element => element.addEventListener('focus', (event) => {
    event.target.style.borderColor = ''
    errFields.forEach(element => element.innerText = '')
}))
dateField.forEach(element => element.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/\D/g, "")
}))


let output = [...document.getElementsByClassName('output')]
let button = document.getElementById("button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    output.forEach(item => item.classList.remove('animation'))
    
    // This resets the CSS animation by forcing the browser to reflow the page 
    void button.offsetWidth 

    output.forEach(item => item.classList.add('animation'))
})

function dateInputChecker() {
    let dayValue = day.value
    let monthValue = month.value
    let yearValue = year.value
    let values = [dayValue, monthValue, yearValue]

    checkBlankFields(values, errFields)
    checkDay(dayValue, monthValue, yearValue, errFields)
    checkMonth(monthValue, errFields)
    checkYear(yearValue, errFields)

    if (errFields.some(errField => errField.innerText != "")) {
        return errFields.map((element, index) => element.innerText != ''? dateField[index].style.borderColor = 'red': element)
    }
    return new Date(Date.parse(`${yearValue}-${monthValue}-${dayValue}`))
}
let submitInput = () => {
    dateField.forEach(element => element.style.borderColor = 'green')
    dateInputChecker()
    output.forEach(element => element.innerText = '--')
    let birthDate = dateInputChecker()
    if (!Number(birthDate)) return
        let dateNow = new Date()
        let ageInDays = (dateNow - birthDate)/ (1000 * 60 * 60 * 24)
        let ageYear = Math.floor(ageInDays/365)
        let ageMonth = Math.floor((ageInDays%365)/30.4)
        let ageDays = Math.ceil(ageInDays- (ageYear*365 + ageMonth*30.4)) 
        output[0].innerText = ageYear
        output[1].innerText = ageMonth
        output[2].innerText = ageDays
}