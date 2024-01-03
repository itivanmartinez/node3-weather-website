const request = require('postman-request')
const URL = 'http://api.positionstack.com/v1/forward?access_key=719c999cce637efe3103d22759108139'
const getGeoInfo = (location, callback) => {
    const frwURL = URL+'&query='+encodeURIComponent(location)

    request({url:frwURL, json:true},(error,response,body)=>{
        //console.log(body)
        if (error){
            callback('error',undefined)
        }else if (!body.data) {
            callback('Unable to find location',undefined)
        } else{
console.log(body.data)
            callback(undefined,{
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                name: body.data[0].name
        })
    }
})
    
}

module.exports = {
    getGeoInfo: getGeoInfo
}
