const request = require('request')
const mapboxkey='pk.eyJ1IjoicGlldHJvZGVjYXNzYW4iLCJhIjoiY2s2czAzcnFiMGFvYzNmcGd0c2Z4bnE0byJ9.Y83Fx-ggB1o9e5XRgyrvSQ'

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+mapboxkey+'&limit=1'


    request ({url , json:true}, (error, {body}) => {
        if(error){
           
            callback('Error in connection to the server!', undefined)
                }else if(body.features.length===0){
            console.log(body.features.length)
            callback('errore nella richiestaa', undefined)
                }
                else{

                    callback(undefined
                        ,{location:body.features[0].place_name,
                            latitude:body.features[0].center[1],
                            longitude:body.features[0].center[0]   
                        })
                }
    } // fine callback request
    ) // fine request
} // fine geocode

module.exports = geocode
