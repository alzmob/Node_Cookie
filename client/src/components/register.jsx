import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Registerform = () =>{
  const [password,  setPassword]  = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [username,  setUserName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [message,   setMessage]   = useState('');
  

  const onSubmit = async (e) => {
           e.preventDefault();
         if(username !=''){ 
          try {
            await axios.post("http://localhost:3000/auth/register", {
            username,
            email, 
            password,
            confirmPassword,
                                  
          }).then(res=>{
             if(res.data === "Failed"){
             setMessage("There was a problem")
              } 
              else{
                 
                   setMessage(res.data) 
              }

          }).catch(e => {
            console.log(e)
              })  
          }
          catch(e){
            console.log(e)
          }
          
        }else{
          setMessage("User name is empty. Plese create a user name.")
        }
        }
  return (
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" >
        <Form.Label htmlFor='username'> <strong>User name</strong></Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Create a user name"
        value={username}
         onChange={e => setUserName(e.target.value)}  />    
        </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label htmlFor='email'> <strong>Email address</strong></Form.Label>
        <Form.Control 
         type="email" placeholder="Enter email"        
         value={email}
         onChange={e => setEmail(e.target.value)}/>    
        </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label htmlFor='password'> <strong>Password </strong></Form.Label>
        <Form.Control 
        type="password" placeholder="Password"
        value={password}
         onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label htmlFor='confirmPassword'> <strong>Confirm password </strong></Form.Label>
        <Form.Control 
        type="password" placeholder="Re-enter password" 
        value={confirmPassword}
         onChange={e => setconfirmPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        
        <Button className='col-6 mx-auto my-5' variant="primary" type="submit">
        <strong>Register</strong>
        </Button>
        
        <p class="text-danger"> { message} </p>
        
    </Form>

  
  );
  
}

