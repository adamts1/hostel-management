import './TenantPage.css';
import { useParams } from 'react-router';
import CreateCall from '../../Components/CreateCall/CreateCall'
import CallAccordion from '../../Components/CallAccordion/CallAccordion'
import { Container, Accordion, Card, Row, Button, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function TenantPage({ activeUser }) {
  const { index } = useParams();
  const [showCreateCall, setShowCreateCall] = useState(false);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        const calls = await activeUser.getMyCalls();
        setCalls(calls);
      }catch{
        console.log("No Calls")
      }
    }
    if (activeUser) {
      fetchData();
    }
  }, [activeUser])

  async function handleNewHostel(title, urgentLevel ,description) {
    const newCall = await activeUser.createCall(title, urgentLevel ,description);
    setCalls(calls.concat(newCall));
  }

  return (
    <div className="p-tenantpage">
      <Container>
      <Row>
      <Col sm={12} lg={12}>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>Hello {[activeUser["fname"]+"!"]}</h1>
          </Col>
          <Col>
            <Button id="add-new" variant="outline-secondary" type="submit" onClick={() => setShowCreateCall(true)}  >Open Call</Button>
          </Col>
        </Row>
        <Accordion defaultActiveKey="0">

        {calls.map(call =>
              <CallAccordion
                call= {call}
              />
            )}      
            </Accordion>
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
        onCreate={handleNewHostel}
      />
    </Container>
    </div>
  );
}

export default TenantPage;