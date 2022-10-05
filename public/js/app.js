console.log('javascript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    console.log(search.value)
    const location= search.value
    message1.textContent='Loading...'
    message2.textContent=''
    fetch('http://localhost:3000/weather?search=padova&address='+location).then((response) => {
    response.json().then((data) => {
    console.log(data)
    if(data.error){
        message1.textContent=data.error
console.log(data.error)
    }else{
        message1.textContent=data.location
        message2.textContent=data.forecast
        console.log(data.location)
        console.log(data.forecast)
    }
    })
})
})