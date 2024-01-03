console.log('Client side JS loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorDisplay = document.querySelector('#error')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Sent!',search.value)
    
    const url = 'http://localhost:3000/weather?address='+search.value
    fetch(url).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                errorDisplay.innerHTML = '<p>'+data.error+'</p>'
            } else {
                errorDisplay.innerHTML = '<p><div><span>Forecast:</span> '+data.forecast+'</div>'+
                        '<div><span>City Name:</span> '+data.location+'</div>'+'<span></span>'+
                        '<div><span>Address:</span> '+data.address+'</div>'

                +'</p>'
                console.log(data)
    
            }
        })
    })
})