
const getInfoDay = (param) => {
    const dateDay = new Date().getDate()

    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thurstday",
        "friday",
        "saturday",
    ]

    const day = dateDay < 10? `0${dateDay}`: `${dateDay}` 

    return {
        name:days[(new Date().getDay()+param)%7],
        number:day
    }
}

const getInfoMonth = () => {
    const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ]

    return months[new Date().getMonth()] 
}

module.exports = {
    getInfoDay: getInfoDay,
    getInfoMonth: getInfoMonth,
}