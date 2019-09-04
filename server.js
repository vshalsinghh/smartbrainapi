const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors= require('cors');
const knex = require('knex')


const signin = require('./controllers/signin');
const register =require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const port =process.env.PORT || 3000;
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  	ssl: true
  }
});



const app = express();

 app.use(bodyParser.json())
 app.use(cors())


app.get('/', (req,res) => {	res.send(`this  app works on port ${port}`)})

app.post('/signin',signin.handleSignin(db, bcrypt))
//register
app.post('/register',(req,res) => {register.handleRegister(req,res, db, bcrypt)})
//get profile
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})
//update entries
app.put('/image', (req,res) => {image.handleImage(req,res,db)} )


app.listen(port, () => {
	console.log(`App is running on port ${process.env.PORT}`)
})

/*

-->res =this is working
/signin -->post = success/fail
/register --> post = user
/profile/userid--> get =user
/image--> put = user

*/