var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(session({secret:'check the value'}));
app.set("view engine","ejs");

app.get('/homepage',function(req,res)
{
  res.render('homepage');
});

app.get('/',function(req,res)
{
res.render('register',{f:"",ptemp:""});

});

app.get('/login',function(req,res) {
res.render('login',{ltemp:""});
});

app.post('/register',urlencodedParser,function(req,res) {
var mail = req.body.emailid;
var sessionv = mail;
if(req.body.password === req.body.cpassword)
{
var con = mysql.createConnection({host:"localhost",user:"root",password:"git",database:"agrawal"})

con.query("select * from information where EMAILID = ?",[req.body.emailid],function(err,result,fields)
{
  if(err)
  {
    console.log(err);

  }
  else { // else starts form here
    console.log("email id checked successfully");
    console.log(result.length);

if(result.length === 0)
{//if starts here
var insertd ={
    FIRSTNAME:req.body.fname,
    LASTNAME:req.body.lname,
    EMAILID:req.body.emailid,
    PASSWORD:req.body.password
}

con.query('insert into information set ?',insertd,function(err,result,fields) {
if(err)
{
  console.log( err);

}
else {
  console.log("data inserted succesfully");
  res.render('login',{ltemp:""});

}
});

} //if ends

else {
  res.render('register',{f:"please use different EMAILID ",ptemp:""});
}

} //else finishes here

});

}
else {
  res.render('register',{ptemp:"password and confirm password are not same plz check",f:""});
}

});

app.post('/login',urlencodedParser,function(req,res){
  var conn  = mysql.createConnection({host:"localhost",user:"root",password:"git",database:"agrawal"});
  console.log(req.body.lemailid);
  conn.query('select * from information where EMAILID = ? AND PASSWORD = ?',[req.body.lemailid,req.body.lpassword],function(error,result,fields) {
    if(error)
    {
      console.log(error);
    }
    else {
      console.log("compared successfully");
      console.log(result);
      if(result.length === 1){
        res.render('success');
      }
      else {
        res.render('login',{ltemp:"plz check email id and password may be they are incorrect"});
      }
    }
  });

});



app.listen(1234,function(req,res){
  console.log("server started 1234");
})
