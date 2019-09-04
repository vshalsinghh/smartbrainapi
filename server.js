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
  	host: 'ec2-54-83-9-36.compute-1.amazonaws.com',
  	user: 'xlyofypvvuhukv',
  	password: '48c12acec63c54cbb5b77a62720f573964060d392d43524f5413df3f6679c593',
  	database: 'd25pebs3l1iji9',

  }
});



const app = express();

 app.use(bodyParser.json())
 app.use(cors())


app.get('/', (req,res) => {res.send(database.users) } )

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