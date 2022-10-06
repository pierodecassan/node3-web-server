const request = require('request')

const forecast = (latitude, longitude, callback)=>{

const url='http://api.weatherstack.com/current?access_key=b4ea7de9dc635517966287a5fc82b831&query='+latitude+','+longitude+'&units=m'


request({url,json:true}, (error, {body})=>{
        //console.log(response.body.features)
    
        if(error){
    callback('Error in connection to the server!',undefined)
        }else if(body.error){
    callback('errore nella richiesta', undefined)
        }
        else{
        const temperature = body.current.temperature
        const humidity = body.current.humidity
        const weather_icons = body.current.weather_icons
        weather_description = body.current.weather_descriptions
        console.log(weather_description)
        callback(undefined,'The temperature in '+body.location.name+' is '+temperature+' and humidity is '+humidity+'%')
        } 
    
    })


}

module.exports = forecast
