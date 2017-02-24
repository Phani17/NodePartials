const express=require('express');
const hbs=require('hbs');
const port=process.env.PORT || 3000;
var fs=require('fs');
var app=express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now} : ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n');
  console.log(log);
  next();
});
// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// });
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.get('/',(request,response)=>{
  //response.send('<h1>Hello Express!!</h1>');
  response.render('home.hbs',{
    pageTitle:'Home Page',
    message:'Welcome to Express'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects Page'
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    error:'Couldnt get the page'
  });
});
app.listen(port,()=>{
  console.log(`server is up on ${port}`);
});
