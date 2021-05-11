import './LandingPage.css'
import { Container, Row, Col, Image, Button, Selection } from 'react-bootstrap';

function LandinPage() {
  return (
    <div className='p-landinpage'>
      <Container>
        <Row>
          <Col sm={12} lg={6} >
                <h1>Manage your hostels from anyware !</h1>
                <p className="text-center">Create your own hostels and and roons, track capacity, system calls, all in one app!</p>
              <Row className="justify-content-center">
                <Button variant="primary" size="lg">
                  Get Started 
                </Button>
              </Row>
              
          </Col>
          <Col sm={0} lg={6}>
          <Image src={'/img/hostel.png'}/>  
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandinPage;
