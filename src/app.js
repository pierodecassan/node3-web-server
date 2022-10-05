const path = require('path')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')
const express = require('express')
const app = express()
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views',viewsPath)

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'pierotto',
        title:'Weather',
        footer:'creato da piero'
    })
})
//console.log(__dirname)


app.get('/weather',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            console.log('Error ', error)
            res.send({error})
        }else{
            forecast(latitude,longitude, (error, forecastdata)=>{
                if(error){
                    return console.log(error)
                }
                //console.log(error)
                console.log(location)
                console.log(forecastdata)
                res.send({
                    forecast:forecastdata,
                    location:location,
                    address:req.query.address
                })
                })
        }
    
    })


    })

app.get('/help',(req, res) =>{
    res.render('help',{
        name:'pierino',
        title:"HELP",
        footer:'creato da piero'
    })
    })
 
app.get('/about',(req, res) =>{
    res.render('about',{
        name:'pierotto',
        title:'About',
        footer:'creato da piero'
})
 })

app.get('/help/*',(req,res)=>{
        res.render('404',{
            texterror:'Help article not found',
            title:'Help page not found',
            footer:'creato da piero'
        })
})   

app.get('*',(req,res)=>{
    res.render('404',{
        texterror:'Page not found',
        title:'Page not found',
        footer:'creato da piero'
    })
})    

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})