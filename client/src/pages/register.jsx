import { Registerform } from "/src/components/register";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Register =()=>{

return (
    <div> 
        <Container fluid="sm">
            <Row className="row justify-content-md-center my-4">
                <Col lg={12} style={{textAlign: 'center'}}><h1> <strong>Register</strong></h1></Col>
                <Col s={6} md={6} lg={4} className="mb-5 py-5"> <Registerform /></Col>
            </Row>     
        </Container>
    </div>
    );
}