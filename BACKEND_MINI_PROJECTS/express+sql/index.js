const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const express=require('express');
const app=express();
const path=require('path');
const methodOverride= require("method-override");
const {v4: uuidv4}=require('uuid');



app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));

// connection with database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database:'college',
  password:'Prem@2005'
});

/*
// create fake data using faker
let createRandomUser=()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
*/

// let q="INSERT INTO user(id,username,email,password) VALUES ?";
// let user=[];

/*
// to create and add fake data into user array
for(let i=1; i<=50; i++){
  user.push(createRandomUser());
}
*/

// try{
//   connection.query(q,[user],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//   });
// }
// catch(err){
//   console.log(err);
// }

app.listen(3000,()=>{
  console.log(`server is starting at 3000`);
});

//home page 
app.get('/',(req,res)=>{
  let q='SELECT COUNT(*) FROM user';
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let count=(result[0]["COUNT(*)"]);
      res.render('home.ejs',{count});
    });
  }
  catch(err){
    console.log(err);
    res.send("some error occur in database");
  }
});

// show user 
app.get('/user',(req,res)=>{
  let q= 'SELECT * FROM user';
  try{
    connection.query(q,(err,users)=>{
      if(err) throw err;
      res.render('showusers.ejs',{users});
    });
  }
  catch(err){
    console.log(err);
    res.send('some error occur in database');
  }
});

// edit username of specific id
app.get('/user/:id/edit',(req,res)=>{
  const {id} = req.params;
  const q = 'SELECT * FROM user WHERE id = ?';

  try{
    connection.query(q, [id], (err, result) => {
      if(err) throw err;
      res.render('edit.ejs', {user: result[0]});
    });
  }
  catch(err){
    console.log(err);
    res.send('some error occur in database');
  }
});


app.patch('/user/:id',(req,res)=>{
  const {id} = req.params;
  const {username, password} = req.body;
  const q = 'SELECT * FROM user WHERE id = ?';
  try{
    connection.query(q, [id], (err, result) => {
      if(err) throw err;
      const user = result[0];
      if(password !== user.password){
        res.send('WRONG PASSWORD');
      }
      else{
        const q2 = 'UPDATE user SET username = ? WHERE id = ?';
        connection.query(q2, [username, id], (err, result) => {
          if(err) throw err;
          res.redirect('/user');
        });
      }
    });
  }
  catch(err){
    console.log(err);
    res.send('some error occur in database');
  }
});


//to add new user details
app.get('/user/new',(req,res)=>{
  res.render('newUser.ejs');
});

app.post('/user',(req,res)=>{
  let id=uuidv4();
  let {username,email,password}=req.body;
  let q=`INSERT INTO user(id,username,email,password) VALUES(?,?,?,?)`;

  try{
    connection.query(q, [id,username,email,password], (err, result) => {
      if(err) throw err;
      res.redirect('/user');
    });
  }
  catch(err){
    console.log(err);
    res.send('some error occur in database');
  }
});


// to delete user 
app.get('/user/:id/delete',(req,res)=>{
  let {id}=req.params;
  res.render('remove.ejs',{id});
});

app.delete('/user/:id',(req,res)=>{
  let {id}=req.params;
  let{email,password}=req.body;

  let q=`SELECT * FROM user WHERE id=?`;
  try{
    connection.query(q, [id], (err, result) => {
      if(err) throw err;
      let user=result[0];

      if(email !== user.email || password !==user.password){
        res.send("ENTER CORRECT EMAIL AND PASSWORD");
      }
      else{
        let q2= `DELETE FROM user WHERE email=? `;
        connection.query(q2,[email],(err,result)=>{
          if(err) throw err;
          res.redirect('/user');
        });
      }
    });
  }
  catch(err){
    console.log(err);
    res.send('some error occur in database');
  }
});
