const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('postman-request')

const geoInfo = require('./utils/geoInfo')
const forecast = require('./utils/forecast')

const url = 'http://api.weatherstack.com/current?access_key=11b1cfee3a451bf392df51c0fc2dd805&query=New%20York&units=f'
request({url:url,json: true}, (error,response,body) =>{
    //const data = JSON.parse(body)
   // console.log(`It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}`)
})



//define paths for express config
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handle bars
app.set('view engine', 'hbs')//handle bars
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirectoryPath))

//When using hbs
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App 1',
        name: 'Ivan Martinez'
    })//don't need file extension. will look into views folder.Second value is object with dinamic values
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About',
        name: 'Ivan Martinez'
    })//don't need file extension. will look into views folder.Second value is object with dinamic values
})

app.get('/help', (req,res) =>{
    res.render('help', {
        helpText: 'this is some helpful text',
        title: 'Help',
        name: 'Ivan Martinez'
        })//don't need file extension. will look into views folder.Second value is object with dinamic values
})



app.get('/weather', (req,res) => {
    console.log(req.query.address)
    if (!req.query.address){
        return res.send({
            error:'You must send address'
        })
    }
    geoInfo.getGeoInfo(req.query.address,(error,{latitude,longitude,name} = {})=>{
        console.log(error)
        if(error){
            return res.send({error})
        }
        //console.log(geoResponse)
        if (!error){
            forecast.forecast(latitude,longitude,(error,response) => {
                console.log('########################################')
                console.log(error)
                console.log(response)
                if(!response){
                    return res.send("HAHAHA")
                }
                res.send({
                    forecast: response,
                    location: name,
                    address: req.query.address
                })
            })
        }
        
    })
    
})

app.get('*', (req,res) => {
    res.send('<html><head><title>Error</title></head><body><h1>Your request was not approaved</h1></body></html>')
})

app.listen(3000, () => {
    console.log('Server is up')
})

