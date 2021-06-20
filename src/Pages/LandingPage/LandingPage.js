import './LandingPage.css'
import { Container, Row, Col, Image, Button, Selection } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function LandinPage() {
  const pathPre = process.env.PUBLIC_URL;

  return (
    <div className='p-landinpage'>
      <Container>
        <Row>
          <Col sm={12} lg={6} >
                <h1>Manage your hostels from anyware !</h1>
                <p className="text-center">Create your own hostels and and rooms, track capacity, system calls, all in one app!</p>
              <Row className="justify-content-center">
                <Link to="/login"> <Button>Get Started</Button></Link>
              </Row>
              
          </Col>
          <Col sm={0} lg={6}>
          <Image src={pathPre +'/img/hostel.png'}/>  
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandinPage;
