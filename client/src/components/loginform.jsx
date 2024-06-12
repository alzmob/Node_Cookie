import React, {useState} from "react" 
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const Loginform = () =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,   setMessage]   = useState(''); 
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  

  const onSubmit = async (e) => {
      e.preventDefault();    
      

      try {
        const res = await axios.post("http://localhost:3000/auth/login", {
          email, 
          password,
        })
        if(res.data === "Failed") {
          setMessage("There was a problem")
        }else{
          if(res.data.message === "Success"){
            Cookies.set('jwtToken1',res.data.refreshToken);
            window.location.href = '/';
          }else{
            setMessage(res.data)
          }
        }

      } catch (error) {
        console.log(error)
      }

    }
  return (
      <Form onSubmit={onSubmit}>
        <div className="alert alert-danger" role="alert">
        { message }
      </div>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='email'>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}/> 
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        
        <Button className='col-6 mx-auto' variant="primary" type="submit">
        <strong>Log in</strong>
        </Button>           
    </Form>
  );
}

