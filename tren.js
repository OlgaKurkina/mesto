const myCity = {
    city: 'Mos',
    pop: true,
    country: 'RF',
    cityGreeting() {
        console.log('Hi!')
    },
    people: {
        men: 1000,
        women: 1100
    }
}

console.log(myCity.people.men)

console.log(myCity.cityGreeting())


