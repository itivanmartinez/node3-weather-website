const url = 'http://api.weatherstack.com/current?access_key=11b1cfee3a451bf392df51c0fc2dd805&units=f'

const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const fwdURL = url + '&query=' + latitude +','+ longitude
    request({url:fwdURL,json:true}, (error,body) => {
        if (error){
            callback('Unable to get weather', undefined)
        } else if (!body.body){
            callback('Could not find location', undefined)
        }else {
        const weatherSTR = `It is currently ${body.body.current.temperature} degrees out. It feels like ${body.body.current.feelslike}`
        callback(undefined,weatherSTR)
        }
    })
}

module.exports = {
    forecast: forecast
}