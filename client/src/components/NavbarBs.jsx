import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'js-cookie';

export const BootstrapNavbar = ()=> {
  const navigate = useNavigate();
  const checkUrl = (url) => {
    if(Cookies.get('jwtToken1')) {
      navigate(`/${url}`);
    } else {
      navigate('/login');
    }
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Digital 1 Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey={3}  onClick={() => checkUrl('')}>Home</Nav.Link>
            <Nav.Link eventKey={4}  onClick={() => {
              navigate('/register');
            }}>Register</Nav.Link>           
            <Nav.Link eventKey={5} onClick={() => checkUrl('webmine')}>Webmine</Nav.Link>
            <Nav.Link eventKey={6} onClick={() => checkUrl('profile')}>Profile</Nav.Link>           
               </Nav>
               <Nav>
            <Nav.Link eventKey={2} onClick={() => {
              navigate('/login');
            }}>Login </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}