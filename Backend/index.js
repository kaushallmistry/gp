import Users from './models/user.model.js';
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import Test from "./models/newmodel.js";

const app =express();
app.use(express.json())
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
const CONNECTION_URL='mongodb+srv://admin:admin@database.q56qr75.mongodb.net/UserDB?retryWrites=true&w=majority'
const CONNECTION_URL2='mongodb+srv://admin:admin@database.q56qr75.mongodb.net/ConversationDb?retryWrites=true&w=majority'
const accessTokenSecret = 'accessTokenSecret';
const refreshTokenSecret = 'refreshTokenSecret';

const refreshTokens = [];

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user._id }, accessTokenSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret);

    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/register', async (req, res) => {

    const users = new Users({ 
        email : req.body.emaill,
        password : req.body.password,
        confirmpassword: req.body.confirmpassword
       })
  
    try {
      
  
      if (!users) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // const accessToken = jwt.sign({ id: users._id }, accessTokenSecret, { expiresIn: '15m' });
      // const refreshToken = jwt.sign({ id: users._id }, refreshTokenSecret);
      
      refreshTokens.push(refreshToken);
      await users.save()
      res.json({ accessToken, refreshToken });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Access denied' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ id: decoded.id }, accessTokenSecret, { expiresIn: '15m' });

    res.json({ accessToken });
  });
});

app.post('/api/logout', (req, res) => {
  const { refreshToken } = req.body;

  refreshTokens = refreshTokens.filter(token => token !== refreshToken);

  res.json({ message: 'Logged out successfully' });
});


app.get('/',(req,res)=>{
    res.send('heyyyy')
})

mongoose.connect(CONNECTION_URL2,{useNewUrlParser:true,useUnifiedTopology:true}).then()

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(8000 ,()=>console.log('server running on prt')))
.catch((error)=>console.log(error.message));

