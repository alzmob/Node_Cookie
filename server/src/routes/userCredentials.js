import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { userCredentials } from "../database/userCredentials.js";
import {check} from 'express-validator'
import {validationResult} from 'express-validator'
import * as dotenv from 'dotenv';


// Express.js middleware to use JSON objects


const saltRounds = 10;
let message = "";

const router = express.Router();

dotenv.config();
//configDotenv();

router.post("/register", [
  check('username').not().isEmpty().withMessage('Name must have more than 5 characters'),
  check('email', 'Your email is not valid').isEmail() .normalizeEmail(),
  check('password', 'Your password must be at least 8 characters long!').trim().isLength({ min: 8 }),
  check('confirmPassword', 'Your password and confirmation password must match!').trim().isLength({ min: 8 }),
],

async (req, res) => {
  const { username, email, token, confirmPassword,  password } = req.body;
  const errors = validationResult(req);
 // console.log(req.body);

  //if there are no errors we compare password and confirmPassword
  if (errors.isEmpty() && confirmPassword == password) {  

    try{
            
      const user = await userCredentials.findOne({ username });

      if (user) {
          message = ("This user name already exist"); 
          return res.json( message );    
          }
          else{
              const hashedPassword = await bcrypt.hash(password, saltRounds);
              const newUser = new userCredentials({ username,email, token, password: hashedPassword });
              await newUser.save();
              message = ("You have been successfully registered." );
            return res.json( message );
          }
          
              
        }catch(e){
        return  res.json("Failed");   
                
      }
    }
  
    else {
     
//console.log(errors.array());
  let error_status =  errors.array().length;
  if( error_status = ""){
    message = "";
    return res.json(message);
  }else{
    message = "Passwords do not match. Passwords must have minimum of 8 characters.";
    return res.json(message);
  }

  }
});


const verifyUser = (req, res, next) => {
  const myToken = req.cookies.jwtToken;
  if (!myToken) {
    return res.sendStatus(403);

  }
  try {
    const data = jwt.verify(myToken, process.env.REFRESH_TOKEN_SECRET);  
     return next();
    
  } catch {
    return res.sendStatus(403);
  }
}


router.get("/home",verifyUser, (req, res) =>{
  console.log(req.cookies.jwtToken)

})

router.post("/login", async (req, res) => { 
  const { email, password } = req.body;
  
  let refreshToken  = "";

  const userEmail = await userCredentials.findOne({ email }); 

  try{   
    if(!userEmail){
      message = ("This user does not exist"); 
      return res.json(message);
      // return res.json({message : "This user is not registered!"});
    }
      
      const isPasswordValid = await bcrypt.compare(password, userEmail.password);

      if (!isPasswordValid) {
        message = ("User name or password is incorrect"); 
        console.log("User name or password is incorrect");
        return res.json(message);
        
      }
      else{
      const id  = await userCredentials.findOne({ email:req.body.email })  
      const user_ID = id._id.toString(); 


      //console.log("The user ID is:" + user_ID)
    //console.log("The user email from Front end :" + email)

      const accessToken = generateAccessToken(user_ID)
      refreshToken = jwt.sign({user_ID}, process.env.REFRESH_TOKEN_SECRET)
      await userCredentials.updateOne({email: email}, {$set:{token:refreshToken}})

    
      //res.json({ accessToken: accessToken, refreshToken: refreshToken })
     //console.log("The refresh token: " + refreshToken) 
     //console.log("The ACCESS token: " + accessToken) 
        let result = {};
        result.message = "Success";
        result.refreshToken = refreshToken;
       //Assigning refresh token in http-only cookie 
        // res.cookie('jwtToken', refreshToken, { httpOnly: true, SameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });       

        return res.json(result);
      }

    }catch(e){
      console.log("Failed")         
      return  res.json("Failed");   
    }
    
  });

     
      function generateAccessToken(user_ID) {
        return jwt.sign({user_ID}, process.env.ACCESS_TOKEN_SECRET)
  }
  

  router.get("/webmine", verifyUser, (req, res) => {
    res.json({ message: "This is a protected route" });
  });
  
  router.get("/profile", verifyUser, (req, res) => {
    res.json({ message: "This is a protected route" });
  });

export { router as credentialsRouter };