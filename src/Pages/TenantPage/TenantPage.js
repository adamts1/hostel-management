import './TenantPage.css';
import { useParams } from 'react-router';
import CreateCall from '../../Components/CreateCall/CreateCall'
import CallAccordion from '../../Components/CallAccordion/CallAccordion'
import { Container, Image, Card, Row, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function TenantPage({ activeUser }) {
  const { index } = useParams();
  const [showCreateCall, setShowCreateCall] = useState(false);


  return (
    <div className="p-tenantpage">
      <Container>
      <Row>
      <Col sm={12} lg={6}>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>Hello {[activeUser["fname"]+"!"]}</h1>
          </Col>
          <Col>
            <Button id="add-new" variant="outline-secondary" type="submit" onClick={() => setShowCreateCall(true)}  >Open Call</Button>
          </Col>
        </Row>
      <CallAccordion/>
      <CallAccordion/>
      <CallAccordion/>
      <CallAccordion/>
      </Col>
      <Col sm={12} lg={6}>
      <div className="summary-box">
      <Row>
      <Col xs={6} lg={6}>
        <h4>Full Name: {activeUser["fname"] +" "+activeUser["lname"]}</h4>
        <h4>Start date: {activeUser["start"]}</h4>
        <h4>End date: {activeUser["end"]}</h4>
        <h4>Payment: {activeUser["payment"]}</h4>
        <h4>Open Calls: 1</h4>
        </Col>
        <Col xs={6} lg={6}>
        <Image src={activeUser["img"].url()} thumbnail  />  
      </Col>
    </Row>
      </div>
      </Col>
      </Row>
      <CreateCall
        show={showCreateCall}
        onClose={() => setShowCreateCall(false)}
      />
    </Container>
    </div>
  );
}

export default TenantPage;