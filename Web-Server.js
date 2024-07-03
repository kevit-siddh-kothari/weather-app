const WeatherApp = require("./app");
const color = require('colors')
const ejs = require('ejs')
const path = require('path') //core node module
const express = require("express"); //expres is actulaay a function - andvanced version of http

const { log } = console;

//calling express function
const app = express();

// All Path Configuration
const templatePath = path.join(__dirname,'Templates','views')
//  acessing public file fon webpage :- http://localhost:8000/html/welcome.html
app.use(express.static(path.join(__dirname, 'public')));


//setting up ejs page by default in views pfolder
app.set('view engine', 'ejs');


//now i want os set all my views in templates folder
app.set('views',templatePath)

//  Documentation
//  Get - '/' => Welcome Page
//  Get - '/Data' => Current Weather Page
//  Get - '/form' => Form Page

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'welcome.html'));   
});

app.get('/form',(req,res) =>{
    res.render('form',{/** value to be aceeed by the views!!!! */   title: 'Weather Status', name:'Siddh'})
})

app.get('/Data',async(req,res)=>{
  const { name } = req.query;
  console.log(name)
  const weatherArray = await WeatherApp.Caller(name);
  if(weatherArray==='error'){
    res.render('formErr',{print:`${name} city does not exist`})
  }else{
    res.render('showPage',{weatherArray:weatherArray,cityName:name})  
  }
})

app.get('*',(req,res)=>{
    let a = new Error().stack
   res.render('error',{a})
})


// *Listening on port 8000 - http://localhost:8000/
app.listen(8000, () => {
  log("Server started at port 8000");
});
